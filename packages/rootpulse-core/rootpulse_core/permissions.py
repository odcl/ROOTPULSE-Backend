from enum import Enum
from typing import List, Dict, Set

# --- 1. Role Definitions ---
class Role(str, Enum):
    SUPER_ADMIN = "SUPER_ADMIN"
    FINANCE_ADMIN = "FINANCE_ADMIN"
    CONTENT_MANAGER = "CONTENT_MANAGER"
    SUPPORT_AGENT = "SUPPORT_AGENT"
    USER = "USER"

# --- 2. Permission Constants ---
class Permission(str, Enum):
    # System
    VIEW_DASHBOARD = "dashboard:view"
    MANAGE_SETTINGS = "settings:manage"
    
    # IAM / Users
    VIEW_USERS = "users:view"
    EDIT_USERS = "users:edit"
    DELETE_USERS = "users:delete"
    
    # Finance
    VIEW_TRANSACTIONS = "finance:view"
    MANAGE_PAYOUTS = "finance:payouts"
    
    # Content
    MANAGE_CONTENT = "content:manage"

# --- 3. Role -> Permission Mapping (Composite Logic) ---
ROLE_PERMISSIONS: Dict[Role, Set[Permission]] = {
    Role.SUPER_ADMIN: {
        # Super Admin has ALL permissions
        Permission.VIEW_DASHBOARD, Permission.MANAGE_SETTINGS,
        Permission.VIEW_USERS, Permission.EDIT_USERS, Permission.DELETE_USERS,
        Permission.VIEW_TRANSACTIONS, Permission.MANAGE_PAYOUTS,
        Permission.MANAGE_CONTENT
    },
    Role.FINANCE_ADMIN: {
        Permission.VIEW_DASHBOARD,
        Permission.VIEW_TRANSACTIONS, Permission.MANAGE_PAYOUTS
    },
    Role.CONTENT_MANAGER: {
        Permission.VIEW_DASHBOARD,
        Permission.MANAGE_CONTENT
    },
    Role.SUPPORT_AGENT: {
        Permission.VIEW_DASHBOARD,
        Permission.VIEW_USERS
    },
    Role.USER: set() # Basic users have no admin permissions
}

# --- 4. Frontend Menu Mapping ---
# Which menus should be visible based on permissions?
MENU_CONFIG = [
    {"id": "dashboard", "label": "Dashboard", "permission": Permission.VIEW_DASHBOARD},
    {"id": "users", "label": "User Management", "permission": Permission.VIEW_USERS},
    {"id": "finance", "label": "Finance", "permission": Permission.VIEW_TRANSACTIONS},
    {"id": "content", "label": "Content", "permission": Permission.MANAGE_CONTENT},
    {"id": "settings", "label": "Settings", "permission": Permission.MANAGE_SETTINGS},
]

def get_user_permissions(roles: List[Role]) -> Set[str]:
    """
    Calculate the union of all permissions for a user's roles.
    """
    perms = set()
    for role in roles:
        if role in ROLE_PERMISSIONS:
            perms.update(ROLE_PERMISSIONS[role])
    return {p.value for p in perms}

def get_user_menu(permissions: Set[str]) -> List[Dict]:
    """
    Return the list of menu items the user is allowed to see.
    """
    return [menu for menu in MENU_CONFIG if menu["permission"].value in permissions]
