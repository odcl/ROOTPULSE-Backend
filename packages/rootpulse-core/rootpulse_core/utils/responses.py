from rest_framework.views import exception_handler
from rest_framework.response import Response
from rest_framework import status

def standard_response(data=None, message="", status_code=status.HTTP_200_OK, errors=None):
    """
    World-Class Standard API Response Format.
    """
    response_data = {
        "status": "success" if status_code < 400 else "error",
        "data": data,
        "message": message,
        "errors": errors
    }
    return Response(response_data, status=status_code)

def standard_exception_handler(exc, context):
    """
    Custom exception handler to return a standard error format.
    """
    response = exception_handler(exc, context)

    if response is not None:
        return standard_response(
            status_code=response.status_code,
            message="An error occurred",
            errors=response.data
        )
    
    return response
