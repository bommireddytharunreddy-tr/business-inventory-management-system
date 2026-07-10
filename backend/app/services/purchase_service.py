from sqlalchemy.orm import Session

from app.models.purchase import Purchase
from app.models.purchase_item import PurchaseItem
from app.models.product import Product

from app.schemas.purchase import PurchaseCreate


def get_all_purchases(db: Session):
    return db.query(Purchase).all()


def get_purchase_by_id(db: Session, purchase_id: int):
    return (
        db.query(Purchase)
        .filter(Purchase.id == purchase_id)
        .first()
    )


def create_purchase(db: Session, purchase: PurchaseCreate):

    new_purchase = Purchase(
        supplier_id=purchase.supplier_id,
        total_amount=0
    )

    db.add(new_purchase)
    db.commit()
    db.refresh(new_purchase)

    total_amount = 0

    for item in purchase.items:

        product = (
            db.query(Product)
            .filter(Product.id == item.product_id)
            .first()
        )

        if product is None:
            continue

        subtotal = item.quantity * item.purchase_price

        purchase_item = PurchaseItem(
            purchase_id=new_purchase.id,
            product_id=item.product_id,
            quantity=item.quantity,
            purchase_price=item.purchase_price,
            subtotal=subtotal
        )

        db.add(purchase_item)

        # Increase Stock
        product.stock += item.quantity

        total_amount += subtotal

    new_purchase.total_amount = total_amount

    db.commit()
    db.refresh(new_purchase)

    return {
        "message": "Purchase created successfully",
        "purchase": new_purchase
    }


def delete_purchase(db: Session, purchase_id: int):

    purchase = (
        db.query(Purchase)
        .filter(Purchase.id == purchase_id)
        .first()
    )

    if purchase is None:
        return None

    db.delete(purchase)
    db.commit()

    return True