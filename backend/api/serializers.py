from rest_framework.serializers import ModelSerializer
from .models import DVD, Movie


class DVDSerializer(ModelSerializer):
    class Meta:
        model = DVD
        fields = '__all__'

class MovieSerializer(ModelSerializer):
    class Meta:
        model = Movie
        fields = '__all__'
