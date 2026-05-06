# from fastapi import APIRouter, Depends, HTTPException
# from app.database import db
# from app.utils.dependencies import get_current_user

# router = APIRouter()


# # ✅ Approve staff
# @router.put("/approve/{email}")
# async def approve_staff(email: str, user=Depends(get_current_user)):

#     if user["role"] != "admin":
#         raise HTTPException(status_code=403, detail="Only admin")

#     result = await db.users.update_one(
#         {"email": email, "role": "staff"},
#         {"$set": {"approved": True}}
#     )

#     if result.modified_count == 0:
#         raise HTTPException(status_code=404, detail="Staff not found")

#     return {"message": "Staff approved successfully"}




# from fastapi import APIRouter, Depends, HTTPException
# from app.database import db
# from app.utils.dependencies import get_current_user
# from bson import ObjectId

# router = APIRouter()


# # ✅ GET ALL STAFF
# @router.get("/staff")
# async def get_staff(user=Depends(get_current_user)):

#     if user["role"] != "admin":
#         raise HTTPException(status_code=403, detail="Only admin")

#     staff_list = []
#     async for s in db.users.find({"role": "staff"}):
#         s["_id"] = str(s["_id"])
#         staff_list.append(s)

#     return staff_list


# # ✅ APPROVE STAFF
# @router.put("/approve/{id}")
# async def approve_staff(id: str, user=Depends(get_current_user)):

#     if user["role"] != "admin":
#         raise HTTPException(status_code=403, detail="Only admin")

#     await db.users.update_one(
#         {"_id": ObjectId(id)},
#         {"$set": {"approved": True}}
#     )

#     return {"message": "Staff approved"}


# # ✅ BLOCK STAFF
# @router.put("/block/{id}")
# async def block_staff(id: str, user=Depends(get_current_user)):

#     if user["role"] != "admin":
#         raise HTTPException(status_code=403, detail="Only admin")

#     await db.users.update_one(
#         {"_id": ObjectId(id)},
#         {"$set": {"approved": False}}
#     )

#     return {"message": "Staff blocked"}



from fastapi import APIRouter, Depends, HTTPException
from app.database import db
from app.utils.dependencies import get_current_user
from bson import ObjectId

router = APIRouter()


# ✅ GET ALL STAFF
@router.get("/staff")
async def get_staff(user=Depends(get_current_user)):

    if user["role"] != "admin":
        raise HTTPException(status_code=403, detail="Only admin")

    staff_list = []
    async for s in db.users.find({"role": "staff"}):
        s["_id"] = str(s["_id"])
        staff_list.append(s)

    return staff_list


# ✅ APPROVE / UNBLOCK STAFF
@router.put("/approve/{id}")
async def approve_staff(id: str, user=Depends(get_current_user)):

    if user["role"] != "admin":
        raise HTTPException(status_code=403, detail="Only admin")

    await db.users.update_one(
        {"_id": ObjectId(id)},
        {"$set": {"approved": True}}
    )

    return {"message": "Staff approved / unblocked"}


# ✅ BLOCK STAFF
@router.put("/block/{id}")
async def block_staff(id: str, user=Depends(get_current_user)):

    if user["role"] != "admin":
        raise HTTPException(status_code=403, detail="Only admin")

    await db.users.update_one(
        {"_id": ObjectId(id)},
        {"$set": {"approved": False}}
    )

    return {"message": "Staff blocked"}