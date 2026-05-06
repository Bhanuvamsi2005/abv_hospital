









# from fastapi import APIRouter, HTTPException, Depends
# from app.database import db
# from app.models.appointment import Appointment
# from app.utils.dependencies import get_current_user
# from bson import ObjectId
# from pydantic import BaseModel

# router = APIRouter()


# # ✅ REQUEST MODEL
# class UpdateAppointment(BaseModel):
#     note: str = ""


# # ✅ BOOK APPOINTMENT
# @router.post("/book")
# async def book(app: Appointment, user=Depends(get_current_user)):

#     if user["role"] != "patient":
#         raise HTTPException(status_code=403, detail="Only patients can book")

#     existing = await db.appointments.find_one({
#         "doctor_id": app.doctor_id,
#         "date": app.date,
#         "time": app.time
#     })

#     if existing:
#         raise HTTPException(status_code=400, detail="Slot already booked")

#     # ✅ FETCH PATIENT DETAILS
#     try:
#         patient = await db.users.find_one({"_id": ObjectId(user["id"])})
#     except:
#         raise HTTPException(status_code=400, detail="Invalid patient ID")

#     if not patient:
#         raise HTTPException(status_code=404, detail="Patient not found")

#     data = app.dict()
#     data["patient_id"] = user["id"]

#     # ✅ ADD PATIENT DETAILS (NEW)
#     data["patient_name"] = patient.get("name")
#     data["patient_phone"] = patient.get("phone")

#     data["status"] = "pending"
#     data["note"] = ""

#     # ✅ TRACKING FIELDS (existing)
#     data["handled_by_id"] = None
#     data["handled_by_name"] = None
#     data["handled_by_phone"] = None
#     data["handled_action"] = None

#     await db.appointments.insert_one(data)

#     return {"message": "Appointment booked"}


# # ✅ GET MY APPOINTMENTS
# @router.get("/my")
# async def my_appointments(user=Depends(get_current_user)):

#     data = []
#     async for item in db.appointments.find({"patient_id": user["id"]}):
#         item["_id"] = str(item["_id"])
#         data.append(item)

#     return data


# # ✅ STAFF VIEW ALL
# @router.get("/all")
# async def all_appointments(user=Depends(get_current_user)):

#     if user["role"] != "staff":
#         raise HTTPException(status_code=403, detail="Only staff")

#     data = []
#     async for item in db.appointments.find():
#         item["_id"] = str(item["_id"])
#         data.append(item)

#     return data


# # ✅ UPDATE STATUS + NOTE + HANDLER INFO
# @router.put("/update/{id}")
# async def update_status(
#     id: str,
#     status: str,
#     body: UpdateAppointment,
#     user=Depends(get_current_user)
# ):

#     if user["role"] != "staff":
#         raise HTTPException(status_code=403, detail="Only staff")

#     try:
#         obj_id = ObjectId(id)
#     except:
#         raise HTTPException(status_code=400, detail="Invalid ID")

#     # ✅ FETCH CURRENT STAFF DETAILS
#     staff = await db.users.find_one({"_id": ObjectId(user["id"])})
#     if not staff:
#         raise HTTPException(status_code=404, detail="Staff not found")

#     result = await db.appointments.update_one(
#         {"_id": obj_id},
#         {
#             "$set": {
#                 "status": status,
#                 "note": body.note,

#                 # ✅ WHO HANDLED IT
#                 "handled_by_id": str(staff["_id"]),
#                 "handled_by_name": staff.get("name"),
#                 "handled_by_phone": staff.get("phone"),
#                 "handled_action": status
#             }
#         }
#     )

#     if result.modified_count == 0:
#         raise HTTPException(status_code=404, detail="Appointment not found")

#     return {
#         "message": f"Appointment {status} by {staff.get('name')}"
#     }







# from fastapi import APIRouter, HTTPException, Depends
# from app.database import db
# from app.models.appointment import Appointment
# from app.utils.dependencies import get_current_user
# from bson import ObjectId
# from pydantic import BaseModel

