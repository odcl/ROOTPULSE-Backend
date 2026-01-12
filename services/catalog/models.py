from sqlalchemy import Column, String, Float, Text, ForeignKey
from sqlalchemy.orm import relationship
from rootpulse_core.models.base import BaseRootPulseModel

class Product(BaseRootPulseModel):
    __tablename__ = 'products'
    
    name = Column(String(255), nullable=False)
    slug = Column(String(255), unique=True, nullable=False)
    description = Column(Text, nullable=True)
    price = Column(Float, nullable=False)
    sku = Column(String(100), unique=True, nullable=False)

    def __repr__(self):
        return f"<Product {self.name}>"
