from django.db import models
from rootpulse_core.models.base import BaseRootPulseModel
from members.models import Member

class MembershipSubscription(BaseRootPulseModel):
    """
    Handles Tenure (1/5/10/Life) and Billing Cycles.
    """
    TENURE_CHOICES = [
        ('1_year', '1 Year'),
        ('5_years', '5 Years'),
        ('10_years', '10 Years'),
        ('lifetime', 'Lifetime'),
    ]
    
    member = models.ForeignKey(Member, on_delete=models.CASCADE, related_name='subscriptions')
    tenure_type = models.CharField(max_length=20, choices=TENURE_CHOICES)
    start_date = models.DateField()
    end_date = models.DateField(null=True, blank=True) # Null for Lifetime
    is_active = models.BooleanField(default=True)
    auto_renew = models.BooleanField(default=True)
    
    class Meta:
        db_table = 'membership_subscriptions'

    def __str__(self):
        return f"{self.member.membership_id} - {self.tenure_type}"
