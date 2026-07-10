from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.databases.connection import get_db

from app.schemas.store_settings import StoreSettingsUpdate

from app.services import store_settings_service

router = APIRouter(

    prefix="/settings",

    tags=["Settings"]

)


@router.get("/")

def get_settings(

    db: Session = Depends(get_db)

):

    return store_settings_service.get_settings(db)


@router.put("/")

def update_settings(

    data: StoreSettingsUpdate,

    db: Session = Depends(get_db)

):

    return store_settings_service.update_settings(

        db,

        data

    )