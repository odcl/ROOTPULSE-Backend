from django.db import models
from django.conf import settings
from rootpulse_core.models.base import BaseRootPulseModel

class Member(BaseRootPulseModel):
    """
    Core Membership record for a user.
    """
    STATUS_CHOICES = [
        ('active', 'Active'),
        ('inactive', 'Inactive'),
        ('suspended', 'Suspended'),
        ('expired', 'Expired'),
        ('pending', 'Pending Approval'),
    ]
    
    user_uuid = models.UUIDField(unique=True, help_text="Global User UUID from IAM/Keycloak")
    membership_id = models.CharField(max_length=50, unique=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    joined_at = models.DateTimeField(null=True, blank=True)
    membership_tier_slug = models.SlugField(max_length=50, help_text="Slug from Catalog Service")
    
    class Meta:
        db_table = 'members'
        verbose_name = 'Member'
        verbose_name_plural = 'Members'

    def __str__(self):
        return self.membership_id
