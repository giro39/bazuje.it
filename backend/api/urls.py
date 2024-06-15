from django.urls import path
from . import views


urlpatterns = [
    path('', views.getRoutes, name="routes"),
    path('DVD/', views.getDVDs, name="DVDs"),
    path('DVD/<str:pk>', views.getDVD, name="DVD"),
    path('movie/', views.getMovies, name="movies"),
    path('movie/<str:pk>', views.getMovie, name="movie"),
    path('rent/', views.rentMovie, name="rent"),
    path('return/', views.returnMovie, name="return"),
]