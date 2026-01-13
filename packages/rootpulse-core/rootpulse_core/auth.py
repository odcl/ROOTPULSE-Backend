import os
import logging
from typing import Optional, List, Dict, Any
from jose import jwt, JWTError
from fastapi import HTTPException, Security, Depends
from fastapi.security import OAuth2PasswordBearer

logger = logging.getLogger(__name__)

class AuthService:
    """
    Standardized Authentication & RBAC utility for RootPulse.
    Integrates with Keycloak (OIDC/JWT) for secure AuthN/AuthZ.
    Supports Realm, Client, and Composite roles.
    """

    def __init__(self):
        self.secret_key = os.getenv("JWT_SECRET_KEY", "your-secret-key")
        self.algorithm = os.getenv("JWT_ALGORITHM", "RS256")
        self.oidc_issuer = os.getenv("OIDC_ISSUER", "http://keycloak:8080/realms/rootpulse")
        self.jwks_url = f"{self.oidc_issuer}/protocol/openid-connect/certs"

    async def verify_token(self, token: str) -> Dict[str, Any]:
        """
        Verify the JWT token and return the payload.
        In production, this should fetch JWKS from Keycloak.
        """
        try:
            # Placeholder for actual JWKS verification logic
            payload = jwt.decode(token, self.secret_key, algorithms=[self.algorithm])
            return payload
        except JWTError as e:
            logger.error(f"JWT Verification failed: {str(e)}")
            raise HTTPException(status_code=401, detail="Invalid token")

    def has_role(self, payload: Dict[str, Any], role_name: str, client_id: Optional[str] = None) -> bool:
        """
        Check if the user has a specific realm or client role.
        """
        # Realm roles
        realm_roles = payload.get("realm_access", {}).get("roles", [])
        if role_name in realm_roles:
            return True

        # Client roles
        if client_id:
            client_roles = payload.get("resource_access", {}).get(client_id, {}).get("roles", [])
            if role_name in client_roles:
                return True

        return False

# Security helper for FastAPI
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

async def get_current_user(token: str = Depends(oauth2_scheme)):
    auth_service = AuthService()
    return await auth_service.verify_token(token)

def role_required(role_name: str, client_id: Optional[str] = None):
    """
    FastAPI dependency factory for role-based access control.
    """
    async def role_checker(payload: Dict[str, Any] = Depends(get_current_user)):
        auth_service = AuthService()
        if not auth_service.has_role(payload, role_name, client_id):
            raise HTTPException(status_code=403, detail="Operation not permitted")
        return payload
    return role_checker

# Singleton instance
auth_service = AuthService()
