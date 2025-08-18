from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class ComplaintCreate(BaseModel):
    user_mobile: str
    user_name: str
    description: str
    address: str
    ward_no: int

class ComplaintResponse(BaseModel):
    complaint_id: int
    status: str
    description: str
    assigned_officer_id: str
    sla_deadline: datetime
    message: str

    class Config:
        # This allows the Pydantic model to read data from ORM models
        orm_mode = True