from rest_framework import serializers
from .models import ServiceRequest, RequestFeasibility
from engine.serializers import WorkflowStepSerializer

class FeasibilitySerializer(serializers.ModelSerializer):
    class Meta:
        model = RequestFeasibility
        fields = ('is_feasible', 'remarks', 'assessed_by', 'created_at')

class ServiceRequestSerializer(serializers.ModelSerializer):
    current_step_detail = WorkflowStepSerializer(source='current_step', read_only=True)
    feasibility = FeasibilitySerializer(read_only=True)
    
    class Meta:
        model = ServiceRequest
        fields = (
            'id', 'user_uuid', 'service_slug', 'current_step', 
            'current_step_detail', 'priority', 'title', 
            'description', 'is_emergency', 'feasibility', 'created_at'
        )
        read_only_fields = ('id', 'user_uuid', 'current_step', 'created_at')
