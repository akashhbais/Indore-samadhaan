from pydantic import BaseModel
from datetime import datetime
from typing import List, Optional

class ComplaintCreate(BaseModel):
    user_mobile: str
    email:str
    user_name: str
    description: str
    address: str
    ward_no: int
    image_urls: Optional[List[str]] = None

class ComplaintResponse(BaseModel):
    complaint_id: Optional[int] = None
    email : Optional[str] = None
    status: Optional[str] = None
    description: Optional[str] = None
    assigned_officer_id: Optional[str] = None
    sla_deadline: Optional[datetime] = None
    resolved_at: Optional[datetime] = None
    message: Optional[str] = None
    image_urls: Optional[List[str]] = None
    class Config:
        orm_mode = True

class ResolveComplaintRequest(BaseModel):
    officer_id: str
    notes: Optional[str] = "Resolution action taken."


class ComplaintLogSchema(BaseModel):
    log_id: int
    action_taken: str
    notes: Optional[str]
    timestamp: datetime

    class Config:
        orm_mode = True

class ComplaintSchema(BaseModel):
    complaint_id: int
    description: str
    status: str
    created_at: datetime
    sla_deadline: Optional[datetime]
    resolved_at: Optional[datetime]
    ward_no: int
    address: Optional[str]
    image_urls: Optional[List[str]]
    logs: List[ComplaintLogSchema] = []

    class Config:
        orm_mode = True

class AdminComplaintResponse(BaseModel):
    complaint_id: int
    email: str
    department_id: int
    assigned_officer_id: str | None
    description: str
    address: str | None
    ward_no: int
    status: str
    created_at: datetime
    sla_deadline: datetime | None
    escalation_level: int
    resolved_at: datetime | None
    image_urls: list[str] | None

    class Config:
        orm_mode = True
