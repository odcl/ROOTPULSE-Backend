from fastapi import APIRouter, Depends
from ....schemas import PermissionResponse
from rootpulse_core.auth import get_current_user
from rootpulse_core.permissions import get_user_permissions, get_user_menu, Role

router = APIRouter()

@router.get("/me/permissions", response_model=PermissionResponse, tags=["Users"])
async def get_my_permissions(current_user: dict = Depends(get_current_user)):
    """
    Return the permissions and menu structure for the logged-in user.
    """
    user_roles_str = current_user.get("realm_access", {}).get("roles", [])
    
    roles = []
    for r in user_roles_str:
        try:
            roles.append(Role(r))
        except ValueError:
            pass
    
    permissions = get_user_permissions(roles)
    menu = get_user_menu(permissions)
    
    return {
        "roles": user_roles_str,
        "permissions": list(permissions),
        "menu": menu
    }
