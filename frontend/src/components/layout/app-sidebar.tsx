"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Package,
  Crown,
  ClipboardList,
  BarChart3,
  Settings,
  LogOut,
  ChevronLeft,
  Moon,
  Sun,
  Plane,
  Home,
  Heart,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useState, useEffect } from "react";

interface AppSidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

const navItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Users & Members",
    href: "/users",
    icon: Users,
  },
  {
    title: "Service Catalog",
    href: "/services",
    icon: Package,
    children: [
      { title: "Travel & Assistance", href: "/services/travel", icon: Plane },
      { title: "Asset Guardian", href: "/services/asset-guardian", icon: Home },
      { title: "Wellness with Care", href: "/services/wellness", icon: Heart },
    ],
  },
  {
    title: "Memberships",
    href: "/memberships",
    icon: Crown,
  },
  {
    title: "Orders & Requests",
    href: "/orders",
    icon: ClipboardList,
  },
  {
    title: "Reports",
    href: "/reports",
    icon: BarChart3,
  },
  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
  },
];

export function AppSidebar({ isCollapsed, onToggle }: AppSidebarProps) {
  const pathname = usePathname();
  const [isDark, setIsDark] = useState(true);
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  useEffect(() => {
    const isDarkMode = document.documentElement.classList.contains("dark");
    setIsDark(isDarkMode);
  }, []);

  const toggleTheme = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    document.documentElement.classList.toggle("dark", newIsDark);
    localStorage.setItem("theme", newIsDark ? "dark" : "light");
  };

  const toggleExpand = (href: string) => {
    setExpandedItems((prev) =>
      prev.includes(href) ? prev.filter((h) => h !== href) : [...prev, href]
    );
  };

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-40 h-screen bg-sidebar border-r border-sidebar-border transition-all duration-300",
        isCollapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex h-full flex-col">
        {/* Logo */}
        <div className="flex h-16 items-center justify-between px-4 border-b border-sidebar-border">
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-md">
              <span className="text-lg font-bold text-white">RP</span>
            </div>
            {!isCollapsed && (
              <div>
                <span className="text-lg font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  RootPulse
                </span>
                <p className="text-xs text-muted-foreground">Admin Panel</p>
              </div>
            )}
          </Link>
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggle}
            className={cn(
              "h-8 w-8",
              isCollapsed &&
                "absolute -right-3 top-6 bg-sidebar border shadow-md"
            )}
          >
            <ChevronLeft
              className={cn(
                "h-4 w-4 transition-transform",
                isCollapsed && "rotate-180"
              )}
            />
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 p-2 overflow-y-auto">
          {navItems.map((item) => {
            const isActive =
              pathname === item.href || pathname.startsWith(item.href + "/");
            const isExpanded = expandedItems.includes(item.href);
            const hasChildren = item.children && item.children.length > 0;

            return (
              <div key={item.href}>
                <Link
                  href={hasChildren ? "#" : item.href}
                  onClick={
                    hasChildren ? () => toggleExpand(item.href) : undefined
                  }
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all hover:bg-sidebar-accent",
                    isActive
                      ? "bg-gradient-to-r from-primary/10 to-accent/10 text-primary"
                      : "text-sidebar-foreground/70 hover:text-sidebar-foreground",
                    isCollapsed && "justify-center px-2"
                  )}
                >
                  <item.icon
                    className={cn(
                      "h-5 w-5 shrink-0",
                      isActive && "text-primary"
                    )}
                  />
                  {!isCollapsed && (
                    <>
                      <span className="flex-1">{item.title}</span>
                      {hasChildren && (
                        <ChevronLeft
                          className={cn(
                            "h-4 w-4 transition-transform",
                            isExpanded ? "-rotate-90" : "rotate-180"
                          )}
                        />
                      )}
                    </>
                  )}
                </Link>

                {/* Children */}
                {hasChildren && isExpanded && !isCollapsed && (
                  <div className="ml-4 mt-1 space-y-1 border-l border-sidebar-border pl-3">
                    {item.children.map((child) => {
                      const isChildActive = pathname === child.href;
                      return (
                        <Link
                          key={child.href}
                          href={child.href}
                          className={cn(
                            "flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-all hover:bg-sidebar-accent",
                            isChildActive
                              ? "text-primary"
                              : "text-sidebar-foreground/60 hover:text-sidebar-foreground"
                          )}
                        >
                          <child.icon className="h-4 w-4" />
                          <span>{child.title}</span>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        <Separator className="mx-2" />

        {/* Bottom Section */}
        <div className="p-2 space-y-1">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className={cn(
              "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground transition-all",
              isCollapsed && "justify-center px-2"
            )}
          >
            {isDark ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
            {!isCollapsed && <span>{isDark ? "Light Mode" : "Dark Mode"}</span>}
          </button>

          {/* Admin Profile */}
          <div
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 border border-sidebar-border",
              isCollapsed && "justify-center px-2"
            )}
          >
            <Avatar className="h-9 w-9">
              <AvatarImage src="/avatars/admin.png" alt="Admin" />
              <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-white text-sm">
                AD
              </AvatarFallback>
            </Avatar>
            {!isCollapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-sidebar-foreground truncate">
                  Admin User
                </p>
                <Badge variant="secondary" className="text-xs px-1.5 py-0">
                  Super Admin
                </Badge>
              </div>
            )}
          </div>

          {/* Logout */}
          <button
            className={cn(
              "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-destructive hover:bg-destructive/10 transition-all",
              isCollapsed && "justify-center px-2"
            )}
          >
            <LogOut className="h-5 w-5" />
            {!isCollapsed && <span>Logout</span>}
          </button>
        </div>
      </div>
    </aside>
  );
}
