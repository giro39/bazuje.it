from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .serializers import RodzajSerializer, MiastoSerializer, UczelniaSerializer, WydzialSerializer, KierunekSerializer, PrzedmiotSerializer, OpiniaPrzedmiotSerializer, OpiniaUczelniaSerializer, OpiniaKierunekSerializer
from .models import Rodzaj, Miasto, Uczelnia, Wydzial, Kierunek, Przedmiot, OpiniaPrzedmiot, OpiniaUczelnia, OpiniaKierunek
from django.contrib.auth.models import User
import operator
import json

import random


# @api_view(['GET'])
# def getRoutes(request):
#     routes = [
#         {
#             'Endpoint': '/',
#             'method': 'GET',
#             'body': None,
#             'description': ''
#         },
#     ]
#     return Response(routes)

@api_view(['GET'])
def getUczelnias(request):
    notes = Uczelnia.objects.all()
    serializer = UczelniaSerializer(notes, many=True)

    
    return Response(serializer.data)

@api_view(['GET'])
def getUczelnia(request, pk):
    note = Uczelnia.objects.get(id=pk)
    serializer = UczelniaSerializer(note, many=False)
    return Response(serializer.data)


@api_view(['GET'])
def getBestKierunki(request):
    n = Kierunek.objects.count()
    kierunkiSrednie = {}
    
    for i in range(1, n + 1):
        note = Kierunek.objects.get(id=i)
        serializer = KierunekSerializer(note, many=False)
        kierunek = serializer.data['nazwa']
        id_kierunku = serializer.data['id']
        uczelnia = note.wydzial.uczelnia

        opinie = OpiniaKierunek.objects.filter(kierunek=id_kierunku)
        serializer2 = OpiniaKierunekSerializer(opinie, many=True)
        sumaOcen = 0
        for j in serializer2.data:
            ocena = j['ocena']
            sumaOcen += ocena
        sredniaOcen = sumaOcen / len(serializer2.data)
        kierunkiSrednie[kierunek] = [sredniaOcen, str(uczelnia)]
    lista = []
    for i in kierunkiSrednie:
        podlista = []
        podlista.append(i)
        podlista.append(kierunkiSrednie[i][0])
        podlista.append(kierunkiSrednie[i][1])
        lista.append(podlista)

    
    return Response(lista[:3])

@api_view(['GET'])
def wynikQuizu(request):
    n = Kierunek.objects.count()
    kierunekOceny = {}
    for i in range(1,n+1):
        kierunek = Kierunek.objects.get(id=i)
        uczelnia = kierunek.wydzial.uczelnia
        print(uczelnia)
        serializer = KierunekSerializer(kierunek, many=False)
        nazwa_kierunek = serializer.data['nazwa']
        id_kierunek = serializer.data['id']
        przedmiot = Przedmiot.objects.filter(kierunek = id_kierunek)
        serializer2 = PrzedmiotSerializer(przedmiot, many=True)
        sumaOcenRangaPierwsza = 0
        sumaOcenRangaDruga = 0
        sumaOcenRangaTrzecia = 0
        for j in serializer2.data:
            nazwa_przedmiot = j['nazwa']
            id_przedmiot = j['id']
            opiniePrzedmiot = OpiniaPrzedmiot.objects.filter(przedmiot = id_przedmiot)
            serializer3 = OpiniaPrzedmiotSerializer(opiniePrzedmiot, many=True)

            for k in serializer3.data:
                if j['kategoria'] == 1: # BAZY DANYCH
                    sumaOcenRangaPierwsza += k['ocena']
                elif j['kategoria'] == 3: # SIECI KOMPUTEROWE

                    sumaOcenRangaDruga += k['ocena']
                elif j['kategoria'] == 2: # WEB DEV

                    sumaOcenRangaTrzecia += k['ocena']
        sredniaOcenJeden = sumaOcenRangaPierwsza/len(serializer3.data)
        sredniaOcenDwa = sumaOcenRangaDruga/len(serializer3.data)
        sredniaOcenTrzy = sumaOcenRangaTrzecia/len(serializer3.data)
        ocenaKoncowa = sredniaOcenJeden+0.7*sredniaOcenDwa+0.4*sredniaOcenTrzy
        kierunekOceny[nazwa_kierunek] = [ocenaKoncowa, str(uczelnia)]
    lista = []
    for i in kierunekOceny:
        podlista = []
        podlista.append(kierunekOceny[i][0])
        podlista.append(i)
        
        podlista.append(kierunekOceny[i][1])
        lista.append(podlista)

    return Response((sorted(lista)[::-1])[:3])

        # for j in serializer2.data:
        #     if j['']
        


