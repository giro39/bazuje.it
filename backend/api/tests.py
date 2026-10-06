from django.contrib.auth.models import User
from rest_framework import status
from rest_framework.test import APITestCase

from .models import Kierunek, Miasto, OpiniaKierunek, Rodzaj, Uczelnia, Wydzial


class AuthTests(APITestCase):
    def test_register_user(self):
        response = self.client.post(
            "/api/user/register/",
            {"username": "nowy_student", "password": "bardzoTrudneHaslo123"},
        )
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertTrue(User.objects.filter(username="nowy_student").exists())

    def test_login_returns_tokens(self):
        User.objects.create_user(username="jankowalski", password="bardzoTrudneHaslo123")

        response = self.client.post(
            "/api/token/",
            {"username": "jankowalski", "password": "bardzoTrudneHaslo123"},
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn("access", response.data)
        self.assertIn("refresh", response.data)

    def test_login_with_wrong_password_is_rejected(self):
        User.objects.create_user(username="jankowalski", password="bardzoTrudneHaslo123")

        response = self.client.post(
            "/api/token/",
            {"username": "jankowalski", "password": "zlehaslo"},
        )
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)


class OpiniaKierunekTests(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(username="student1", password="bardzoTrudneHaslo123")
        miasto = Miasto.objects.create(nazwa="Poznan")
        rodzaj = Rodzaj.objects.create(nazwa="Publiczna")
        uczelnia = Uczelnia.objects.create(Miasto=miasto, Rodzaj=rodzaj, nazwa="Politechnika Poznanska")
        wydzial = Wydzial.objects.create(uczelnia=uczelnia, nazwa="Wydzial Informatyki")
        self.kierunek = Kierunek.objects.create(wydzial=wydzial, nazwa="Informatyka")

    def test_add_opinion(self):
        response = self.client.post(
            "/api/dodaj_opinie/",
            {
                "kierunek": self.kierunek.id,
                "user": self.user.id,
                "ocena": 90,
                "opis": "Bardzo dobry kierunek",
            },
        )
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(OpiniaKierunek.objects.count(), 1)

    def test_cannot_add_second_opinion_for_same_major(self):
        OpiniaKierunek.objects.create(
            kierunek=self.kierunek, user=self.user, ocena=80, opis="Pierwsza opinia"
        )

        response = self.client.post(
            "/api/dodaj_opinie/",
            {
                "kierunek": self.kierunek.id,
                "user": self.user.id,
                "ocena": 70,
                "opis": "Druga opinia",
            },
        )
        self.assertEqual(response.status_code, status.HTTP_409_CONFLICT)
        self.assertEqual(OpiniaKierunek.objects.count(), 1)

    def test_edit_opinion(self):
        opinia = OpiniaKierunek.objects.create(
            kierunek=self.kierunek, user=self.user, ocena=60, opis="Opinia do edycji"
        )

        response = self.client.put(
            f"/api/edytuj_opinie/{opinia.id}",
            {"ocena": 95, "opis": "Zaktualizowana opinia"},
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        opinia.refresh_from_db()
        self.assertEqual(opinia.ocena, 95)
        self.assertTrue(opinia.edytowana)

    def test_delete_opinion(self):
        opinia = OpiniaKierunek.objects.create(
            kierunek=self.kierunek, user=self.user, ocena=60, opis="Opinia do usuniecia"
        )

        response = self.client.delete(f"/api/usun_opinie/{opinia.id}")
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertFalse(OpiniaKierunek.objects.filter(id=opinia.id).exists())

    def test_has_opinion_detects_existing_opinion(self):
        OpiniaKierunek.objects.create(
            kierunek=self.kierunek, user=self.user, ocena=60, opis="Jakas opinia"
        )

        response = self.client.post(
            "/api/has_opinion/",
            {"userId": self.user.id, "majorId": self.kierunek.id},
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue(response.data["exists"])


class VoteOpiniaKierunekTests(APITestCase):
    def setUp(self):
        self.author = User.objects.create_user(username="autor", password="bardzoTrudneHaslo123")
        self.voter = User.objects.create_user(username="glosujacy", password="bardzoTrudneHaslo123")
        miasto = Miasto.objects.create(nazwa="Warszawa")
        rodzaj = Rodzaj.objects.create(nazwa="Publiczna")
        uczelnia = Uczelnia.objects.create(Miasto=miasto, Rodzaj=rodzaj, nazwa="Politechnika Warszawska")
        wydzial = Wydzial.objects.create(uczelnia=uczelnia, nazwa="Wydzial Informatyki")
        kierunek = Kierunek.objects.create(wydzial=wydzial, nazwa="Informatyka")
        self.opinia = OpiniaKierunek.objects.create(
            kierunek=kierunek, user=self.author, ocena=85, opis="Super kierunek"
        )

    def test_add_vote(self):
        response = self.client.post(
            "/api/vote/",
            {"userId": self.voter.id, "opinionId": self.opinia.id, "grade": 1},
            format="json",
        )
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_remove_vote_when_voting_same_value_twice(self):
        self.client.post(
            "/api/vote/",
            {"userId": self.voter.id, "opinionId": self.opinia.id, "grade": 1},
            format="json",
        )

        response = self.client.post(
            "/api/vote/",
            {"userId": self.voter.id, "opinionId": self.opinia.id, "grade": 1},
            format="json",
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["message"], "Vote removed")


class MajorListingTests(APITestCase):
    def setUp(self):
        miasto = Miasto.objects.create(nazwa="Gdansk")
        rodzaj = Rodzaj.objects.create(nazwa="Publiczna")
        uczelnia = Uczelnia.objects.create(Miasto=miasto, Rodzaj=rodzaj, nazwa="Politechnika Gdanska")
        wydzial = Wydzial.objects.create(uczelnia=uczelnia, nazwa="Wydzial Informatyki")
        Kierunek.objects.create(wydzial=wydzial, nazwa="Informatyka")

    def test_all_majors_returns_created_major(self):
        response = self.client.get("/api/all_majors/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]["majorName"], "Informatyka")

    def test_all_unis_returns_created_university(self):
        response = self.client.get("/api/all_unis/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]["universityName"], "Politechnika Gdanska")

    def test_best_kierunki_returns_empty_without_opinions(self):
        response = self.client.get("/api/best_kierunki/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data[0]["sredniaOcen"], 0)
