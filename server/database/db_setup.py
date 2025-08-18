from db_connection import execute_query

def setup_database():
    """
    Sets up the database by creating schemas and tables based on the provided SQL.
    """
    print("Starting database setup...")

    # Drop existing schemas to ensure a clean slate
    execute_query("DROP SCHEMA IF EXISTS grievance_system, administrative_data CASCADE;")
    print("Dropped existing schemas.")

    # Create schemas
    execute_query("CREATE SCHEMA IF NOT EXISTS administrative_data;")
    execute_query("CREATE SCHEMA IF NOT EXISTS grievance_system;")
    print("Created schemas: administrative_data, grievance_system.")

    # Table creation queries based on your provided SQL
    queries = [
        """
        CREATE TABLE administrative_data.departments (
            department_id SERIAL PRIMARY KEY,
            department_name VARCHAR(255) NOT NULL UNIQUE
        );
        """,
        """
        CREATE TABLE administrative_data.zones (
            zone_id SERIAL PRIMARY KEY,
            zone_name VARCHAR(255) NOT NULL UNIQUE
        );
        """,
        """
        CREATE TABLE administrative_data.ward_zone_mapping (
            ward_no INTEGER PRIMARY KEY,
            zone_id INTEGER NOT NULL REFERENCES administrative_data.zones(zone_id)
        );
        """,
        """
        CREATE TABLE grievance_system.field_teams (
            team_id SERIAL PRIMARY KEY,
            team_name VARCHAR(255) NOT NULL,
            department_id INTEGER NOT NULL REFERENCES administrative_data.departments(department_id),
            zone_id INTEGER NOT NULL REFERENCES administrative_data.zones(zone_id),
            is_active BOOLEAN DEFAULT TRUE
        );
        """,
        """
        CREATE TABLE grievance_system.team_status (
            team_id INTEGER PRIMARY KEY REFERENCES grievance_system.field_teams(team_id),
            status VARCHAR(50) NOT NULL DEFAULT 'Available',
            active_workload INTEGER NOT NULL DEFAULT 0,
            last_updated TIMESTAMPTZ DEFAULT NOW()
        );
        """,
        """
        CREATE TABLE administrative_data.slas (
            sla_id SERIAL PRIMARY KEY,
            department_id INTEGER NOT NULL REFERENCES administrative_data.departments(department_id),
            priority_level VARCHAR(20) DEFAULT 'Medium',
            resolution_time_hours INTEGER NOT NULL
        );
        """,
        """
        CREATE TABLE grievance_system.complaints (
            complaint_id BIGSERIAL PRIMARY KEY,
            citizen_contact VARCHAR(15) NOT NULL,
            complaint_text TEXT NOT NULL,
            ward_no INTEGER NOT NULL REFERENCES administrative_data.ward_zone_mapping(ward_no),
            department_id INTEGER REFERENCES administrative_data.departments(department_id),
            zone_id INTEGER REFERENCES administrative_data.zones(zone_id),
            assigned_team_id INTEGER REFERENCES grievance_system.field_teams(team_id),
            status VARCHAR(50) NOT NULL DEFAULT 'Lodged',
            created_at TIMESTAMPTZ DEFAULT NOW(),
            assigned_at TIMESTAMPTZ,
            resolved_at TIMESTAMPTZ,
            sla_deadline TIMESTAMPTZ
        );
        """,
        """
        CREATE TABLE grievance_system.complaint_history (
            history_id BIGSERIAL PRIMARY KEY,
            complaint_id BIGINT NOT NULL REFERENCES grievance_system.complaints(complaint_id),
            status_change VARCHAR(255) NOT NULL,
            notes TEXT,
            "timestamp" TIMESTAMPTZ DEFAULT NOW()
        );
        """
    ]

    for query in queries:
        execute_query(query)
    
    print("All tables created successfully.")

def populate_initial_data():
    """Populates the database with essential sample data for testing."""
    print("Populating initial data...")

    # Departments
    departments = [
        ('Solid Waste Management',), ('Water Works and Drainage',),
        ('Electrical and Mechanical',), ('Public Works Department',),
        ('Parks and Gardens',), ('Planning & Rehabilitation',)
    ]
    for dept in departments:
        execute_query("INSERT INTO administrative_data.departments (department_name) VALUES (%s) ON CONFLICT (department_name) DO NOTHING;", dept)

    # Zones (Creating 22 zones as per research)
    for i in range(1, 23):
        execute_query("INSERT INTO administrative_data.zones (zone_name) VALUES (%s) ON CONFLICT (zone_name) DO NOTHING;", (f'Zone {i}',))

    # Ward to Zone Mapping (Sample data)
    ward_zone_map = {6: 2, 7: 1, 57: 3, 59: 12, 10: 4, 21: 5, 24: 6, 29: 7, 30: 8, 44: 9, 38: 10, 48: 11, 1: 16, 2: 15}
    for ward, zone in ward_zone_map.items():
        execute_query("INSERT INTO administrative_data.ward_zone_mapping (ward_no, zone_id) VALUES (%s, %s) ON CONFLICT (ward_no) DO NOTHING;", (ward, zone))

    # Field Teams and their status
    teams = [
        ('SWM Team Alpha', 1, 2), ('Water Crew 1', 2, 1), ('Electrical Unit A', 3, 12)
    ]
    for team in teams:
        team_id = execute_query("INSERT INTO grievance_system.field_teams (team_name, department_id, zone_id) VALUES (%s, %s, %s) RETURNING team_id;", team, fetch='one')
        if team_id:
            execute_query("INSERT INTO grievance_system.team_status (team_id) VALUES (%s);", (team_id[0],))

    # SLAs
    slas = [(1, 'High', 12), (2, 'Critical', 4), (3, 'Medium', 72)]
    for sla in slas:
        execute_query("INSERT INTO administrative_data.slas (department_id, priority_level, resolution_time_hours) VALUES (%s, %s, %s);", sla)

    print("Initial data populated.")


if __name__ == "__main__":
    setup_database()
    populate_initial_data()
    print("Database setup and population complete.")
