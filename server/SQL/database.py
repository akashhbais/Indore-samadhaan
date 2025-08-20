from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from .base import Base
import os
from dotenv import load_dotenv

load_dotenv()

DATABASE_URL = "postgresql://postgres:1405@localhost/jansunwai"

engine = create_engine(DATABASE_URL)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)