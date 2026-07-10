from sqlalchemy.orm import Session

from app.models.sale import Sale
from app.models.sale_item import SaleItem
from app.models.product import Product

from app.schemas.sale import SaleCreate


def get_all_sales(db: Session):
    return db.query(Sale).all()


def get_sale_by_id(db: Session, sale_id: int):
    return db.query(Sale).filter(
        Sale.id == sale_id
    ).first()


def create_sale(db: Session, sale: SaleCreate):

    new_sale = Sale(
        customer_id=sale.customer_id,
        total_amount=0
    )

    db.add(new_sale)
    db.commit()
    db.refresh(new_sale)

    total_amount = 0

    for item in sale.items:

        product = db.query(Product).filter(
            Product.id == item.product_id
        ).first()

        if product is None:
            continue

        # Check stock availability
        if product.stock < item.quantity:
            continue

        subtotal = item.quantity * item.selling_price

        sale_item = SaleItem(
            sale_id=new_sale.id,
            product_id=item.product_id,
            quantity=item.quantity,
            selling_price=item.selling_price,
            subtotal=subtotal
        )

        db.add(sale_item)

        # Reduce Stock
        product.stock -= item.quantity

        total_amount += subtotal

    new_sale.total_amount = total_amount

    db.commit()
    db.refresh(new_sale)

    return {
        "message": "Sale created successfully",
        "sale": new_sale
    }


def delete_sale(db: Session, sale_id: int):

    sale = db.query(Sale).filter(
        Sale.id == sale_id
    ).first()

    if sale is None:
        return None

    db.delete(sale)
    db.commit()

    return True