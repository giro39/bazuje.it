from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from .serializers import (
    BestKierunkiSerializer,
    WynikQuizuSerializer,
    CategorySerializer,
    UsernameSerializer,
    BestOpiniaSerializer,
    ChosenKierunekSerializer,
    InputDataSerializer,
    AllMajorsSerializer
)
from .models import (
    Rodzaj,
    Miasto,
    Uczelnia,
    Wydzial,
    Kierunek,
    Przedmiot,
    OpiniaPrzedmiot,
    OpiniaUczelnia,
    OpiniaKierunek,
    Kategorie,
    User,
    OcenaOpiniiKierunku,
)


@api_view(["GET"])
def getBestKierunki(request):
    kierunki = Kierunek.objects.all()

    data = []
    for kierunek in kierunki:
        opinie = OpiniaKierunek.objects.filter(kierunek=kierunek.id)

        sumaOcen = sum(opinia.ocena for opinia in opinie)
        sredniaOcen = sumaOcen / len(opinie) if opinie else 0

        data.append(
            {
                "kierunek_id": kierunek.id,
                "kierunek": kierunek,
                "uczelnia": kierunek.wydzial.uczelnia,
                "sredniaOcen": sredniaOcen,
            }
        )
    sorted_data = sorted(data, key=lambda x: x["sredniaOcen"], reverse=True)

    serializer = BestKierunkiSerializer(sorted_data[:3], many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(["POST"])
@permission_classes([AllowAny])
def wynikQuizu(request):
    kat = ["brak kategorii"] * 3
    if request.method == "POST":
        serializer = InputDataSerializer(data=request.data, many=True)
        if serializer.is_valid():

            for i in range(len(serializer.data)):
                kat[i] = serializer.data[i]["inputData"]
            print(kat)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    kierunki = Kierunek.objects.all()
    data = []
    for kierunek in kierunki:
        przedmioty = Przedmiot.objects.filter(kierunek=kierunek.id)
        suma = [0] * 3
        count = [0] * 3

        for przedmiot in przedmioty:
            for i in range(len(kat)):
                if Kategorie(przedmiot.kategoria).label == kat[i]:
                    opinie = OpiniaPrzedmiot.objects.filter(przedmiot=przedmiot.id)
                    suma[i] += sum(opinia.ocena for opinia in opinie)
                    count[i] += len(opinie)

        wynikQuizu = 0
        if count[0] != 0:
            wynikQuizu += 1 * suma[0] / count[0]
        if count[1] != 0:
            wynikQuizu += 0.7 * suma[1] / count[1]
        if count[2] != 0:
            wynikQuizu += 0.4 * suma[2] / count[2]

        # print(wynikQuizu)
        data.append(
            {
                "kierunek_id": kierunek.id,
                "kierunek": kierunek,
                "uczelnia": kierunek.wydzial.uczelnia,
                "wynikQuizu": wynikQuizu,
            }
        )
    sorted_data = sorted(data, key=lambda x: x["wynikQuizu"], reverse=True)

    serializer = WynikQuizuSerializer(sorted_data, many=True)
    return Response(serializer.data[:3], status=status.HTTP_200_OK)


@api_view(["POST"])
@permission_classes([AllowAny])
def getUsername(request):
    if request.method == "POST":
        serializer = InputDataSerializer(data=request.data)
        if serializer.is_valid():
            user_id = serializer.validated_data["inputData"]
            try:
                user = User.objects.get(id=user_id)
                user_serializer = UsernameSerializer(user)
                return Response(user_serializer.data, status=status.HTTP_200_OK)
            except User.DoesNotExist:
                return Response(
                    {"error": "User not found"}, status=status.HTTP_404_NOT_FOUND
                )
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    return Response(
        {"error": "Invalid request method"}, status=status.HTTP_405_METHOD_NOT_ALLOWED
    )


@api_view(["POST"])
@permission_classes([AllowAny])
def getBestOpinia(request):
    if request.method == "POST":
        serializer = InputDataSerializer(data=request.data)
        if serializer.is_valid():
            kierunek_id = serializer.validated_data["inputData"]
            opinie = OpiniaKierunek.objects.filter(kierunek=kierunek_id)
            if not opinie:
                return Response(
                    {"exists": False, "error": "No such a comment"},
                    status=status.HTTP_200_OK,
                )
            best_opinia = opinie[0]
            highest_rating = 0
            for opinia in opinie:
                oceny = OcenaOpiniiKierunku.objects.filter(opinia=opinia.id)
                rating = sum(ocena.ocena for ocena in oceny)
                if rating > highest_rating:
                    highest_rating = rating
                    best_opinia = opinia
            user = User.objects.get(id=best_opinia.user_id)
            text = best_opinia.opis
            data = {
                "opinia": best_opinia,
                "rating": rating,
                "user": user.username,
                "text": text,
                "exists": True,
            }
            serializer = BestOpiniaSerializer(data)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    return Response(
        {"error": "Invalid request method"}, status=status.HTTP_405_METHOD_NOT_ALLOWED
    )


@api_view(["POST"])
@permission_classes([AllowAny])
def getChosenKierunek(request):
    if request.method == "POST":
        serializer = InputDataSerializer(data=request.data)
        if serializer.is_valid():
            kierunek_id = serializer.validated_data["inputData"]
            kierunek = Kierunek.objects.get(id=kierunek_id)

            opinie = OpiniaKierunek.objects.filter(kierunek=kierunek.id)

            sumaOcen = sum(opinia.ocena for opinia in opinie)
            sredniaOcen = sumaOcen / len(opinie) if opinie else 0
            przedmioty = Przedmiot.objects.filter(kierunek=kierunek.id)
            przedmiotyList = []
            for przedmiot in przedmioty:
                opinie = OpiniaPrzedmiot.objects.filter(przedmiot=przedmiot.id)
                sumaOcen = sum(opinia.ocena for opinia in opinie)
                sredniaOcen = sumaOcen / len(opinie) if opinie else 0
                przedmiotyList.append(
                    {"nazwa": przedmiot.nazwa, "sredniaOcen": sredniaOcen}
                )

            sorted_data = sorted(
                przedmiotyList, key=lambda x: x["sredniaOcen"], reverse=True
            )
            data = {
                "kierunekId": kierunek.id,
                "kierunek": kierunek,
                "uczelnia": kierunek.wydzial.uczelnia,
                "wydzial": kierunek.wydzial,
                "sredniaOcen": sredniaOcen,
                "listaPrzedmiotow": sorted_data,
            }
            serializer = ChosenKierunekSerializer(data)

            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    return Response(
        {"error": "Invalid request method"}, status=status.HTTP_405_METHOD_NOT_ALLOWED
    )


@api_view(["GET"])
def getAllMajors(request):
    if request.method == "GET":
        kierunki = Kierunek.objects.all()
        data = []
        for kierunek in kierunki:
            data.append(
                {
                    "majorId": kierunek.id,
                    "majorName": kierunek.nazwa,
                    "universityId": kierunek.wydzial.uczelnia.id,
                    "universityName": kierunek.wydzial.uczelnia.nazwa,
                    "location": kierunek.wydzial.uczelnia.Miasto.nazwa,
                }
            )
        
        serializer = AllMajorsSerializer(data, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    else:
        return Response(
            {"error": "Invalid request method"}, status=status.HTTP_405_METHOD_NOT_ALLOWED
        )