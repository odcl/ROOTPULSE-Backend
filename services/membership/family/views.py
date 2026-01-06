from rest_framework import viewsets, permissions
from .models import FamilyMember
from .serializers import FamilyMemberSerializer
from rootpulse_core.utils.responses import standard_response

class FamilyMemberViewSet(viewsets.ModelViewSet):
    serializer_class = FamilyMemberSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return FamilyMember.objects.filter(primary_member__user_uuid=self.request.user.id)

    def list(self, request, *args, **kwargs):
        response = super().list(request, *args, **kwargs)
        return standard_response(data=response.data, message="Family members retrieved.")
