from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from .serializers import (
    AllOpinionsSerializer,
    BestKierunkiSerializer,
    BestOpiniaSerializer,
    ChosenKierunekSerializer,
    AllMajorsSerializer,
    UsernameSerializer,
    WynikQuizuSerializer,
    OpiniaKierunekSerializer,
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

    for i in range(len(request.data)):
        kat[i] = request.data[i]["inputData"]

    print(kat)

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

        user_id = request.data.get("inputData")
        try:
            user = User.objects.get(id=user_id)
            user_serializer = UsernameSerializer(user)
            return Response(user_serializer.data, status=status.HTTP_200_OK)
        except User.DoesNotExist:
            return Response(
                {"error": "User not found"}, status=status.HTTP_404_NOT_FOUND
            )
    return Response(
        {"error": "Invalid request method"}, status=status.HTTP_405_METHOD_NOT_ALLOWED
    )


@api_view(["POST"])
@permission_classes([AllowAny])
def getBestOpinia(request):
    if request.method == "POST":
        kierunek_id = request.data.get("inputData")

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
    return Response(
        {"error": "Invalid request method"}, status=status.HTTP_405_METHOD_NOT_ALLOWED
    )


@api_view(["POST"])
@permission_classes([AllowAny])
def getChosenKierunek(request):
    if request.method == "POST":
        kierunek_id = request.data.get("inputData")

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
    return Response(
        {"error": "Invalid request method"}, status=status.HTTP_405_METHOD_NOT_ALLOWED
    )


@api_view(["POST"])
@permission_classes([AllowAny])
def getAllOpinions(request):
    if request.method == "POST":
        kierunek_id = request.data.get("kierunek")
        user_id = request.data.get("user")

        opinie = OpiniaKierunek.objects.filter(kierunek=kierunek_id)
        data = []
        for opinia in opinie:
            oceny = OcenaOpiniiKierunku.objects.filter(opinia=opinia.id)
            rating = sum(ocena.ocena for ocena in oceny)

            ocena = 0

            ocena_obj = OcenaOpiniiKierunku.objects.filter(
                opinia=opinia.id, user=user_id
            )

            if ocena_obj.exists():
                ocena = ocena_obj.first().ocena

            data.append(
                {
                    "opinia": opinia.id,
                    "rating": rating,
                    "user": opinia.user.username,
                    "userId": opinia.user.id,
                    "text": opinia.opis,
                    "exists": True,
                    "loggedUserRating": ocena,
                }
            )
        sorted_data = sorted(data, key=lambda x: x["rating"], reverse=True)
        for i in range(len(sorted_data)):
            if sorted_data[i]["userId"] == user_id:
                sorted_data[i], sorted_data[0] = sorted_data[0], sorted_data[i]

        serializer = AllOpinionsSerializer(sorted_data, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    return Response(
        {"error": "Invalid request method"}, status=status.HTTP_405_METHOD_NOT_ALLOWED
    )


@api_view(["POST"])
@permission_classes([AllowAny])
def vote_opinia_kierunek(request):
    user_id = request.data.get("userId")
    opinia_id = request.data.get("opinionId")
    ocena = request.data.get("grade")

    try:
        user = User.objects.get(id=user_id)
        opinia = OpiniaKierunek.objects.get(id=opinia_id)
    except User.DoesNotExist:
        return Response(
            {"error": "User not found"}, status=status.HTTP_404_METHOD_NOT_ALLOWED
        )
    except OpiniaKierunek.DoesNotExist:
        return Response(
            {"error": "Opinia not found"}, status=status.HTTP_405_METHOD_NOT_ALLOWED
        )

    try:
        ocena_opinii = OcenaOpiniiKierunku.objects.get(user=user, opinia=opinia)
        if ocena_opinii.ocena == ocena:
            ocena_opinii.delete()
            return Response({"message": "Vote removed"}, status=status.HTTP_200_OK)
        else:
            ocena_opinii.ocena = ocena
            ocena_opinii.save()
            return Response({"message": "Vote updated"}, status=status.HTTP_200_OK)
    except OcenaOpiniiKierunku.DoesNotExist:
        OcenaOpiniiKierunku.objects.create(user=user, opinia=opinia, ocena=ocena)
        return Response({"message": "Vote added"}, status=status.HTTP_201_CREATED)


@api_view(["POST"])
@permission_classes([AllowAny])
def addOpiniaKierunek(request):
    if request.method == "POST":
        data = {
            "kierunek": request.data.get("kierunek"),
            "user": request.data.get("user"),
            "ocena": request.data.get("ocena"),
            "opis": request.data.get("opis"),
        }

        serializer = OpiniaKierunekSerializer(data=data)
        if serializer.is_valid():
            if OpiniaKierunek.objects.filter(
                kierunek=data["kierunek"], user=data["user"]
            ).exists():
                return Response(
                    {"error": "You have already added an opinion for this course"},
                    status=status.HTTP_409_CONFLICT,
                )
            else:
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
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
    

@api_view(["PUT", "PATCH"])
@permission_classes([AllowAny])
def editOpiniaKierunek(request, id): #tutaj moze potestowac z tym id zeby przekazac inaczej jak nie bedzie dzialac
    try:
        opinia = OpiniaKierunek.objects.get(id=id)
    except OpiniaKierunek.DoesNotExist:
        return Response(
            {"error": "Opinion not found or you are not the owner"},
            status=status.HTTP_404_NOT_FOUND,
        )
    
    if request.method in ["PUT", "PATCH"]:
        data = {
            "ocena": request.data.get("ocena"),
            "opis": request.data.get("opis"),
        }

        serializer = OpiniaKierunekSerializer(opinia, data=data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    return Response(
        {"error": "Invalid request method"}, status=status.HTTP_405_METHOD_NOT_ALLOWED
    )

@api_view(["DELETE"])
@permission_classes([AllowAny])
def deleteOpiniaKierunek(request, id):
    try:
        opinia = OpiniaKierunek.objects.get(id=id)
    except OpiniaKierunek.DoesNotExist:
        return Response(
            {"error": "Opinion not found or you are not the owner"},
            status=status.HTTP_404_NOT_FOUND,
        )

    opinia.delete()
    return Response({"message": "Opinion deleted successfully"}, status=status.HTTP_204_NO_CONTENT)