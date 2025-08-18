from sqlalchemy.orm import Session
from datetime import datetime, timedelta

from . import models
from ..database.database import SessionLocal # Import SessionLocal to create a new session
from .notification_service import send_sms_notification, send_whatsapp_notification

def process_overdue_complaints():
    """
    Finds all complaints that have breached their SLA, escalates them,
    and sends notifications. This function now creates its own DB session.
    """
    db: Session = SessionLocal()
    try:
        print(f"[{datetime.utcnow()}] Running background escalation check...")
        
        overdue_complaints = db.query(models.Complaint).filter(
            models.Complaint.sla_deadline < datetime.utcnow(),
            models.Complaint.status.in_(["Assigned", "Escalated", "Reopened"])
        ).all()
        
        escalated_count = 0
        for complaint in overdue_complaints:
            current_officer = db.query(models.Officer).filter(models.Officer.officer_id == complaint.assigned_officer_id).first()
            
            if current_officer and current_officer.superior_officer_id:
                original_officer_id = complaint.assigned_officer_id
                new_officer_id = current_officer.superior_officer_id
                
                complaint.assigned_officer_id = new_officer_id
                complaint.escalation_level += 1
                complaint.status = "Escalated"
                complaint.sla_deadline = datetime.utcnow() + timedelta(hours=24)

                log_entry = models.ComplaintLog(
                    complaint_id=complaint.complaint_id,
                    action_taken=f"SLA Breached. Escalated from {original_officer_id} to {new_officer_id}."
                )
                db.add(log_entry)
                
                new_officer = db.query(models.Officer).filter(models.Officer.officer_id == new_officer_id).first()
                citizen = db.query(models.User).filter(models.User.user_id == complaint.user_id).first()

                if new_officer and citizen:
                    officer_message = (
                        f"Escalated Complaint Assigned:\nID: {complaint.complaint_id}\n"
                        f"Desc: {complaint.description}"
                    )
                    send_whatsapp_notification(to_number=new_officer.mobile_number, message=officer_message)

                    citizen_message = (
                        f"Update on Complaint ID {complaint.complaint_id}: "
                        f"Your issue has been escalated to a superior officer for action."
                    )
                    send_sms_notification(to_number=citizen.mobile_number, message=citizen_message)

                print(f"Escalated complaint {complaint.complaint_id} to {new_officer_id}")
                escalated_count += 1
            else:
                print(f"Complaint {complaint.complaint_id} is at the highest escalation level.")

        db.commit()
        print(f"Escalation check complete. {escalated_count} complaints escalated.")
    finally:
        db.close()