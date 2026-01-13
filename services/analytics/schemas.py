from pydantic import BaseModel, Field
from typing import Optional, Dict, Any
from uuid import UUID
from datetime import datetime
from .models import EventCategory

class EventIngest(BaseModel):
    event_name: str = Field(..., example="VIEW_PRODUCT")
    category: EventCategory = Field(default=EventCategory.UX)
    user_id: Optional[UUID] = None
    guest_id: Optional[str] = Field(None, example="anon_session_123")
    session_id: Optional[str] = None
    path: Optional[str] = None
    metadata_json: Dict[str, Any] = Field(default={}, example={"product_id": "laptop-01", "price": 1200})
    referer: Optional[str] = None

class EventResponse(BaseModel):
    id: UUID
    event_name: str
    timestamp: datetime
    
    class Config:
        from_attributes = True
