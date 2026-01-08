from django.db import models
from rootpulse_core.models.base import BaseRootPulseModel
from rootpulse_core import MultiLanguageMixin

class ServiceCategory(BaseRootPulseModel, MultiLanguageMixin):
    """
    Main Service Categories (e.g., Travel & Assistance, Asset Guardian).
    """
    name_en = models.CharField(max_length=255, unique=True)
    name_bn = models.CharField(max_length=255, null=True, blank=True)
    name_ar = models.CharField(max_length=255, null=True, blank=True)
    
    description_en = models.TextField(null=True, blank=True)
    description_bn = models.TextField(null=True, blank=True)
    description_ar = models.TextField(null=True, blank=True)
    
    icon_url = models.URLField(max_length=500, null=True, blank=True)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        db_table = 'service_categories'
        verbose_name_plural = 'Service Categories'
        ordering = ['order', 'name_en']

    def __str__(self):
        return self.name_en

class RootPulseService(BaseRootPulseModel, MultiLanguageMixin):
    """
    Specific services offered by RootPulse (e.g., Air Ticket, Property Monitoring).
    """
    category = models.ForeignKey(ServiceCategory, on_delete=models.CASCADE, related_name='services')
    
    name_en = models.CharField(max_length=255)
    name_bn = models.CharField(max_length=255, null=True, blank=True)
    name_ar = models.CharField(max_length=255, null=True, blank=True)
    
    slug = models.SlugField(max_length=255, unique=True)
    
    description_en = models.TextField()
    description_bn = models.TextField(null=True, blank=True)
    description_ar = models.TextField(null=True, blank=True)
    
    is_active = models.BooleanField(default=True)
    
    class Meta:
        db_table = 'services'
        verbose_name = 'Service'
        verbose_name_plural = 'Services'

    def __str__(self):
        return f"{self.category.name_en} - {self.name_en}"

class ServiceBenefit(BaseRootPulseModel, MultiLanguageMixin):
    """
    Specific benefits/features of a service.
    """
    service = models.ForeignKey(RootPulseService, on_delete=models.CASCADE, related_name='benefits')
    
    description_en = models.CharField(max_length=500)
    description_bn = models.CharField(max_length=500, null=True, blank=True)
    description_ar = models.CharField(max_length=500, null=True, blank=True)
    
    class Meta:
        db_table = 'service_benefits'
