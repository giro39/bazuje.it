FROM python:3.9.6-slim-buster


RUN pip install --upgrade pip


COPY requirements.txt /app/requirements.txt
RUN pip install -r /app/requirements.txt


COPY . /app
WORKDIR /app

RUN chmod +x /app/entrypoint.sh

ENV PYTHONUNBUFFERED=1

EXPOSE 8000

ENTRYPOINT ["sh", "/app/entrypoint.sh"]

