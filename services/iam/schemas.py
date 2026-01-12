from pydantic import BaseModel, EmailStr, Field, validator
from typing import Optional, List
from datetime import date, datetime
from uuid import UUID

# --- 1. User Registration Schema ---

class UserCreate(BaseModel):
    username: str = Field(..., min_length=3, max_length=150, example="john_doe")
    email: EmailStr = Field(..., example="john@example.com")
    phone: Optional[str] = Field(None, pattern=r"^\+?[1-9]\d{1,14}$", example="+8801700000000")
    password: str = Field(..., min_length=8, example="StrongPassword123!")
    
    # Custom validation (Best Practice)
    @validator('username')
    def username_alphanumeric(cls, v):
        if not v.isalnum() and "_" not in v:
            raise ValueError('Username must be alphanumeric or contain underscores')
        return v

# --- 2. User Response Schema (Sanitized) ---

class UserResponse(BaseModel):
    id: UUID
    username: str
    email: EmailStr
    phone: Optional[str]
    is_active: bool
    created_at: datetime
    
    class Config:
        from_attributes = True

# --- 3. Error Schemas ---

class ErrorResponse(BaseModel):
    detail: str
    code: Optional[str] = None
    
# --- 4. Permission & Menu Schemas ---
# (Used for the /me/permissions endpoint)

class MenuItem(BaseModel):
    id: str
    label: str
    permission: str

class PermissionResponse(BaseModel):
    roles: List[str]
    permissions: List[str]
    menu: List[MenuItem]
