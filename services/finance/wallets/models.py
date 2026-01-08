from django.db import models
from rootpulse_core.models.base import RootPulseBaseModel
from rootpulse_core import Currency

class Wallet(RootPulseBaseModel):
    user_uuid = models.UUIDField(db_index=True)
    balance = models.DecimalField(max_digits=15, decimal_places=2, default=0.00)
    currency = models.CharField(max_length=3, choices=Currency.CHOICES, default=Currency.USD)
    is_active = models.BooleanField(default=True)

    class Meta:
        db_table = 'finance_wallets'
        unique_together = ('user_uuid', 'currency')

    def __str__(self):
        return f"Wallet {self.user_uuid} - {self.balance} {self.currency}"
