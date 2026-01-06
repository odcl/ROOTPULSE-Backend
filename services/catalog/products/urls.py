from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ServiceCategoryViewSet, RootPulseServiceViewSet

router = DefaultRouter()
router.register('categories', ServiceCategoryViewSet, basename='category')
router.register('items', RootPulseServiceViewSet, basename='service')

urlpatterns = [
    path('', include(router.urls)),
]
