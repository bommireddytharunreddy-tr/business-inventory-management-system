from pydantic import BaseModel
from typing import List
from datetime import datetime


class SaleItemCreate(BaseModel):
    product_id: int
    quantity: int
    selling_price: float


class SaleCreate(BaseModel):
    customer_id: int
    items: List[SaleItemCreate]


class SaleItemResponse(BaseModel):
    id: int
    product_id: int
    quantity: int
    selling_price: float
    subtotal: float

    class Config:
        from_attributes = True


class SaleResponse(BaseModel):
    id: int
    customer_id: int
    sale_date: datetime
    total_amount: float
    items: List[SaleItemResponse]

    class Config:
        from_attributes = True