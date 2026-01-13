from rootpulse_core.permissions import Role, get_user_permissions, get_user_menu, Permission

def test_custom_admin_permissions():
    print("Testing CUSTOM_ADMIN role...")
    roles = [Role.CUSTOM_ADMIN]
    
    # 1. Test Permissions
    permissions = get_user_permissions(roles)
    print(f"Permissions Count: {len(permissions)}")
    
    # Check for some key new permissions
    expected = ["workflow:manage", "catalog:manage", "analytics:view", "notifications:send"]
    for p in expected:
        if p in permissions:
            print(f"  ✅ Found permission: {p}")
        else:
            print(f"  ❌ Missing permission: {p}")
            
    # 2. Test Menu
    menu = get_user_menu(permissions)
    print(f"Menu Items Count: {len(menu)}")
    
    # Check for new sections
    menu_ids = [m["id"] for m in menu]
    expected_menus = ["workflow", "catalog", "analytics", "notifications"]
    for m_id in expected_menus:
        if m_id in menu_ids:
            print(f"  ✅ Found menu item: {m_id}")
        else:
            print(f"  ❌ Missing menu item: {m_id}")

if __name__ == "__main__":
    test_custom_admin_permissions()
