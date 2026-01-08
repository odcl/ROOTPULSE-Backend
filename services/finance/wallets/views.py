from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rootpulse_core.responses import standard_response
from .models import Wallet
from .serializers import WalletSerializer
from transactions.models import Transaction
from transactions.serializers import TransactionSerializer
import uuid

class WalletViewSet(viewsets.ModelViewSet):
    queryset = Wallet.objects.all()
    serializer_class = WalletSerializer

    def get_queryset(self):
        user_uuid = self.request.user_uuid if hasattr(self.request, 'user_uuid') else None
        if user_uuid:
            return self.queryset.filter(user_uuid=user_uuid)
        return self.queryset.none()

    @action(detail=True, methods=['post'])
    def deposit(self, request, pk=None):
        wallet = self.get_object()
        amount = request.data.get('amount')
        
        if not amount or float(amount) <= 0:
            return standard_response(status='error', message="Invalid amount", status_code=status.HTTP_400_BAD_REQUEST)

        # In a real system, this would involve a payment gateway (SSLCommerz, Stripe, etc.)
        # For now, we simulate a successful deposit
        wallet.balance += float(amount)
        wallet.save()

        # Create audit transaction
        transaction = Transaction.objects.create(
            wallet=wallet,
            amount=amount,
            transaction_type='CREDIT',
            status='COMPLETED',
            reference=f"DEP-{uuid.uuid4().hex[:8].upper()}",
            description=f"Deposit via {request.data.get('payment_method', 'Gateway')}"
        )

        return standard_response(
            data={
                "wallet": WalletSerializer(wallet).data,
                "transaction": TransactionSerializer(transaction).data
            },
            message="Deposit successful"
        )
