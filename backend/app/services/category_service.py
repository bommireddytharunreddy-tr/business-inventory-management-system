from sqlalchemy.orm import Session
from app.models.category import Category
from app.schemas.category import CategoryCreate, CategoryUpdate


def get_all_categories(db: Session):
    return db.query(Category).all()


def get_category_by_id(db: Session, category_id: int):
    return db.query(Category).filter(Category.id == category_id).first()


def search_categories(db: Session, name: str):
    return db.query(Category).filter(Category.name.ilike(f"%{name}%")).all()


def create_category(db: Session, category: CategoryCreate):
    new_category = Category(**category.model_dump())

    db.add(new_category)
    db.commit()
    db.refresh(new_category)

    return {
        "message": "Category created successfully",
        "category": new_category
    }


def update_category(db: Session, category_id: int, category: CategoryUpdate):
    existing_category = (
        db.query(Category)
        .filter(Category.id == category_id)
        .first()
    )

    if not existing_category:
        return None

    for key, value in category.model_dump(exclude_unset=True).items():
        setattr(existing_category, key, value)

    db.commit()
    db.refresh(existing_category)

    return existing_category


def delete_category(db: Session, category_id: int):
    category = (
        db.query(Category)
        .filter(Category.id == category_id)
        .first()
    )

    if not category:
        return None

    db.delete(category)
    db.commit()

    return True