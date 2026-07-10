from sqlalchemy.orm import Session

from app.models.user import User
from app.schemas.auth import RegisterUser, LoginUser

from app.utils.security import hash_password, verify_password
from app.utils.jwt_handler import create_access_token


def register_user(db: Session, user: RegisterUser):

    existing_user = db.query(User).filter(
        User.email == user.email
    ).first()

    if existing_user:
        return None

    new_user = User(
        username=user.username,
        email=user.email,
        password=hash_password(user.password),
        role="admin"
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return {
        "message": "User registered successfully"
    }


def login_user(db: Session, user: LoginUser):

    db_user = db.query(User).filter(
        User.email == user.email
    ).first()

    if db_user is None:
        return None

    if not verify_password(
        user.password,
        db_user.password
    ):
        return None

    access_token = create_access_token(
        {
            "sub": db_user.email,
            "role": db_user.role
        }
    )

    return {
        "access_token": access_token,
        "token_type": "bearer"
    }