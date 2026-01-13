import phonenumbers
from pydantic import BaseModel, EmailStr, Field, validator
from typing import Optional, List
from datetime import date, datetime
from uuid import UUID

# --- 1. User Registration Schema ---

class UserCreate(BaseModel):
    username: str = Field(..., min_length=3, max_length=150, example="john_doe")
    email: EmailStr = Field(..., example="john@example.com")
    phone: Optional[str] = Field(None, example="+8801700000000")
    password: Optional[str] = Field(None, min_length=8, example="StrongPassword123!")
    
    @validator('username')
    def username_alphanumeric(cls, v):
        if not v.isalnum() and "_" not in v:
            raise ValueError('Username must be alphanumeric or contain underscores')
        return v

    @validator('phone')
    def validate_phone(cls, v):
        if v is None:
            return v
        
        try:
            # Parse the number (must start with +)
            parsed_number = phonenumbers.parse(v, None)
            
            if not phonenumbers.is_valid_number(parsed_number):
                raise ValueError('Invalid phone number for the provided country code.')
            
            # Format to E.164 (Standard global format)
            return phonenumbers.format_number(parsed_number, phonenumbers.PhoneNumberFormat.E164)
            
        except phonenumbers.NumberParseException:
            raise ValueError('Phone number must start with a + and include country code (e.g., +88017...)')

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

# --- 5. Standard Response Schema ---

from typing import Generic, TypeVar, Any
T = TypeVar('T')

class StandardResponse(BaseModel, Generic[T]):
    status: str
    message: str
    data: Optional[T] = None
    errors: Optional[Any] = None

class PermissionResponse(BaseModel):
    roles: List[str]
    permissions: List[str]
    menu: List[MenuItem]
