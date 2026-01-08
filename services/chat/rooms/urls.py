from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ChatRoomViewSet, RoomParticipantViewSet

router = DefaultRouter()
router.register(r'rooms', ChatRoomViewSet, basename='room')
router.register(r'participants', RoomParticipantViewSet, basename='participant')

urlpatterns = [
    path('', include(router.urls)),
]
