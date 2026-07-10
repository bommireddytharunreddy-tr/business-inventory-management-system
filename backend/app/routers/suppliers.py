from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.databases.connection import get_db
from app.schemas.supplier import SupplierCreate, SupplierUpdate
from app.services import supplier_service

router = APIRouter(
    prefix="/suppliers",
    tags=["Suppliers"]
)


@router.get("/")
def get_suppliers(db: Session = Depends(get_db)):
    return supplier_service.get_all_suppliers(db)


@router.get("/search")
def search_suppliers(
    name: str,
    db: Session = Depends(get_db)
):
    return supplier_service.search_suppliers(db, name)


@router.get("/{supplier_id}")
def get_supplier(
    supplier_id: int,
    db: Session = Depends(get_db)
):
    supplier = supplier_service.get_supplier_by_id(
        db,
        supplier_id
    )

    if supplier is None:
        raise HTTPException(
            status_code=404,
            detail="Supplier not found"
        )

    return supplier


@router.post("/")
def create_supplier(
    supplier: SupplierCreate,
    db: Session = Depends(get_db)
):
    return supplier_service.create_supplier(
        db,
        supplier
    )


@router.put("/{supplier_id}")
def update_supplier(
    supplier_id: int,
    supplier: SupplierUpdate,
    db: Session = Depends(get_db)
):
    updated_supplier = supplier_service.update_supplier(
        db,
        supplier_id,
        supplier
    )

    if updated_supplier is None:
        raise HTTPException(
            status_code=404,
            detail="Supplier not found"
        )

    return {
        "message": "Supplier updated successfully",
        "supplier": updated_supplier
    }


@router.delete("/{supplier_id}")
def delete_supplier(
    supplier_id: int,
    db: Session = Depends(get_db)
):
    deleted = supplier_service.delete_supplier(
        db,
        supplier_id
    )

    if deleted is None:
        raise HTTPException(
            status_code=404,
            detail="Supplier not found"
        )

    return {
        "message": "Supplier deleted successfully"
    }