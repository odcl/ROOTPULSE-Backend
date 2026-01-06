from rest_framework import serializers
from .models import MembershipSubscription

class MembershipSubscriptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = MembershipSubscription
        fields = '__all__'
        read_only_fields = ('id', 'member')
