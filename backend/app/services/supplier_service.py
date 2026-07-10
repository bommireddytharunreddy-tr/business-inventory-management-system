from sqlalchemy.orm import Session
from app.models.supplier import Supplier
from app.schemas.supplier import SupplierCreate, SupplierUpdate


def get_all_suppliers(db: Session):
    return db.query(Supplier).all()


def get_supplier_by_id(db: Session, supplier_id: int):
    return db.query(Supplier).filter(
        Supplier.id == supplier_id
    ).first()


def search_suppliers(db: Session, name: str):
    return db.query(Supplier).filter(
        Supplier.name.ilike(f"%{name}%")
    ).all()


def create_supplier(db: Session, supplier: SupplierCreate):
    new_supplier = Supplier(**supplier.model_dump())

    db.add(new_supplier)
    db.commit()
    db.refresh(new_supplier)

    return {
        "message": "Supplier created successfully",
        "supplier": new_supplier
    }


def update_supplier(
    db: Session,
    supplier_id: int,
    supplier: SupplierUpdate
):
    existing_supplier = db.query(Supplier).filter(
        Supplier.id == supplier_id
    ).first()

    if not existing_supplier:
        return None

    for key, value in supplier.model_dump(exclude_unset=True).items():
        setattr(existing_supplier, key, value)

    db.commit()
    db.refresh(existing_supplier)

    return existing_supplier


def delete_supplier(
    db: Session,
    supplier_id: int
):
    supplier = db.query(Supplier).filter(
        Supplier.id == supplier_id
    ).first()

    if not supplier:
        return None

    db.delete(supplier)
    db.commit()

    return True