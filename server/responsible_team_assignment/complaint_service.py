# FILE: server/app/services/complaint_service.py
# This service now includes integrated SMS and WhatsApp notifications.

from sqlalchemy.orm import Session
from fastapi import HTTPException
from datetime import datetime, timedelta

from . import models
from . import schemas
from . import triage_engine
from .triage_engine import triage_engine
# Step 1: Add the new import for the notification functions
from .notification_service import send_sms_notification, send_whatsapp_notification

def create_new_complaint(complaint: schemas.ComplaintCreate, db: Session):
    """
    Handles the full logic of creating, classifying, assigning a complaint,
    and now, sending notifications.
    Complaint.email → Citizen.email (FK relationship).
    """

    # --- Citizen lookup or creation ---
    citizen = db.query(models.Citizen).filter(models.Citizen.email == complaint.email).first()
    if not citizen:
        citizen = models.Citizen(
            email=complaint.email,
            name=complaint.user_name,
            phone_number=complaint.user_mobile,
            aadhar=complaint.aadhar,
            house_number=complaint.house_number,
            ward_number=complaint.ward_no,
            area=complaint.area,
            pincode=complaint.pincode,
            password=complaint.password  # ⚠️ should be hashed before saving!
        )
        db.add(citizen)
        db.commit()
        db.refresh(citizen)

    # --- Department prediction ---
    predicted_dept_name = triage_engine.predict(complaint.description)
    print(f"Predicted department: {predicted_dept_name}")
    department = db.query(models.Department).filter(models.Department.name == predicted_dept_name).first()
    if not department:
        raise HTTPException(status_code=404, detail=f"Predicted department '{predicted_dept_name}' not found.")

    department_id = department.department_id
    assignment = db.query(models.JurisdictionalMatrix).filter(
        models.JurisdictionalMatrix.ward_no == complaint.ward_no,
        models.JurisdictionalMatrix.department_id == department_id
    ).first()

    if not assignment:
        raise HTTPException(status_code=404, detail=f"No officer for '{predicted_dept_name}' in Ward {complaint.ward_no}.")

    assigned_officer_id = assignment.officer_id
    sla_deadline = datetime.utcnow() + timedelta(hours=department.sla_hours)

    # --- Create complaint ---
    new_complaint = models.Complaint(
        email=citizen.email,  # ✅ FK to Citizen
        department_id=department_id,
        assigned_officer_id=assigned_officer_id,
        description=complaint.description,
        address=complaint.address,
        ward_no=complaint.ward_no,
        status="Assigned",
        sla_deadline=sla_deadline
    )
    db.add(new_complaint)
    db.commit()
    db.refresh(new_complaint)

    # --- Log entry ---
    log_entry = models.ComplaintLog(
        complaint_id=new_complaint.complaint_id,
        action_taken=f"Complaint assigned to officer {assigned_officer_id}"
    )
    db.add(log_entry)
    db.commit()

    # --- Notifications ---
    assigned_officer = db.query(models.Officer).filter(models.Officer.officer_id == assigned_officer_id).first()

    if assigned_officer:
        # Notify citizen
        citizen_message = f"Your complaint has been lodged with Indore Samadhan. Your tracking ID is {new_complaint.complaint_id}. We will keep you updated."
        send_sms_notification(to_number=citizen.phone_number, message=citizen_message)

        # Notify officer
        officer_message = f"New Complaint Assigned:\nID: {new_complaint.complaint_id}\nWard: {new_complaint.ward_no}\nDesc: {new_complaint.description}\nSLA: {department.sla_hours} hours."
        print(f"Sending WhatsApp notification to officer {assigned_officer_id} at {assigned_officer.mobile_number}")
        send_whatsapp_notification(to_number=assigned_officer.mobile_number, message=officer_message)
    else:
        print(f"WARNING: Could not find officer with ID {assigned_officer_id} to send notification.")

    return new_complaint
