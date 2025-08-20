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
    success: bool
    message: str

    class Config:
        # This allows the Pydantic model to read data from ORM models
        orm_mode = True

# complaint_id=new_complaint.complaint_id,
#         status=new_complaint.status,
#         description=new_complaint.description,
#         assigned_officer_id=new_complaint.assigned_officer_id,
#         sla_deadline=new_complaint.sla_deadline,
#         success=True,
#         message="Complaint successfully lodged and assigned."