from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.ext.asyncio import AsyncSession
import os
from dotenv import load_dotenv
from .database import get_db

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

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
