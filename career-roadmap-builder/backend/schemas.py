from pydantic import BaseModel
from typing import Optional

class UserCreate(BaseModel):
    full_name: str
    email: str
    password: str

class UserResponse(BaseModel):
    id: int
    full_name: str
    email: str

    class Config:
        from_attributes = True

# Schema for creating a new task
class TaskCreate(BaseModel):
    title: str
    description: Optional[str] = None
    category: str

# Schema for sending a task back to React
class TaskResponse(BaseModel):
    id: int
    title: str
    description: Optional[str]
    category: str
    is_completed: bool
    user_email: str

    class Config:
        from_attributes = True

class TaskUpdate(BaseModel):
    is_completed: bool