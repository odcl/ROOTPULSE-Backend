from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ChatMessageViewSet, MessageAttachmentViewSet

router = DefaultRouter()
router.register(r'messages', ChatMessageViewSet, basename='message')
router.register(r'attachments', MessageAttachmentViewSet, basename='attachment')

urlpatterns = [
    path('', include(router.urls)),
]
