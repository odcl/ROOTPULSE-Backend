from django.db import models
from django.conf import settings
from rootpulse_core.models.base import BaseRootPulseModel

class UserVerification(BaseRootPulseModel):
    """
    KYC and MFA Verification Tracking.
    """
    VERIFICATION_TYPES = [
        ('email', 'Email'),
        ('phone', 'Phone'),
        ('mfa', 'MFA'),
        ('id_liveness', 'ID Liveness'),
        ('kyc_upload', 'KYC Document Upload'),
    ]
    
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('sent', 'Sent'),
        ('failed', 'Failed'),
        ('verified', 'Verified'),
        ('expired', 'Expired'),
    ]

    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='verifications')
    verification_type = models.CharField(max_length=50, choices=VERIFICATION_TYPES)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    otp_code = models.CharField(max_length=10, null=True, blank=True)
    otp_sent_at = models.DateTimeField(null=True, blank=True)
    otp_expires_at = models.DateTimeField(null=True, blank=True)
    attempts = models.IntegerField(default=0)
    verified_at = models.DateTimeField(null=True, blank=True)

    class Meta:
        db_table = 'user_verifications'

class KYCDocument(BaseRootPulseModel):
    """
    KYC Document Storage (NID, Passport, etc.)
    """
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='kyc_documents')
    document_type = models.CharField(max_length=50) # e.g., 'passport', 'nid'
    document_number = models.CharField(max_length=100)
    file_url = models.URLField(max_length=500)
    status = models.CharField(max_length=20, choices=[
        ('pending', 'Pending'),
        ('approved', 'Approved'),
        ('rejected', 'Rejected')
    ], default='pending')
    remarks = models.TextField(null=True, blank=True)
    verified_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, blank=True, related_name='verified_kycs')
    verified_at = models.DateTimeField(null=True, blank=True)

    class Meta:
        db_table = 'user_kyc_documents'
