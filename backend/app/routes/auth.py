# from fastapi import APIRouter, HTTPException
# from app.database import db
# from app.models.user import User
# from app.utils.security import hash_password, verify_password, create_token

# router = APIRouter()

# @router.post("/register")
# async def register(user: User):
#     try:
#         existing = await db.users.find_one({"email": user.email})
#         if existing:
#             raise HTTPException(400, "Email already exists")

#         user_dict = user.dict()
#         user_dict["password"] = hash_password(user.password)

#         # role handling
#         if user.role == "staff":
#             user_dict["approved"] = False
#         else:
#             user_dict["approved"] = True

#         await db.users.insert_one(user_dict)

#         return {"message": "Registered successfully"}

#     except Exception as e:
#         print("REGISTER ERROR:", e)
#         raise HTTPException(500, str(e))


# @router.post("/login")
# async def login(data: dict):
#     try:
#         user = await db.users.find_one({"email": data["email"]})

#         if not user:
#             raise HTTPException(404, "User not found")

#         if not verify_password(data["password"], user["password"]):
#             raise HTTPException(401, "Wrong password")

#         if user["role"] == "staff" and not user["approved"]:
#             raise HTTPException(403, "Wait for admin approval")

#         token = create_token({
#             "id": str(user["_id"]),
#             "role": user["role"]
#         })

#         return {"token": token, "role": user["role"]}

#     except Exception as e:
#         print("LOGIN ERROR:", e)
#         raise HTTPException(500, str(e))








# from fastapi import APIRouter, HTTPException
# from app.database import db
# from app.models.user import User
# from app.utils.security import hash_password, verify_password, create_token

# router = APIRouter()


# # ✅ REGISTER
# @router.post("/register")
# async def register(user: User):
#     try:
#         # check existing user
#         existing = await db.users.find_one({"email": user.email})
#         if existing:
#             raise HTTPException(status_code=400, detail="Email already exists")

#         # ✅ phone validation (basic)
#         if not user.phone.isdigit() or len(user.phone) != 10:
#             raise HTTPException(status_code=400, detail="Phone must be 10 digits")

#         # hash password
#         user_dict = user.dict()
#         user_dict["password"] = hash_password(user.password)

#         # role-based approval
#         if user.role == "staff":
#             user_dict["approved"] = False
#         else:
#             user_dict["approved"] = True

#         # insert user
#         await db.users.insert_one(user_dict)

#         return {"message": "Registered successfully"}

#     except HTTPException as e:
#         raise e
#     except Exception as e:
#         print("REGISTER ERROR:", e)
#         raise HTTPException(status_code=500, detail="Internal Server Error")


# # ✅ LOGIN
# @router.post("/login")
# async def login(data: dict):
#     try:
#         # find user
#         user = await db.users.find_one({"email": data.get("email")})

#         if not user:
#             raise HTTPException(status_code=404, detail="User not found")

#         # check password
#         if not verify_password(data.get("password"), user["password"]):
#             raise HTTPException(status_code=401, detail="Wrong password")

#         # staff approval check
#         if user["role"] == "staff" and not user.get("approved"):
#             raise HTTPException(status_code=403, detail="Wait for admin approval")

#         # create JWT token
#         token = create_token({
#             "id": str(user["_id"]),
#             "role": user["role"]
#         })

#         return {
#             "token": token,
#             "role": user["role"],
#             "phone": user.get("phone")  # ✅ return phone also
#         }

#     except HTTPException as e:
#         raise e
#     except Exception as e:
#         print("LOGIN ERROR:", e)
#         raise HTTPException(status_code=500, detail="Internal Server Error")



from fastapi import APIRouter, HTTPException
from app.database import db
from app.models.user import User
from app.utils.security import hash_password, verify_password, create_token
from app.utils.email import send_email
from app.utils.email_templates import reset_password_template
from datetime import datetime, timedelta
import secrets

router = APIRouter()


@router.post("/register")
async def register(user: User):

    existing = await db.users.find_one({"email": user.email})
    if existing:
        raise HTTPException(400, "Email exists")

    if not user.phone.isdigit() or len(user.phone) != 10:
        raise HTTPException(400, "Phone must be 10 digits")

    user_dict = user.dict()
    user_dict["password"] = hash_password(user.password)

    user_dict["approved"] = False if user.role == "staff" else True

    await db.users.insert_one(user_dict)

    return {"message": "Registered"}


@router.post("/login")
async def login(data: dict):

    user = await db.users.find_one({"email": data.get("email")})

    if not user:
        raise HTTPException(404, "User not found")

    if not verify_password(data.get("password"), user["password"]):
        raise HTTPException(401, "Wrong password")

    if user["role"] == "staff" and not user.get("approved"):
        raise HTTPException(403, "Wait for admin approval")

    token = create_token({
        "id": str(user["_id"]),
        "role": user["role"]
    })

    return {"token": token, "role": user["role"]}


# 🔥 FORGOT PASSWORD
@router.post("/forgot-password")
async def forgot_password(data: dict):

    user = await db.users.find_one({"email": data.get("email")})

    if not user:
        raise HTTPException(404, "User not found")

    token = secrets.token_urlsafe(32)

    await db.users.update_one(
        {"email": data.get("email")},
        {
            "$set": {
                "reset_token": token,
                "reset_expiry": datetime.utcnow() + timedelta(minutes=15)
            }
        }
    )

    link = f"http://localhost:5173/reset-password/{token}"

    send_email(
        data.get("email"),
        "Reset Password",
        reset_password_template(link)
    )

    return {"message": "Email sent"}


# 🔥 RESET PASSWORD
@router.post("/reset-password/{token}")
async def reset_password(token: str, data: dict):

    user = await db.users.find_one({"reset_token": token})

    if not user:
        raise HTTPException(400, "Invalid token")

    if user["reset_expiry"] < datetime.utcnow():
        raise HTTPException(400, "Expired")

    await db.users.update_one(
        {"_id": user["_id"]},
        {
            "$set": {"password": hash_password(data.get("password"))},
            "$unset": {"reset_token": "", "reset_expiry": ""}
        }
    )

    return {"message": "Password reset done"}