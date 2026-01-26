from sqlalchemy import Column, Integer, String
from app.models import Base

class Category(Base):
    __tablename__ = "category"
    __table_args__ = {"schema": "common"}  # <- important!

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), unique=True, nullable=False)
    description = Column(String(500))
