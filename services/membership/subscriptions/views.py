from rest_framework import viewsets, permissions
from .models import MembershipSubscription
from .serializers import MembershipSubscriptionSerializer
from rootpulse_core.utils.responses import standard_response

class SubscriptionViewSet(viewsets.ModelViewSet):
    serializer_class = MembershipSubscriptionSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return MembershipSubscription.objects.filter(member__user_uuid=self.request.user.id)

    def list(self, request, *args, **kwargs):
        response = super().list(request, *args, **kwargs)
        return standard_response(data=response.data, message="Subscriptions retrieved.")
