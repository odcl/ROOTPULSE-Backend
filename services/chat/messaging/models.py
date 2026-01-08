from django.db import models
from rootpulse_core.models.base import RootPulseBaseModel
from rooms.models import ChatRoom

class ChatMessage(RootPulseBaseModel):
    MESSAGE_TYPES = (
        ('TEXT', 'Text'),
        ('IMAGE', 'Image'),
        ('FILE', 'File'),
        ('SYSTEM', 'System'),
    )

    room = models.ForeignKey(ChatRoom, on_delete=models.CASCADE, related_name='messages')
    sender_uuid = models.UUIDField(db_index=True)
    message_type = models.CharField(max_length=10, choices=MESSAGE_TYPES, default='TEXT')
    content = models.TextField()
    is_edited = models.BooleanField(default=False)
    is_deleted = models.BooleanField(default=False)

    class Meta:
        db_table = 'chat_messages'

    def __str__(self):
        return f"Message from {self.sender_uuid} in Room {self.room.id}"

class MessageAttachment(RootPulseBaseModel):
    message = models.ForeignKey(ChatMessage, on_delete=models.CASCADE, related_name='attachments')
    file_url = models.URLField(max_length=500)
    file_name = models.CharField(max_length=255)
    file_size = models.PositiveIntegerField(help_text="Size in bytes")
    content_type = models.CharField(max_length=100)

    class Meta:
        db_table = 'chat_message_attachments'

    def __str__(self):
        return f"Attachment for Message {self.message.id}: {self.file_name}"
