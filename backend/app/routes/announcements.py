from fastapi import APIRouter, HTTPException, Depends
from app.database import db
from app.models.announcement import Announcement
from app.utils.dependencies import get_current_user
from bson import ObjectId

router = APIRouter()


# ✅ CREATE (STAFF)
@router.post("/")
async def create_announcement(data: Announcement, user=Depends(get_current_user)):

    if user["role"] != "staff":
        raise HTTPException(403, "Only staff")

    obj = data.dict()
    obj["created_by"] = user["id"]

    await db.announcements.insert_one(obj)

    return {"message": "Announcement created"}


# ✅ GET ALL (PATIENT + STAFF)
@router.get("/")
async def get_announcements():

    result = []
    async for a in db.announcements.find():
        a["_id"] = str(a["_id"])
        result.append(a)

    return result


# ✅ UPDATE
@router.put("/{id}")
async def update_announcement(id: str, data: Announcement, user=Depends(get_current_user)):

    if user["role"] != "staff":
        raise HTTPException(403, "Only staff")

    await db.announcements.update_one(
        {"_id": ObjectId(id)},
        {"$set": data.dict()}
    )

    return {"message": "Updated"}


# ✅ DELETE
@router.delete("/{id}")
async def delete_announcement(id: str, user=Depends(get_current_user)):

    if user["role"] != "staff":
        raise HTTPException(403, "Only staff")

    await db.announcements.delete_one({"_id": ObjectId(id)})

    return {"message": "Deleted"}