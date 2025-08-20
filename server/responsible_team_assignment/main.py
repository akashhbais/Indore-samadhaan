from datetime import datetime, timedelta
import random
from typing import Annotated, List
from fastapi import Body, FastAPI, Depends, Query, HTTPException , status
import requests
from sqlalchemy.orm import Session
from geopy.geocoders import Nominatim
from geopy.extra.rate_limiter import RateLimiter
from fastapi_utils.tasks import repeat_every
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail, To, From

from responsible_team_assignment import notification_service

# from server.responsible_team_assignment.notification_service import send_sms_notification



# Corrected relative imports
from . import models, schemas
from database.database import engine, get_db
from SQL.database import engine 
from .complaint_service import create_new_complaint
from .escalation_service import process_overdue_complaints
from dotenv import load_dotenv
import os
import requests
from fastapi import FastAPI, Query, HTTPException


from SQL.citizen_model import Citizen
from SQL.admin_model import Admin
# from SQL.complain_model import Complain
from SQL.user_login_model import UserLoginActivity
from SQL.admin_login_model import AdminLoginActivity
from SQL.user_signup_model import UserSignupActivity
from SQL.admin_signup_model import AdminSignupActivity
from SQL.user_password_reset_model import UserPasswordReset
from SQL.admin_password_reset_model import AdminPasswordReset
from SQL.base import Base 
from SQL.database import engine 


# from models.complain_model import complain
from .models import Complaint, ComplaintLog
from .schemas import ComplaintResponse
from .schemas import AdminComplaintResponse
from models.citizen_signup_model import SignUp
from models.citizen_login_model import Citizin_login
from models.admin_model import Admin_SignUp
from models.update_user_model import User_update
from models.update_admin_model import Admin_update
from models.admin_login_model import Admin_login
from models.update_User_passwod_model import ResetPasswordConfirm, ResetPasswordRequest
from models.update_admin_password_model import AdminResetPasswordRequest, AdminResetPasswordConfirm
from models.otp_verification_model import OTP_verification
from models.hashing import hash_password, verify_password
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

SENDGRID_API_KEY = os.getenv("SENDGRID_API_KEY")
SENDER_EMAIL = os.getenv("SENDER_EMAIL")
SENDGRID_TEMPLATE_ID = os.getenv("SENDGRID_TEMPLATE_ID")
if not all([SENDGRID_API_KEY, SENDER_EMAIL, SENDGRID_TEMPLATE_ID]):
    raise Exception("SendGrid credentials are not set in the environment.")
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
otp_store = {}

def generate_otp():
    """Generates a random 6-digit OTP."""
    return str(random.randint(100000, 999999))

def send_otp_email(email: str, otp: str):
    """Sends an OTP email using SendGrid's Dynamic Template."""
    print("DEBUG: Trying to send email to", email, "with otp", otp)
    message = Mail(
        from_email=From(SENDER_EMAIL),
        to_emails=To(email)
    )
    message.dynamic_template_data = {'OTP':otp}
    message.template_id = "d-50b9f5f7a2c24b958d96b220a24da4a6"

    try:
        sendgrid_client = SendGridAPIClient(SENDGRID_API_KEY)
        response = sendgrid_client.send(message)
        print(f"Email sent to {email} with status code: {response.status_code}")
        return True
    except Exception as e:
        print(f"Error sending email to {email}: {e}")
        raise HTTPException(status_code=500, detail="Failed to send OTP email.")
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
        url = f"https://us1.locationiq.com/v1/reverse.php?key=pk.8f41b0c4072410f0dfa6cba2b7049da1&lat={lat}&lon={lng}&format=json"
        response = requests.get(url)
        data = response.json()

        if "error" in data:
            return {"address": "Unable to fetch accurate address"}

        return {"address": data.get("display_name")}
    except Exception:
        raise HTTPException(status_code=502, detail="Reverse geocoding failed")

@app.get("/complaints/{email}")
def get_complaints_by_email(email: str, db: Session = Depends(get_db)):
    # First, check if the user exists
    user = db.query(Citizen).filter(Citizen.email == email).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    # Fetch complaints for that user
    complaints = db.query(Complaint).filter(Complaint.email == user.email).all()
    return complaints

@app.post("/complaints/", response_model=schemas.ComplaintResponse, status_code=201)
def create_complaint_endpoint(complaint: schemas.ComplaintCreate, db: Session = Depends(get_db)):
    """API endpoint to lodge a new complaint."""
    print(complaint)
    new_complaint = create_new_complaint(complaint, db)
    
    return ComplaintResponse(
        complaint_id=new_complaint.complaint_id,
        status=new_complaint.status,
        description=new_complaint.description,
        assigned_officer_id=new_complaint.assigned_officer_id,
        sla_deadline=new_complaint.sla_deadline,
        success=True,
        message="Complaint successfully lodged and assigned."
    )

