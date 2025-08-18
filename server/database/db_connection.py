from sqlalchemy import create_engine, text
from sqlalchemy.orm import sessionmaker
from core.config import DATABASE_URL

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def get_db_connection():
    """
    Provides a database connection for dependency injection.
    """
    conn = engine.connect()
    try:
        yield conn
    finally:
        conn.close()

def execute_query(query, params=None):
    """
    Executes a given SQL query and returns the result.
    """
    with engine.connect() as connection:
        result = connection.execute(text(query), params or {})
        connection.commit()
        return result

def fetch_all(query, params=None):
    """
    Executes a query and fetches all results.
    """
    with engine.connect() as connection:
        result = connection.execute(text(query), params or {})
        return result.fetchall()

def fetch_one(query, params=None):
    """
    Executes a query and fetches the first result.
    """
    with engine.connect() as connection:
        result = connection.execute(text(query), params or {})
        return result.fetchone()
