"use client";

import {
  Crown,
  Plus,
  MoreHorizontal,
  Edit,
  Eye,
  Users,
  TrendingUp,
  Check,
  ArrowUpRight,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

const membershipPlans = [
  {
    name: "Platinum",
    nameBn: "প্লাটিনাম",
    price: "৳20,000",
    period: "/month",
    members: 156,
    revenue: "৳31,20,000",
    growth: "+12%",
    gradient: "from-purple-500 to-indigo-600",
    features: ["All Services Included", "24/7 Support", "Priority Processing"],
  },
  {
    name: "Gold",
    nameBn: "গোল্ড",
    price: "৳7,500",
    period: "/month",
    members: 523,
    revenue: "৳39,22,500",
    growth: "+18%",
    gradient: "from-yellow-400 to-amber-500",
    features: ["Most Services", "Standard Support", "Regular Processing"],
  },
  {
    name: "Silver",
    nameBn: "সিলভার",
    price: "৳2,500",
    period: "/month",
    members: 844,
    revenue: "৳21,10,000",
    growth: "+8%",
    gradient: "from-gray-400 to-slate-500",
    features: ["Basic Services", "Email Support", "Economy Options"],
  },
];

const recentMemberships = [
  {
    user: "Mohammed Rahim",
    tier: "Gold",
    action: "Upgraded",
    date: "2 hours ago",
  },
  {
    user: "Fatima Begum",
    tier: "Platinum",
    action: "Renewed",
    date: "5 hours ago",
  },
  { user: "Karim Hassan", tier: "Silver", action: "New", date: "1 day ago" },
  {
    user: "Ayesha Sultana",
    tier: "Gold",
    action: "Upgraded",
    date: "2 days ago",
  },
];

export default function MembershipsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Crown className="h-6 w-6 text-yellow-500" />
            Membership Management
          </h1>
          <p className="text-muted-foreground">
            Manage membership plans and subscribers
          </p>
        </div>
        <Button className="bg-gradient-to-r from-primary to-accent">
          <Plus className="h-4 w-4 mr-2" />
          Create New Plan
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-primary/10">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">1,523</p>
                <p className="text-sm text-muted-foreground">Total Members</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-green-500/10">
                <TrendingUp className="h-6 w-6 text-green-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">৳91,52,500</p>
                <p className="text-sm text-muted-foreground">Monthly Revenue</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-yellow-500/10">
                <Crown className="h-6 w-6 text-yellow-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">156</p>
                <p className="text-sm text-muted-foreground">
                  Platinum Members
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-blue-500/10">
                <ArrowUpRight className="h-6 w-6 text-blue-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">+14%</p>
                <p className="text-sm text-muted-foreground">Growth Rate</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Membership Plans */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {membershipPlans.map((plan) => (
          <Card key={plan.name} className="relative overflow-hidden">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div
                  className={cn(
                    "w-12 h-12 rounded-xl bg-gradient-to-br flex items-center justify-center",
                    plan.gradient
                  )}
                >
                  <Crown className="h-6 w-6 text-white" />
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Edit className="h-4 w-4 mr-2" />
                      Edit Plan
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Eye className="h-4 w-4 mr-2" />
                      View Members
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <CardTitle className="text-xl mt-2">
                {plan.name}
                <span className="text-sm font-normal text-muted-foreground ml-2">
                  {plan.nameBn}
                </span>
              </CardTitle>
              <div>
                <span className="text-3xl font-bold">{plan.price}</span>
                <span className="text-muted-foreground">{plan.period}</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 rounded-lg bg-muted/50">
                  <p className="text-xl font-bold">{plan.members}</p>
                  <p className="text-xs text-muted-foreground">Members</p>
                </div>
                <div className="text-center p-3 rounded-lg bg-muted/50">
                  <p className="text-xl font-bold text-green-500">
                    {plan.growth}
                  </p>
                  <p className="text-xs text-muted-foreground">Growth</p>
                </div>
              </div>
              <div className="space-y-2">
                {plan.features.map((feature) => (
                  <div
                    key={feature}
                    className="flex items-center gap-2 text-sm"
                  >
                    <Check className="h-4 w-4 text-green-500" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <p className="text-sm text-muted-foreground">
                Revenue:{" "}
                <span className="font-semibold text-foreground">
                  {plan.revenue}
                </span>
              </p>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Membership Activity</CardTitle>
          <CardDescription>Latest membership changes</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentMemberships.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 rounded-lg border"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/50 to-accent/50 flex items-center justify-center text-white font-medium">
                    {item.user
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div>
                    <p className="font-medium">{item.user}</p>
                    <p className="text-sm text-muted-foreground">
                      {item.action}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <Badge
                    className={cn(
                      item.tier === "Platinum"
                        ? "tier-platinum"
                        : item.tier === "Gold"
                        ? "tier-gold"
                        : "tier-silver"
                    )}
                  >
                    {item.tier}
                  </Badge>
                  <p className="text-xs text-muted-foreground mt-1">
                    {item.date}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
