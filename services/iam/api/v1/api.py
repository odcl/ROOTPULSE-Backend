from fastapi import APIRouter
from .endpoints import auth, system, users

api_router = APIRouter()

# Include subdomain routers
api_router.include_router(system.router)
api_router.include_router(auth.router, prefix="/auth")
api_router.include_router(users.router)
