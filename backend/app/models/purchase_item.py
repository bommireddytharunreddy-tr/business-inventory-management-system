from sqlalchemy import Column, Integer, Float, ForeignKey
from sqlalchemy.orm import relationship

from app.databases.connection import Base


class PurchaseItem(Base):
    __tablename__ = "purchase_items"

    id = Column(Integer, primary_key=True, index=True)

    purchase_id = Column(
        Integer,
        ForeignKey("purchases.id")
    )

    product_id = Column(
        Integer,
        ForeignKey("products.id")
    )

    quantity = Column(Integer, nullable=False)

    purchase_price = Column(Float, nullable=False)

    subtotal = Column(Float, nullable=False)

    purchase = relationship(
        "Purchase",
        back_populates="items"
    )

    product = relationship("Product")