from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.databases.connection import get_db
from app.schemas.customer import CustomerCreate, CustomerUpdate
from app.services import customer_service

router = APIRouter(
    prefix="/customers",
    tags=["Customers"]
)


@router.get("/")
def get_customers(db: Session = Depends(get_db)):
    return customer_service.get_all_customers(db)


@router.get("/search")
def search_customers(
    name: str,
    db: Session = Depends(get_db)
):
    return customer_service.search_customers(db, name)


@router.get("/{customer_id}")
def get_customer(
    customer_id: int,
    db: Session = Depends(get_db)
):
    customer = customer_service.get_customer_by_id(
        db,
        customer_id
    )

    if customer is None:
        raise HTTPException(
            status_code=404,
            detail="Customer not found"
        )

    return customer


@router.post("/")
def create_customer(
    customer: CustomerCreate,
    db: Session = Depends(get_db)
):
    return customer_service.create_customer(
        db,
        customer
    )


@router.put("/{customer_id}")
def update_customer(
    customer_id: int,
    customer: CustomerUpdate,
    db: Session = Depends(get_db)
):
    updated_customer = customer_service.update_customer(
        db,
        customer_id,
        customer
    )

    if updated_customer is None:
        raise HTTPException(
            status_code=404,
            detail="Customer not found"
        )

    return {
        "message": "Customer updated successfully",
        "customer": updated_customer
    }


@router.delete("/{customer_id}")
def delete_customer(
    customer_id: int,
    db: Session = Depends(get_db)
):
    deleted = customer_service.delete_customer(
        db,
        customer_id
    )

    if deleted is None:
        raise HTTPException(
            status_code=404,
            detail="Customer not found"
        )

    return {
        "message": "Customer deleted successfully"
    }