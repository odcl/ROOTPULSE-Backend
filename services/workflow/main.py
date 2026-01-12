from fastapi import FastAPI, Depends, HTTPException, status, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from scalar_fastapi_py import get_scalar_api_reference
import os
from datetime import datetime
from dotenv import load_dotenv

from .database import get_db
from .models import WorkflowDefinition, WorkflowInstance, WorkflowTask, WorkflowStatus
from .schemas import WorkflowStart, WorkflowInstanceResponse, WorkflowDefinitionCreate, TaskComplete

load_dotenv()

app = FastAPI(
    title="RootPulse Workflow Service",
    description="""
    ## Business Process Orchestration
    Industrial-grade engine for building, running, and tracking complex business flows.
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

# --- Endpoints ---

@app.post("/definitions", status_code=status.HTTP_201_CREATED, tags=["Admin"])
async def create_definition(data: WorkflowDefinitionCreate, db: AsyncSession = Depends(get_db)):
    """Create a new workflow template."""
    new_def = WorkflowDefinition(**data.dict())
    db.add(new_def)
    await db.commit()
    await db.refresh(new_def)
    return new_def

@app.post("/start", response_model=WorkflowInstanceResponse, tags=["Execution"])
async def start_workflow(data: WorkflowStart, db: AsyncSession = Depends(get_db)):
    """Initiate a workflow instance from a definition."""
    # 1. Fetch Definition
    result = await db.execute(select(WorkflowDefinition).where(WorkflowDefinition.id == data.definition_id))
    definition = result.scalars().first()
    if not definition:
        raise HTTPException(status_code=404, detail="Definition not found")
    
    # 2. Create Instance
    instance = WorkflowInstance(
        definition_id=data.definition_id,
        context_data=data.context_data,
        status=WorkflowStatus.RUNNING
    )
    db.add(instance)
    await db.flush()
    
    # 3. Initialize first task (Best Practice)
    first_step = definition.steps_definition[0]
    task = WorkflowTask(
        instance_id=instance.id,
        task_name=first_step.get("task", "Unknown Task"),
        step_index=0,
        status=WorkflowStatus.RUNNING,
        started_at=datetime.utcnow()
    )
    db.add(task)
    
    await db.commit()
    await db.refresh(instance)
    return instance

@app.get("/instances/{instance_id}", response_model=WorkflowInstanceResponse, tags=["Execution"])
async def get_instance_status(instance_id: str, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(WorkflowInstance).where(WorkflowInstance.id == instance_id))
    instance = result.scalars().first()
    if not instance:
        raise HTTPException(status_code=404, detail="Instance not found")
    return instance

@app.get("/health", tags=["System"])
async def health():
    return {"status": "healthy", "service": "workflow-orchestrator"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
