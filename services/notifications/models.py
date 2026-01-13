from sqlalchemy import Column, String, Text
from rootpulse_core.models.base import BaseRootPulseModel

class Notification(BaseRootPulseModel):
    __tablename__ = 'notifications'
    
    user_id = Column(String(255), nullable=False)
    title = Column(String(255))
    message = Column(Text, nullable=False)
    status = Column(String(50), default="unread")

    def __repr__(self):
        return f"<Notification to {self.user_id}>"
