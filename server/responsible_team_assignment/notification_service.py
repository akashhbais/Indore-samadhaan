# FILE: server/services/notification_service.py
# This service handles all outgoing SMS and WhatsApp messages using the Twilio API.

import os
from twilio.rest import Client
from dotenv import load_dotenv # <-- Import the library

# Load environment variables from the .env file
load_dotenv()

# --- Configuration ---
# It's best practice to load these from environment variables rather than hardcoding.
# For local testing, you can set them directly.
# TWILIO_ACCOUNT_SID = os.environ.get("TWILIO_ACCOUNT_SID", "YOUR_TWILIO_ACCOUNT_SID")
# TWILIO_AUTH_TOKEN = os.environ.get("TWILIO_AUTH_TOKEN", "YOUR_TWILIO_AUTH_TOKEN")
# TWILIO_PHONE_NUMBER = os.environ.get("TWILIO_PHONE_NUMBER", "+14155238886") # Your Twilio phone number
# TWILIO_WHATSAPP_NUMBER = os.environ.get("TWILIO_WHATSAPP_NUMBER", "whatsapp:+14155238886") # Your Twilio WhatsApp number

TWILIO_ACCOUNT_SID=os.getenv("TWILIO_ACCOUNT_SID")
TWILIO_AUTH_TOKEN=os.getenv("TWILIO_AUTH_TOKEN")
TWILIO_PHONE_NUMBER=os.getenv("TWILIO_PHONE_NUMBER")
TWILIO_WHATSAPP_NUMBER=os.getenv("TWILIO_WHATSAPP_NUMBER")

# Initialize the Twilio client
# This is done once when the application starts.
try:
    client = Client(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN)
    print("Twilio client initialized successfully.")
except Exception as e:
    client = None
    print(f"Error initializing Twilio client: {e}")
    print("Notifications will be disabled.")

def send_sms_notification(to_number: str, message: str):
    """
    Sends an SMS notification to a citizen's mobile number.
    """
    if not client:
        print("SMS SKIPPED: Twilio client not initialized.")
        return

    # Ensure the 'to_number' is in E.164 format (e.g., +919876543210)
    if not to_number.startswith('+'):
        to_number = f"+91{to_number}" # Assuming Indian numbers

    try:
        message_instance = client.messages.create(
            body=message,
            from_=TWILIO_PHONE_NUMBER,
            to=to_number
        )
        print(f"SMS sent successfully to {to_number}. SID: {message_instance.sid}")
    except Exception as e:
        print(f"Error sending SMS to {to_number}: {e}")

def send_whatsapp_notification(to_number: str, message: str):
    """
    Sends a WhatsApp notification to an officer's mobile number.
    """
    if not client:
        print("WhatsApp SKIPPED: Twilio client not initialized.")
        return

    # Ensure the 'to_number' is in E.164 format with the 'whatsapp:' prefix
    if not to_number.startswith('+'):
        to_number = f"+91{to_number}" # Assuming Indian numbers
    
    formatted_to_number = f"whatsapp:{to_number}"

    try:
        message_instance = client.messages.create(
            body=message,
            from_=TWILIO_WHATSAPP_NUMBER,
            to=formatted_to_number
        )
        print(f"WhatsApp message sent successfully to {formatted_to_number}. SID: {message_instance.sid}")
    except Exception as e:
        print(f"Error sending WhatsApp message to {formatted_to_number}: {e}")

