from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.utils import timezone
from rootpulse_core.responses import standard_response
from .models import Invoice
from .serializers import InvoiceSerializer
from wallets.models import Wallet
from transactions.models import Transaction
import uuid

class InvoiceViewSet(viewsets.ModelViewSet):
    queryset = Invoice.objects.all()
    serializer_class = InvoiceSerializer

    def get_queryset(self):
        user_uuid = self.request.user_uuid if hasattr(self.request, 'user_uuid') else None
        if user_uuid:
            return self.queryset.filter(user_uuid=user_uuid)
        return self.queryset.none()

    @action(detail=True, methods=['post'])
    def pay(self, request, pk=None):
        invoice = self.get_object()
        if invoice.status == 'PAID':
            return standard_response(status='error', message="Invoice already paid", status_code=status.HTTP_400_BAD_REQUEST)

        # Get user's wallet
        try:
            wallet = Wallet.objects.get(user_uuid=invoice.user_uuid, is_active=True)
        except Wallet.DoesNotExist:
            return standard_response(status='error', message="Wallet not found", status_code=status.HTTP_404_NOT_FOUND)

        if wallet.balance < invoice.amount:
            return standard_response(status='error', message="Insufficient balance", status_code=status.HTTP_400_BAD_REQUEST)

        # Process payment
        wallet.balance -= invoice.amount
        wallet.save()

        # Update invoice
        invoice.status = 'PAID'
        invoice.paid_at = timezone.now()
        invoice.save()

        # Create audit transaction
        Transaction.objects.create(
            wallet=wallet,
            amount=invoice.amount,
            transaction_type='DEBIT',
            status='COMPLETED',
            reference=f"INV-PAY-{invoice.id}-{uuid.uuid4().hex[:4].upper()}",
            description=f"Payment for Invoice #{invoice.id}"
        )

        # Publish event for other services (e.g. Workflow activation)
        from rootpulse_core import rabbitmq_bus
        rabbitmq_bus.publish_event(
            exchange='finance_events',
            routing_key='payment.completed',
            event_type='payment.completed',
            data={
                "invoice_id": invoice.id,
                "user_uuid": str(invoice.user_uuid),
                "amount": float(invoice.amount),
                "service_request_uuid": str(invoice.service_request_uuid) if invoice.service_request_uuid else None
            }
        )

        return standard_response(
            data=InvoiceSerializer(invoice).data,
            message="Payment successful"
        )