# router = APIRouter()


# # ✅ REQUEST MODEL
# class UpdateAppointment(BaseModel):
#     note: str = ""


# # ✅ BOOK APPOINTMENT
# @router.post("/book")
# async def book(app: Appointment, user=Depends(get_current_user)):

#     if user["role"] != "patient":
#         raise HTTPException(status_code=403, detail="Only patients can book")

#     existing = await db.appointments.find_one({
#         "doctor_id": app.doctor_id,
#         "date": app.date,
#         "time": app.time
#     })

#     if existing:
#         raise HTTPException(status_code=400, detail="Slot already booked")

#     # ✅ FETCH PATIENT DETAILS FROM USER COLLECTION
#     try:
#         patient = await db.users.find_one({"_id": ObjectId(user["id"])})
#     except:
#         raise HTTPException(status_code=400, detail="Invalid patient ID")

#     if not patient:
#         raise HTTPException(status_code=404, detail="Patient not found")

#     data = app.dict()
#     data["patient_id"] = user["id"]

#     # ✅ USE FORM DATA (NEW)
#     data["patient_name"] = app.patient_name
#     data["patient_age"] = app.patient_age
#     data["patient_gender"] = app.patient_gender
#     data["problem"] = app.problem

#     # ✅ ADD PHONE FROM USER DB
#     data["patient_phone"] = patient.get("phone")

#     data["status"] = "pending"
#     data["note"] = ""

#     # ✅ TRACKING FIELDS
#     data["handled_by_id"] = None
#     data["handled_by_name"] = None
#     data["handled_by_phone"] = None
#     data["handled_action"] = None

#     await db.appointments.insert_one(data)

#     return {"message": "Appointment booked"}


# # ✅ GET MY APPOINTMENTS
# @router.get("/my")
# async def my_appointments(user=Depends(get_current_user)):

#     data = []
#     async for item in db.appointments.find({"patient_id": user["id"]}):
#         item["_id"] = str(item["_id"])
#         data.append(item)

#     return data


# # ✅ STAFF VIEW ALL
# @router.get("/all")
# async def all_appointments(user=Depends(get_current_user)):

#     if user["role"] != "staff":
#         raise HTTPException(status_code=403, detail="Only staff")

#     data = []
#     async for item in db.appointments.find():
#         item["_id"] = str(item["_id"])
#         data.append(item)

#     return data


# # ✅ UPDATE STATUS + NOTE + HANDLER INFO
# @router.put("/update/{id}")
# async def update_status(
#     id: str,
#     status: str,
#     body: UpdateAppointment,
#     user=Depends(get_current_user)
# ):

#     if user["role"] != "staff":
#         raise HTTPException(status_code=403, detail="Only staff")

#     try:
#         obj_id = ObjectId(id)
#     except:
#         raise HTTPException(status_code=400, detail="Invalid ID")

#     # ✅ FETCH CURRENT STAFF DETAILS
#     staff = await db.users.find_one({"_id": ObjectId(user["id"])})
#     if not staff:
#         raise HTTPException(status_code=404, detail="Staff not found")

#     result = await db.appointments.update_one(
#         {"_id": obj_id},
#         {
#             "$set": {
#                 "status": status,
#                 "note": body.note,

#                 # ✅ WHO HANDLED IT
#                 "handled_by_id": str(staff["_id"]),
#                 "handled_by_name": staff.get("name"),
#                 "handled_by_phone": staff.get("phone"),
#                 "handled_action": status
#             }
#         }
#     )

#     if result.modified_count == 0:
#         raise HTTPException(status_code=404, detail="Appointment not found")

#     return {
#         "message": f"Appointment {status} by {staff.get('name')}"
#     }




# from fastapi import APIRouter, HTTPException, Depends
# from app.database import db
# from app.models.appointment import Appointment
# from app.utils.dependencies import get_current_user
# from bson import ObjectId
# from pydantic import BaseModel
# from app.utils.email import send_email
# from app.utils.email_templates import appointment_template  # ✅ NEW

