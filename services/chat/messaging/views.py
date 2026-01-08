from rest_framework import viewsets, status
from rest_framework.response import Response
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync
from rootpulse_core.responses import standard_response
from .models import ChatMessage, MessageAttachment
from .serializers import ChatMessageSerializer, MessageAttachmentSerializer

class ChatMessageViewSet(viewsets.ModelViewSet):
    queryset = ChatMessage.objects.all()
    serializer_class = ChatMessageSerializer

    def get_queryset(self):
        room_id = self.request.query_params.get('room_id')
        if room_id:
            return self.queryset.filter(room_id=room_id, is_deleted=False).order_by('created_at')
        return self.queryset.none()

    def perform_create(self, serializer):
        message = serializer.save()
        
        # Broadcast to WebSocket group
        channel_layer = get_channel_layer()
        async_to_sync(channel_layer.group_send)(
            f"chat_{message.room.id}",
            {
                "type": "chat_message",
                "message": ChatMessageSerializer(message).data
            }
        )

class MessageAttachmentViewSet(viewsets.ModelViewSet):
    queryset = MessageAttachment.objects.all()
    serializer_class = MessageAttachmentSerializer
