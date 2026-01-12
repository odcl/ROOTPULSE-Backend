from fastapi import FastAPI, Depends, Request, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.ext.asyncio import AsyncSession
from scalar_fastapi_py import get_scalar_api_reference
import os
from dotenv import load_dotenv

from .database import get_db
from .models import AnalyticsEvent
from .schemas import EventIngest, EventResponse

load_dotenv()

app = FastAPI(
    title="RootPulse Analytics Service",
    description="""
    ## Behavioral & Business Intelligence (BI) Engine
    Captures user behavior, guest journeys, and service usage logs for deep analytics.
    """,
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

# Scalar Documentation
@app.get("/scalar", include_in_schema=False)
async def scalar_html():
    return get_scalar_api_reference(
        openapi_url=app.openapi_url,
        title=app.title,
    )

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

async def log_event_to_db(event_data: EventIngest, db: AsyncSession, request_info: dict):
    """Asynchronously save the event to the database to keep the API fast."""
    new_event = AnalyticsEvent(
        **event_data.dict(),
        ip_address=request_info.get("ip"),
        user_agent=request_info.get("user_agent")
    )
    db.add(new_event)
    await db.commit()

@app.post("/ingest", response_model=EventResponse, tags=["Analytics"])
async def ingest_event(
    event_in: EventIngest, 
    background_tasks: BackgroundTasks,
    request: Request,
    db: AsyncSession = Depends(get_db)
):
    """
    Ingest a behavioral event. 
    This is highly optimized using FastAPI BackgroundTasks to respond immediately.
    """
    request_info = {
        "ip": request.client.host,
        "user_agent": request.headers.get("user-agent")
    }
    
    # Process in background so the client doesn't wait for DB write
    background_tasks.add_task(log_event_to_db, event_in, db, request_info)
    
    return {
        "event_name": event_in.event_name,
        "id": "00000000-0000-0000-0000-000000000000", # Placeholder for performance
        "timestamp": "2026-01-12T00:00:00"
    }

@app.get("/health", tags=["System"])
async def health():
    return {"status": "healthy", "service": "analytics"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
