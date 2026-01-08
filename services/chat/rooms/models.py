from django.db import models
from rootpulse_core.models.base import RootPulseBaseModel

class ChatRoom(RootPulseBaseModel):
    ROOM_TYPES = (
        ('P2P', 'Peer-to-Peer'),
        ('GROUP', 'Group'),
        ('SUPPORT', 'Support'),
    )
    
    room_type = models.CharField(max_length=10, choices=ROOM_TYPES, default='P2P')
    name = models.CharField(max_length=255, blank=True, null=True)
    is_active = models.BooleanField(default=True)
    metadata = models.JSONField(default=dict, blank=True)

    class Meta:
        db_table = 'chat_rooms'

    def __str__(self):
        return f"{self.room_type} Room: {self.name or self.id}"

class RoomParticipant(RootPulseBaseModel):
    room = models.ForeignKey(ChatRoom, on_delete=models.CASCADE, related_name='participants')
    user_uuid = models.UUIDField(db_index=True)
    joined_at = models.DateTimeField(auto_now_add=True)
    last_read_at = models.DateTimeField(null=True, blank=True)
    is_admin = models.BooleanField(default=False)

    class Meta:
        db_table = 'chat_room_participants'
        unique_together = ('room', 'user_uuid')

    def __str__(self):
        return f"User {self.user_uuid} in Room {self.room.id}"
