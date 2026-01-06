from django.db import models
from rootpulse_core.models.base import BaseRootPulseModel

class ServiceCategory(BaseRootPulseModel):
    """
    Main Service Categories (e.g., Travel & Assistance, Asset Guardian).
    """
    name = models.CharField(max_length=255, unique=True)
    description = models.TextField(null=True, blank=True)
    icon_url = models.URLField(max_length=500, null=True, blank=True)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        db_table = 'service_categories'
        verbose_name_plural = 'Service Categories'
        ordering = ['order', 'name']

    def __str__(self):
        return self.name

class RootPulseService(BaseRootPulseModel):
    """
    Specific services offered by RootPulse (e.g., Air Ticket, Property Monitoring).
    """
    category = models.ForeignKey(ServiceCategory, on_delete=models.CASCADE, related_name='services')
    name = models.CharField(max_length=255)
    slug = models.SlugField(max_length=255, unique=True)
    description = models.TextField()
    is_active = models.BooleanField(default=True)
    
    class Meta:
        db_table = 'services'
        verbose_name = 'Service'
        verbose_name_plural = 'Services'

    def __str__(self):
        return f"{self.category.name} - {self.name}"

class ServiceBenefit(BaseRootPulseModel):
    """
    Specific benefits/features of a service.
    """
    service = models.ForeignKey(RootPulseService, on_delete=models.CASCADE, related_name='benefits')
    description = models.CharField(max_length=500)
    
    class Meta:
        db_table = 'service_benefits'
