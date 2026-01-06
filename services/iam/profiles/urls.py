from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import UserProfileViewSet, UserAddressViewSet, UserDeviceViewSet

router = DefaultRouter()
router.register('detail', UserProfileViewSet, basename='profile-detail')
router.register('address', UserAddressViewSet, basename='profile-address')
router.register('device', UserDeviceViewSet, basename='profile-device')

urlpatterns = [
    path('', include(router.urls)),
]
