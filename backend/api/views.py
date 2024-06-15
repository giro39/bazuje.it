from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .serializers import DVDSerializer, MovieSerializer
from .models import DVD, Movie, Event
from django.contrib.auth.models import User
import json


@api_view(['GET'])
def getRoutes(request):
    routes = [
        {
            'Endpoint': '/',
            'method': 'GET',
            'body': None,
            'description': ''
        },
    ]
    return Response(routes)


@api_view(['GET'])
def getDVDs(request):
    notes = DVD.objects.all()
    serializer = DVDSerializer(notes, many=True)
    return Response(serializer.data)


@api_view(['GET', 'POST'])
def getDVD(request, pk):
    note = DVD.objects.get(id=pk)
    serializer = DVDSerializer(note, many=False)
    return Response(serializer.data)


@api_view(['GET'])
def getMovies(request):
    notes = Movie.objects.all()
    serializer = MovieSerializer(notes, many=True)
    return Response(serializer.data)


@api_view(['GET', 'POST'])
def getMovie(request, pk):
    note = Movie.objects.get(id=pk)
    serializer = MovieSerializer(note, many=False)
    return Response(serializer.data)

# @api_view(['POST'])
# def rentMovie(request):
#     info = json.loads(request.body.decode("utf-8"))
#     # { 'user_id': 1, 'DVD_id': 1 }
#     user = User.objects.get(id=info['user_id'])
#     DVD = DVD.objects.get(id=info['DVD_id'])
#     DVD.status = 2
#     DVD.renter = user
#     DVD.save()
#     event = Event.objects.create(
#         status=2,
#         DVD=DVD,
#         renter=user
#     )
#     event.save()

#     return Response(
#         status=200,
#         content=bytes('{"status": "%s"}'
#         % ("Movie rented successfully"),'UTF-8'),
#         content_type="application/json",
#     )

@api_view(['POST'])
def returnMovie(request):
    info = json.loads(request.body.decode("utf-8"))
    # { 'user_id': 1, 'DVD_id': 1 }
    user = User.objects.get(id=info['user_id'])
    DVD = DVD.objects.get(id=info['DVD_id'])
    DVD.status = 1
    DVD.renter = None
    DVD.save()
    event = Event.objects.create(
        status=1,
        DVD=DVD,
        renter=user
    )
    event.save()

    return Response(
        status=200,
        content=bytes('{"status": "%s"}'
        % ("Movie returned successfully"),'UTF-8'),
        content_type="application/json",
    )

@api_view(['POST'])
def rentMovie(request):
    info = json.loads(request.body.decode("utf-8"))
    # { 'user_id': 1, 'movie_id': 1 }
    user = User.objects.get(id=info['user_id'])
    movie = Movie.objects.get(id=info['movie_id'])
    DVDs = DVD.objects.get.all()
    for DVD in DVDs:
        if DVD.movie == movie:
            DVD.status = 2
            DVD.renter = user
            DVD.save()
            event = Event.objects.create(
                status=2,
                DVD=DVD,
                renter=user
            )
            event.save()
    return Response(
        status=200,
        content=bytes('{"status": "%s"}'
        % ("Movie rented successfully"),'UTF-8'),
        content_type="application/json",
    )
#jako response powinnismy dodac nr id przydzielonej kasety??