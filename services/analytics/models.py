from sqlalchemy import Column, String, DateTime, ForeignKey, Text, Enum as SQLEnum
from sqlalchemy.dialects.postgresql import JSONB, UUID as PG_UUID
from rootpulse_core.models.base import BaseRootPulseModel
import datetime
import enum
import uuid

class EventCategory(str, enum.Enum):
    UX = "ux"              # Button clicks, scrolls, UI navigation
    BUSINESS = "business"   # Purchases, cart actions, signups
    SYSTEM = "system"       # API health, latency, internal calls
    SECURITY = "security"   # Login attempts, permission failures

class AnalyticsEvent(BaseRootPulseModel):
    __tablename__ = 'analytics_events'
    
    # Context Identifiers
    user_id = Column(PG_UUID(as_uuid=True), nullable=True, index=True)
    guest_id = Column(String(100), nullable=True, index=True) # Browser Fingerprint or Session ID
    session_id = Column(String(100), nullable=True, index=True)
    
    # Event Data
    event_name = Column(String(100), nullable=False, index=True) # e.g. "VIEW_PRODUCT"
    category = Column(SQLEnum(EventCategory), default=EventCategory.UX)
    
    # Technical Context
    path = Column(String(500), nullable=True)     # Which page or API?
    method = Column(String(10), nullable=True)    # GET, POST, etc (if API)
    status_code = Column(String(5), nullable=True) # 200, 404, etc
    
    # Payload & Insight
    metadata_json = Column(JSONB, default={}, nullable=False) # { price: 500, product_id: "X", duration_ms: 250 }
    
    # Client Context
    ip_address = Column(String(45), nullable=True)
    user_agent = Column(Text, nullable=True)
    referer = Column(String(500), nullable=True)
    
    timestamp = Column(DateTime, default=datetime.datetime.utcnow, index=True)

    def __repr__(self):
        return f"<AnalyticsEvent {self.event_name} by {self.user_id or self.guest_id}>"
