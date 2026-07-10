from sqlalchemy.orm import Session

from app.models.store_settings import StoreSettings

from app.schemas.store_settings import StoreSettingsUpdate


def get_settings(db: Session):

    settings = db.query(StoreSettings).first()

    if not settings:

        settings = StoreSettings(

            store_name="My Store",

            owner_name="",

            phone="",

            email="",

            address="",

            gst_number="",

            currency="₹"

        )

        db.add(settings)

        db.commit()

        db.refresh(settings)

    return settings


def update_settings(

    db: Session,

    data: StoreSettingsUpdate

):

    settings = get_settings(db)

    settings.store_name = data.store_name
    settings.owner_name = data.owner_name
    settings.phone = data.phone
    settings.email = data.email
    settings.address = data.address
    settings.gst_number = data.gst_number
    settings.currency = data.currency
    settings.logo = data.logo

    db.commit()

    db.refresh(settings)

    return settings