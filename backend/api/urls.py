from django.urls import path
from . import views


urlpatterns = [
    path("best_kierunki/", views.getBestKierunki, name="bestKierunki"),
    path("submit_categories/", views.wynikQuizu),
]
