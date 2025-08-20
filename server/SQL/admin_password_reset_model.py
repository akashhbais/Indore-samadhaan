import uuid
from sqlalchemy import Column, Integer, String, DateTime, Enum, JSON
from sqlalchemy.dialects.postgresql import UUID
from .base import Base

class AdminPasswordReset(Base):
    __tablename__ = "admin_password_resets"
    
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, index=True)
    otp = Column(String)
    requested_at = Column(DateTime)
    status = Column(String)