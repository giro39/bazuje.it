from django.db import models
from django.contrib.auth.models import User


# Create your models here.
class Statuses(models.IntegerChoices):
    RETURNED = 1, "RETURNED"
    RENTED = 2, "RENTED"

class Categories(models.IntegerChoices):
    COMEDY = 1, "COMEDY"
    DRAMA = 2, "DRAMA"

class Movie(models.Model):
    title = models.CharField(max_length=50)
    description = models.TextField(blank=True)
    publish_date = models.IntegerField()
    category = models.IntegerField(choices=Categories.choices, null = True)

class DVD(models.Model):
    movie = models.ForeignKey(Movie, on_delete=models.CASCADE)
    status = models.IntegerField(choices=Statuses.choices, default = 1)
    renter = models.ForeignKey(User, on_delete=models.SET_NULL, blank=True, null=True)

class Event(models.Model):
    status = models.IntegerField(choices=Statuses.choices)
    time = models.DateTimeField(auto_now_add=True, db_index=True)
    DVD = models.ForeignKey(DVD, on_delete=models.SET_NULL, blank=True, null=True)
    renter = models.ForeignKey(User, on_delete=models.SET_NULL, blank=True, null=True)