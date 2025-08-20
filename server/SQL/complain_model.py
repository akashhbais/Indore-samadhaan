import uuid
from sqlalchemy import Column, Integer, String, DateTime, Enum, JSON
from sqlalchemy.dialects.postgresql import UUID
from .base import Base

class Complain(Base):
    __tablename__ = "complains"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    title = Column(String(200))
    complain_description = Column(String())
    name = Column(String)
    status = Column(Enum('PENDING', 'IN_PROGRESS', 'RESOLVED', 'ESCALATED', name='complain_status'))
    address = Column(String)
    email = Column(String)
    phone_number = Column(String)
    gender = Column(Enum('Male', 'Female', 'other', name='user_gender'))
    age = Column(Integer)
    aadhar_card = Column(String)
    location = Column(JSON)
    photo_urls = Column(JSON)
    created_at = Column(DateTime)
    deadline = Column(DateTime, nullable=True)
    assigned_admin_email = Column(String, nullable=True) 
    # Adding these fields to the Complain model to store routing data
    complain_pincode = Column(Integer)
    complain_ward_number = Column(Integer)
    complain_sector = Column(String)