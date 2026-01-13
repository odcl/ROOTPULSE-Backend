FROM rootpulse-base AS builder
WORKDIR /app

FROM python:3.11-slim
WORKDIR /app
RUN apt-get update && apt-get install -y --no-install-recommends libpq5 && rm -rf /var/lib/apt/lists/*
COPY --from=builder /usr/local /usr/local
COPY services/catalog /app/services/catalog
ENV PYTHONPATH=/app
CMD ["gunicorn", "-c", "services/catalog/gunicorn_conf.py", "services.catalog.main:app"]
