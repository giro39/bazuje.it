from django.db import models
from django.contrib.auth.models import User


class Kategorie(models.IntegerChoices):
    BAZY_DANYCH = 1, "Bazy danych"
    SIECI_KOMPUTEROWE = 2, "Sieci komputerowe"
    ALGORYTMIKA = 3, "Algorytmika"
    SZTUCZNA_INTELIGENCJA = 4, "Sztuczna Inteligencja"
    GAMEDEV = 5, "Gamedev"
    WEBDEV = 6, "Webdev"
    PROGRAMOWANIE_MOBILNE = 7, "Programowanie mobilne"
    CYBERBEZPIECZENSTWO = 8, "Cyberbezpieczeństwo"


class Miasto(models.Model):
    nazwa = models.CharField(max_length=200, primary_key=True)

    def __str__(self):
        return self.nazwa


class Rodzaj(models.Model):
    nazwa = models.CharField(max_length=200, primary_key=True)

    def __str__(self):
        return self.nazwa


class Uczelnia(models.Model):
    Miasto = models.ForeignKey(Miasto, on_delete=models.CASCADE)
    Rodzaj = models.ForeignKey(Rodzaj, on_delete=models.CASCADE)
    nazwa = models.CharField(max_length=200)
    opis = models.TextField(blank=True)

    def __str__(self):
        return self.nazwa


class Wydzial(models.Model):
    uczelnia = models.ForeignKey(Uczelnia, on_delete=models.CASCADE)
    nazwa = models.CharField(max_length=200)
    opis = models.TextField(blank=True)

    def __str__(self):
        return self.nazwa


class Kierunek(models.Model):
    wydzial = models.ForeignKey(Wydzial, on_delete=models.CASCADE)
    nazwa = models.CharField(max_length=200)
    opis = models.TextField(blank=True)

    def __str__(self):
        return self.nazwa


class Przedmiot(models.Model):
    kierunek = models.ForeignKey(Kierunek, on_delete=models.CASCADE)
    nazwa = models.CharField(max_length=200)
    opis = models.TextField(blank=True)
    kategoria = models.IntegerField(choices=Kategorie.choices, null=True)

    def __str__(self):
        return self.nazwa


class OpiniaUczelnia(models.Model):
    uczelnia = models.ForeignKey(Uczelnia, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    ocena = models.IntegerField(null=False)
    opis = models.TextField(blank=True)


class OpiniaKierunek(models.Model):
    kierunek = models.ForeignKey(Kierunek, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    ocena = models.IntegerField(null=False)
    opis = models.TextField(blank=True)


class OpiniaPrzedmiot(models.Model):
    przedmiot = models.ForeignKey(Przedmiot, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    ocena = models.IntegerField(null=False)
    opis = models.TextField(blank=True)


class OcenaOpiniiKierunku(models.Model):
    opinia = models.ForeignKey(OpiniaKierunek, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    ocena = models.IntegerField(null=False)
