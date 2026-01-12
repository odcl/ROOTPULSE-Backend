from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.ext.asyncio import AsyncSession
import os
from dotenv import load_dotenv
from typing import List

from .database import get_db
from .models import User
from rootpulse_core.auth import get_current_user
from rootpulse_core.permissions import get_user_permissions, get_user_menu, Role

load_dotenv()

app = FastAPI(
    title="RootPulse IAM Service",
    description="Identity and Access Management Service for RootPulse",
    version="1.0.0",
)

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/health")
async def health_check(db: AsyncSession = Depends(get_db)):
    # Simple check to verify DB connection
    try:
        # await db.execute("SELECT 1") # Optional validation
        return {
            "status": "healthy",
            "service": "iam-service",
            "database": "connected",
            "environment": os.getenv("ENVIRONMENT", "development")
        }
    except Exception as e:
        return {
            "status": "unhealthy",
            "reason": str(e)
        }

@app.get("/")
async def root():
    return {"message": "Welcome to RootPulse IAM Service API"}

@app.get("/me/permissions")
async def get_my_permissions(current_user: dict = Depends(get_current_user)):
    """
    Return the permissions and menu structure for the logged-in user.
    """
    # Extract roles from JWT payload (e.g., from realm_access)
    user_roles_str = current_user.get("realm_access", {}).get("roles", [])
    
    # Map string roles to Role Enum (ignoring unknown roles)
    roles = []
    for r in user_roles_str:
        try:
            roles.append(Role(r))
        except ValueError:
            pass
    
    # Calculate permissions
    permissions = get_user_permissions(roles)
    
    # Calculate menu
    menu = get_user_menu(permissions)
    
    return {
        "roles": user_roles_str,
        "permissions": list(permissions),
        "menu": menu
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
