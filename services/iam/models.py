from sqlalchemy import Column, String, Boolean, DateTime, ForeignKey, Text
from sqlalchemy.orm import relationship
from rootpulse_core.models.base import BaseRootPulseModel
import datetime

class User(BaseRootPulseModel):
    __tablename__ = 'users'
    # In Citus, tables are distributed by a reference column. 
    # For the users table, 'id' is the logical partition key (distribution key).

    username = Column(String(150), unique=True, nullable=False)
    first_name = Column(String(150))
    last_name = Column(String(150))
    email = Column(String(254), unique=True)
    password = Column(String(128), nullable=False)
    phone = Column(String(20), unique=True, nullable=True)
    is_staff = Column(Boolean, default=False)
    is_superuser = Column(Boolean, default=False)
    
    is_banned = Column(Boolean, default=False)
    banned_at = Column(DateTime, nullable=True)
    banned_reason = Column(Text, nullable=True)
    email_verified_at = Column(DateTime, nullable=True)
    phone_verified_at = Column(DateTime, nullable=True)
    preferred_language = Column(String(10), default='en')
    timezone = Column(String(50), default='UTC')
    referral_code = Column(String(50), unique=True, nullable=True)
    
    referred_by_id = Column(ForeignKey('users.id'), nullable=True)
    referrals = relationship("User", back_populates="referred_by", remote_side="User.id")
    referred_by = relationship("User", remote_side="User.id", back_populates="referrals")

    def __repr__(self):
        return f"<User {self.username or self.email}>"