@app.post("/run-escalation/")
def trigger_escalation(db: Session = Depends(get_db)):
    """API endpoint to manually trigger the SLA escalation check."""
    escalated_count = process_overdue_complaints(db)
    return {"message": "Escalation check completed.", "escalated_complaints": escalated_count}


## Officer complaint resolution endpoint

@app.post("/officer/resolve_complaint/{complaint_id}")
def resolve_complaint_endpoint(complaint_id: int, body: schemas.ResolveComplaintRequest, db: Session = Depends(get_db)):
    """
    An endpoint for officers to mark a complaint as resolved.
    """
    return resolve_service.resolve_complaint(complaint_id, body, db)

@app.post("/feedback/{complaint_id}")
def handle_citizen_feedback_endpoint(complaint_id: int, satisfied: Annotated[bool, Body(embed=True)], db: Session = Depends(get_db)):
    """
    API endpoint for citizens to provide feedback on a resolved complaint.
    This now calls the dedicated feedback service to handle the logic.
    """
    return escalation_service.process_overdue_complaints(complaint_id, satisfied, db)


@app.post('/user/request-signup-otp')
def request_user_signup_otp(signup: SignUp, db: Session = Depends(get_db)):
    """Initiates user signup and stores signup activity."""
    if db.query(Citizen).filter(Citizen.email == signup.email).first():
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="Email ID already exists.")

    otp = generate_otp()
    identifier = signup.email

    new_signup_activity = UserSignupActivity(
        email=identifier, # email store ho raha hai signup activity me
        timestamp=datetime.utcnow(),
        status="pending"
    )
    db.add(new_signup_activity)
    db.commit()

    otp_store[identifier] = {
        'otp': otp,
        'expires_at': datetime.utcnow() + timedelta(minutes=5),
        'user_data': signup.model_dump()
    }
    
    # Ab email ka upyog send_otp_email me hoga
    send_otp_email(email=identifier, otp=otp)
    
    return {'message': 'OTP sent successfully. Please verify to complete signup.', 'identifier': identifier}

@app.post('/user/verify-signup-otp')
def verify_user_signup_otp(otp_verification: OTP_verification, db: Session = Depends(get_db)):
    """Verifies OTP and completes user signup."""
    stored_otp_data = otp_store.get(otp_verification.identifier)
    
    if not stored_otp_data or stored_otp_data['otp'] != otp_verification.otp:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail='Incorrect OTP or no OTP requested.')

    if datetime.utcnow() > stored_otp_data['expires_at']:
        del otp_store[otp_verification.identifier]
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail='OTP has expired. Please request a new one.')
    
    user_data = stored_otp_data['user_data']
    hashed_password = hash_password(user_data['password'])

    new_citizen = Citizen(
        email=user_data['email'],
        name=user_data['name'],
        aadhar=user_data['aadhar'],
        house_number=user_data['house_number'],
        ward_number=user_data['ward_number'],
        area=user_data['area'],
        pincode=user_data['pincode'],
        phone_number=str(user_data['phone_number']),
        password=hashed_password
    )
    db.add(new_citizen)
    db.commit()

    # Update signup activity status
    signup_activity = db.query(UserSignupActivity).filter(UserSignupActivity.email == user_data['email']).order_by(UserSignupActivity.timestamp.desc()).first()
    if signup_activity:
        signup_activity.status = "completed"
        db.commit()

    del otp_store[otp_verification.identifier]
    return {"message": "User created successfully",'user' : new_citizen }

@app.post('/login')
def citizen_login(citizen_login: Citizin_login, db: Session = Depends(get_db)):
    """Authenticates a citizen and logs the login activity."""
    user_found = db.query(Citizen).filter(
        (Citizen.email == citizen_login.identifier) |
        (Citizen.phone_number == citizen_login.identifier)
    ).first()

    login_status = "failed"
    if user_found and verify_password(citizen_login.password, user_found.password):
        login_status = "success"
        
    new_login_activity = UserLoginActivity(
        identifier=citizen_login.identifier,
        timestamp=datetime.utcnow(),
        status=login_status
    )
    db.add(new_login_activity)
    db.commit()

    if login_status == "failed":
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail='Invalid credentials'
        )
    print(user_found.name)
    print(user_found.email)
    return {'message': 'Login successful', 'data': user_found}

