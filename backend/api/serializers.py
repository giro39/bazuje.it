from rest_framework import serializers

from .models import OpiniaKierunek


class OpiniaKierunekSerializer(serializers.ModelSerializer):
    class Meta:
        model = OpiniaKierunek
        fields = ["kierunek", "user", "ocena", "opis", "edytowana"]


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


class AllMajorsSerializer(serializers.Serializer):
    majorId = serializers.IntegerField()
    majorName = serializers.CharField()
    universityId = serializers.IntegerField()
    universityName = serializers.CharField()
    location = serializers.CharField()


class AllUnisSerializer(serializers.Serializer):
    universityId = serializers.IntegerField()
    universityName = serializers.CharField()
    location = serializers.CharField()
    type = serializers.CharField()
    description = serializers.CharField()


class AllOpinionsSerializer(serializers.Serializer):
    opinia = serializers.IntegerField()
    rating = serializers.IntegerField()
    grade = serializers.IntegerField()
    user = serializers.CharField()
    userId = serializers.IntegerField()
    text = serializers.CharField()
    exists = serializers.BooleanField()
    loggedUserRating = serializers.IntegerField()
    edited = serializers.BooleanField()
