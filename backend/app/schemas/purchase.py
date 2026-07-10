from pydantic import BaseModel
from typing import List
from datetime import datetime


class PurchaseItemCreate(BaseModel):
    product_id: int
    quantity: int
    purchase_price: float


class PurchaseCreate(BaseModel):
    supplier_id: int
    items: List[PurchaseItemCreate]


class PurchaseItemResponse(BaseModel):
    id: int
    product_id: int
    quantity: int
    purchase_price: float
    subtotal: float

    class Config:
        from_attributes = True


class PurchaseResponse(BaseModel):
    id: int
    supplier_id: int
    purchase_date: datetime
    total_amount: float
    items: List[PurchaseItemResponse]

    class Config:
        from_attributes = True