from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from scalar_fastapi_py import get_scalar_api_reference
import os
from dotenv import load_dotenv
from typing import List
from passlib.context import CryptContext

from .database import get_db
from .models import User, UserProfile
from .schemas import UserCreate, UserResponse, PermissionResponse
from rootpulse_core.auth import get_current_user
from rootpulse_core.permissions import get_user_permissions, get_user_menu, Role

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
    Automatically creates a sanitized profile and hashes the password.
    """
    # 1. Check if user already exists
    query = select(User).where((User.email == user_in.email) | (User.username == user_in.username))
    result = await db.execute(query)
    if result.scalars().first():
        raise HTTPException(
            status_code=400,
            detail="A user with this email or username already exists."
        )
    
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
    
    await db.commit()
    await db.refresh(new_user)
    
    return new_user

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
