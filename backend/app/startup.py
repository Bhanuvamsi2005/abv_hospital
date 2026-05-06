from app.database import db
from app.utils.security import hash_password

async def create_default_admin():
    existing = await db.users.find_one({"email": "admin@gmail.com"})
    if not existing:
        await db.users.insert_one({
            "name": "Admin",
            "email": "admin@gmail.com",
            "password": hash_password("admin123"),
            "role": "admin",
            "approved": True
        })
        print("✅ Default admin created: admin@gmail.com / admin123")