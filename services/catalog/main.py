from fastapi import FastAPI, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from .database import get_db

app = FastAPI(title="RootPulse Catalog Service")

@app.get("/health")
async def health_check():
    return {"status": "healthy", "service": "catalog-service"}

@app.get("/")
async def root():
    return {"message": "Welcome to Catalog Service"}
