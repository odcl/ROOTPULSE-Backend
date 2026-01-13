import multiprocessing
import os

# Gunicorn configuration for FastAPI / Uvicorn
bind = os.getenv("BIND", "0.0.0.0:8000")
worker_class = "uvicorn.workers.UvicornWorker"

# Worker calculation logic:
# 2 vCPU → 3–4 workers
# 4 vCPU → 6 workers
cpu_count = multiprocessing.cpu_count()
workers_per_core = float(os.getenv("WORKERS_PER_CORE", "1.5"))
default_workers = int(cpu_count * workers_per_core) + 1

# Apply user specific logic if environment variable is set or use defaults
if cpu_count <= 2:
    workers = int(os.getenv("WEB_CONCURRENCY", "4"))
elif cpu_count <= 4:
    workers = int(os.getenv("WEB_CONCURRENCY", "6"))
else:
    workers = int(os.getenv("WEB_CONCURRENCY", str(default_workers)))

# Logging
accesslog = os.getenv("ACCESS_LOG", "-")
errorlog = os.getenv("ERROR_LOG", "-")
loglevel = os.getenv("LOG_LEVEL", "info")

# Performance & Stateless Design
keepalive = 5
timeout = 30
graceful_timeout = 30

# Max requests to prevent memory leaks in stateless environments
max_requests = 1000
max_requests_jitter = 50
