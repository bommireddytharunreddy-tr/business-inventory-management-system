from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func

from app.databases.connection import get_db

from app.models.sale import Sale
from app.models.purchase import Purchase
from app.models.product import Product

router = APIRouter(
    prefix="/reports",
    tags=["Reports"]
)


@router.get("/summary")
def report_summary(db: Session = Depends(get_db)):

    total_sales = db.query(
        func.coalesce(func.sum(Sale.total_amount), 0)
    ).scalar()

    total_purchases = db.query(
        func.coalesce(func.sum(Purchase.total_amount), 0)
    ).scalar()

    total_products = db.query(Product).count()

    low_stock = db.query(Product).filter(
        Product.stock <= Product.minimum_stock
    ).count()

    return {
        "sales_amount": float(total_sales),
        "purchase_amount": float(total_purchases),
        "products": total_products,
        "low_stock": low_stock
    }


@router.get("/sales")
def sales_report(db: Session = Depends(get_db)):
    return db.query(Sale).order_by(Sale.id.desc()).all()


@router.get("/purchases")
def purchases_report(db: Session = Depends(get_db)):
    return db.query(Purchase).order_by(Purchase.id.desc()).all()


@router.get("/stock")
def stock_report(db: Session = Depends(get_db)):
    return db.query(Product).order_by(Product.name).all()


@router.get("/low-stock")
def low_stock_report(db: Session = Depends(get_db)):
    return db.query(Product).filter(
        Product.stock <= Product.minimum_stock
    ).all()