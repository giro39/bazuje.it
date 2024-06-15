from rest_framework.serializers import ModelSerializer
from .models import Rodzaj, Miasto, Uczelnia, Wydzial, Kierunek, Przedmiot, OpiniaPrzedmiot, OpiniaUczelnia, OpiniaKierunek


class RodzajSerializer(ModelSerializer):
    class Meta:
        model = Rodzaj
        fields = '__all__'

class MiastoSerializer(ModelSerializer):
    class Meta:
        model = Miasto
        fields = '__all__'

class UczelniaSerializer(ModelSerializer):
    class Meta:
        model = Uczelnia
        fields = '__all__'

class WydzialSerializer(ModelSerializer):
    class Meta:
        model = Wydzial
        fields = '__all__'

class KierunekSerializer(ModelSerializer):
    class Meta:
        model = Kierunek
        fields = '__all__'

class PrzedmiotSerializer(ModelSerializer):
    class Meta:
        model = Przedmiot
        fields = '__all__'

class OpiniaPrzedmiotSerializer(ModelSerializer):
    class Meta:
        model = OpiniaPrzedmiot
        fields = '__all__'

class OpiniaKierunekSerializer(ModelSerializer):
    class Meta:
        model = OpiniaKierunek
        fields = '__all__'

class OpiniaUczelniaSerializer(ModelSerializer):
    class Meta:
        model = OpiniaUczelnia
        fields = '__all__'
