import os
import logging
import pybreaker

logger = logging.getLogger(__name__)

# Basic Circuit Breaker configuration
# In production, this can be backed by Redis
# Handle different pybreaker versions
try:
    listener = pybreaker.LoggingBreakerListener(logger)
except AttributeError:
    # Fallback or simplified listener if LoggingBreakerListener is missing
    class SimpleListener(pybreaker.CircuitBreakerListener):
        def state_change(self, breaker, old_state, new_state):
            logger.warning(f"Circuit Breaker {breaker.name} changed from {old_state} to {new_state}")
    listener = SimpleListener()

db_breaker = pybreaker.CircuitBreaker(
    fail_max=int(os.getenv("CB_FAIL_MAX", 5)),
    reset_timeout=int(os.getenv("CB_RESET_TIMEOUT", 60)),
    listeners=[listener]
)

def circuit_breaker(name="default"):
    """
    Decorator to wrap functions with a circuit breaker.
    """
    # For now, we use a single instance. In a world-class system,
    # we would use a registry of breakers.
    return db_breaker
