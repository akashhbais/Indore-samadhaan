from typing import Annotated
from fastapi import Body, FastAPI, Depends, Query, HTTPException
import requests
from sqlalchemy.orm import Session
from geopy.geocoders import Nominatim
from geopy.extra.rate_limiter import RateLimiter
from fastapi_utils.tasks import repeat_every

# Corrected relative imports
from . import models, schemas
from ..database.database import engine, get_db
from .complaint_service import create_new_complaint
from .escalation_service import process_overdue_complaints
from dotenv import load_dotenv
import os
import requests
from fastapi import FastAPI, Query, HTTPException

# CORS middleware
from fastapi.middleware.cors import CORSMiddleware

from . import resolve_service, escalation_service

# Create all database tables
models.Base.metadata.create_all(bind=engine)

# Geolocator setup
_geolocator = Nominatim(user_agent="revgeo-bus-tracker", timeout=10)
_reverse = RateLimiter(_geolocator.reverse, min_delay_seconds=1)

load_dotenv()

app = FastAPI()

origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],   # or restrict to `origins`
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Step 2: Create a startup event to start the scheduler
@app.on_event("startup")
@repeat_every(seconds=60)  # Run every 60 seconds
def schedule_escalation_check():
    """
    This function will be run in the background automatically when the app starts.
    """
    escalation_service.process_overdue_complaints()

@app.get("/get-address")
def get_address(lat: float = Query(...), lng: float = Query(...)):
    try:
        url = f"https://us1.locationiq.com/v1/reverse.php?key={KEY}&lat={lat}&lon={lng}&format=json"
        response = requests.get(url)
        data = response.json()

        if "error" in data:
            return {"address": "Unable to fetch accurate address"}

        return {"address": data.get("display_name")}
    except Exception:
        raise HTTPException(status_code=502, detail="Reverse geocoding failed")



@app.post("/complaints/", response_model=schemas.ComplaintResponse, status_code=201)
def create_complaint_endpoint(complaint: schemas.ComplaintCreate, db: Session = Depends(get_db)):
    """API endpoint to lodge a new complaint."""
    new_complaint = create_new_complaint(complaint, db)
    
    return schemas.ComplaintResponse(
        complaint_id=new_complaint.complaint_id,
        status=new_complaint.status,
        description=new_complaint.description,
        assigned_officer_id=new_complaint.assigned_officer_id,
        sla_deadline=new_complaint.sla_deadline,
        message="Complaint successfully lodged and assigned."
    )

@app.post("/run-escalation/")
def trigger_escalation(db: Session = Depends(get_db)):
    """API endpoint to manually trigger the SLA escalation check."""
    escalated_count = process_overdue_complaints(db)
    return {"message": "Escalation check completed.", "escalated_complaints": escalated_count}


## Officer complaint resolution endpoint

@app.post("/officer/resolve_complaint/{complaint_id}")
def resolve_complaint_endpoint(complaint_id: int, officer_id: Annotated[str, Body()], db: Session = Depends(get_db)):
    """
    An endpoint for officers to mark a complaint as resolved.
    """
    return resolve_service.resolve_complaint(complaint_id, officer_id, db)

@app.post("/feedback/{complaint_id}")
def handle_citizen_feedback(complaint_id: int, satisfied: Annotated[bool, Body()], db: Session = Depends(get_db)):
    """
    An endpoint for citizens to provide feedback on a resolved complaint.
    """
    complaint = db.query(models.Complaint).filter(models.Complaint.complaint_id == complaint_id).first()

    if not complaint:
        raise HTTPException(status_code=404, detail="Complaint not found.")

    if complaint.status != "Resolved - Awaiting Feedback":
        raise HTTPException(status_code=400, detail="Complaint is not awaiting feedback.")

    if satisfied:
        complaint.status = "Closed"
        log_entry = models.ComplaintLog(
            complaint_id=complaint_id,
            action_taken="Citizen confirmed satisfaction. Complaint closed.",
        )
        db.add(log_entry)
        db.commit()
        return {"message": "Thank you for your feedback. The complaint is now closed."}
    else:
        # Reopen and escalate the complaint
        complaint.status = "Reopened"
        log_entry = models.ComplaintLog(
            complaint_id=complaint_id,
            action_taken="Citizen was not satisfied. Complaint has been reopened and escalated.",
        )
        db.add(log_entry)
        
        # Escalate to the superior officer
        current_officer = db.query(models.Officer).filter(models.Officer.officer_id == complaint.assigned_officer_id).first()
        if current_officer and current_officer.superior_officer_id:
            complaint.assigned_officer_id = current_officer.superior_officer_id
            complaint.escalation_level += 1
        
        db.commit()
        return {"message": "We are sorry you were not satisfied. The complaint has been reopened and escalated."}
