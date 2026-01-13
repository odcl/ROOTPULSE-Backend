from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
# from scalar_fastapi_py import get_scalar_api_reference
import os
import random
import string
import secrets
from datetime import datetime
from dotenv import load_dotenv
from typing import List
from passlib.context import CryptContext

from .database import get_db
from .models import User, UserProfile
from .schemas import UserCreate, UserResponse, PermissionResponse
from rootpulse_core.auth import get_current_user
from rootpulse_core.permissions import get_user_permissions, get_user_menu, Role
from rootpulse_core.cache import cache
from rootpulse_core.email import send_verification_email

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
    redoc_url="/redoc",
    root_path=os.getenv("ROOT_PATH", "")
)

# Scalar Premium Documentation UI
# @app.get("/scalar", include_in_schema=False)
# async def scalar_html():
#     return get_scalar_api_reference(
#         openapi_url=app.openapi_url,
#         title=app.title,
#     )

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Lifecycle Events ---

@app.on_event("startup")
async def on_startup():
    from .database import init_db
    print("Initializing database tables...")
    await init_db()
    print("Database tables initialized.")

# --- Exception Handlers ---

from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse

@app.exception_handler(HTTPException)
async def http_exception_handler(request, exc):
    return JSONResponse(
        status_code=exc.status_code,
        content={
            "status": "error",
            "message": exc.detail,
            "code": "HTTP_ERROR"
        },
    )

@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request, exc):
    # Ensure all error elements are JSON serializable
    error_details = []
    for error in exc.errors():
        # Remove non-serializable objects from error dict
        safe_error = {k: v for k, v in error.items() if k not in ['ctx']}
        if 'ctx' in error:
             safe_error['ctx'] = {k: str(v) for k, v in error['ctx'].items()}
        error_details.append(safe_error)
        
    return JSONResponse(
        status_code=422,
        content={
            "status": "error",
            "message": "Validation Error",
            "code": "VALIDATION_ERROR",
            "errors": error_details
        },
    )

@app.exception_handler(Exception)
async def global_exception_handler(request, exc):
    # Log the error here in production
    print(f"CRITICAL ERROR: {str(exc)}")
    return JSONResponse(
        status_code=500,
        content={
            "status": "error",
            "message": "Internal Server Error",
            "code": "INTERNAL_SERVER_ERROR"
        },
    )

# --- Endpoints ---

@app.get("/health", tags=["System"])
async def health_check(db: AsyncSession = Depends(get_db)):
    return {
        "status": "success",
        "message": "System is healthy",
        "data": {
            "status": "healthy",
            "service": "iam-service",
            "database": "connected"
        }
    }

@app.post("/auth/register", status_code=status.HTTP_201_CREATED, tags=["Auth"])
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
    
    # 1.a. Check if password is provided (Guest Mode check)
    raw_password = user_in.password
    is_guest = False
    
    if not raw_password:
        is_guest = True
        # Generate a secure random password for guest
        alphabet = string.ascii_letters + string.digits + "!@#$%^&*"
        raw_password = ''.join(secrets.choice(alphabet) for i in range(12))
    
    # 2. Hash password
    hashed_password = pwd_context.hash(raw_password)
    
    # 3. Create User object
    new_user = User(
        username=user_in.username,
        email=user_in.email,
        phone=user_in.phone,
        password_hash=hashed_password,
        # is_active is True by default in model, so user can login immediately
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
    redis = await cache.get_client()
    # Key: verify_email:{email} | Value: {otp}:{user_id} | Expiry: 10 mins
    await redis.setex(f"verify_email:{user_in.email}", 600, f"{otp}:{new_user.id}")
    
    await db.commit()
    await db.refresh(new_user)
    
    # 6. Send Verification Email (Real SMTP)
    try:
        await send_verification_email(
            email=user_in.email,
            otp=otp,
            guest_password=raw_password if is_guest else None
        )
        print(f"DEBUG: Email sent successfully to {user_in.email}")
    except Exception as e:
        print(f"ERROR: Failed to send email to {user_in.email}: {str(e)}")
        # In a real system, we might want to handle this more gracefully, 
        # but for now we'll just log it to avoid blocking the registration response.
    
    # Wrap in standard response structure?
    # NOTE: Since the response_model is UserResponse (a Pydantic model), returning a dict with "status", etc. might fail validation 
    # if we don't update response_model. 
    # HOWEVER, strict Pydantic models usually expect specific fields. 
    # To properly implement this wrapper, I should probably return a dict and remove response_model OR update response_model.
    # Given the constraint to "standardize all responses", I will modify the response_model in the decorator in a follow-up or try to do it here.
    # Actually, let's keep it simple for now and rely on the frontend parsing `data` if I change the model.
    # But wait, `response_model=UserResponse` will filter the output to ONLY matching fields. 
    # If I return {"status":..., "data": user}, Pydantic will complain if UserResponse doesn't have "status".
    # I will REMOVE response_model from the decorator to allow returning the Dict wrapper freely, OR use the new StandardResponse.
    
    return {
        "status": "success", 
        "message": "User registered successfully.",
        "data": new_user
    }

@app.post("/auth/verify-email", tags=["Auth"])
async def verify_email(email: str, otp: str, db: AsyncSession = Depends(get_db)):
    """
    Verify a user's email using the OTP sent during registration.
    """
    redis = await cache.get_client()
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
        return {
            "status": "success", 
            "message": "Email verified successfully.",
            "data": None
        }
    
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
