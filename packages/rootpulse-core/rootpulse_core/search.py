import os
import logging
import meilisearch
from typing import List, Dict, Any

logger = logging.getLogger(__name__)

class MeilisearchService:
    """
    Standardized Meilisearch integration for RootPulse.
    Provides <50ms search latency and async sync helpers.
    """

    def __init__(self, url=None, api_key=None):
        self.url = url or os.getenv("MEILI_URL", "http://localhost:7700")
        self.api_key = api_key or os.getenv("MEILI_MASTER_KEY", "master_key")
        self._client = None

    @property
    def client(self):
        if self._client is None:
            self._client = meilisearch.Client(self.url, self.api_key)
            logger.info(f"Connected to Meilisearch at {self.url}")
        return self._client

    async def search(self, index_name: str, query: str, options: Dict[str, Any] = None) -> Dict[str, Any]:
        """
        Perform a search on a specific index.
        """
        return self.client.index(index_name).search(query, options or {})

    async def add_documents(self, index_name: str, documents: List[Dict[str, Any]]):
        """
        Add or update documents in a specific index.
        Used for background sync from PostgreSQL.
        """
        return self.client.index(index_name).add_documents(documents)

    async def update_settings(self, index_name: str, settings: Dict[str, Any]):
        """
        Update index settings (sortable, filterable attributes, etc.)
        """
        return self.client.index(index_name).update_settings(settings)

    async def delete_index(self, index_name: str):
        return self.client.delete_index(index_name)

# Singleton instance
search_service = MeilisearchService()
