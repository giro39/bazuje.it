from django.urls import path
from . import views

urlpatterns = [
    path("best_kierunki/", views.getBestKierunki, name="bestKierunki"),
    path("submit_categories/", views.wynikQuizu),
    path("get_username/", views.getUsername),
    path("best_opinia/", views.getBestOpinia),
    path("chosen_kierunek/", views.getChosenKierunek),
    path("all_majors/", views.getAllMajors),
    path("all_unis/", views.getAllUnis),
    path("all_opinions/", views.getAllOpinions),
    path("vote/", views.vote_opinia_kierunek, name="voteOpiniaKierunek"),
    path('dodaj_opinie/', views.addOpiniaKierunek),
    path('edytuj_opinie/', views.editOpiniaKierunek),
    path('usun_opinie/<str:id>', views.deleteOpiniaKierunek),
]
