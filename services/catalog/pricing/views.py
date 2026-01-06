from rest_framework import viewsets, permissions
from .models import PricingTier, ServicePricing
from .serializers import PricingTierSerializer, ServicePricingSerializer
from rootpulse_core.utils.responses import standard_response

class PricingTierViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = PricingTier.objects.all()
    serializer_class = PricingTierSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def list(self, request, *args, **kwargs):
        response = super().list(request, *args, **kwargs)
        return standard_response(data=response.data, message="Pricing tiers retrieved.")

class ServicePricingViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = ServicePricing.objects.all()
    serializer_class = ServicePricingSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    filterset_fields = ['service', 'tier', 'billing_cycle']

    def list(self, request, *args, **kwargs):
        response = super().list(request, *args, **kwargs)
        return standard_response(data=response.data, message="Service pricings retrieved.")
