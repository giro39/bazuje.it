from django.urls import path
from . import views


urlpatterns = [
    path("bestkierunki/", views.getBestKierunki, name="bestKierunki"),
    path("wynikquizu/", views.wynikQuizu, name="wynikQuizu"),
]
