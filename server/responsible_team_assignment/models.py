from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Text, ARRAY
from sqlalchemy.orm import relationship
from datetime import datetime
from ..database.database import Base # Corrected import

class Department(Base):
    __tablename__ = "departments"
    department_id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), unique=True, nullable=False)
    sla_hours = Column(Integer, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)

class Officer(Base):
    __tablename__ = "officers"
    officer_id = Column(String(50), primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    department_id = Column(Integer, ForeignKey("departments.department_id"))
    role = Column(String(100))
    mobile_number = Column(String(15), unique=True)
    superior_officer_id = Column(String(50), ForeignKey("officers.officer_id"), nullable=True)
    department = relationship("Department")
    superior = relationship("Officer", remote_side=[officer_id])

class JurisdictionalMatrix(Base):
    __tablename__ = "jurisdictional_matrix"
    matrix_id = Column(Integer, primary_key=True, index=True)
    ward_no = Column(Integer, nullable=False, index=True)
    department_id = Column(Integer, ForeignKey("departments.department_id"), index=True)
    officer_id = Column(String(50), ForeignKey("officers.officer_id"))

class User(Base):
    __tablename__ = "users"
    user_id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    mobile_number = Column(String(15), unique=True, nullable=False, index=True)
    created_at = Column(DateTime, default=datetime.utcnow)

class Complaint(Base):
    __tablename__ = "complaints"
    complaint_id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.user_id"))
    department_id = Column(Integer, ForeignKey("departments.department_id"))
    assigned_officer_id = Column(String(50), ForeignKey("officers.officer_id"))
    description = Column(Text, nullable=False)
    address = Column(String(255))
    ward_no = Column(Integer, nullable=False)
    status = Column(String(50), default="Lodged")
    created_at = Column(DateTime, default=datetime.utcnow)
    sla_deadline = Column(DateTime)
    escalation_level = Column(Integer, default=0)
    resolved_at = Column(DateTime, nullable=True)
    image_urls = Column(ARRAY(String), nullable=True)
    officer = relationship("Officer")
    user = relationship("User")

class ComplaintLog(Base):
    __tablename__ = "complaint_log"
    log_id = Column(Integer, primary_key=True, index=True)
    complaint_id = Column(Integer, ForeignKey("complaints.complaint_id"))
    action_taken = Column(String(255), nullable=False)
    notes = Column(Text)
    timestamp = Column(DateTime, default=datetime.utcnow)