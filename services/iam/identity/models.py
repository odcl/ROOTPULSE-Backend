from django.contrib.auth.models import AbstractUser
from django.db import models
from rootpulse_core.models.base import BaseRootPulseModel

class User(AbstractUser, BaseRootPulseModel):
    """
    Custom User model for RootPulse.
    """
    phone = models.CharField(max_length=20, unique=True, null=True, blank=True)
    is_banned = models.BooleanField(default=False)
    banned_at = models.DateTimeField(null=True, blank=True)
    banned_reason = models.TextField(null=True, blank=True)
    email_verified_at = models.DateTimeField(null=True, blank=True)
    phone_verified_at = models.DateTimeField(null=True, blank=True)
    preferred_language = models.CharField(max_length=10, default='en')
    timezone = models.CharField(max_length=50, default='UTC')
    referral_code = models.CharField(max_length=50, unique=True, null=True, blank=True)
    referred_by = models.ForeignKey('self', on_delete=models.SET_NULL, null=True, blank=True, related_name='referrals')

    class Meta:
        db_table = 'users'
        verbose_name = 'User'
        verbose_name_plural = 'Users'

    def __str__(self):
        return self.email or self.username
