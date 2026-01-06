from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import UserVerificationViewSet, KYCDocumentViewSet

router = DefaultRouter()
router.register('verify', UserVerificationViewSet, basename='kyc-verify')
router.register('document', KYCDocumentViewSet, basename='kyc-document')

urlpatterns = [
    path('', include(router.urls)),
]
