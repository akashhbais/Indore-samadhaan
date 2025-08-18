from sqlalchemy.orm import Session
from fastapi import HTTPException
from datetime import datetime

from . import models
from .notification_service import send_sms_notification

def resolve_complaint(complaint_id: int, officer_id: str, db: Session):
    """
    Allows an officer to mark a complaint as resolved, which triggers a
    feedback request to the citizen.
    """
    complaint = db.query(models.Complaint).filter(models.Complaint.complaint_id == complaint_id).first()

    if not complaint:
        raise HTTPException(status_code=404, detail="Complaint not found.")
    
    # Security check: Ensure the officer resolving the complaint is the one it's assigned to.
    if complaint.assigned_officer_id != officer_id:
        raise HTTPException(status_code=403, detail="Officer not authorized to resolve this complaint.")

    # Update complaint status and log the action
    complaint.status = "Resolved - Awaiting Feedback"
    complaint.resolved_at = datetime.utcnow()
    
    log_entry = models.ComplaintLog(
        complaint_id=complaint_id,
        action_taken=f"Marked as resolved by officer {officer_id}. Awaiting citizen feedback.",
        notes="Resolution action taken."
    )
    db.add(log_entry)
    db.commit()

    # Send feedback request to the citizen
    citizen = db.query(models.User).filter(models.User.user_id == complaint.user_id).first()
    if citizen:
        feedback_message = (
            f"Your complaint {complaint_id} has been marked as resolved. "
            f"Are you satisfied? To confirm, please visit: http://your-frontend-url/feedback/{complaint_id}"
        )
        send_sms_notification(to_number=citizen.mobile_number, message=feedback_message)

    return {"message": "Complaint marked as resolved. Feedback requested from citizen."}