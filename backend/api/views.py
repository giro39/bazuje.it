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
    return Response(serializer.data)


@api_view(["GET", "POST"])
@permission_classes([AllowAny])
def wynikQuizu(request):
    global kat1, kat2, kat3  # Dodanie deklaracji globalnych zmiennych

    if request.method == "POST":
        serializer = CategorySerializer(data=request.data, many=True)
        if serializer.is_valid():
            kat1 = serializer.data[0]["title"]
            kat2 = serializer.data[1]["title"]
            kat3 = serializer.data[2]["title"]
            print(kat1, kat2, kat3)

    kierunki = Kierunek.objects.all()
    data = []
    for kierunek in kierunki:
        przedmioty = Przedmiot.objects.filter(kierunek=kierunek.id)
        suma1, suma2, suma3 = 0, 0, 0
        count1, count2, count3 = 0, 0, 0
        for przedmiot in przedmioty:
            if Kategorie(przedmiot.kategoria).label == kat1:
                opinie = OpiniaPrzedmiot.objects.filter(przedmiot=przedmiot.id)
                suma1 += sum(opinia.ocena for opinia in opinie)
                count1 += len(opinie)

            if Kategorie(przedmiot.kategoria).label == kat2:
                opinie = OpiniaPrzedmiot.objects.filter(przedmiot=przedmiot.id)
                suma2 += sum(opinia.ocena for opinia in opinie)
                count2 += len(opinie)

            if Kategorie(przedmiot.kategoria).label == kat3:
                opinie = OpiniaPrzedmiot.objects.filter(przedmiot=przedmiot.id)
                suma3 += sum(opinia.ocena for opinia in opinie)
                count3 += len(opinie)

        wynikQuizu = 0
        if count1 != 0:
            wynikQuizu += 1 * suma1 / count1
        if count2 != 0:
            wynikQuizu += 0.7 * suma2 / count2
        if count3 != 0:
            wynikQuizu += 0.4 * suma3 / count3

        data.append(
            {
                "kierunek": kierunek,
                "uczelnia": kierunek.wydzial.uczelnia,
                "wynikQuizu": wynikQuizu,
            }
        )
    sorted_data = sorted(data, key=lambda x: x["wynikQuizu"], reverse=True)

    serializer = WynikQuizuSerializer(sorted_data[:3], many=True)
    return Response(serializer.data)


# @api_view(["POST"])
# @permission_classes([AllowAny])
# def submit_categories(request):
#     serializer = CategorySerializer(data=request.data, many=True)
#     print(serializer)
#     if serializer.is_valid():
#         return Response(serializer.data, status=status.HTTP_201_CREATED)
#     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
