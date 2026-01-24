// =============================================================================
// COMMON UI COMPONENTS
// Reusable components for tables, stats, and data display.
// =============================================================================

"use client";

import { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

// =============================================================================
// TYPES
// =============================================================================

export interface StatCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: "increase" | "decrease" | "neutral";
  icon: LucideIcon;
  color?: string;
  bgColor?: string;
  badge?: string;
  badgeClass?: string;
}

export interface StatusBadgeProps {
  status: string;
  variant?: "default" | "success" | "warning" | "error" | "info";
}

// =============================================================================
// STAT CARD
// =============================================================================

export function StatCard({
  title,
  value,
  change,
  changeType = "neutral",
  icon: Icon,
  color = "text-primary",
  bgColor = "bg-primary/10",
  badge,
  badgeClass,
}: StatCardProps) {
  return (
    <Card className="card-hover">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <div className="flex items-center gap-2 mt-1">
              {badge ? (
                <Badge className={badgeClass}>{value}</Badge>
              ) : (
                <p className="text-2xl font-bold">{value}</p>
              )}
            </div>
            {change && (
              <p
                className={cn(
                  "text-xs mt-1",
                  changeType === "increase" && "text-green-500",
                  changeType === "decrease" && "text-red-500",
                  changeType === "neutral" && "text-muted-foreground"
                )}
              >
                {change}
              </p>
            )}
          </div>
          <div className={cn("p-3 rounded-full", bgColor)}>
            <Icon className={cn("h-6 w-6", color)} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// =============================================================================
// STATUS BADGE
// =============================================================================

const statusVariants: Record<string, string> = {
  // Status names
  active: "bg-green-500/10 text-green-500 border-green-500/20",
  inactive: "bg-gray-500/10 text-gray-500 border-gray-500/20",
  pending: "bg-orange-500/10 text-orange-500 border-orange-500/20",
  approved: "bg-blue-500/10 text-blue-500 border-blue-500/20",
  in_progress: "bg-purple-500/10 text-purple-500 border-purple-500/20",
  completed: "bg-green-500/10 text-green-500 border-green-500/20",
  cancelled: "bg-red-500/10 text-red-500 border-red-500/20",
  suspended: "bg-red-500/10 text-red-500 border-red-500/20",
  // Variants
  success: "bg-green-500/10 text-green-500 border-green-500/20",
  warning: "bg-orange-500/10 text-orange-500 border-orange-500/20",
  error: "bg-red-500/10 text-red-500 border-red-500/20",
  info: "bg-blue-500/10 text-blue-500 border-blue-500/20",
};

export function StatusBadge({ status, variant }: StatusBadgeProps) {
  const className = variant
    ? statusVariants[variant]
    : statusVariants[status.toLowerCase()] || statusVariants["info"];

  return (
    <Badge variant="outline" className={className}>
      {status.replace("_", " ")}
    </Badge>
  );
}

// =============================================================================
// PRIORITY BADGE
// =============================================================================

const priorityClasses: Record<string, string> = {
  high: "bg-red-500/10 text-red-500",
  medium: "bg-yellow-500/10 text-yellow-500",
  low: "bg-gray-500/10 text-gray-500",
};

export function PriorityBadge({ priority }: { priority: string }) {
  return (
    <Badge
      className={
        priorityClasses[priority.toLowerCase()] || priorityClasses["low"]
      }
    >
      {priority}
    </Badge>
  );
}

// =============================================================================
// EMPTY STATE
// =============================================================================

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description?: string;
  action?: React.ReactNode;
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="p-4 rounded-full bg-muted mb-4">
        <Icon className="h-8 w-8 text-muted-foreground" />
      </div>
      <h3 className="text-lg font-semibold">{title}</h3>
      {description && (
        <p className="text-muted-foreground mt-1 max-w-sm">{description}</p>
      )}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}

// =============================================================================
// LOADING SKELETON
// =============================================================================

export function TableSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: rows }).map((_, i) => (
        <div
          key={i}
          className="flex items-center gap-4 p-4 border rounded-lg animate-pulse"
        >
          <div className="h-10 w-10 rounded-full bg-muted" />
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-muted rounded w-1/3" />
            <div className="h-3 bg-muted rounded w-1/4" />
          </div>
          <div className="h-6 w-16 bg-muted rounded" />
        </div>
      ))}
    </div>
  );
}

export function CardSkeleton() {
  return (
    <Card className="animate-pulse">
      <CardContent className="p-6">
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 rounded-lg bg-muted" />
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-muted rounded w-2/3" />
            <div className="h-3 bg-muted rounded w-1/2" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
