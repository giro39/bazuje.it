from rest_framework import serializers


class BestKierunkiSerializer(serializers.Serializer):
    kierunek = serializers.CharField()
    uczelnia = serializers.CharField()
    sredniaOcen = serializers.FloatField()


class WynikQuizuSerializer(serializers.Serializer):
    kierunek = serializers.CharField()
    uczelnia = serializers.CharField()
    wynikQuizu = serializers.FloatField()


class CategorySerializer(serializers.Serializer):
    title = serializers.CharField()
    name = serializers.CharField()
