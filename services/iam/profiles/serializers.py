from rest_framework import serializers
from .models import UserProfile, UserAddress, UserDevice

class UserAddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserAddress
        fields = '__all__'
        read_only_fields = ('id', 'user')

class UserDeviceSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserDevice
        fields = '__all__'
        read_only_fields = ('id', 'user')

class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = '__all__'
        read_only_fields = ('id', 'user')
