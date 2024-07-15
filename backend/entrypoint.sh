#!/bin/sh

echo "Migrations..."
python manage.py makemigrations --no-input
python manage.py migrate 


echo "Starting server..."
gunicorn backend.wsgi:application --bind 0.0.0.0:8000
