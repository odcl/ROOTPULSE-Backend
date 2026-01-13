FROM rootpulse-base AS builder
WORKDIR /app

FROM python:3.11-slim
WORKDIR /app
RUN apt-get update && apt-get install -y --no-install-recommends libpq5 && rm -rf /var/lib/apt/lists/*
COPY --from=builder /usr/local /usr/local
COPY services/analytics /app/services/analytics
ENV PYTHONPATH=/app
CMD ["gunicorn", "-c", "services/analytics/gunicorn_conf.py", "services.analytics.main:app"]
