from rest_framework import serializers
from .models import ChatMessage, MessageAttachment

class MessageAttachmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = MessageAttachment
        fields = '__all__'

class ChatMessageSerializer(serializers.ModelSerializer):
    attachments = MessageAttachmentSerializer(many=True, read_only=True)
    
    class Meta:
        model = ChatMessage
        fields = '__all__'
