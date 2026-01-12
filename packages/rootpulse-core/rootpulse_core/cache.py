import os
import logging
from redis.cluster import RedisCluster
from redis.asyncio import Redis
import json

logger = logging.getLogger(__name__)

class RedisCache:
    """
    Standardized Redis integration for RootPulse.
    Supports Cluster mode for HA and horizontal scaling.
    Includes helpers for Streams (Producer/Consumer).
    """

    def __init__(self, host=None, port=None):
        self.host = host or os.getenv("REDIS_HOST", "localhost")
        self.port = int(port or os.getenv("REDIS_PORT", "6379"))
        self.use_cluster = os.getenv("REDIS_CLUSTER_ENABLED", "false").lower() == "true"
        self._client = None

    def get_client(self):
        if self._client is None:
            if self.use_cluster:
                startup_nodes = [{"host": self.host, "port": self.port}]
                self._client = RedisCluster(startup_nodes=startup_nodes, decode_responses=True)
                logger.info(f"Connected to Redis Cluster at {self.host}:{self.port}")
            else:
                self._client = Redis(host=self.host, port=self.port, decode_responses=True)
                logger.info(f"Connected to standalone Redis at {self.host}:{self.port}")
        return self._client

    # --- Streams Support (Producer) ---
    async def xadd(self, stream_name, data, maxlen=10000):
        """
        Produce an event to a Redis Stream.
        """
        client = self.get_client()
        # Ensure data is a flat dict of strings for Redis Stream
        flat_data = {k: str(v) for k, v in data.items()}
        return await client.xadd(name=stream_name, fields=flat_data, maxlen=maxlen, approximate=True)

    # --- Streams Support (Consumer) ---
    async def xread_group(self, group_name, consumer_name, streams, count=1, block=5000):
        """
        Consume events from a Redis Stream using a Consumer Group.
        Ideal for "crore traffic" async processing with horizontal workers.
        """
        client = self.get_client()
        try:
            return await client.xreadgroup(groupname=group_name, consumername=consumer_name, streams=streams, count=count, block=block)
        except Exception as e:
            logger.error(f"Error reading from stream group: {str(e)}")
            return None

    # --- Session & Cache Helpers ---
    async def set_value(self, key, value, ex=None):
        client = self.get_client()
        return await client.set(key, json.dumps(value), ex=ex)

    async def get_value(self, key):
        client = self.get_client()
        val = await client.get(key)
        return json.loads(val) if val else None

# Singleton instance
cache = RedisCache()