@app.post('/admin/request-signup-otp')
def request_admin_signup_otp(admin: Admin_SignUp, db: Session = Depends(get_db)):
    """Initiates admin signup and stores signup activity."""
    if db.query(Admin).filter(Admin.email == admin.email).first():
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="Admin with same email already exists.")
    
    otp = generate_otp()
    identifier = admin.email

    new_signup_activity = AdminSignupActivity(
        email=identifier,
        timestamp=datetime.utcnow(),
        status="pending"
    )
    db.add(new_signup_activity)
    db.commit()

    otp_store[identifier] = {
        'otp': otp,
        'expires_at': datetime.utcnow() + timedelta(minutes=5),
        'admin_data': admin.model_dump()
    }
    
    send_otp_email(email=identifier, otp=otp)
    
    return {'message': 'OTP sent successfully. Please verify to complete admin signup.', 'identifier': identifier}

@app.post('/admin/verify-signup-otp')
def verify_admin_signup_otp(otp_verification: OTP_verification, db: Session = Depends(get_db)):
    """Verifies OTP and completes admin signup."""
    stored_otp_data = otp_store.get(otp_verification.identifier)

    if not stored_otp_data or stored_otp_data['otp'] != otp_verification.otp:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail='Incorrect OTP or no OTP requested.')

    if datetime.utcnow() > stored_otp_data['expires_at']:
        del otp_store[otp_verification.identifier]
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail='OTP has expired. Please request a new one.')

    admin_data = stored_otp_data['admin_data']
    hashed_password = hash_password(admin_data['password'])

    new_admin = Admin(
        email=admin_data['email'],
        name=admin_data['name'],
        aadhar=admin_data['aadhar'],
        house_number=admin_data['house_number'],
        ward_number=admin_data['ward_number'],
        area=admin_data['area'],
        pincode=admin_data['pincode'],
        phone_number=str(admin_data['phone_number']),
        sector=admin_data['sector'],
        password=hashed_password
    )
    db.add(new_admin)
    db.commit()

    # Update signup activity status
    signup_activity = db.query(AdminSignupActivity).filter(AdminSignupActivity.email == admin_data['email']).order_by(AdminSignupActivity.timestamp.desc()).first()
    if signup_activity:
        signup_activity.status = "completed"
        db.commit()

    del otp_store[otp_verification.identifier]
    return {'message': 'Admin signup successful', 'data': new_admin}

@app.post('/admin/login')
def admin_login(admin_login: Admin_login, db: Session = Depends(get_db)):
    """Authenticates an admin and logs the login activity."""
    admin_found = db.query(Admin).filter(
        (Admin.email == admin_login.identifier) |
        (Admin.phone_number == admin_login.identifier)
    ).first()
    
    login_status = "failed"
    if admin_found and verify_password(admin_login.password, admin_found.password):
        login_status = "success"

    new_login_activity = AdminLoginActivity(
        identifier=admin_login.identifier,
        timestamp=datetime.utcnow(),
        status=login_status
    )
    db.add(new_login_activity)
    db.commit()

    if login_status == "failed":
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail='Invalid credentials'
        )
    print(admin_found.name)
    print(admin_found.email)

    return {'message': 'Login successful', 'data' : admin_found}

@app.patch('/user/update-profile')
def update_user_profile(user_update: User_update, db: Session = Depends(get_db)):
    """Updates a user's profile with partial data."""
    user = db.query(Citizen).filter(Citizen.email == user_update.email).first()

    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")

    if not verify_password(user_update.password, user.password):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")

    update_data = user_update.model_dump(exclude_unset=True)
    if 're_password' in update_data:
        del update_data['re_password']
    if 'password' in update_data:
        del update_data['password']

    for key, value in update_data.items():
        if value is not None:
            if key == 'phone_number':
                setattr(user, key, str(value))
            else:
                setattr(user, key, value)
    
    db.commit()
    db.refresh(user)
    
    return {"message": "User profile updated successfully"}


@app.patch('/admin/update-profile')
def update_admin_profile(admin_update: Admin_update, db: Session = Depends(get_db)):
    """Updates an admin's profile with partial data."""
    admin = db.query(Admin).filter(Admin.email == admin_update.email).first()
    
    if not admin:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Admin not found")
    
    if not verify_password(admin_update.password, admin.password):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")
    
    update_data = admin_update.model_dump(exclude_unset=True)
    if 're_password' in update_data:
        del update_data['re_password']
    if 'password' in update_data:
        del update_data['password']

    for key, value in update_data.items():
        if value is not None:
            if key == 'phone_number':
                setattr(admin, key, str(value))
            else:
                setattr(admin, key, value)
    
    db.commit()
    db.refresh(admin)
    
    return {"message": "Admin profile updated successfully"}

