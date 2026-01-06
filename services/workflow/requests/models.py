from django.db import models
from rootpulse_core.models.base import BaseRootPulseModel
from engine.models import WorkflowStep

class ServiceRequest(BaseRootPulseModel):
    """
    User request for a specific service (e.g., Blood Sample, Ticket).
    """
    PRIORITY_CHOICES = [
        ('low', 'Low'),
        ('medium', 'Medium'),
        ('high', 'High'),
        ('critical', 'Critical'),
    ]
    
    user_uuid = models.UUIDField(help_text="Global User UUID from IAM")
    service_slug = models.SlugField(max_length=255, help_text="Service slug from Catalog")
    current_step = models.ForeignKey(WorkflowStep, on_delete=models.PROTECT, related_name='active_requests')
    priority = models.CharField(max_length=20, choices=PRIORITY_CHOICES, default='medium')
    title = models.CharField(max_length=255)
    description = models.TextField()
    is_emergency = models.BooleanField(default=False)
    
    class Meta:
        db_table = 'service_requests'

    def __str__(self):
        return f"{self.title} ({self.current_step.name})"

class RequestFeasibility(BaseRootPulseModel):
    """
    Stores feasibility assessment data (Step 1).
    """
    request = models.OneToOneField(ServiceRequest, on_delete=models.CASCADE, related_name='feasibility')
    is_feasible = models.BooleanField(default=False)
    remarks = models.TextField(null=True, blank=True)
    assessed_by = models.UUIDField(help_text="UUID of the RM/Staff who assessed")
    
    class Meta:
        db_table = 'request_feasibility'
