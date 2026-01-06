from rest_framework import viewsets, permissions
from .models import WorkflowStep
from .serializers import WorkflowStepSerializer
from rootpulse_core.utils.responses import standard_response

class WorkflowStepViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = WorkflowStep.objects.all()
    serializer_class = WorkflowStepSerializer
    permission_classes = [permissions.IsAuthenticated]

    def list(self, request, *args, **kwargs):
        response = super().list(request, *args, **kwargs)
        return standard_response(data=response.data, message="Workflow steps retrieved.")
