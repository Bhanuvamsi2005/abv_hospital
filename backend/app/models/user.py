# from pydantic import BaseModel, EmailStr

# class User(BaseModel):
#     name: str
#     email: EmailStr
#     password: str
#     role: str

from pydantic import BaseModel, EmailStr

class User(BaseModel):
    name: str
    email: EmailStr
    password: str
    role: str
    phone: str   # ✅ NEW FIELD