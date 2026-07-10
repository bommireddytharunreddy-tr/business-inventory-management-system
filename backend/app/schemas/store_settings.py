from pydantic import BaseModel
from typing import Optional


class StoreSettingsBase(BaseModel):

    store_name: str

    owner_name: str

    phone: str

    email: Optional[str] = None

    address: Optional[str] = None

    gst_number: Optional[str] = None

    currency: str

    logo: Optional[str] = None


class StoreSettingsUpdate(StoreSettingsBase):

    pass


class StoreSettingsResponse(StoreSettingsBase):

    id: int

    class Config:

        from_attributes = True