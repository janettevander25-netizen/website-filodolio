from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List, Optional
import uuid
from datetime import datetime, timezone

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

app = FastAPI()
api_router = APIRouter(prefix="/api")

# ─── Models ────────────────────────────────────────────

class OrderItem(BaseModel):
    name: str
    size: str
    price: float
    quantity: int = 1

class OrderCreate(BaseModel):
    items: List[OrderItem]
    customer_name: str
    customer_phone: str
    customer_email: Optional[str] = None
    order_type: str = "pickup"  # pickup or delivery
    delivery_address: Optional[str] = None
    notes: Optional[str] = None

class Order(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    items: List[OrderItem]
    customer_name: str
    customer_phone: str
    customer_email: Optional[str] = None
    order_type: str = "pickup"
    delivery_address: Optional[str] = None
    notes: Optional[str] = None
    total: float = 0.0
    status: str = "pending"
    created_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())

class ContactMessage(BaseModel):
    name: str
    email: str
    phone: Optional[str] = None
    message: str

class ContactMessageDB(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: str
    phone: Optional[str] = None
    message: str
    created_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())

# ─── Routes ────────────────────────────────────────────

@api_router.get("/")
async def root():
    return {"message": "Filo d'Olio API"}

@api_router.post("/orders", response_model=Order)
async def create_order(order_input: OrderCreate):
    total = sum(item.price * item.quantity for item in order_input.items)
    order = Order(
        **order_input.model_dump(),
        total=round(total, 2)
    )
    doc = order.model_dump()
    await db.orders.insert_one(doc)
    return order

@api_router.get("/orders/{order_id}")
async def get_order(order_id: str):
    order = await db.orders.find_one({"id": order_id}, {"_id": 0})
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    return order

@api_router.post("/contact")
async def submit_contact(msg: ContactMessage):
    contact = ContactMessageDB(**msg.model_dump())
    doc = contact.model_dump()
    await db.contact_messages.insert_one(doc)
    return {"success": True, "message": "Message sent successfully", "id": contact.id}

@api_router.get("/orders")
async def list_orders():
    orders = await db.orders.find({}, {"_id": 0}).sort("created_at", -1).to_list(100)
    return orders

app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
