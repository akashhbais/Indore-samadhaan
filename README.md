## Indore Samadhan: A Next-Generation Grievance Redressal System

Indore Samadhan is an intelligent, automated, and transparent grievance redressal platform designed to revolutionize the citizen-government interface for the Indore Municipal Corporation (IMC). This project addresses the critical challenges of the existing 'Jansunwai' system by leveraging AI, a robust architectural model, and a proactive communication strategy to ensure timely and accountable resolutions.

## The Challenge: Indore's Governance Paradox
While acclaimed as India's "Best Smart City," Indore's governance is undermined by an outdated citizen grievance platform that suffers from:

Misrouting & Manual Delays: Complaints are manually sorted, leading to errors and significant delays.

No Accountability: A lack of Service Level Agreement (SLA) tracking means there are no enforceable timelines for resolution.

Weak Citizen Feedback Loop: There is no effective way to confirm if a "resolved" issue has actually satisfied the citizen.

Limited Accessibility & Transparency: The platform is difficult for non-tech-savvy citizens to use, and there is no clear way to track a complaint's status.

## Our Solution: An Intelligent & Automated Engine
Indore Samadhan is an end-to-end service delivery platform built on four key pillars:

AI-Powered Triage Engine: Automatically classifies complaints in plain language and routes them to the correct department.

Automated Escalation Hierarchy: Enforces accountability with time-bound SLAs and automatic escalation up a four-level chain of command.

Responsibility-Based Assignment: Uses a robust Jurisdictional Matrix to assign every complaint to the single, correct officer responsible for that service in that specific ward.

Omnichannel Communication: Keeps citizens and officers informed with proactive SMS/WhatsApp notifications and a simple tracking portal.

## Key Features
🧠 AI-Powered Triage Engine
The system uses a fine-tuned BERT (Transformer) language model to understand the context of a citizen's complaint. It was trained on a custom-generated dataset of over 1 million records, making it highly accurate and attuned to the local context of Indore.

📈 Automated Escalation Hierarchy
If a complaint is not resolved within its SLA, an integrated background scheduler automatically escalates it to the officer's superior. This process repeats up the full, four-level hierarchy:
Zonal Officer ➡️ Department Head ➡️ Additional Commissioner ➡️ Municipal Commissioner

✅ Closed-Loop Citizen Feedback
This is the system's most powerful feature for accountability.

An officer marks a complaint as resolved.

The system automatically sends an SMS to the citizen asking for feedback.

If the citizen is satisfied, the case is closed.

If the citizen is not satisfied, the complaint is automatically reopened and escalated to the officer's superior with a new, shorter deadline.

📲 Proactive Notifications
The system uses the Twilio API to push real-time updates:

Citizens receive an SMS with a tracking ID upon submission, updates on escalations, and a prompt for feedback.

Officers receive a WhatsApp alert for every new or escalated complaint assigned to them.

## Tech Stack
Backend: FastAPI (Python)

Database: PostgreSQL

AI/NLP: Hugging Face Transformers (BERT)

Notifications: Twilio API

Scheduling: Integrated Background Scheduler (fastapi-utils)

Dependencies: SQLAlchemy, Psycopg2, python-dotenv

## Getting Started
Prerequisites
Python 3.10+

PostgreSQL

A Twilio account (for notifications)

A trained Hugging Face BERT model saved in a triage_engine folder.

1. Clone the Repository
git clone https://github.com/akashhbais/Indore-samadhaan.git
cd indore-samadhan/server

2. Set Up a Virtual Environment
python -m venv venv
source venv/bin/activate  # On Windows, use `venv\Scripts\activate`

3. Install Dependencies
pip install -r requirements.txt

4. Configure Environment Variables
Create a .env file in the server directory and add your credentials.

# server/.env

# PostgreSQL Database URL
DATABASE_URL="postgresql://postgres:root@localhost/jansunwai"

# Twilio Credentials
TWILIO_ACCOUNT_SID="YOUR_TWILIO_ACCOUNT_SID"<br>
TWILIO_AUTH_TOKEN="YOUR_TWILIO_AUTH_TOKEN"<br>
TWILIO_PHONE_NUMBER="+1..."<br>
TWILIO_WHATSAPP_NUMBER="whatsapp:+1..."<br>

5. Set Up the Database
Ensure your PostgreSQL server is running and you have created a database named jansunwai.

Run the provided SQL scripts in pgAdmin or another tool in the following order:

departments table script.

officers table script.

jurisdictional_matrix script.

6. Run the Application
From the server directory, run the Uvicorn command:

uvicorn responsible_team_assignment.main:app --reload

The application will be available at http://127.0.0.1:8000.

## API Endpoints
POST /complaints/: Lodge a new complaint.

POST /officer/resolve_complaint/{complaint_id}: An officer marks a complaint as resolved.

POST /feedback/{complaint_id}: A citizen provides feedback on a resolved complaint.

GET /complaints/{complaint_id}/history: (For the tracking portal) Fetches the complete history of a complaint.

## Get in Touch
We welcome contributions, feedback, and inquiries. If you have any questions or would like to contribute to the project, please don't hesitate to reach out.

Contact: Akash Bais - akashbais41203@gmail.com
