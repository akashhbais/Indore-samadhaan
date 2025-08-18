from pydantic import BaseModel
from datetime import datetime
from typing import List, Optional

class ComplaintCreate(BaseModel):
    user_mobile: str
    user_name: str
    description: str
    address: str
    ward_no: int
    image_urls: Optional[List[str]] = None

class ComplaintResponse(BaseModel):
    complaint_id: int
    status: str
    description: str
    assigned_officer_id: str
    sla_deadline: datetime
    message: str
    image_urls: Optional[List[str]] = None

    class Config:
        orm_mode = True