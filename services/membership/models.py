from sqlalchemy import Column, String, ForeignKey, DateTime
from rootpulse_core.models.base import BaseRootPulseModel

class Subscription(BaseRootPulseModel):
    __tablename__ = 'subscriptions'
    
    user_id = Column(String(255), nullable=False)
    plan_id = Column(String(100), nullable=False)
    status = Column(String(50), default="active")

    def __repr__(self):
        return f"<Subscription {self.user_id} - {self.plan_id}>"
