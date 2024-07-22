#!/bin/sh

echo "Migrations..."
python manage.py makemigrations
python manage.py migrate --no-input

echo "Start server..."
gunicorn backend.wsgi:application --bind 0.0.0.0:8000


