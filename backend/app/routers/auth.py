from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.databases.connection import get_db

from app.schemas.auth import RegisterUser, LoginUser

from app.services import auth_service

router = APIRouter(
    prefix="/auth",
    tags=["Authentication"]
)


@router.post("/register")
def register(
    user: RegisterUser,
    db: Session = Depends(get_db)
):

    result = auth_service.register_user(
        db,
        user
    )

    if result is None:
        raise HTTPException(
            status_code=400,
            detail="Email already exists"
        )

    return result


@router.post("/login")
def login(
    user: LoginUser,
    db: Session = Depends(get_db)
):

    result = auth_service.login_user(
        db,
        user
    )

    if result is None:
        raise HTTPException(
            status_code=401,
            detail="Invalid email or password"
        )

    return result