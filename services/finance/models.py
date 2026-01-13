from sqlalchemy import Column, String, Float, ForeignKey, DateTime
from rootpulse_core.models.base import BaseRootPulseModel
import datetime

class Transaction(BaseRootPulseModel):
    __tablename__ = 'transactions'
    
    user_id = Column(String(255), nullable=False)
    amount = Column(Float, nullable=False)
    currency = Column(String(10), default="USD")
    status = Column(String(50), default="pending")
    transaction_type = Column(String(50)) # e.g., credit, debit

    def __repr__(self):
        return f"<Transaction {self.id} - {self.status}>"
