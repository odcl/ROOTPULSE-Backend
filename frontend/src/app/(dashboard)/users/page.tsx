"use client";

import { useState } from "react";
import {
  Search,
  Filter,
  Plus,
  MoreHorizontal,
  Mail,
  Phone,
  Crown,
  ChevronLeft,
  ChevronRight,
  Eye,
  Edit,
  Ban,
  Check,
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  tier: "platinum" | "gold" | "silver" | "free";
  status: "active" | "suspended" | "pending";
  joinedDate: string;
  lastActive: string;
}

const mockUsers: User[] = [
  {
    id: "1",
    name: "Mohammed Rahim",
    email: "rahim@email.com",
    phone: "+8801712345678",
    tier: "gold",
    status: "active",
    joinedDate: "2024-01-15",
    lastActive: "2 hours ago",
  },
  {
    id: "2",
    name: "Fatima Begum",
    email: "fatima@email.com",
    phone: "+8801823456789",
    tier: "platinum",
    status: "active",
    joinedDate: "2023-11-20",
    lastActive: "1 day ago",
  },
  {
    id: "3",
    name: "Karim Hassan",
    email: "karim@email.com",
    phone: "+8801934567890",
    tier: "silver",
    status: "active",
    joinedDate: "2024-03-10",
    lastActive: "5 min ago",
  },
  {
    id: "4",
    name: "Ayesha Sultana",
    email: "ayesha@email.com",
    phone: "+8801645678901",
    tier: "gold",
    status: "suspended",
    joinedDate: "2023-08-05",
    lastActive: "1 week ago",
  },
  {
    id: "5",
    name: "Abdul Kadir",
    email: "kadir@email.com",
    phone: "+8801756789012",
    tier: "free",
    status: "pending",
    joinedDate: "2024-06-01",
    lastActive: "Never",
  },
  {
    id: "6",
    name: "Nasreen Akter",
    email: "nasreen@email.com",
    phone: "+8801867890123",
    tier: "gold",
    status: "active",
    joinedDate: "2024-02-28",
    lastActive: "3 hours ago",
  },
  {
    id: "7",
    name: "Jahangir Alam",
    email: "jahangir@email.com",
    phone: "+8801978901234",
    tier: "silver",
    status: "active",
    joinedDate: "2024-05-12",
    lastActive: "1 hour ago",
  },
  {
    id: "8",
    name: "Mizanur Rahman",
    email: "mizan@email.com",
    phone: "+8801589012345",
    tier: "platinum",
    status: "active",
    joinedDate: "2023-06-18",
    lastActive: "30 min ago",
  },
];

const getTierBadge = (tier: string) => {
  const styles: Record<string, string> = {
    platinum: "tier-platinum",
    gold: "tier-gold",
    silver: "tier-silver",
    free: "bg-muted text-muted-foreground",
  };
  return styles[tier];
};

const getStatusBadge = (status: string) => {
  const styles: Record<string, string> = {
    active: "bg-green-500/10 text-green-500 border-green-500/20",
    suspended: "bg-red-500/10 text-red-500 border-red-500/20",
    pending: "bg-orange-500/10 text-orange-500 border-orange-500/20",
  };
  return styles[status];
};

export default function UsersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTier, setSelectedTier] = useState<string>("all");

  const filteredUsers = mockUsers.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTier = selectedTier === "all" || user.tier === selectedTier;
    return matchesSearch && matchesTier;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Crown className="h-6 w-6 text-primary" />
            Users & Members
          </h1>
          <p className="text-muted-foreground">
            Manage all users and their memberships
          </p>
        </div>
        <Button className="bg-gradient-to-r from-primary to-accent">
          <Plus className="h-4 w-4 mr-2" />
          Add User
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-2xl font-bold">2,847</p>
              <p className="text-sm text-muted-foreground">Total Users</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-500">156</p>
              <p className="text-sm text-muted-foreground">Platinum</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-yellow-500">523</p>
              <p className="text-sm text-muted-foreground">Gold</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-500">844</p>
              <p className="text-sm text-muted-foreground">Silver</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search users by name or email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              {["all", "platinum", "gold", "silver", "free"].map((tier) => (
                <Button
                  key={tier}
                  variant={selectedTier === tier ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedTier(tier)}
                  className={cn(
                    selectedTier === tier &&
                      tier !== "all" &&
                      getTierBadge(tier)
                  )}
                >
                  {tier.charAt(0).toUpperCase() + tier.slice(1)}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Users</CardTitle>
          <CardDescription>
            Showing {filteredUsers.length} of {mockUsers.length} users
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-4 font-medium">User</th>
                  <th className="text-left p-4 font-medium">Contact</th>
                  <th className="text-left p-4 font-medium">Tier</th>
                  <th className="text-left p-4 font-medium">Status</th>
                  <th className="text-left p-4 font-medium">Joined</th>
                  <th className="text-left p-4 font-medium">Last Active</th>
                  <th className="text-right p-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr
                    key={user.id}
                    className="border-b hover:bg-muted/50 transition-colors"
                  >
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={`/avatars/${user.id}.png`} />
                          <AvatarFallback className="bg-gradient-to-br from-primary/50 to-accent/50">
                            {user.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{user.name}</p>
                          <p className="text-xs text-muted-foreground">
                            ID: {user.id}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-1 text-sm">
                          <Mail className="h-3 w-3 text-muted-foreground" />
                          {user.email}
                        </div>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Phone className="h-3 w-3" />
                          {user.phone}
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <Badge className={getTierBadge(user.tier)}>
                        {user.tier.charAt(0).toUpperCase() + user.tier.slice(1)}
                      </Badge>
                    </td>
                    <td className="p-4">
                      <Badge
                        variant="outline"
                        className={getStatusBadge(user.status)}
                      >
                        {user.status.charAt(0).toUpperCase() +
                          user.status.slice(1)}
                      </Badge>
                    </td>
                    <td className="p-4 text-sm text-muted-foreground">
                      {user.joinedDate}
                    </td>
                    <td className="p-4 text-sm text-muted-foreground">
                      {user.lastActive}
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
                            <Edit className="h-4 w-4 mr-2" />
                            Edit User
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Crown className="h-4 w-4 mr-2" />
                            Change Tier
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          {user.status === "active" ? (
                            <DropdownMenuItem className="text-red-500">
                              <Ban className="h-4 w-4 mr-2" />
                              Suspend User
                            </DropdownMenuItem>
                          ) : (
                            <DropdownMenuItem className="text-green-500">
                              <Check className="h-4 w-4 mr-2" />
                              Activate User
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
              Showing 1-{filteredUsers.length} of {mockUsers.length} users
            </p>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon" disabled>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm">
                1
              </Button>
              <Button variant="ghost" size="sm">
                2
              </Button>
              <Button variant="ghost" size="sm">
                3
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
