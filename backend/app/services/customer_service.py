from sqlalchemy.orm import Session
from app.models.customer import Customer
from app.schemas.customer import CustomerCreate, CustomerUpdate


def get_all_customers(db: Session):
    return db.query(Customer).all()


def get_customer_by_id(db: Session, customer_id: int):
    return db.query(Customer).filter(Customer.id == customer_id).first()


def search_customers(db: Session, name: str):
    return db.query(Customer).filter(
        Customer.name.ilike(f"%{name}%")
    ).all()


def create_customer(db: Session, customer: CustomerCreate):
    new_customer = Customer(**customer.model_dump())

    db.add(new_customer)
    db.commit()
    db.refresh(new_customer)

    return {
        "message": "Customer created successfully",
        "customer": new_customer
    }


def update_customer(
    db: Session,
    customer_id: int,
    customer: CustomerUpdate
):
    existing_customer = db.query(Customer).filter(
        Customer.id == customer_id
    ).first()

    if not existing_customer:
        return None

    for key, value in customer.model_dump(exclude_unset=True).items():
        setattr(existing_customer, key, value)

    db.commit()
    db.refresh(existing_customer)

    return existing_customer


def delete_customer(
    db: Session,
    customer_id: int
):
    customer = db.query(Customer).filter(
        Customer.id == customer_id
    ).first()

    if not customer:
        return None

    db.delete(customer)
    db.commit()

    return True