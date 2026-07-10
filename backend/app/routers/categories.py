from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.databases.connection import get_db
from app.schemas.category import CategoryCreate, CategoryUpdate
from app.services import category_service

router = APIRouter(
    prefix="/categories",
    tags=["Categories"]
)


@router.get("/")
def get_categories(db: Session = Depends(get_db)):
    return category_service.get_all_categories(db)


@router.get("/search")
def search_categories(
    name: str,
    db: Session = Depends(get_db)
):
    return category_service.search_categories(db, name)


@router.get("/{category_id}")
def get_category(
    category_id: int,
    db: Session = Depends(get_db)
):
    category = category_service.get_category_by_id(
        db,
        category_id
    )

    if category is None:
        raise HTTPException(
            status_code=404,
            detail="Category not found"
        )

    return category


@router.post("/")
def create_category(
    category: CategoryCreate,
    db: Session = Depends(get_db)
):
    return category_service.create_category(
        db,
        category
    )


@router.put("/{category_id}")
def update_category(
    category_id: int,
    category: CategoryUpdate,
    db: Session = Depends(get_db)
):
    updated_category = category_service.update_category(
        db,
        category_id,
        category
    )

    if updated_category is None:
        raise HTTPException(
            status_code=404,
            detail="Category not found"
        )

    return {
        "message": "Category updated successfully",
        "category": updated_category
    }


@router.delete("/{category_id}")
def delete_category(
    category_id: int,
    db: Session = Depends(get_db)
):
    deleted = category_service.delete_category(
        db,
        category_id
    )

    if deleted is None:
        raise HTTPException(
            status_code=404,
            detail="Category not found"
        )

    return {
        "message": "Category deleted successfully"
    }