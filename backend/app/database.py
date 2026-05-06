from motor.motor_asyncio import AsyncIOMotorClient
from app.config import MONGO_URL

try:
    client = AsyncIOMotorClient(MONGO_URL)
    db = client["hospital_db"]
    print("✅ MongoDB Connected Successfully")
except Exception as e:
    print("❌ MongoDB Connection Error:", e)