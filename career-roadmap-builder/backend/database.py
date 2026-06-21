from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# This creates a file named 'roadmap.db' in your backend folder
SQLALCHEMY_DATABASE_URL = "sqlite:///./roadmap.db"

# Create the database engine
engine = create_engine(
    SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
)

# Create a session to talk to the database
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# This is used by your models to create tables
Base = declarative_base()

# Dependency to get the database session in your API routes
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()