from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.databases.connection import engine, Base

from app.models.product import Product
from app.models.category import Category
from app.models.supplier import Supplier
from app.models.customer import Customer
from app.models.purchase import Purchase
from app.models.purchase_item import PurchaseItem
from app.models.sale import Sale
from app.models.sale_item import SaleItem
from app.models.user import User
from app.models.store_settings import StoreSettings

from app.routers.products import router as product_router
from app.routers.categories import router as category_router
from app.routers.suppliers import router as supplier_router
from app.routers.customers import router as customer_router
from app.routers.purchases import router as purchase_router
from app.routers.sales import router as sale_router
from app.routers.auth import router as auth_router
from app.routers.dashboard import router as dashboard_router
from app.routers.reports import router as reports_router
from app.routers.export import router as export_router
from app.routers.store_settings import router as store_settings_router

app = FastAPI(
    title="Hardware Store API",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "https://business-inventory-management-system-buea7qf3x.vercel.app",
        "https://business-inventory-management-syste-theta.vercel.app",
    ],
    allow_origin_regex=r"https://.*\.vercel\.app",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Create all database tables
Base.metadata.create_all(bind=engine)

# Routers
app.include_router(product_router)
app.include_router(category_router)
app.include_router(supplier_router)
app.include_router(customer_router)
app.include_router(purchase_router)
app.include_router(sale_router)
app.include_router(auth_router)
app.include_router(dashboard_router)
app.include_router(reports_router)
app.include_router(export_router)
app.include_router(store_settings_router)


@app.get("/")
def home():
    return {
        "message": "Welcome to Hardware Store API"
    }
