from django.contrib import admin
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
    OcenaOpiniiKierunku,
)

# Register your models here.


admin.site.register(Miasto)
admin.site.register(Rodzaj)
admin.site.register(Uczelnia)
admin.site.register(Wydzial)
admin.site.register(Kierunek)
admin.site.register(Przedmiot)
admin.site.register(OpiniaKierunek)
admin.site.register(OpiniaPrzedmiot)
admin.site.register(OpiniaUczelnia)
admin.site.register(OcenaOpiniiKierunku)
