from sqlalchemy import Column, Integer, String

from app.databases.connection import Base


class StoreSettings(Base):

    __tablename__ = "store_settings"

    id = Column(Integer, primary_key=True, index=True)

    store_name = Column(String(150), default="My Store")

    owner_name = Column(String(150))

    phone = Column(String(20))

    email = Column(String(100))

    address = Column(String(300))

    gst_number = Column(String(50))

    currency = Column(String(20), default="₹")

    logo = Column(String(300), nullable=True)