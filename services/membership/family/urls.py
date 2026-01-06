from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import FamilyMemberViewSet

router = DefaultRouter()
router.register('', FamilyMemberViewSet, basename='family-member')

urlpatterns = [
    path('', include(router.urls)),
]
