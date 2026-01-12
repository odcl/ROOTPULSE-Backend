FROM python:3.11-slim as builder
WORKDIR /app
RUN apt-get update && apt-get install -y --no-install-recommends build-essential libpq-dev && rm -rf /var/lib/apt/lists/*
COPY requirements.txt .
RUN pip install --no-cache-dir --prefix=/install -r requirements.txt
COPY packages/rootpulse-core /app/packages/rootpulse-core
RUN pip install --no-cache-dir --prefix=/install /app/packages/rootpulse-core

FROM python:3.11-slim
WORKDIR /app
RUN apt-get update && apt-get install -y --no-install-recommends libpq5 && rm -rf /var/lib/apt/lists/*
COPY --from=builder /install /usr/local
COPY services/chat /app/services/chat
ENV PYTHONPATH=/app
CMD ["gunicorn", "-c", "services/chat/gunicorn_conf.py", "services.chat.main:app"]
