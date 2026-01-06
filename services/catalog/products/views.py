from rest_framework import viewsets, permissions
from .models import ServiceCategory, RootPulseService
from .serializers import ServiceCategorySerializer, RootPulseServiceSerializer
from rootpulse_core.utils.responses import standard_response

class ServiceCategoryViewSet(viewsets.ReadOnlyModelViewSet):
    """
    API view to list and retrieve service categories.
    """
    queryset = ServiceCategory.objects.all()
    serializer_class = ServiceCategorySerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def list(self, request, *args, **kwargs):
        response = super().list(request, *args, **kwargs)
        return standard_response(data=response.data, message="Categories retrieved.")

    def retrieve(self, request, *args, **kwargs):
        response = super().retrieve(request, *args, **kwargs)
        return standard_response(data=response.data, message="Category details retrieved.")

class RootPulseServiceViewSet(viewsets.ReadOnlyModelViewSet):
    """
    API view to list and retrieve specific services.
    """
    queryset = RootPulseService.objects.filter(is_active=True)
    serializer_class = RootPulseServiceSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    lookup_field = 'slug'

    def list(self, request, *args, **kwargs):
        response = super().list(request, *args, **kwargs)
        return standard_response(data=response.data, message="Services retrieved.")

    def retrieve(self, request, *args, **kwargs):
        response = super().retrieve(request, *args, **kwargs)
        return standard_response(data=response.data, message="Service details retrieved.")