# router = APIRouter()


# class UpdateAppointment(BaseModel):
#     note: str = ""


# # ✅ BOOK APPOINTMENT
# @router.post("/book")
# async def book(app: Appointment, user=Depends(get_current_user)):

#     if user["role"] != "patient":
#         raise HTTPException(status_code=403, detail="Only patients can book")

#     existing = await db.appointments.find_one({
#         "doctor_id": app.doctor_id,
#         "date": app.date,
#         "time": app.time
#     })

#     if existing:
#         raise HTTPException(status_code=400, detail="Slot already booked")

#     patient = await db.users.find_one({"_id": ObjectId(user["id"])})

#     if not patient:
#         raise HTTPException(status_code=404, detail="Patient not found")

#     data = app.dict()
#     data["patient_id"] = user["id"]
#     data["patient_name"] = app.patient_name
#     data["patient_age"] = app.patient_age
#     data["patient_gender"] = app.patient_gender
#     data["problem"] = app.problem
#     data["patient_phone"] = patient.get("phone")

#     data["status"] = "pending"
#     data["note"] = ""

#     data["handled_by_id"] = None
#     data["handled_by_name"] = None
#     data["handled_by_phone"] = None
#     data["handled_action"] = None

#     await db.appointments.insert_one(data)

#     return {"message": "Appointment booked"}


# # ✅ GET MY APPOINTMENTS
# @router.get("/my")
# async def my_appointments(user=Depends(get_current_user)):

#     data = []
#     async for item in db.appointments.find({"patient_id": user["id"]}):
#         item["_id"] = str(item["_id"])
#         data.append(item)

#     return data


# # ✅ STAFF VIEW ALL
# @router.get("/all")
# async def all_appointments(user=Depends(get_current_user)):

#     if user["role"] != "staff":
#         raise HTTPException(status_code=403, detail="Only staff")

#     data = []
#     async for item in db.appointments.find():
#         item["_id"] = str(item["_id"])
#         data.append(item)

#     return data


# # ✅ UPDATE STATUS + SEND EMAIL
# @router.put("/update/{id}")
# async def update_status(
#     id: str,
#     status: str,
#     body: UpdateAppointment,
#     user=Depends(get_current_user)
# ):

#     if user["role"] != "staff":
#         raise HTTPException(status_code=403, detail="Only staff")

#     obj_id = ObjectId(id)

#     staff = await db.users.find_one({"_id": ObjectId(user["id"])})

#     result = await db.appointments.update_one(
#         {"_id": obj_id},
#         {
#             "$set": {
#                 "status": status,
#                 "note": body.note,
#                 "handled_by_id": str(staff["_id"]),
#                 "handled_by_name": staff.get("name"),
#                 "handled_by_phone": staff.get("phone"),
#                 "handled_action": status
#             }
#         }
#     )

#     if result.modified_count == 0:
#         raise HTTPException(status_code=404, detail="Appointment not found")

#     # ✅ FETCH UPDATED APPOINTMENT + PATIENT
#     appointment = await db.appointments.find_one({"_id": obj_id})
#     patient = await db.users.find_one({"_id": ObjectId(appointment["patient_id"])})

#     # ✅ SEND PROFESSIONAL EMAIL
#     send_email(
#         patient["email"],
#         "Appointment Update",
#         appointment_template(
#             status,
#             staff.get("name"),
#             body.note
#         )
#     )

#     return {"message": f"Appointment {status} and email sent"}





# time slots update
from fastapi import APIRouter, HTTPException, Depends
from app.database import db
from app.models.appointment import Appointment
from app.utils.dependencies import get_current_user
from bson import ObjectId
from pydantic import BaseModel
from app.utils.email import send_email
from app.utils.email_templates import appointment_template

router = APIRouter()


class UpdateAppointment(BaseModel):
    note: str = ""


