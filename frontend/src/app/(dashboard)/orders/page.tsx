"use client";

import { useState } from "react";
import {
  Search,
  Filter,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
  Eye,
  UserPlus,
  MessageSquare,
  Plane,
  Home,
  Heart,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

interface Order {
  id: string;
  user: string;
  service: string;
  category: "travel" | "asset" | "wellness";
  status: "pending" | "approved" | "in_progress" | "completed" | "cancelled";
  priority: "high" | "medium" | "low";
  createdAt: string;
  assignedTo: string | null;
}

const mockOrders: Order[] = [
  {
    id: "ORD-001",
    user: "Mohammed Rahim",
    service: "Property Inspection",
    category: "asset",
    status: "pending",
    priority: "high",
    createdAt: "2024-01-14 10:30",
    assignedTo: null,
  },
  {
    id: "ORD-002",
    user: "Fatima Begum",
    service: "Air Ticket - Business Class",
    category: "travel",
    status: "approved",
    priority: "high",
    createdAt: "2024-01-14 09:15",
    assignedTo: "Agent Ali",
  },
  {
    id: "ORD-003",
    user: "Karim Hassan",
    service: "Doctor Appointment",
    category: "wellness",
    status: "in_progress",
    priority: "medium",
    createdAt: "2024-01-13 16:45",
    assignedTo: "Dr. Rahman",
  },
  {
    id: "ORD-004",
    user: "Ayesha Sultana",
    service: "Visa Processing - UK",
    category: "travel",
    status: "in_progress",
    priority: "high",
    createdAt: "2024-01-13 11:20",
    assignedTo: "Visa Team",
  },
  {
    id: "ORD-005",
    user: "Abdul Kadir",
    service: "Rental Management",
    category: "asset",
    status: "completed",
    priority: "low",
    createdAt: "2024-01-12 14:00",
    assignedTo: "Property Team",
  },
  {
    id: "ORD-006",
    user: "Nasreen Akter",
    service: "Medicine Delivery",
    category: "wellness",
    status: "completed",
    priority: "medium",
    createdAt: "2024-01-12 09:30",
    assignedTo: "Delivery Team",
  },
  {
    id: "ORD-007",
    user: "Jahangir Alam",
    service: "Security Service",
    category: "asset",
    status: "pending",
    priority: "medium",
    createdAt: "2024-01-14 08:00",
    assignedTo: null,
  },
  {
    id: "ORD-008",
    user: "Mizanur Rahman",
    service: "Hotel Booking - 5 Star",
    category: "travel",
    status: "cancelled",
    priority: "low",
    createdAt: "2024-01-11 15:30",
    assignedTo: null,
  },
];

const getCategoryIcon = (category: string) => {
  switch (category) {
    case "travel":
      return <Plane className="h-4 w-4 text-blue-500" />;
    case "asset":
      return <Home className="h-4 w-4 text-green-500" />;
    case "wellness":
      return <Heart className="h-4 w-4 text-pink-500" />;
    default:
      return null;
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case "pending":
      return <Clock className="h-4 w-4 text-orange-500" />;
    case "approved":
      return <CheckCircle className="h-4 w-4 text-blue-500" />;
    case "in_progress":
      return <AlertCircle className="h-4 w-4 text-purple-500" />;
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
    approved: "bg-blue-500/10 text-blue-500 border-blue-500/20",
    in_progress: "bg-purple-500/10 text-purple-500 border-purple-500/20",
    completed: "bg-green-500/10 text-green-500 border-green-500/20",
    cancelled: "bg-red-500/10 text-red-500 border-red-500/20",
  };
  return styles[status] || "";
};

const getPriorityBadge = (priority: string) => {
  const styles: Record<string, string> = {
    high: "bg-red-500/10 text-red-500",
    medium: "bg-yellow-500/10 text-yellow-500",
    low: "bg-gray-500/10 text-gray-500",
  };
  return styles[priority] || "";
};

export default function OrdersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredOrders = mockOrders.filter((order) => {
    const matchesSearch =
      order.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.service.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const statusCounts = {
    all: mockOrders.length,
    pending: mockOrders.filter((o) => o.status === "pending").length,
    approved: mockOrders.filter((o) => o.status === "approved").length,
    in_progress: mockOrders.filter((o) => o.status === "in_progress").length,
    completed: mockOrders.filter((o) => o.status === "completed").length,
    cancelled: mockOrders.filter((o) => o.status === "cancelled").length,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Orders & Requests</h1>
          <p className="text-muted-foreground">
            Manage all service requests from members
          </p>
        </div>
        <Button variant="outline">
          <Filter className="h-4 w-4 mr-2" />
          Advanced Filters
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <Card className="bg-orange-500/5 border-orange-500/20">
          <CardContent className="pt-6 text-center">
            <p className="text-2xl font-bold text-orange-500">
              {statusCounts.pending}
            </p>
            <p className="text-sm text-muted-foreground">Pending</p>
          </CardContent>
        </Card>
        <Card className="bg-blue-500/5 border-blue-500/20">
          <CardContent className="pt-6 text-center">
            <p className="text-2xl font-bold text-blue-500">
              {statusCounts.approved}
            </p>
            <p className="text-sm text-muted-foreground">Approved</p>
          </CardContent>
        </Card>
        <Card className="bg-purple-500/5 border-purple-500/20">
          <CardContent className="pt-6 text-center">
            <p className="text-2xl font-bold text-purple-500">
              {statusCounts.in_progress}
            </p>
            <p className="text-sm text-muted-foreground">In Progress</p>
          </CardContent>
        </Card>
        <Card className="bg-green-500/5 border-green-500/20">
          <CardContent className="pt-6 text-center">
            <p className="text-2xl font-bold text-green-500">
              {statusCounts.completed}
            </p>
            <p className="text-sm text-muted-foreground">Completed</p>
          </CardContent>
        </Card>
        <Card className="bg-red-500/5 border-red-500/20">
          <CardContent className="pt-6 text-center">
            <p className="text-2xl font-bold text-red-500">
              {statusCounts.cancelled}
            </p>
            <p className="text-sm text-muted-foreground">Cancelled</p>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by order ID, user, or service..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Orders Table with Tabs */}
      <Card>
        <CardHeader>
          <Tabs value={statusFilter} onValueChange={setStatusFilter}>
            <TabsList>
              <TabsTrigger value="all">All ({statusCounts.all})</TabsTrigger>
              <TabsTrigger value="pending">
                Pending ({statusCounts.pending})
              </TabsTrigger>
              <TabsTrigger value="in_progress">
                In Progress ({statusCounts.in_progress})
              </TabsTrigger>
              <TabsTrigger value="completed">
                Completed ({statusCounts.completed})
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-4 font-medium">Order ID</th>
                  <th className="text-left p-4 font-medium">User</th>
                  <th className="text-left p-4 font-medium">Service</th>
                  <th className="text-left p-4 font-medium">Status</th>
                  <th className="text-left p-4 font-medium">Priority</th>
                  <th className="text-left p-4 font-medium">Assigned To</th>
                  <th className="text-left p-4 font-medium">Created</th>
                  <th className="text-right p-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order) => (
                  <tr
                    key={order.id}
                    className="border-b hover:bg-muted/50 transition-colors"
                  >
                    <td className="p-4">
                      <span className="font-mono text-sm">{order.id}</span>
                    </td>
                    <td className="p-4 font-medium">{order.user}</td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        {getCategoryIcon(order.category)}
                        <span className="text-sm">{order.service}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <Badge
                        variant="outline"
                        className={getStatusBadge(order.status)}
                      >
                        <span className="flex items-center gap-1">
                          {getStatusIcon(order.status)}
                          {order.status.replace("_", " ")}
                        </span>
                      </Badge>
                    </td>
                    <td className="p-4">
                      <Badge className={getPriorityBadge(order.priority)}>
                        {order.priority}
                      </Badge>
                    </td>
                    <td className="p-4 text-sm text-muted-foreground">
                      {order.assignedTo || "-"}
                    </td>
                    <td className="p-4 text-sm text-muted-foreground">
                      {order.createdAt}
                    </td>
                    <td className="p-4 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>
                            <Eye className="h-4 w-4 mr-2" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <UserPlus className="h-4 w-4 mr-2" />
                            Assign Staff
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <MessageSquare className="h-4 w-4 mr-2" />
                            Add Note
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          {order.status === "pending" && (
                            <DropdownMenuItem className="text-green-500">
                              <CheckCircle className="h-4 w-4 mr-2" />
                              Approve
                            </DropdownMenuItem>
                          )}
                          {order.status !== "cancelled" &&
                            order.status !== "completed" && (
                              <DropdownMenuItem className="text-red-500">
                                <XCircle className="h-4 w-4 mr-2" />
                                Cancel
                              </DropdownMenuItem>
                            )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between pt-4 border-t mt-4">
            <p className="text-sm text-muted-foreground">
              Showing 1-{filteredOrders.length} of {filteredOrders.length}{" "}
              orders
            </p>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon" disabled>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm">
                1
              </Button>
              <Button variant="outline" size="icon">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
