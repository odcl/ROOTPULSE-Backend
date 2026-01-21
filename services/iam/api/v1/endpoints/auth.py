from fastapi import APIRouter, Depends, status
from sqlalchemy.ext.asyncio import AsyncSession
from ....database import get_db
from ....schemas import UserCreate, UserLogin, Token
from ....services.auth_service import AuthService

router = APIRouter()

@router.post("/login", response_model=Token, tags=["Auth"])
async def login(login_in: UserLogin, db: AsyncSession = Depends(get_db)):
    """
    Authenticate a user and return access/refresh tokens.
    """
    return await AuthService.login(db, login_in)

@router.post("/register", status_code=status.HTTP_201_CREATED, tags=["Auth"])
async def register_user(user_in: UserCreate, db: AsyncSession = Depends(get_db)):
    """
    Onboard a new user into the RootPulse system.
    """
    user = await AuthService.register_user(db, user_in)
    return {
        "status": "success", 
        "message": "User registered successfully.",
        "data": user
    }

@router.post("/verify-email", tags=["Auth"])
async def verify_email(email: str, otp: str, db: AsyncSession = Depends(get_db)):
    """
    Verify a user's email using the OTP sent during registration.
    """
    await AuthService.verify_email(db, email, otp)
    return {
        "status": "success", 
        "message": "Email verified successfully.",
        "data": None
    }
