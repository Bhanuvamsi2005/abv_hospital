from pydantic import BaseModel
from typing import Optional

class Announcement(BaseModel):
    title: str
    message: str
    image: Optional[str] = None