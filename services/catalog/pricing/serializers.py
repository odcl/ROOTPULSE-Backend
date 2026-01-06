from rest_framework import serializers
from .models import PricingTier, ServicePricing

class PricingTierSerializer(serializers.ModelSerializer):
    class Meta:
        model = PricingTier
        fields = ('id', 'name', 'slug', 'description', 'weight')

class ServicePricingSerializer(serializers.ModelSerializer):
    tier_name = serializers.CharField(source='tier.name', read_only=True)
    service_name = serializers.CharField(source='service.name', read_only=True)
    
    class Meta:
        model = ServicePricing
        fields = ('id', 'service', 'service_name', 'tier', 'tier_name', 'price', 'currency', 'billing_cycle')
