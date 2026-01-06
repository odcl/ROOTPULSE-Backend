from rest_framework import serializers
from .models import ServiceCategory, RootPulseService, ServiceBenefit

class ServiceBenefitSerializer(serializers.ModelSerializer):
    class Meta:
        model = ServiceBenefit
        fields = ('id', 'description')

class RootPulseServiceSerializer(serializers.ModelSerializer):
    benefits = ServiceBenefitSerializer(many=True, read_only=True)
    
    class Meta:
        model = RootPulseService
        fields = ('id', 'category', 'name', 'slug', 'description', 'benefits', 'is_active')

class ServiceCategorySerializer(serializers.ModelSerializer):
    services = RootPulseServiceSerializer(many=True, read_only=True)
    
    class Meta:
        model = ServiceCategory
        fields = ('id', 'name', 'description', 'icon_url', 'order', 'services')
