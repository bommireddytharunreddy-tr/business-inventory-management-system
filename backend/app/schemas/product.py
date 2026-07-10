from pydantic import BaseModel, Field
from typing import Optional


class ProductBase(BaseModel):
    name: str = Field(..., min_length=2, max_length=100)

    purchase_price: float = Field(..., gt=0)
    selling_price: float = Field(..., gt=0)

    stock: int = Field(..., ge=0)
    minimum_stock: int = Field(..., ge=0)

    image: Optional[str] = None
    brand: str = Field(..., min_length=2, max_length=100)

    category_id: int


class ProductCreate(ProductBase):
    pass


class ProductUpdate(ProductBase):
    pass


class ProductResponse(ProductBase):
    id: int

    class Config:
        from_attributes = True