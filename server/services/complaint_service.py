from database.db_connection import execute_query
from datetime import datetime, timedelta

def create_complaint(citizen_contact, complaint_text, ward_no):
    """
    Logs a new complaint in the system and creates an initial history record.
    Returns the ID of the newly created complaint.
    """
    sql = """
        INSERT INTO grievance_system.complaints (citizen_contact, complaint_text, ward_no)
        VALUES (%s, %s, %s) RETURNING complaint_id;
    """
    result = execute_query(sql, (citizen_contact, complaint_text, ward_no), fetch='one')
    
    if result:
        complaint_id = result[0]
        # Create initial history log
        log_complaint_history(complaint_id, 'Complaint Lodged', 'System received the complaint.')
        return complaint_id
    return None

def get_complaint_by_id(complaint_id):
    """Retrieves a single complaint by its ID."""
    sql = "SELECT * FROM grievance_system.complaints WHERE complaint_id = %s;"
    return execute_query(sql, (complaint_id,), fetch='one')

def update_complaint_status(complaint_id, status, notes=""):
    """Updates the status of a complaint and logs the change."""
    sql = "UPDATE grievance_system.complaints SET status = %s WHERE complaint_id = %s;"
    execute_query(sql, (status, complaint_id))
    log_complaint_history(complaint_id, f"Status changed to {status}", notes)
    print(f"Complaint {complaint_id} status updated to {status}.")

def assign_complaint_to_team(complaint_id, department_id, zone_id, team_id, sla_hours):
    """Assigns a complaint to a team and sets the SLA deadline."""
    now = datetime.now()
    sla_deadline = now + timedelta(hours=sla_hours)
    
    sql = """
        UPDATE grievance_system.complaints
        SET department_id = %s, zone_id = %s, assigned_team_id = %s, 
            status = 'Assigned', assigned_at = %s, sla_deadline = %s
        WHERE complaint_id = %s;
    """
    params = (department_id, zone_id, team_id, now, sla_deadline, complaint_id)
    execute_query(sql, params)
    
    notes = f"Assigned to team {team_id} in department {department_id}, zone {zone_id}. SLA: {sla_hours} hours."
    log_complaint_history(complaint_id, "Assigned to Team", notes)
    print(f"Complaint {complaint_id} assigned to team {team_id}.")

def log_complaint_history(complaint_id, status_change, notes=""):
    """Logs an entry into the complaint history table."""
    sql = """
        INSERT INTO grievance_system.complaint_history (complaint_id, status_change, notes)
        VALUES (%s, %s, %s);
    """
    execute_query(sql, (complaint_id, status_change, notes))

def get_complaint_history(complaint_id):
    """Retrieves the full history for a given complaint."""
    sql = """
        SELECT timestamp, status_change, notes 
        FROM grievance_system.complaint_history 
        WHERE complaint_id = %s 
        ORDER BY timestamp ASC;
    """
    return execute_query(sql, (complaint_id,), fetch='all')
