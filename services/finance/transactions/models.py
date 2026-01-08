from django.db import models
from rootpulse_core.models.base import RootPulseBaseModel
from wallets.models import Wallet

class Transaction(RootPulseBaseModel):
    TRANSACTION_TYPES = (
        ('CREDIT', 'Credit'),
        ('DEBIT', 'Debit'),
    )
    
    STATUS_CHOICES = (
        ('PENDING', 'Pending'),
        ('COMPLETED', 'Completed'),
        ('FAILED', 'Failed'),
        ('REFUNDED', 'Refunded'),
    )

    wallet = models.ForeignKey(Wallet, on_delete=models.CASCADE, related_name='transactions')
    amount = models.DecimalField(max_digits=15, decimal_places=2)
    transaction_type = models.CharField(max_length=10, choices=TRANSACTION_TYPES)
    status = models.CharField(max_length=15, choices=STATUS_CHOICES, default='PENDING')
    reference = models.CharField(max_length=100, unique=True)
    description = models.TextField(blank=True, null=True)
    metadata = models.JSONField(default=dict, blank=True)

    class Meta:
        db_table = 'finance_transactions'

    def __str__(self):
        return f"{self.transaction_type} - {self.amount} ({self.status})"
