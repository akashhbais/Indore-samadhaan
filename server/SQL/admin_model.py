import uuid
from sqlalchemy import Column, Integer, String, DateTime, Enum, JSON
from sqlalchemy.dialects.postgresql import UUID
from .base import Base

class Admin(Base):
    __tablename__ = "admins"
    
    email = Column(String, primary_key=True, index=True, unique=True)
    name = Column(String)
    aadhar = Column(String, unique=True)
    house_number = Column(String)
    ward_number = Column(Integer)
    area = Column(String)
    pincode = Column(Integer)
    phone_number = Column(String, unique=True)
    sector = Column(String)
    password = Column(String)