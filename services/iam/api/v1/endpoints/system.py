from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from ....database import get_db

router = APIRouter()

@router.get("/health", tags=["System"])
async def health_check(db: AsyncSession = Depends(get_db)):
    """
    Check if the service and database are reachable.
    """
    return {
        "status": "success",
        "message": "System is healthy",
        "data": {
            "status": "healthy",
            "service": "iam-service",
            "database": "connected"
        }
    }

@router.get("/", tags=["System"])
async def root():
    """
    Welcome message for the service.
    """
    return {"message": "Welcome to RootPulse IAM Service API"}
