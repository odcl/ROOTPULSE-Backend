from rest_framework import serializers
from .models import FamilyMember

class FamilyMemberSerializer(serializers.ModelSerializer):
    class Meta:
        model = FamilyMember
        fields = '__all__'
        read_only_fields = ('id', 'primary_member')
