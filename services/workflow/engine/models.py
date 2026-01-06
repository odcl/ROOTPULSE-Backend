from django.db import models
from rootpulse_core.models.base import BaseRootPulseModel

class WorkflowStep(BaseRootPulseModel):
    """
    Defines one of the 12 lifecycle steps.
    """
    name = models.CharField(max_length=100, unique=True)
    slug = models.SlugField(max_length=100, unique=True)
    order = models.PositiveIntegerField(unique=True)
    description = models.TextField(null=True, blank=True)
    
    class Meta:
        db_table = 'workflow_steps'
        ordering = ['order']

    def __str__(self):
        return f"{self.order}. {self.name}"
