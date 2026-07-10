from sqlalchemy.orm import Session
from sqlalchemy import func, extract

from app.models.sale import Sale


def get_monthly_sales(db: Session):

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