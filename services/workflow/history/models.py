from django.db import models
from rootpulse_core.models.base import BaseRootPulseModel
from requests.models import ServiceRequest
from engine.models import WorkflowStep

class WorkflowLog(BaseRootPulseModel):
    """
    Audit trail for state changes in a service request.
    """
    request = models.ForeignKey(ServiceRequest, on_delete=models.CASCADE, related_name='logs')
    from_step = models.ForeignKey(WorkflowStep, on_delete=models.SET_NULL, null=True, related_name='logs_from')
    to_step = models.ForeignKey(WorkflowStep, on_delete=models.PROTECT, related_name='logs_to')
    changed_by = models.UUIDField(help_text="UUID of the staff/system who made the change")
    comment = models.TextField(null=True, blank=True)
    
    class Meta:
        db_table = 'workflow_history'
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.request.title}: {self.from_step.name if self.from_step else 'START'} -> {self.to_step.name}"
