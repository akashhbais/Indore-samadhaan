from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Text, ARRAY
from sqlalchemy.orm import relationship
from datetime import datetime
from database.database import Base 

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


class Complaint(Base):
    __tablename__ = "complaints"
    complaint_id = Column(Integer, primary_key=True, index=True)
    email = Column(String(50), ForeignKey("citizens.email"))
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
    citizen = relationship("Citizen", back_populates="complaints")

class ComplaintLog(Base):
    __tablename__ = "complaint_log"
    log_id = Column(Integer, primary_key=True, index=True)
    complaint_id = Column(Integer, ForeignKey("complaints.complaint_id"))
    action_taken = Column(String(255), nullable=False)
    notes = Column(Text)
    timestamp = Column(DateTime, default=datetime.utcnow)


class Citizen(Base):
    __tablename__ = "citizens"
    
    email = Column(String, primary_key=True, index=True, unique=True)
    name = Column(String)
    aadhar = Column(String, unique=True)
    house_number = Column(String)
    ward_number = Column(Integer)
    area = Column(String)
    pincode = Column(Integer)
    phone_number = Column(String, unique=True)
    password = Column(String)

    complaints = relationship("Complaint", back_populates="citizen")


class AdminLoginActivity(Base):
    __tablename__ = "admin_login_activities"
    
    id = Column(Integer, primary_key=True, index=True)
    identifier = Column(String, index=True)
    timestamp = Column(DateTime)
    status = Column(String)


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

class AdminPasswordReset(Base):
    __tablename__ = "admin_password_resets"
    
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, index=True)
    otp = Column(String)
    requested_at = Column(DateTime)
    status = Column(String)

class AdminSignupActivity(Base):
    __tablename__ = "admin_signup_activities"
    
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, index=True)
    timestamp = Column(DateTime)
    status = Column(String)

class UserLoginActivity(Base):
    __tablename__ = "user_login_activities"
    
    id = Column(Integer, primary_key=True, index=True)
    identifier = Column(String, index=True)
    timestamp = Column(DateTime)
    status = Column(String)

class UserPasswordReset(Base):
    __tablename__ = "user_password_resets"
    
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, index=True)
    otp = Column(String)
    requested_at = Column(DateTime)
    status = Column(String)

class UserSignupActivity(Base):
    __tablename__ = "user_signup_activities"
    
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, index=True)
    timestamp = Column(DateTime)
    status = Column(String)