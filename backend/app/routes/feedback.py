from fastapi import APIRouter, Depends, HTTPException
from app.database import db
from app.utils.dependencies import get_current_user
from datetime import datetime
from bson import ObjectId

router = APIRouter()


# ✅ ADD FEEDBACK
@router.post("/add")
async def add_feedback(data: dict, user=Depends(get_current_user)):

    if user["role"] != "patient":
        raise HTTPException(status_code=403, detail="Only patients")

    feedback = {
        "patient_id": user["id"],
        "patient_name": data.get("patient_name"),
        "rating": data.get("rating"),
        "message": data.get("message"),
        "created_at": datetime.now().strftime("%Y-%m-%d %H:%M")
    }

    await db.feedbacks.insert_one(feedback)

    return {"message": "Feedback submitted"}


# ✅ GET MY FEEDBACK
@router.get("/my")
async def my_feedback(user=Depends(get_current_user)):

    data = []

    async for item in db.feedbacks.find({
        "patient_id": user["id"]
    }):

        item["_id"] = str(item["_id"])
        data.append(item)

    return data


# ✅ STAFF/ADMIN VIEW ALL
@router.get("/all")
async def all_feedback(user=Depends(get_current_user)):

    if user["role"] not in ["staff", "admin"]:
        raise HTTPException(status_code=403, detail="Unauthorized")

    data = []

    async for item in db.feedbacks.find():

        item["_id"] = str(item["_id"])
        data.append(item)

    return data


# ✅ DELETE FEEDBACK
@router.delete("/delete/{id}")
async def delete_feedback(id: str, user=Depends(get_current_user)):

    if user["role"] not in ["staff", "admin"]:
        raise HTTPException(status_code=403, detail="Unauthorized")

    await db.feedbacks.delete_one({
        "_id": ObjectId(id)
    })

    return {"message": "Feedback deleted"}