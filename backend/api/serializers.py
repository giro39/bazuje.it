from rest_framework import serializers


class BestKierunkiSerializer(serializers.Serializer):
    kierunek_id = serializers.IntegerField()
    kierunek = serializers.CharField()
    uczelnia = serializers.CharField()
    sredniaOcen = serializers.FloatField()


class WynikQuizuSerializer(serializers.Serializer):
    kierunek_id = serializers.IntegerField()
    kierunek = serializers.CharField()
    uczelnia = serializers.CharField()
    wynikQuizu = serializers.FloatField()


class UsernameSerializer(serializers.Serializer):
    username = serializers.CharField()


class BestOpiniaSerializer(serializers.Serializer):
    opinia = serializers.CharField()
    rating = serializers.IntegerField()
    user = serializers.CharField()
    text = serializers.CharField()
    exists = serializers.BooleanField()


class ChosenKierunekSerializer(serializers.Serializer):
    kierunekId = serializers.IntegerField()
    kierunek = serializers.CharField()
    uczelnia = serializers.CharField()
    wydzial = serializers.CharField()
    sredniaOcen = serializers.FloatField()
    listaPrzedmiotow = serializers.ListField(child=serializers.DictField())


class AllOpinionsSerializer(serializers.Serializer):
    opinia = serializers.CharField()
    rating = serializers.IntegerField()
    user = serializers.CharField()
    text = serializers.CharField()
    exists = serializers.BooleanField()
    loggedUserRating = serializers.CharField()
