from sqlalchemy import Column, Integer, String, Float, ForeignKey
from sqlalchemy.orm import relationship

from app.databases.connection import Base


class Product(Base):
    __tablename__ = "products"

    id = Column(Integer, primary_key=True, index=True)

    name = Column(String(100), nullable=False)

    purchase_price = Column(Float, nullable=False)
    selling_price = Column(Float, nullable=False)

    stock = Column(Integer, default=0)
    minimum_stock = Column(Integer, default=0)

    image = Column(String(255))
    brand = Column(String(100))

    category_id = Column(
        Integer,
        ForeignKey("categories.id"),
        nullable=False
    )

    category = relationship("Category")