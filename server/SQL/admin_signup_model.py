from .base import Base
import uuid
from sqlalchemy import Column, Integer, String, DateTime, Enum, JSON
from sqlalchemy.dialects.postgresql import UUID

class AdminSignupActivity(Base):
    __tablename__ = "admin_signup_activities"
    
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, index=True)
    timestamp = Column(DateTime)
    status = Column(String)
