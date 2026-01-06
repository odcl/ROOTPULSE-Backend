from rest_framework import viewsets, permissions
from .models import UserProfile, UserAddress, UserDevice
from .serializers import UserProfileSerializer, UserAddressSerializer, UserDeviceSerializer
from rootpulse_core.utils.responses import standard_response

class UserProfileViewSet(viewsets.ModelViewSet):
    serializer_class = UserProfileSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return UserProfile.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class UserAddressViewSet(viewsets.ModelViewSet):
    serializer_class = UserAddressSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return UserAddress.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class UserDeviceViewSet(viewsets.ModelViewSet):
    serializer_class = UserDeviceSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return UserDevice.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
