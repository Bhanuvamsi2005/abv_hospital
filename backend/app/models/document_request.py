from pydantic import BaseModel
from typing import List, Optional


class DocumentRequest(BaseModel):

    patient_name: str
    patient_phone: str

    admit_date: str
    discharge_date: str

    purpose: str

    documents: List[str]

    patient_note: Optional[str] = ""

    staff_note: Optional[str] = ""

    status: Optional[str] = "pending"
