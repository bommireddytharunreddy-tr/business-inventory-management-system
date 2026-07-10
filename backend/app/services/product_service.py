from sqlalchemy.orm import Session
from app.models.product import Product
from app.schemas.product import ProductCreate, ProductUpdate


# Get all products with pagination
def get_all_products(
    db: Session,
    page: int = 1,
    limit: int = 10
):
    skip = (page - 1) * limit

    return (
        db.query(Product)
        .offset(skip)
        .limit(limit)
        .all()
    )


# Search products
def search_products(
    db: Session,
    name: str
):
    return (
        db.query(Product)
        .filter(Product.name.ilike(f"%{name}%"))
        .all()
    )


# Get product by ID
def get_product_by_id(
    db: Session,
    product_id: int
):
    return (
        db.query(Product)
        .filter(Product.id == product_id)
        .first()
    )


# Create product
def create_product(
    db: Session,
    product: ProductCreate
):
    new_product = Product(**product.model_dump())

    db.add(new_product)
    db.commit()
    db.refresh(new_product)

    return {
        "message": "Product added successfully",
        "product": new_product
    }


# Update product
def update_product(
    db: Session,
    product_id: int,
    product: ProductUpdate
):
    existing_product = (
        db.query(Product)
        .filter(Product.id == product_id)
        .first()
    )

    if not existing_product:
        return None

    for key, value in product.model_dump(exclude_unset=True).items():
        setattr(existing_product, key, value)

    db.commit()
    db.refresh(existing_product)

    return existing_product


# Delete product
def delete_product(
    db: Session,
    product_id: int
):
    product = (
        db.query(Product)
        .filter(Product.id == product_id)
        .first()
    )

    if not product:
        return None

    db.delete(product)
    db.commit()

    return True