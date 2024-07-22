FROM python:3.9.6-slim-buster


RUN pip install --upgrade pip


COPY requirements.txt /django/requirements.txt
RUN pip install -r /django/requirements.txt


COPY . /django
WORKDIR /django

RUN chmod +x /django/entrypoint.sh

ENV PYTHONUNBUFFERED=1

EXPOSE 8000

ENTRYPOINT ["sh", "/django/entrypoint.sh"]