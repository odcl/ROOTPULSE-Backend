# Build stage
FROM rootpulse-base AS builder

WORKDIR /app

# (Dependencies already in base)

# Runtime stage
FROM python:3.11-slim

WORKDIR /app

# Install runtime dependencies (minimal)
RUN apt-get update && apt-get install -y --no-install-recommends \
    libpq5 \
    && rm -rf /var/lib/apt/lists/*

# Copy installed packages from builder (which are in /usr/local in base)
COPY --from=builder /usr/local /usr/local


# Copy application code
COPY services/iam /app/services/iam

# Use Gunicorn as the process manager
ENV PYTHONPATH=/app
CMD ["gunicorn", "-c", "services/iam/gunicorn_conf.py", "services.iam.main:app"]
