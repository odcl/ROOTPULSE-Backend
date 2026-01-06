from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from .models import ServiceRequest, RequestFeasibility
from .serializers import ServiceRequestSerializer, FeasibilitySerializer
from rootpulse_core.utils.responses import standard_response
from engine.models import WorkflowStep

class ServiceRequestViewSet(viewsets.ModelViewSet):
    """
    Manage service requests and their lifecycle.
    """
    queryset = ServiceRequest.objects.all()
    serializer_class = ServiceRequestSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        if self.request.user.is_staff:
            return ServiceRequest.objects.all()
        return ServiceRequest.objects.filter(user_uuid=self.request.user.id)

    def perform_create(self, serializer):
        # Default to first step: "Customer Requested" (assume order=1)
        initial_step = WorkflowStep.objects.get(order=1)
        serializer.save(user_uuid=self.request.user.id, current_step=initial_step)

    def list(self, request, *args, **kwargs):
        response = super().list(request, *args, **kwargs)
        return standard_response(data=response.data, message="Requests retrieved.")

    @action(detail=True, methods=['post'])
    def assess_feasibility(self, request, pk=None):
        """
        Step 1: Record feasibility.
        """
        service_request = self.get_object()
        serializer = FeasibilitySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(request=service_request, assessed_by=request.user.id)
            # Move to next step if feasible
            if request.data.get('is_feasible'):
                next_step = WorkflowStep.objects.get(order=2)
                service_request.current_step = next_step
                service_request.save()
            
            return standard_response(message="Feasibility assessed.")
        return standard_response(errors=serializer.errors, status_code=status.HTTP_400_BAD_REQUEST)
