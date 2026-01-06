from django.db import models
from rootpulse_core.models.base import BaseRootPulseModel
from products.models import RootPulseService

class PricingTier(BaseRootPulseModel):
    """
    Service Tiers (e.g., Platinum, Gold, Silver).
    """
    name = models.CharField(max_length=50, unique=True)
    slug = models.SlugField(max_length=50, unique=True)
    description = models.TextField(null=True, blank=True)
    weight = models.PositiveIntegerField(help_text="Higher weight means higher priority/luxury.")

    class Meta:
        db_table = 'pricing_tiers'
        ordering = ['-weight']

    def __str__(self):
        return self.name

class ServicePricing(BaseRootPulseModel):
    """
    Pricing per service per tier.
    """
    service = models.ForeignKey(RootPulseService, on_delete=models.CASCADE, related_name='pricing')
    tier = models.ForeignKey(PricingTier, on_delete=models.CASCADE, related_name='pricing')
    price = models.DecimalField(max_digits=12, decimal_places=2)
    currency = models.CharField(max_length=10, default='USD')
    billing_cycle = models.CharField(max_length=20, choices=[
        ('monthly', 'Monthly'),
        ('quarterly', 'Quarterly'),
        ('half-yearly', 'Half-Yearly'),
        ('yearly', 'Yearly'),
        ('one-time', 'One-Time')
    ], default='yearly')

    class Meta:
        db_table = 'service_pricing'
        unique_together = ('service', 'tier', 'billing_cycle')

    def __str__(self):
        return f"{self.service.name} - {self.tier.name} ({self.price} {self.currency})"
