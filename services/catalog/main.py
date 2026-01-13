import os
from fastapi import FastAPI, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from .database import get_db

app = FastAPI(
    title="RootPulse Catalog Service",
    description="Product inventory and catalog management.",
    version="1.0.0",
    root_path=os.getenv("ROOT_PATH", "")
)

@app.get("/health")
async def health_check():
    return {"status": "healthy", "service": "catalog-service"}

@app.get("/")
async def root():
    return {"message": "Welcome to Catalog Service"}
