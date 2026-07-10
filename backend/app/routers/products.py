from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.databases.connection import get_db
from app.schemas.product import ProductCreate, ProductUpdate
from app.services import product_service
from app.utils.jwt_handler import verify_token

router = APIRouter(
    prefix="/products",
    tags=["Products"]
)


# Get all products with pagination
@router.get("/")
def get_products(
    page: int = 1,
    limit: int = 10,
    db: Session = Depends(get_db)
):
    products = product_service.get_all_products(db, page, limit)

    return {
        "page": page,
        "limit": limit,
        "products": products
    }


# Search products by name
@router.get("/search")
def search_products(
    name: str,
    db: Session = Depends(get_db)
):
    return product_service.search_products(db, name)


# Get product by ID
@router.get("/{product_id}")
def get_product(
    product_id: int,
    db: Session = Depends(get_db)
):
    product = product_service.get_product_by_id(db, product_id)

    if product is None:
        raise HTTPException(
            status_code=404,
            detail="Product not found"
        )

    return product


# Create product (Protected)
@router.post("/")
def create_product(
    product: ProductCreate,
    db: Session = Depends(get_db),
    user=Depends(verify_token)
):
    return product_service.create_product(db, product)


# Update product (Protected)
@router.put("/{product_id}")
def update_product(
    product_id: int,
    product: ProductUpdate,
    db: Session = Depends(get_db),
    user=Depends(verify_token)
):
    updated_product = product_service.update_product(
        db,
        product_id,
        product
    )

    if updated_product is None:
        raise HTTPException(
            status_code=404,
            detail="Product not found"
        )

    return {
        "message": "Product updated successfully",
        "product": updated_product
    }


# Delete product (Protected)
@router.delete("/{product_id}")
def delete_product(
    product_id: int,
    db: Session = Depends(get_db),
    user=Depends(verify_token)
):
    deleted = product_service.delete_product(db, product_id)

    if deleted is None:
        raise HTTPException(
            status_code=404,
            detail="Product not found"
        )

    return {
        "message": "Product deleted successfully"
    }