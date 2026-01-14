"use client";

import {
  Users,
  Crown,
  ClipboardList,
  DollarSign,
  TrendingUp,
  Package,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
} from "lucide-react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const stats = [
  {
    title: "Total Users",
    value: "2,847",
    change: "+12.5%",
    changeType: "increase",
    icon: Users,
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
  },
  {
    title: "Active Members",
    value: "1,523",
    change: "+8.2%",
    changeType: "increase",
    icon: Crown,
    color: "text-yellow-500",
    bgColor: "bg-yellow-500/10",
  },
  {
    title: "Monthly Revenue",
    value: "৳4,25,000",
    change: "+23.1%",
    changeType: "increase",
    icon: DollarSign,
    color: "text-green-500",
    bgColor: "bg-green-500/10",
  },
  {
    title: "Pending Requests",
    value: "47",
    change: "-5.4%",
    changeType: "decrease",
    icon: ClipboardList,
    color: "text-orange-500",
    bgColor: "bg-orange-500/10",
  },
];

const membershipBreakdown = [
  { tier: "Platinum", count: 156, percentage: 10, color: "bg-purple-500" },
  { tier: "Gold", count: 523, percentage: 34, color: "bg-yellow-500" },
  { tier: "Silver", count: 844, percentage: 56, color: "bg-gray-400" },
];

const recentRequests = [
  {
    id: "REQ-001",
    user: "Mohammed Rahim",
    service: "Property Inspection",
    category: "Asset Guardian",
    status: "pending",
    time: "5 min ago",
  },
  {
    id: "REQ-002",
    user: "Fatima Begum",
    service: "Air Ticket Booking",
    category: "Travel",
    status: "in_progress",
    time: "1 hour ago",
  },
  {
    id: "REQ-003",
    user: "Karim Hassan",
    service: "Doctor Appointment",
    category: "Wellness",
    status: "completed",
    time: "2 hours ago",
  },
  {
    id: "REQ-004",
    user: "Ayesha Sultana",
    service: "Visa Processing",
    category: "Travel",
    status: "pending",
    time: "3 hours ago",
  },
  {
    id: "REQ-005",
    user: "Abdul Kadir",
    service: "Rental Management",
    category: "Asset Guardian",
    status: "cancelled",
    time: "5 hours ago",
  },
];

const recentActivity = [
  { action: "New user registered", user: "Jahangir Alam", time: "2 min ago" },
  {
    action: "Membership upgraded to Gold",
    user: "Nasreen Akter",
    time: "15 min ago",
  },
  { action: "Service request approved", user: "Admin", time: "30 min ago" },
  { action: "Payment received", user: "Mizanur Rahman", time: "1 hour ago" },
  { action: "New property added", user: "Admin", time: "2 hours ago" },
];

const getStatusIcon = (status: string) => {
  switch (status) {
    case "pending":
      return <Clock className="h-4 w-4 text-orange-500" />;
    case "in_progress":
      return <AlertCircle className="h-4 w-4 text-blue-500" />;
    case "completed":
      return <CheckCircle className="h-4 w-4 text-green-500" />;
    case "cancelled":
      return <XCircle className="h-4 w-4 text-red-500" />;
    default:
      return null;
  }
};

const getStatusBadge = (status: string) => {
  const styles: Record<string, string> = {
    pending: "bg-orange-500/10 text-orange-500 border-orange-500/20",
    in_progress: "bg-blue-500/10 text-blue-500 border-blue-500/20",
    completed: "bg-green-500/10 text-green-500 border-green-500/20",
    cancelled: "bg-red-500/10 text-red-500 border-red-500/20",
  };
  return styles[status] || "";
};

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back! Here&apos;s your system overview.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">Export Report</Button>
          <Button className="bg-gradient-to-r from-primary to-accent">
            <Package className="h-4 w-4 mr-2" />
            Add New Service
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="card-hover">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    {stat.title}
                  </p>
                  <p className="text-2xl font-bold mt-1">{stat.value}</p>
                  <div className="flex items-center gap-1 mt-1">
                    {stat.changeType === "increase" ? (
                      <ArrowUpRight className="h-4 w-4 text-green-500" />
                    ) : (
                      <ArrowDownRight className="h-4 w-4 text-red-500" />
                    )}
                    <span
                      className={cn(
                        "text-sm font-medium",
                        stat.changeType === "increase"
                          ? "text-green-500"
                          : "text-red-500"
                      )}
                    >
                      {stat.change}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      vs last month
                    </span>
                  </div>
                </div>
                <div className={cn("p-3 rounded-full", stat.bgColor)}>
                  <stat.icon className={cn("h-6 w-6", stat.color)} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Requests */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-lg">Recent Service Requests</CardTitle>
              <CardDescription>Latest requests from members</CardDescription>
            </div>
            <Link href="/orders">
              <Button variant="ghost" size="sm">
                View All
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentRequests.map((request) => (
                <div
                  key={request.id}
                  className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    {getStatusIcon(request.status)}
                    <div>
                      <p className="text-sm font-medium">{request.service}</p>
                      <p className="text-xs text-muted-foreground">
                        {request.user} • {request.category}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge
                      variant="outline"
                      className={getStatusBadge(request.status)}
                    >
                      {request.status.replace("_", " ")}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {request.time}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Membership Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Membership Breakdown</CardTitle>
            <CardDescription>Active members by tier</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {membershipBreakdown.map((tier) => (
              <div key={tier.tier} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">{tier.tier}</span>
                  <span className="text-muted-foreground">
                    {tier.count} members
                  </span>
                </div>
                <div className="h-2 rounded-full bg-muted overflow-hidden">
                  <div
                    className={cn("h-full rounded-full", tier.color)}
                    style={{ width: `${tier.percentage}%` }}
                  />
                </div>
              </div>
            ))}

            <div className="pt-4 border-t">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Total Active</span>
                <span className="text-lg font-bold">1,523</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Activity Log */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-lg">Recent Activity</CardTitle>
            <CardDescription>System activity log</CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center gap-4">
                <div className="w-2 h-2 rounded-full bg-primary" />
                <div className="flex-1">
                  <p className="text-sm">
                    <span className="font-medium">{activity.action}</span>
                    {activity.user && (
                      <span className="text-muted-foreground">
                        {" "}
                        by {activity.user}
                      </span>
                    )}
                  </p>
                </div>
                <span className="text-xs text-muted-foreground">
                  {activity.time}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
