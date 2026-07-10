from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func, extract

from app.databases.connection import get_db

from app.models.product import Product
from app.models.category import Category
from app.models.supplier import Supplier
from app.models.customer import Customer
from app.models.purchase import Purchase
from app.models.sale import Sale

router = APIRouter(
    prefix="/dashboard",
    tags=["Dashboard"]
)


@router.get("/stats")
def dashboard_stats(db: Session = Depends(get_db)):

    total_products = db.query(Product).count()
    total_categories = db.query(Category).count()
    total_suppliers = db.query(Supplier).count()
    total_customers = db.query(Customer).count()
    total_purchases = db.query(Purchase).count()
    total_sales = db.query(Sale).count()

    purchase_amount = db.query(
        func.coalesce(func.sum(Purchase.total_amount), 0)
    ).scalar()

    sales_amount = db.query(
        func.coalesce(func.sum(Sale.total_amount), 0)
    ).scalar()

    low_stock_products = db.query(Product).filter(
        Product.stock <= Product.minimum_stock
    ).count()

    inventory_value = db.query(
        func.coalesce(
            func.sum(Product.stock * Product.purchase_price),
            0
        )
    ).scalar()

    return {
        "products": total_products,
        "categories": total_categories,
        "suppliers": total_suppliers,
        "customers": total_customers,
        "purchases": total_purchases,
        "sales": total_sales,
        "purchase_amount": float(purchase_amount),
        "sales_amount": float(sales_amount),
        "low_stock_products": low_stock_products,
        "inventory_value": float(inventory_value)
    }


@router.get("/monthly-sales")
def monthly_sales(db: Session = Depends(get_db)):

    results = (
        db.query(
            extract("month", Sale.sale_date).label("month"),
            func.sum(Sale.total_amount).label("total")
        )
        .group_by(extract("month", Sale.sale_date))
        .order_by(extract("month", Sale.sale_date))
        .all()
    )

    months = [
        "Jan", "Feb", "Mar", "Apr",
        "May", "Jun", "Jul", "Aug",
        "Sep", "Oct", "Nov", "Dec"
    ]

    data = []

    for row in results:

        data.append({

            "month": months[int(row.month) - 1],
            "sales": float(row.total)

        })

    return data


@router.get("/monthly-purchases")
def monthly_purchases(db: Session = Depends(get_db)):

    results = (
        db.query(
            extract("month", Purchase.purchase_date).label("month"),
            func.sum(Purchase.total_amount).label("total")
        )
        .group_by(extract("month", Purchase.purchase_date))
        .order_by(extract("month", Purchase.purchase_date))
        .all()
    )

    months = [
        "Jan", "Feb", "Mar", "Apr",
        "May", "Jun", "Jul", "Aug",
        "Sep", "Oct", "Nov", "Dec"
    ]

    data = []

    for row in results:

        data.append({

            "month": months[int(row.month) - 1],
            "purchases": float(row.total)

        })

    return data


@router.get("/low-stock")
def low_stock(db: Session = Depends(get_db)):

    products = db.query(Product).filter(
        Product.stock <= Product.minimum_stock
    ).all()

    return [

        {
            "id": product.id,
            "name": product.name,
            "brand": product.brand,
            "stock": product.stock,
            "minimum_stock": product.minimum_stock
        }

        for product in products

    ]


@router.get("/recent-sales")
def recent_sales(db: Session = Depends(get_db)):

    sales = (
        db.query(Sale)
        .order_by(Sale.sale_date.desc())
        .limit(5)
        .all()
    )

    return [

        {
            "id": sale.id,
            "customer_id": sale.customer_id,
            "total_amount": sale.total_amount,
            "sale_date": sale.sale_date
        }

        for sale in sales

    ]


@router.get("/recent-purchases")
def recent_purchases(db: Session = Depends(get_db)):

    purchases = (
        db.query(Purchase)
        .order_by(Purchase.purchase_date.desc())
        .limit(5)
        .all()
    )

    return [

        {
            "id": purchase.id,
            "supplier_id": purchase.supplier_id,
            "total_amount": purchase.total_amount,
            "purchase_date": purchase.purchase_date
        }

        for purchase in purchases

    ]


@router.get("/inventory-value")
def inventory_value(db: Session = Depends(get_db)):

    total = db.query(

        func.coalesce(

            func.sum(
                Product.stock * Product.purchase_price
            ),

            0

        )

    ).scalar()

    return {

        "inventory_value": float(total)

    }