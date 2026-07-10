from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.databases.connection import get_db
from app.schemas.sale import SaleCreate
from app.services import sale_service

router = APIRouter(
    prefix="/sales",
    tags=["Sales"]
)


@router.get("/")
def get_sales(db: Session = Depends(get_db)):
    return sale_service.get_all_sales(db)


@router.get("/{sale_id}")
def get_sale(
    sale_id: int,
    db: Session = Depends(get_db)
):

    sale = sale_service.get_sale_by_id(
        db,
        sale_id
    )

    if sale is None:
        raise HTTPException(
            status_code=404,
            detail="Sale not found"
        )

    return sale


@router.post("/")
def create_sale(
    sale: SaleCreate,
    db: Session = Depends(get_db)
):

    return sale_service.create_sale(
        db,
        sale
    )


@router.delete("/{sale_id}")
def delete_sale(
    sale_id: int,
    db: Session = Depends(get_db)
):

    deleted = sale_service.delete_sale(
        db,
        sale_id
    )

    if deleted is None:
        raise HTTPException(
            status_code=404,
            detail="Sale not found"
        )

    return {
        "message": "Sale deleted successfully"
    }