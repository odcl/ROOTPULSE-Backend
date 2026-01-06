from rest_framework import viewsets, permissions, status
from .models import Member
from .serializers import MemberSerializer
from rootpulse_core.utils.responses import standard_response
import uuid

class MemberViewSet(viewsets.ModelViewSet):
    """
    API view to manage members.
    """
    queryset = Member.objects.all()
    serializer_class = MemberSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        if self.request.user.is_staff:
            return Member.objects.all()
        return Member.objects.filter(user_uuid=self.request.user.id) # Assuming user.id is the UUID

    def perform_create(self, serializer):
        # Generate internal membership ID
        membership_id = f"RP-{uuid.uuid4().hex[:8].upper()}"
        serializer.save(user_uuid=self.request.user.id, membership_id=membership_id)

    def list(self, request, *args, **kwargs):
        response = super().list(request, *args, **kwargs)
        return standard_response(data=response.data, message="Members retrieved.")
