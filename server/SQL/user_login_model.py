import uuid
from sqlalchemy import Column, Integer, String, DateTime, Enum, JSON
from sqlalchemy.dialects.postgresql import UUID
from .base import Base

class UserLoginActivity(Base):
    __tablename__ = "user_login_activities"
    
    id = Column(Integer, primary_key=True, index=True)
    identifier = Column(String, index=True)
    timestamp = Column(DateTime)
    status = Column(String)