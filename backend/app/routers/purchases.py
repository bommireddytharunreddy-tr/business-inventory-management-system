from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.databases.connection import get_db

from app.schemas.purchase import PurchaseCreate

from app.services import purchase_service

router = APIRouter(
    prefix="/purchases",
    tags=["Purchases"]
)


@router.get("/")
def get_purchases(db: Session = Depends(get_db)):
    return purchase_service.get_all_purchases(db)


@router.get("/{purchase_id}")
def get_purchase(
    purchase_id: int,
    db: Session = Depends(get_db)
):

    purchase = purchase_service.get_purchase_by_id(
        db,
        purchase_id
    )

    if purchase is None:
        raise HTTPException(
            status_code=404,
            detail="Purchase not found"
        )

    return purchase


@router.post("/")
def create_purchase(
    purchase: PurchaseCreate,
    db: Session = Depends(get_db)
):

    return purchase_service.create_purchase(
        db,
        purchase
    )


@router.delete("/{purchase_id}")
def delete_purchase(
    purchase_id: int,
    db: Session = Depends(get_db)
):

    deleted = purchase_service.delete_purchase(
        db,
        purchase_id
    )

    if deleted is None:
        raise HTTPException(
            status_code=404,
            detail="Purchase not found"
        )

    return {
        "message": "Purchase deleted successfully"
    }