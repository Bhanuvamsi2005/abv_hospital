# from pydantic import BaseModel

# class Appointment(BaseModel):
#     doctor_id: str
#     date: str
#     time: str

# from pydantic import BaseModel
# from typing import Optional

# class Appointment(BaseModel):
#     doctor_id: str
#     date: str
#     time: str
#     note: Optional[str] = None   # ✅ NEW FIELD

from pydantic import BaseModel
from typing import Optional

class Appointment(BaseModel):
    doctor_id: str
    date: str
    time: str

    # ✅ NEW FIELDS
    patient_name: str
    patient_age: int
    patient_gender: str
    problem: str

    # optional
    note: Optional[str] = None