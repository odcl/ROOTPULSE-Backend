from rest_framework import viewsets
from rootpulse_core.responses import standard_response
from .models import Transaction
from .serializers import TransactionSerializer

class TransactionViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Transaction.objects.all()
    serializer_class = TransactionSerializer

    def get_queryset(self):
        user_uuid = self.request.user_uuid if hasattr(self.request, 'user_uuid') else None
        if user_uuid:
            return self.queryset.filter(wallet__user_uuid=user_uuid)
        return self.queryset.none()
