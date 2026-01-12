# Build stage
FROM python:3.11-slim as builder

WORKDIR /app

# Install build dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*

# Copy root requirements and install
COPY requirements.txt .
RUN pip install --no-cache-dir --prefix=/install -r requirements.txt

# Copy core package and install it
COPY packages/rootpulse-core /app/packages/rootpulse-core
RUN pip install --no-cache-dir --prefix=/install /app/packages/rootpulse-core

# Runtime stage
FROM python:3.11-slim

WORKDIR /app

# Install runtime dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
    libpq5 \
    && rm -rf /var/lib/apt/lists/*

# Copy installed packages from builder
COPY --from=builder /install /usr/local

# Copy application code
COPY services/iam /app/services/iam

# Use Gunicorn as the process manager
ENV PYTHONPATH=/app
CMD ["gunicorn", "-c", "services/iam/gunicorn_conf.py", "services.iam.main:app"]
