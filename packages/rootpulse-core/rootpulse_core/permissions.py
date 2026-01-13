from enum import Enum
from typing import List, Dict, Set

# --- 1. Role Definitions ---
class Role(str, Enum):
    SUPER_ADMIN = "SUPER_ADMIN"
    CUSTOM_ADMIN = "CUSTOM_ADMIN"
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

    # Workflow
    VIEW_WORKFLOWS = "workflow:view"
    MANAGE_WORKFLOWS = "workflow:manage"
    EXECUTE_WORKFLOWS = "workflow:execute"

    # Catalog
    VIEW_CATALOG = "catalog:view"
    MANAGE_CATALOG = "catalog:manage"

    # Chat
    VIEW_CHAT = "chat:view"
    MODERATE_CHAT = "chat:moderate"

    # Analytics
    VIEW_ANALYTICS = "analytics:view"
    EXPORT_ANALYTICS = "analytics:export"

    # Notifications
    SEND_NOTIFICATIONS = "notifications:send"
    MANAGE_NOTIFICATIONS = "notifications:manage"

# --- 3. Role -> Permission Mapping (Composite Logic) ---
ROLE_PERMISSIONS: Dict[Role, Set[Permission]] = {
    Role.SUPER_ADMIN: set(Permission), # Legacy Super Admin has everything
    Role.CUSTOM_ADMIN: set(Permission), # Custom Super Admin has everything
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
MENU_CONFIG = [
    {"id": "dashboard", "label": "Dashboard", "permission": Permission.VIEW_DASHBOARD},
    {"id": "users", "label": "User Management", "permission": Permission.VIEW_USERS},
    {"id": "workflow", "label": "Workflows", "permission": Permission.VIEW_WORKFLOWS},
    {"id": "catalog", "label": "Catalog", "permission": Permission.VIEW_CATALOG},
    {"id": "finance", "label": "Finance", "permission": Permission.VIEW_TRANSACTIONS},
    {"id": "chat", "label": "Community Chat", "permission": Permission.VIEW_CHAT},
    {"id": "notifications", "label": "Notifications", "permission": Permission.SEND_NOTIFICATIONS},
    {"id": "analytics", "label": "Analytics", "permission": Permission.VIEW_ANALYTICS},
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
