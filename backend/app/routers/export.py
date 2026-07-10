from fastapi import APIRouter, Depends
from fastapi.responses import StreamingResponse
from sqlalchemy.orm import Session

from io import BytesIO
from openpyxl import Workbook

from app.databases.connection import get_db

from app.models.product import Product
from app.models.sale import Sale
from app.models.purchase import Purchase

router = APIRouter(
    prefix="/export",
    tags=["Export"]
)


def create_excel(headers, rows, filename):

    workbook = Workbook()

    sheet = workbook.active

    sheet.append(headers)

    for row in rows:
        sheet.append(row)

    stream = BytesIO()

    workbook.save(stream)

    stream.seek(0)

    return StreamingResponse(

        stream,

        media_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",

        headers={

            "Content-Disposition":

            f"attachment; filename={filename}"

        }

    )


@router.get("/products")
def export_products(db: Session = Depends(get_db)):

    products = db.query(Product).all()

    rows = []

    for p in products:

        rows.append([

            p.id,
            p.name,
            p.brand,
            p.purchase_price,
            p.selling_price,
            p.stock,
            p.minimum_stock

        ])

    return create_excel(

        [

            "ID",
            "Name",
            "Brand",
            "Purchase Price",
            "Selling Price",
            "Stock",
            "Minimum Stock"

        ],

        rows,

        "products.xlsx"

    )


@router.get("/sales")
def export_sales(db: Session = Depends(get_db)):

    sales = db.query(Sale).all()

    rows = []

    for s in sales:

        rows.append([

            s.id,
            s.customer_id,
            s.total_amount,
            s.sale_date

        ])

    return create_excel(

        [

            "Sale ID",
            "Customer ID",
            "Total Amount",
            "Sale Date"

        ],

        rows,

        "sales.xlsx"

    )


@router.get("/purchases")
def export_purchases(db: Session = Depends(get_db)):

    purchases = db.query(Purchase).all()

    rows = []

    for p in purchases:

        rows.append([

            p.id,
            p.supplier_id,
            p.total_amount,
            p.purchase_date

        ])

    return create_excel(

        [

            "Purchase ID",
            "Supplier ID",
            "Total Amount",
            "Purchase Date"

        ],

        rows,

        "purchases.xlsx"

    )


@router.get("/stock")
def export_stock(db: Session = Depends(get_db)):

    products = db.query(Product).all()

    rows = []

    for p in products:

        rows.append([

            p.id,
            p.name,
            p.stock,
            p.minimum_stock

        ])

    return create_excel(

        [

            "ID",
            "Product",
            "Stock",
            "Minimum Stock"

        ],

        rows,

        "stock.xlsx"

    )