from sqlalchemy.orm import Session
import models, schemas
import hashlib

def get_user_by_email(db: Session, email: str):
    return db.query(models.User).filter(models.User.email == email).first()

def create_user(db: Session, user: schemas.UserCreate):
    db_user = models.User(
        full_name=user.full_name,
        email=user.email,
        hashed_password=user.password 
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def get_user_progress(db: Session, email: str):
    """Fetch user stats and calculate completed tasks dynamically."""
  
    completed_count = db.query(models.Task).filter(
        models.Task.user_email == email,
        models.Task.is_completed == True
    ).count()
    return {
        "streak": 3,  # We can build a dynamic streak system later!
        "tasks_completed": completed_count,
        "hours_studied": completed_count * 2  # Estimating 2 hours per task for now
    }

def get_user_tasks(db: Session, user_email: str):
    """Fetch all tasks belonging to a specific user."""
    return db.query(models.Task).filter(models.Task.user_email == user_email).all()

def create_task(db: Session, task: schemas.TaskCreate, user_email: str):
    """Create a new task and save it to the database."""
    # Create the task using the data from React, plus the user's email
    db_task = models.Task(**task.dict(), user_email=user_email)
    
    db.add(db_task)
    db.commit()
    db.refresh(db_task)
    
    return db_task
def verify_user(db: Session, email: str, password: str):
    user = get_user_by_email(db, email=email)
    if user and user.hashed_password == password:
        return user
    return None