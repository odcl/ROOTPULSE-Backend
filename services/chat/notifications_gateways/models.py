from django.db import models
from rootpulse_core.models.base import RootPulseBaseModel

class NotificationLog(RootPulseBaseModel):
    CHANNEL_CHOICES = (
        ('SMS', 'SMS'),
        ('EMAIL', 'Email'),
        ('WHATSAPP', 'WhatsApp'),
        ('PUSH', 'Push Notification'),
    )
    
    STATUS_CHOICES = (
        ('PENDING', 'Pending'),
        ('SENT', 'Sent'),
        ('FAILED', 'Failed'),
    )

    user_uuid = models.UUIDField(db_index=True)
    channel = models.CharField(max_length=20, choices=CHANNEL_CHOICES)
    recipient = models.CharField(max_length=255, help_text="Phone number or Email")
    content = models.TextField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='PENDING')
    provider_reference = models.CharField(max_length=255, blank=True, null=True)
    error_message = models.TextField(blank=True, null=True)

    class Meta:
        db_table = 'notification_logs'

    def __str__(self):
        return f"{self.channel} to {self.recipient} - {self.status}"
