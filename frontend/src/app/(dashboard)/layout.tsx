"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { AppHeader } from "@/components/layout/app-header";
import { AuthProvider } from "@/lib/auth";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <AuthProvider>
      <div className="min-h-screen bg-background">
        {/* Sidebar */}
        <AppSidebar
          isCollapsed={sidebarCollapsed}
          onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        />

        {/* Mobile Overlay */}
        {mobileMenuOpen && (
          <div
            className="fixed inset-0 z-30 bg-black/50 md:hidden"
            onClick={() => setMobileMenuOpen(false)}
          />
        )}

        {/* Main Content */}
        <main
          className={cn(
            "min-h-screen transition-all duration-300",
            sidebarCollapsed ? "md:ml-16" : "md:ml-64"
          )}
        >
          <AppHeader onMenuClick={() => setMobileMenuOpen(!mobileMenuOpen)} />
          <div className="p-4 md:p-6">{children}</div>
        </main>
      </div>
    </AuthProvider>
  );
}
