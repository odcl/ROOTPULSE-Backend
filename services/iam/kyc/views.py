from rest_framework import viewsets, permissions
from .models import UserVerification, KYCDocument
from .serializers import UserVerificationSerializer, KYCDocumentSerializer

class UserVerificationViewSet(viewsets.ModelViewSet):
    serializer_class = UserVerificationSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return UserVerification.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class KYCDocumentViewSet(viewsets.ModelViewSet):
    serializer_class = KYCDocumentSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return KYCDocument.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
