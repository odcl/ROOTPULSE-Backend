from django.db import models
from rootpulse_core.models.base import RootPulseBaseModel

class Invoice(RootPulseBaseModel):
    STATUS_CHOICES = (
        ('UNPAID', 'Unpaid'),
        ('PAID', 'Paid'),
        ('CANCELLED', 'Cancelled'),
        ('OVERDUE', 'Overdue'),
    )

    user_uuid = models.UUIDField(db_index=True)
    service_request_uuid = models.UUIDField(db_index=True, null=True, blank=True)
    amount = models.DecimalField(max_digits=15, decimal_places=2)
    currency = models.CharField(max_length=3, default='USD')
    status = models.CharField(max_length=15, choices=STATUS_CHOICES, default='UNPAID')
    due_date = models.DateField()
    paid_at = models.DateTimeField(null=True, blank=True)
    pdf_url = models.URLField(max_length=500, blank=True, null=True)

    class Meta:
        db_table = 'finance_invoices'

    def __str__(self):
        return f"Invoice {self.id} for {self.user_uuid} - {self.amount} {self.currency}"
