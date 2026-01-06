from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PricingTierViewSet, ServicePricingViewSet

router = DefaultRouter()
router.register('tiers', PricingTierViewSet, basename='pricing-tier')
router.register('rates', ServicePricingViewSet, basename='service-pricing')

urlpatterns = [
    path('', include(router.urls)),
]
