from sqlalchemy.orm import Session
from fastapi import Depends, HTTPException
from datetime import datetime

from database.database import get_db
from responsible_team_assignment.schemas import ResolveComplaintRequest

from . import models
from .notification_service import send_sms_notification

def resolve_complaint(
    complaint_id: int,
    body: ResolveComplaintRequest,
    db: Session = Depends(get_db)
):
    complaint = db.query(models.Complaint).filter(
        models.Complaint.complaint_id == complaint_id
    ).first()

    if not complaint:
        raise HTTPException(status_code=404, detail="Complaint not found")

    # Security check: only assigned officer can resolve
    if complaint.assigned_officer_id != body.officer_id:
        raise HTTPException(status_code=403, detail="Not authorized to resolve this complaint")

    # Update complaint status
    complaint.status = "Resolved - Awaiting Feedback"
    complaint.resolved_at = datetime.utcnow()

    # Create log entry
    log_entry = models.ComplaintLog(
        complaint_id=complaint_id,
        action_taken=f"Complaint resolved by officer {body.officer_id}",
        notes=body.notes
    )
    db.add(log_entry)
    db.commit()
    db.refresh(complaint)

    # Send feedback request to the citizen
    citizen = db.query(models.Citizen).filter(models.Citizen.email == complaint.email).first()
    if citizen:
        feedback_message = (
            f"Your complaint {complaint_id} has been marked as resolved. "
            f"Are you satisfied? To confirm, please visit: http://your-frontend-url/feedback/{complaint_id}"
        )
        send_sms_notification(to_number=citizen.phone_number, message=feedback_message)
    return {
        'data': complaint,
        'message': 'Complaint resolved successfully',
        'success': True
    }
    