from rest_framework import serializers
from .models import ChatRoom, RoomParticipant

class RoomParticipantSerializer(serializers.ModelSerializer):
    class Meta:
        model = RoomParticipant
        fields = '__all__'

class ChatRoomSerializer(serializers.ModelSerializer):
    participants_count = serializers.IntegerField(source='participants.count', read_only=True)
    
    class Meta:
        model = ChatRoom
        fields = '__all__'
