from rest_framework import generics, status, permissions
from rest_framework.response import Response
from .serializers import RegisterSerializer, UserSerializer
from rootpulse_core.utils.responses import standard_response

class RegisterView(generics.CreateAPIView):
    serializer_class = RegisterSerializer
    permission_classes = (permissions.AllowAny,)

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            return standard_response(
                data=UserSerializer(user).data,
                message="User registered successfully.",
                status_code=status.HTTP_201_CREATED
            )
        return standard_response(
            message="Registration failed.",
            errors=serializer.errors,
            status_code=status.HTTP_400_BAD_REQUEST
        )

class UserProfileView(generics.RetrieveUpdateAPIView):
    serializer_class = UserSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def get_object(self):
        return self.request.user
    
    def get(self, request, *args, **kwargs):
        serializer = self.get_serializer(self.get_object())
        return standard_response(data=serializer.data, message="User profile retrieved.")

    def patch(self, request, *args, **kwargs):
        return super().partial_update(request, *args, **kwargs)
