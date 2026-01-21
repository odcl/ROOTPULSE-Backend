from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from fastapi import HTTPException
import random
import string
import secrets
from datetime import datetime
from passlib.context import CryptContext

from ..models import User, UserProfile
from ..schemas import UserCreate, UserLogin
from rootpulse_core.cache import cache
from rootpulse_core.email import send_verification_email
from rootpulse_core.auth import auth_service as core_auth_service

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

class AuthService:
    @staticmethod
    async def authenticate_user(db: AsyncSession, identifier: str, password: str):
        # Check by email or username
        query = select(User).where(
            (User.email == identifier) | (User.username == identifier)
        )
        result = await db.execute(query)
        user = result.scalars().first()
        
        if not user:
            return None
            
        if not pwd_context.verify(password, user.password_hash):
            return None
            
        return user

    @staticmethod
    async def login(db: AsyncSession, login_in: UserLogin):
        user = await AuthService.authenticate_user(db, login_in.identifier, login_in.password)
        if not user:
            raise HTTPException(
                status_code=401,
                detail="Incorrect username/email or password",
                headers={"WWW-Authenticate": "Bearer"},
            )
        
        # Create tokens
        # Assuming UserResponse schema compatibility or convert user object to dict/UserResponse
        user_data = {
            "sub": str(user.id),
            "email": user.email,
            "username": user.username,
            "roles": [] # Populate if roles exist in future
        }
        
        access_token = core_auth_service.create_access_token(data=user_data)
        refresh_token = core_auth_service.create_refresh_token(data=user_data)
        
        return {
            "access_token": access_token,
            "refresh_token": refresh_token,
            "token_type": "bearer",
            "user": user 
        }

    @staticmethod
    async def register_user(db: AsyncSession, user_in: UserCreate):
        # 1. Check Uniqueness
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
            elif user_in.phone and existing_user.phone == user_in.phone:
                detail = "Phone number already registered."
            else:
                detail = "Username already taken."
            raise HTTPException(status_code=400, detail=detail)
        
        # 2. Prepare Username & Password
        username = user_in.username
        if not username:
            # Fallback to email prefix (e.g. john from john@example.com)
            username = user_in.email.split("@")[0]
            # Add a small random string to ensure uniqueness if prefix is common
            import random
            suffix = ''.join(random.choices(string.ascii_lowercase + string.digits, k=4))
            username = f"{username}_{suffix}"

        raw_password = user_in.password
        is_guest = not raw_password
        if is_guest:
            alphabet = string.ascii_letters + string.digits + "!@#$%^&*"
            raw_password = ''.join(secrets.choice(alphabet) for i in range(12))
        
        hashed_password = pwd_context.hash(raw_password)
        
        # 3. Create Entities
        new_user = User(
            username=username,
            email=user_in.email,
            phone=user_in.phone,
            password_hash=hashed_password,
        )
        db.add(new_user)
        await db.flush()
        
        new_profile = UserProfile(
            user_id=new_user.id,
            full_name=username # Use username as placeholder for full name
        )
        db.add(new_profile)
        
        # 4. Handle OTP
        otp = ''.join(random.choices(string.digits, k=6))
        redis = await cache.get_client()
        await redis.setex(f"verify_email:{user_in.email}", 600, f"{otp}:{new_user.id}")
        
        await db.commit()
        await db.refresh(new_user)
        
        # 5. Background Task: Email
        print(f"DEBUG: Attempting to send email to {user_in.email} with OTP {otp}")
        try:
            await send_verification_email(
                email=user_in.email,
                otp=otp,
                guest_password=raw_password if is_guest else None
            )
            print(f"DEBUG: Email task submitted successfully for {user_in.email}")
        except Exception as e:
            print(f"ERROR in AuthService Email Block: {str(e)}")
            import traceback
            traceback.print_exc()
            
        return new_user

    @staticmethod
    async def verify_email(db: AsyncSession, email: str, otp: str):
        redis = await cache.get_client()
        redis_data = await redis.get(f"verify_email:{email}")
        
        if not redis_data:
            raise HTTPException(status_code=400, detail="OTP expired or email invalid.")
        
        if isinstance(redis_data, bytes):
            redis_data = redis_data.decode('utf-8')
            
        stored_otp, user_id = redis_data.split(":")
        
        if otp != stored_otp:
            raise HTTPException(status_code=400, detail="Invalid OTP.")
        
        query = select(User).where(User.id == user_id)
        result = await db.execute(query)
        user = result.scalars().first()
        
        if not user:
            raise HTTPException(status_code=404, detail="User not found.")
            
        user.email_verified_at = datetime.utcnow()
        await db.commit()
        await redis.delete(f"verify_email:{email}")
        return True
