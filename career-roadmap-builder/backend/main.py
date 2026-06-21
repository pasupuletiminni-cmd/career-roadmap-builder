from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel  # <-- We added this import
from sqlalchemy.orm import Session
from typing import List
import models, schemas, crud
from database import engine, get_db

# ... rest of your code ...

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 1. Define the data structure we expect from React
class ChatMessage(BaseModel):
    message: str
    user_id: str = "minnie@example.com"

class UserLogin(BaseModel):
    email: str
    password: str

@app.get("/")
def read_root():
    return {"message": "Roadmap AI Backend is running!"}

@app.post("/signup", response_model=schemas.UserResponse)
def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    db_user = crud.get_user_by_email(db, email=user.email)
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    return crud.create_user(db=db, user=user)
@app.post("/login")
def login_user(user: UserLogin, db: Session = Depends(get_db)):
    db_user = crud.verify_user(db, email=user.email, password=user.password)
    if not db_user:
        raise HTTPException(status_code=400, detail="Invalid email or password")
    return {"message": "Login successful", "email": db_user.email}

@app.get("/progress/{email}")
def get_progress(email: str, db: Session = Depends(get_db)):
    return crud.get_user_progress(db, email=email)

# 2. Create the POST endpoint
@app.post("/api/chat")
async def chat_with_ai(chat: ChatMessage):
    user_message = chat.message.lower()
    
    # 3. Simple logic for now (we can upgrade this to a real AI later!)
    ai_response = "I'm your backend! You said: " + chat.message
    
    if "algorithm" in user_message or "dsa" in user_message:
        ai_response = "For algorithms, I highly recommend starting with Two Pointers or Sliding Window techniques. They are very common in Google interviews!"
    elif "resume" in user_message:
        ai_response = "Make sure your resume highlights your C programming and full-stack React/Python skills using the XYZ format (Accomplished [X] as measured by [Y], by doing [Z])."
        
    return {"reply": ai_response}


@app.get("/tasks/{email}", response_model=List[schemas.TaskResponse])
def read_tasks(email: str, db: Session = Depends(get_db)):
    """API endpoint for React to fetch all tasks for a user."""
    return crud.get_user_tasks(db=db, user_email=email)

@app.post("/tasks/{email}", response_model=schemas.TaskResponse)
def add_task(email: str, task: schemas.TaskCreate, db: Session = Depends(get_db)):
    """API endpoint for React to send a new task to the database."""
    return crud.create_task(db=db, task=task, user_email=email)

@app.put("/tasks/{task_id}", response_model=schemas.TaskResponse)
def update_task(task_id: int, task_update: schemas.TaskUpdate, db: Session = Depends(get_db)):
    """API endpoint to mark a task as complete or incomplete."""
    db_task = db.query(models.Task).filter(models.Task.id == task_id).first()
    if not db_task:
        raise HTTPException(status_code=404, detail="Task not found")
    
    db_task.is_completed = task_update.is_completed
    db.commit()
    db.refresh(db_task)
    return db_task

