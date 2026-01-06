from rest_framework import serializers
from .models import WorkflowStep

class WorkflowStepSerializer(serializers.ModelSerializer):
    class Meta:
        model = WorkflowStep
        fields = ('id', 'name', 'slug', 'order', 'description')
