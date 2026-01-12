from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from scalar_fastapi_py import get_scalar_api_reference
import os
import random
import string
from datetime import datetime
from dotenv import load_dotenv
from typing import List
from passlib.context import CryptContext

from .database import get_db
from .models import User, UserProfile
from .schemas import UserCreate, UserResponse, PermissionResponse
from rootpulse_core.auth import get_current_user
from rootpulse_core.permissions import get_user_permissions, get_user_menu, Role
from rootpulse_core.cache import get_redis_client

load_dotenv()

# Password hashing configuration
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

app = FastAPI(
    title="RootPulse IAM Service",
    description="""
    ## Identity and Access Management (IAM)
    World-class security and identity service for the RootPulse ecosystem.
    
    * **Auth**: OIDC/JWT Integration
    * **RBAC**: Multi-role permission system
    * **Registration**: Secure user onboarding
    """,
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

# Scalar Premium Documentation UI
@app.get("/scalar", include_in_schema=False)
async def scalar_html():
    return get_scalar_api_reference(
        openapi_url=app.openapi_url,
        title=app.title,
    )

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Endpoints ---

@app.get("/health", tags=["System"])
async def health_check(db: AsyncSession = Depends(get_db)):
    return {
        "status": "healthy",
        "service": "iam-service",
        "database": "connected"
    }

@app.post("/auth/register", response_model=UserResponse, status_code=status.HTTP_201_CREATED, tags=["Auth"])
async def register_user(user_in: UserCreate, db: AsyncSession = Depends(get_db)):
    """
    Onboard a new user into the RootPulse system.
    Strictly checks for unique Email and Phone.
    Generates a Redis-backed OTP for email verification.
    """
    # 1. Check if user already exists (Aggressive Uniqueness Check)
    query = select(User).where(
        (User.email == user_in.email) | 
        (User.username == user_in.username) |
        (User.phone == user_in.phone)
    )
    result = await db.execute(query)
    existing_user = result.scalars().first()
    if existing_user:
        if existing_user.email == user_in.email:
            detail = "Email already registered."
        elif existing_user.phone == user_in.phone:
            detail = "Phone number already registered."
        else:
            detail = "Username already taken."
        raise HTTPException(status_code=400, detail=detail)
    
    # 2. Hash password
    hashed_password = pwd_context.hash(user_in.password)
    
    # 3. Create User object
    new_user = User(
        username=user_in.username,
        email=user_in.email,
        phone=user_in.phone,
        password_hash=hashed_password
    )
    
    db.add(new_user)
    await db.flush() # Get the user ID
    
    # 4. Create empty Profile (Best Practice)
    new_profile = UserProfile(
        user_id=new_user.id,
        full_name=user_in.username # Initial placeholder
    )
    db.add(new_profile)
    
    # 5. Generate & Store OTP in Redis (Verification Flow)
    otp = ''.join(random.choices(string.digits, k=6))
    redis = await get_redis_client()
    # Key: verify_email:{email} | Value: {otp}:{user_id} | Expiry: 10 mins
    await redis.setex(f"verify_email:{user_in.email}", 600, f"{otp}:{new_user.id}")
    
    await db.commit()
    await db.refresh(new_user)
    
    # [DEVELOPMENT LOG] In production, send email here
    print(f"DEBUG: Email Verification OTP for {user_in.email} is {otp}")
    
    return new_user

@app.post("/auth/verify-email", tags=["Auth"])
async def verify_email(email: str, otp: str, db: AsyncSession = Depends(get_db)):
    """
    Verify a user's email using the OTP sent during registration.
    """
    redis = await get_redis_client()
    redis_data = await redis.get(f"verify_email:{email}")
    
    if not redis_data:
        raise HTTPException(status_code=400, detail="OTP expired or email invalid.")
    
    # Check if redis_data is bytes (standard for some clients) and decode
    if isinstance(redis_data, bytes):
        redis_data = redis_data.decode('utf-8')
        
    stored_otp, user_id = redis_data.split(":")
    
    if otp != stored_otp:
        raise HTTPException(status_code=400, detail="Invalid OTP.")
    
    # Update User status
    query = select(User).where(User.id == user_id)
    result = await db.execute(query)
    user = result.scalars().first()
    
    if user:
        user.email_verified_at = datetime.utcnow()
        await db.commit()
        await redis.delete(f"verify_email:{email}")
        return {"status": "success", "message": "Email verified successfully."}
    
    raise HTTPException(status_code=404, detail="User not found.")

@app.get("/me/permissions", response_model=PermissionResponse, tags=["Auth"])
async def get_my_permissions(current_user: dict = Depends(get_current_user)):
    """
    Return the permissions and menu structure for the logged-in user.
    """
    user_roles_str = current_user.get("realm_access", {}).get("roles", [])
    
    roles = []
    for r in user_roles_str:
        try:
            roles.append(Role(r))
        except ValueError:
            pass
    
    permissions = get_user_permissions(roles)
    menu = get_user_menu(permissions)
    
    return {
        "roles": user_roles_str,
        "permissions": list(permissions),
        "menu": menu
    }

@app.get("/", tags=["System"])
async def root():
    return {"message": "Welcome to RootPulse IAM Service API"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