# ✅ AVAILABLE TIME SLOTS
TIME_SLOTS = [
    "09:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "01:00 PM",
    "02:00 PM",
    "03:00 PM"
]


# ✅ GET SLOT AVAILABILITY
@router.get("/slots")
async def get_slots(doctor: str, date: str):

    slots = []

    for slot in TIME_SLOTS:

        count = await db.appointments.count_documents({
            "doctor_id": doctor,
            "date": date,
            "time": slot
        })

        slots.append({
            "time": slot,
            "count": count,
            "full": count >= 6
        })

    return slots


# ✅ BOOK APPOINTMENT
@router.post("/book")
async def book(app: Appointment, user=Depends(get_current_user)):

    if user["role"] != "patient":
        raise HTTPException(status_code=403, detail="Only patients can book")

    # ✅ MAXIMUM 6 BOOKINGS PER SLOT
    count = await db.appointments.count_documents({
        "doctor_id": app.doctor_id,
        "date": app.date,
        "time": app.time
    })

    if count >= 6:
        raise HTTPException(
            status_code=400,
            detail="This slot is full. Please choose another slot."
        )

    patient = await db.users.find_one({"_id": ObjectId(user["id"])})

    if not patient:
        raise HTTPException(status_code=404, detail="Patient not found")

    data = app.dict()
    data["patient_id"] = user["id"]
    data["patient_name"] = app.patient_name
    data["patient_age"] = app.patient_age
    data["patient_gender"] = app.patient_gender
    data["problem"] = app.problem
    data["patient_phone"] = patient.get("phone")

    data["status"] = "pending"
    data["note"] = ""

    data["handled_by_id"] = None
    data["handled_by_name"] = None
    data["handled_by_phone"] = None
    data["handled_action"] = None

    await db.appointments.insert_one(data)

    return {"message": "Appointment booked"}


# ✅ GET MY APPOINTMENTS
@router.get("/my")
async def my_appointments(user=Depends(get_current_user)):

    data = []

    async for item in db.appointments.find({"patient_id": user["id"]}):
        item["_id"] = str(item["_id"])
        data.append(item)

    return data


# ✅ STAFF VIEW ALL
@router.get("/all")
async def all_appointments(user=Depends(get_current_user)):

    if user["role"] != "staff":
        raise HTTPException(status_code=403, detail="Only staff")

    data = []

    async for item in db.appointments.find():
        item["_id"] = str(item["_id"])
        data.append(item)

    return data





# ✅ STAFF HISTORY
@router.get("/history")
async def appointment_history(user=Depends(get_current_user)):

    if user["role"] != "staff":
        raise HTTPException(status_code=403, detail="Only staff")

    data = []

    async for item in db.appointments.find().sort("date", -1):

        item["_id"] = str(item["_id"])

        data.append(item)

    return data









# ✅ UPDATE STATUS + SEND EMAIL
@router.put("/update/{id}")
async def update_status(
    id: str,
    status: str,
    body: UpdateAppointment,
    user=Depends(get_current_user)
):

    if user["role"] != "staff":
        raise HTTPException(status_code=403, detail="Only staff")

    obj_id = ObjectId(id)

    staff = await db.users.find_one({"_id": ObjectId(user["id"])})

    result = await db.appointments.update_one(
        {"_id": obj_id},
        {
            "$set": {
                "status": status,
                "note": body.note,
                "handled_by_id": str(staff["_id"]),
                "handled_by_name": staff.get("name"),
                "handled_by_phone": staff.get("phone"),
                "handled_action": status
            }
        }
    )

    if result.modified_count == 0:
        raise HTTPException(status_code=404, detail="Appointment not found")

    appointment = await db.appointments.find_one({"_id": obj_id})

    patient = await db.users.find_one({
        "_id": ObjectId(appointment["patient_id"])
    })

    send_email(
        patient["email"],
        "Appointment Update",
        appointment_template(
            status,
            staff.get("name"),
            body.note
        )
    )

    return {"message": f"Appointment {status} and email sent"}