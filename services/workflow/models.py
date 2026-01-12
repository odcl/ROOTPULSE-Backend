from sqlalchemy import Column, String, DateTime, ForeignKey, Text, JSON, Enum as SQLEnum, Integer
from sqlalchemy.orm import relationship
from rootpulse_core.models.base import BaseRootPulseModel
import datetime
import enum
import uuid

class WorkflowStatus(str, enum.Enum):
    PENDING = "pending"
    RUNNING = "running"
    COMPLETED = "completed"
    FAILED = "failed"
    CANCELLED = "cancelled"

class WorkflowDefinition(BaseRootPulseModel):
    """
    Template for a business process.
    Example: 'Standard KYC Approval', 'Invoice Payment Flow'
    """
    __tablename__ = 'workflow_definitions'
    
    name = Column(String(255), nullable=False)
    description = Column(Text, nullable=True)
    version = Column(String(50), default="1.0.0")
    
    # Store task sequence in JSON for flexibility
    # [ { "step": 1, "task": "ID_VERIFY" }, { "step": 2, "task": "ADMIN_REVIEW" } ]
    steps_definition = Column(JSON, nullable=False)
    
    instances = relationship("WorkflowInstance", back_populates="definition")

class WorkflowInstance(BaseRootPulseModel):
    """
    An active or past execution of a workflow.
    """
    __tablename__ = 'workflow_instances'
    
    definition_id = Column(ForeignKey('workflow_definitions.id'), nullable=False)
    status = Column(SQLEnum(WorkflowStatus), default=WorkflowStatus.PENDING)
    
    # Context data (e.g. { "user_id": "...", "order_id": "..." })
    context_data = Column(JSON, default={})
    
    current_step_index = Column(Integer, default=0)
    started_at = Column(DateTime, default=datetime.datetime.utcnow)
    completed_at = Column(DateTime, nullable=True)
    
    definition = relationship("WorkflowDefinition", back_populates="instances")
    tasks = relationship("WorkflowTask", back_populates="instance", cascade="all, delete-orphan")

class WorkflowTask(BaseRootPulseModel):
    """
    A specific step within a workflow instance.
    """
    __tablename__ = 'workflow_tasks'
    
    instance_id = Column(ForeignKey('workflow_instances.id'), nullable=False)
    task_name = Column(String(150), nullable=False)
    step_index = Column(Integer, nullable=False)
    status = Column(SQLEnum(WorkflowStatus), default=WorkflowStatus.PENDING)
    
    assigned_to = Column(String(255), nullable=True) # Role or User ID
    result_data = Column(JSON, default={}) # Captured during execution
    
    started_at = Column(DateTime, nullable=True)
    completed_at = Column(DateTime, nullable=True)
    
    instance = relationship("WorkflowInstance", back_populates="tasks")
