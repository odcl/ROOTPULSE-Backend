import os
import logging
import httpx
import json
import hashlib
from typing import Optional, Dict, Any
from .cache import cache

logger = logging.getLogger(__name__)

class AIService:
    """
    Standardized AI integration for RootPulse using Ollama (Phi-3).
    Supports:
    - Dedicated GPU execution
    - Redis-based response caching
    - On-demand and Batch inference via Redis Streams
    """

    def __init__(self, host=None, model="phi3"):
        self.host = host or os.getenv("OLLAMA_HOST", "http://localhost:11434")
        self.model = model
        self.cache_enabled = os.getenv("AI_CACHE_ENABLED", "true").lower() == "true"
        self.cache_ttl = int(os.getenv("AI_CACHE_TTL", "86400"))  # 24 hours

    def _generate_cache_key(self, prompt: str) -> str:
        return f"ai_cache:{hashlib.md5(prompt.encode()).hexdigest()}"

    async def generate(self, prompt: str, system: Optional[str] = None) -> str:
        """
        On-demand inference with caching.
        """
        cache_key = self._generate_cache_key(prompt)
        
        # 1. Check Cache
        if self.cache_enabled:
            cached_response = await cache.get_value(cache_key)
            if cached_response:
                logger.info("Serving AI response from cache")
                return cached_response

        # 2. Call Ollama API
        async with httpx.AsyncClient(timeout=60.0) as client:
            payload = {
                "model": self.model,
                "prompt": prompt,
                "stream": False
            }
            if system:
                payload["system"] = system

            try:
                response = await client.post(f"{self.host}/api/generate", json=payload)
                response.raise_for_status()
                data = response.json()
                ai_text = data.get("response", "")

                # 3. Cache the result
                if self.cache_enabled and ai_text:
                    await cache.set_value(cache_key, ai_text, ex=self.cache_ttl)

                return ai_text
            except Exception as e:
                logger.error(f"Ollama API error: {str(e)}")
                return "Error generating AI response."

    async def enqueue_batch(self, stream_name: str, prompt: str, priority: int = 0):
        """
        Batch inference queueing using Redis Streams.
        """
        data = {
            "prompt": prompt,
            "priority": priority,
            "status": "pending"
        }
        return await cache.xadd(stream_name, data)

# Singleton instance
ai_service = AIService()
