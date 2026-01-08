from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rootpulse_core.responses import standard_response
from .models import ChatRoom, RoomParticipant
from .serializers import ChatRoomSerializer, RoomParticipantSerializer

class ChatRoomViewSet(viewsets.ModelViewSet):
    queryset = ChatRoom.objects.all()
    serializer_class = ChatRoomSerializer

    def get_queryset(self):
        user_uuid = self.request.user_uuid if hasattr(self.request, 'user_uuid') else None
        if user_uuid:
            return self.queryset.filter(participants__user_uuid=user_uuid, is_active=True)
        return self.queryset.none()

    @action(detail=True, methods=['post'])
    def join(self, request, pk=None):
        room = self.get_object()
        user_uuid = request.data.get('user_uuid')
        
        if not user_uuid:
            return standard_response(status='error', message="User UUID required", status_code=status.HTTP_400_BAD_REQUEST)

        participant, created = RoomParticipant.objects.get_or_create(
            room=room,
            user_uuid=user_uuid
        )
        
        return standard_response(
            data=RoomParticipantSerializer(participant).data,
            message="Joined successfully"
        )

class RoomParticipantViewSet(viewsets.ModelViewSet):
    queryset = RoomParticipant.objects.all()
    serializer_class = RoomParticipantSerializer
