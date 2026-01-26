# app/main.py

from fastapi import FastAPI
from sqlalchemy import text
from app.database import engine
from app.models import Base  # all your models should inherit from this Base
from app.routes import category  # your category routes

app = FastAPI(title="Common Service")

# Include your routers
app.include_router(category.router, prefix="/category", tags=["Category"])

@app.on_event("startup")
async def startup():
    """
    Run on FastAPI startup.
    - Create schema if not exists
    - Create tables
    """
    async with engine.begin() as conn:
        # Ensure schema exists (use text() wrapper)
        await conn.execute(text("CREATE SCHEMA IF NOT EXISTS common"))

    async with engine.begin() as conn:
        # Create all tables in Base (models) within the schema
        await conn.run_sync(Base.metadata.create_all, checkfirst=True)

@app.on_event("shutdown")
async def shutdown():
    """
    Run on FastAPI shutdown.
    You can close connections if needed.
    """
    await engine.dispose()
