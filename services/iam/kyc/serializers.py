from rest_framework import serializers
from .models import UserVerification, KYCDocument

class UserVerificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserVerification
        fields = '__all__'
        read_only_fields = ('id', 'user', 'status', 'otp_code', 'attempts', 'verified_at')

class KYCDocumentSerializer(serializers.ModelSerializer):
    class Meta:
        model = KYCDocument
        fields = '__all__'
        read_only_fields = ('id', 'user', 'status', 'verified_by', 'verified_at')
