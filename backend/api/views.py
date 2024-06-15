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
    topPiec = sorted(kierunkiSrednie.items(), key=lambda item: item[1][0], reverse=True)[:2]
    
    return Response(lista[:3])

@api_view(['GET'])
def wynikQuizu(request):
    n = Kierunek.objects.count()
    kierunekOceny = {}
    for i in range(1,n+1):
        kierunek = Kierunek.objects.get(id=i)
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
                if j['kategoria'] == 1:
                    sumaOcenRangaPierwsza += k['ocena']
                elif j['kategoria'] == 3:

                    sumaOcenRangaDruga += k['ocena']
                elif j['kategoria'] == 2:

                    sumaOcenRangaTrzecia += k['ocena']
        sredniaOcenJeden = sumaOcenRangaPierwsza/len(serializer3.data)
        sredniaOcenDwa = sumaOcenRangaDruga/len(serializer3.data)
        sredniaOcenTrzy = sumaOcenRangaTrzecia/len(serializer3.data)
        ocenaKoncowa = sredniaOcenJeden+0.7*sredniaOcenDwa+0.4*sredniaOcenTrzy
        kierunekOceny[nazwa_kierunek] = ocenaKoncowa
    topPiec = sorted(kierunekOceny.items(), key=lambda item: item[1], reverse=True)[:5]
    top = dict(topPiec)
            
    return Response(top)

        # for j in serializer2.data:
        #     if j['']
        

# @api_view(['GET', 'POST'])
# def getDVD(request, pk):
#     note = DVD.objects.get(id=pk)
#     serializer = DVDSerializer(note, many=False)
#     return Response(serializer.data)


# @api_view(['GET'])
# def getDVDs(request):
#     notes = DVD.objects.all()
#     serializer = DVDSerializer(notes, many=True)
#     return Response(serializer.data)


# @api_view(['GET', 'POST'])
# def getDVD(request, pk):
#     note = DVD.objects.get(id=pk)
#     serializer = DVDSerializer(note, many=False)
#     return Response(serializer.data)


# @api_view(['GET'])
# def getMovies(request):
#     notes = Movie.objects.all()
#     serializer = MovieSerializer(notes, many=True)
#     return Response(serializer.data)


# @api_view(['GET', 'POST'])
# def getMovie(request, pk):
#     note = Movie.objects.get(id=pk)
#     serializer = MovieSerializer(note, many=False)
#     return Response(serializer.data)

# # @api_view(['POST'])
# # def rentMovie(request):
# #     info = json.loads(request.body.decode("utf-8"))
# #     # { 'user_id': 1, 'DVD_id': 1 }
# #     user = User.objects.get(id=info['user_id'])
# #     DVD = DVD.objects.get(id=info['DVD_id'])
# #     DVD.status = 2
# #     DVD.renter = user
# #     DVD.save()
# #     event = Event.objects.create(
# #         status=2,
# #         DVD=DVD,
# #         renter=user
# #     )
# #     event.save()

# #     return Response(
# #         status=200,
# #         content=bytes('{"status": "%s"}'
# #         % ("Movie rented successfully"),'UTF-8'),
# #         content_type="application/json",
# #     )

# @api_view(['POST'])
# def returnMovie(request):
#     info = json.loads(request.body.decode("utf-8"))
#     # { 'user_id': 1, 'DVD_id': 1 }
#     user = User.objects.get(id=info['user_id'])
#     DVD = DVD.objects.get(id=info['DVD_id'])
#     DVD.status = 1
#     DVD.renter = None
#     DVD.save()
#     event = Event.objects.create(
#         status=1,
#         DVD=DVD,
#         renter=user
#     )
#     event.save()

#     return Response(
#         status=200,
#         content=bytes('{"status": "%s"}'
#         % ("Movie returned successfully"),'UTF-8'),
#         content_type="application/json",
#     )

# @api_view(['POST'])
# def rentMovie(request):
#     info = json.loads(request.body.decode("utf-8"))
#     # { 'user_id': 1, 'movie_id': 1 }
#     user = User.objects.get(id=info['user_id'])
#     movie = Movie.objects.get(id=info['movie_id'])
#     DVDs = DVD.objects.get.all()
#     for DVD in DVDs:
#         if DVD.movie == movie:
#             DVD.status = 2
#             DVD.renter = user
#             DVD.save()
#             event = Event.objects.create(
#                 status=2,
#                 DVD=DVD,
#                 renter=user
#             )
#             event.save()
#     return Response(
#         status=200,
#         content=bytes('{"status": "%s"}'
#         % ("Movie rented successfully"),'UTF-8'),
#         content_type="application/json",
#     )
# #jako response powinnismy dodac nr id przydzielonej kasety??


