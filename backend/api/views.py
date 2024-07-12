from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from .serializers import (
    BestKierunkiSerializer,
    WynikQuizuSerializer,
    CategorySerializer,
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
                "kierunek": kierunek,
                "uczelnia": kierunek.wydzial.uczelnia,
                "sredniaOcen": sredniaOcen,
            }
        )
    sorted_data = sorted(data, key=lambda x: x["sredniaOcen"], reverse=True)

    serializer = BestKierunkiSerializer(sorted_data[:3], many=True)
    return Response(serializer.data, status=status.HTTP_201_CREATED)


@api_view(["POST"])
@permission_classes([AllowAny])
def wynikQuizu(request):
    kat = ["brak kategorii"] * 3
    if request.method == "POST":
        serializer = CategorySerializer(data=request.data, many=True)
        if serializer.is_valid():

            for i in range(len(serializer.data)):
                kat[i] = serializer.data[i]["title"]
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
                "kierunek": kierunek,
                "uczelnia": kierunek.wydzial.uczelnia,
                "wynikQuizu": wynikQuizu,
            }
        )
    sorted_data = sorted(data, key=lambda x: x["wynikQuizu"], reverse=True)

    serializer = WynikQuizuSerializer(sorted_data, many=True)
    return Response(serializer.data[:3], status=status.HTTP_201_CREATED)


# @api_view(["POST"])
# @permission_classes([AllowAny])
# def submit_categories(request):
#     serializer = CategorySerializer(data=request.data, many=True)
#     print(serializer)
#     if serializer.is_valid():
#         return Response(serializer.data, status=status.HTTP_201_CREATED)
#     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