@app.post('/user/request-password-reset')
def request_user_password_reset(reset_request: ResetPasswordRequest, db: Session = Depends(get_db)):
    """Initiates a password reset process for a citizen."""
    user = db.query(Citizen).filter(Citizen.email == reset_request.email).first()
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")

    otp = generate_otp()
    
    # Store the reset request in the database
    new_reset_request = UserPasswordReset(
        email=reset_request.email,
        otp=otp,
        requested_at=datetime.utcnow(),
        status="pending"
    )
    db.add(new_reset_request)
    db.commit()
    
    send_otp_email(reset_request.email, otp)
    
    return {"message": "Password reset OTP sent to your email."}

@app.post('/user/reset-password-confirm')
def confirm_user_password_reset(reset_confirm: ResetPasswordConfirm, db: Session = Depends(get_db)):
    """Resets the citizen's password using a valid OTP."""
    reset_record = db.query(UserPasswordReset).filter(
        UserPasswordReset.email == reset_confirm.email,
        UserPasswordReset.otp == reset_confirm.otp
    ).order_by(UserPasswordReset.requested_at.desc()).first()

    if not reset_record or reset_record.status == 'completed' or reset_record.status == 'expired':
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid or expired OTP.")
    
    # Assuming OTPs expire after 5 minutes
    if datetime.utcnow() > reset_record.requested_at + timedelta(minutes=5):
        reset_record.status = "expired"
        db.commit()
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="OTP has expired. Please request a new one.")

    user = db.query(Citizen).filter(Citizen.email == reset_confirm.email).first()
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found.")
        
    user.password = hash_password(reset_confirm.new_password)
    reset_record.status = "completed"
    db.commit()
    
    return {"message": "Password reset successful."}

@app.post('/admin/request-password-reset')
def request_admin_password_reset(reset_request: AdminResetPasswordRequest, db: Session = Depends(get_db)):
    """Initiates a password reset process for an admin."""
    admin = db.query(Admin).filter(Admin.email == reset_request.email).first()
    if not admin:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Admin not found")

    otp = generate_otp()
    
    # Store the reset request in the database
    new_reset_request = AdminPasswordReset(
        email=reset_request.email,
        otp=otp,
        requested_at=datetime.utcnow(),
        status="pending"
    )
    db.add(new_reset_request)
    db.commit()
    
    send_otp_email(reset_request.email, otp)
    
    return {"message": "Admin password reset OTP sent to your email."}

@app.post('/admin/reset-password-confirm')
def confirm_admin_password_reset(reset_confirm: AdminResetPasswordConfirm, db: Session = Depends(get_db)):
    """Resets the admin's password using a valid OTP."""
    reset_record = db.query(AdminPasswordReset).filter(
        AdminPasswordReset.email == reset_confirm.email,
        AdminPasswordReset.otp == reset_confirm.otp
    ).order_by(AdminPasswordReset.requested_at.desc()).first()

    if not reset_record or reset_record.status == 'completed' or reset_record.status == 'expired':
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid or expired OTP.")
    
    # Assuming OTPs expire after 5 minutes
    if datetime.utcnow() > reset_record.requested_at + timedelta(minutes=5):
        reset_record.status = "expired"
        db.commit()
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="OTP has expired. Please request a new one.")

    admin = db.query(Admin).filter(Admin.email == reset_confirm.email).first()
    if not admin:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Admin not found.")
        
    admin.password = hash_password(reset_confirm.new_password)
    reset_record.status = "completed"
    db.commit()
    
    return {"message": "Admin password reset successful."}


@app.get("/complaints/admin/{adminId}")
def get_complaints_by_officer(adminId: str, db: Session = Depends(get_db)):
    complaints = db.query(Complaint).filter(Complaint.assigned_officer_id == adminId).all()
    if not complaints:
        raise HTTPException(status_code=404, detail="No complaints found for this officer")
    return complaints


@app.get("/complaints/", response_model=List[schemas.ComplaintSchema])
def get_complaints_by_email(email: str, db: Session = Depends(get_db)):
    complaints = db.query(Complaint).filter(Complaint.email == email).all()
    if not complaints:
        raise HTTPException(status_code=404, detail="No complaints found for this user")

    # Attach logs for each complaint
    for complaint in complaints:
        logs = db.query(ComplaintLog).filter(ComplaintLog.complaint_id == complaint.complaint_id).all()
        complaint.logs = logs  

    return complaints

@app.get("/admin/all-complaints", response_model=List[AdminComplaintResponse])
def get_all_complaints(db: Session = Depends(get_db)):
    complaints = db.query(Complaint).all()
    if not complaints:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="No complaints found"
        )
    return complaints

@app.get("/ward/{ward_no}", response_model=List[AdminComplaintResponse])
def get_complaints_by_ward(ward_no: int, db: Session = Depends(get_db)):
    complaints = db.query(Complaint).filter(Complaint.ward_no == ward_no).all()

    if not complaints:
        raise HTTPException(
            status_code=404,
            detail=f"No complaints found for ward number {ward_no}"
        )
    return complaints