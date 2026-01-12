import os
import logging
import pybreaker

logger = logging.getLogger(__name__)

# Basic Circuit Breaker configuration
# In production, this can be backed by Redis
db_breaker = pybreaker.CircuitBreaker(
    fail_max=int(os.getenv("CB_FAIL_MAX", 5)),
    reset_timeout=int(os.getenv("CB_RESET_TIMEOUT", 60)),
    listeners=[pybreaker.LoggingBreakerListener(logger)]
)

def circuit_breaker(name="default"):
    """
    Decorator to wrap functions with a circuit breaker.
    """
    # For now, we use a single instance. In a world-class system,
    # we would use a registry of breakers.
    return db_breaker
