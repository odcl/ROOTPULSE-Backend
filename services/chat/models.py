from sqlalchemy import Column, String, Text, ForeignKey
from rootpulse_core.models.base import BaseRootPulseModel

class Message(BaseRootPulseModel):
    __tablename__ = 'messages'
    
    sender_id = Column(String(255), nullable=False)
    recipient_id = Column(String(255), nullable=False)
    content = Column(Text, nullable=False)

    def __repr__(self):
        return f"<Message from {self.sender_id}>"
