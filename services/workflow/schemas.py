from pydantic import BaseModel, Field
from typing import Optional, List, Dict, Any
from uuid import UUID
from datetime import datetime
from .models import WorkflowStatus

class WorkflowStart(BaseModel):
    definition_id: UUID
    context_data: Dict[str, Any] = Field(default={})

class TaskComplete(BaseModel):
    result_data: Dict[str, Any] = Field(default={})

class WorkflowInstanceResponse(BaseModel):
    id: UUID
    status: WorkflowStatus
    current_step_index: int
    started_at: datetime
    
    class Config:
        from_attributes = True

class WorkflowDefinitionCreate(BaseModel):
    name: str
    description: Optional[str] = None
    steps_definition: List[Dict[str, Any]]
