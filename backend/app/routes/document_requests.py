from fastapi import APIRouter, HTTPException, Depends
from app.database import db
from app.models.document_request import DocumentRequest
from app.utils.dependencies import get_current_user
from bson import ObjectId

router = APIRouter()


# ✅ PATIENT CREATE REQUEST
@router.post("/create")
async def create_request(
    data: DocumentRequest,
    user=Depends(get_current_user)
):

    if user["role"] != "patient":
        raise HTTPException(status_code=403, detail="Only patients")

    item = data.dict()

    item["patient_id"] = user["id"]

    await db.document_requests.insert_one(item)

    return {"message": "Document request submitted"}


# ✅ PATIENT VIEW OWN REQUESTS
@router.get("/my")
async def my_requests(user=Depends(get_current_user)):

    data = []

    async for item in db.document_requests.find({
        "patient_id": user["id"]
    }):

        item["_id"] = str(item["_id"])

        data.append(item)

    return data


# ✅ STAFF VIEW ALL
@router.get("/all")
async def all_requests(user=Depends(get_current_user)):

    if user["role"] != "staff":
        raise HTTPException(status_code=403, detail="Only staff")

    data = []

    async for item in db.document_requests.find():

        item["_id"] = str(item["_id"])

        data.append(item)

    return data


# ✅ STAFF UPDATE STATUS
@router.put("/update/{id}")
async def update_request(
    id: str,
    status: str,
    staff_note: str = "",
    user=Depends(get_current_user)
):

    if user["role"] != "staff":
        raise HTTPException(status_code=403, detail="Only staff")

    result = await db.document_requests.update_one(
        {"_id": ObjectId(id)},
        {
            "$set": {
                "status": status,
                "staff_note": staff_note
            }
        }
    )

    if result.modified_count == 0:
        raise HTTPException(status_code=404, detail="Request not found")

    return {"message": "Updated successfully"}


# ✅ DELETE REQUEST
@router.delete("/delete/{id}")
async def delete_request(
    id: str,
    user=Depends(get_current_user)
):

    if user["role"] != "staff":
        raise HTTPException(status_code=403, detail="Only staff")

    await db.document_requests.delete_one({
        "_id": ObjectId(id)
    })

    return {"message": "Deleted successfully"}
