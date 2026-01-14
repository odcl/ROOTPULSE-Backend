"use client";

import {
  Plane,
  Home,
  Heart,
  Crown,
  Wallet,
  Calendar,
  TrendingUp,
  ArrowRight,
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
    title: "Active Services",
    value: "5",
    change: "+2 this month",
    icon: TrendingUp,
    color: "text-green-500",
    bgColor: "bg-green-500/10",
  },
  {
    title: "Pending Requests",
    value: "2",
    change: "Awaiting approval",
    icon: Calendar,
    color: "text-orange-500",
    bgColor: "bg-orange-500/10",
  },
  {
    title: "Wallet Balance",
    value: "৳12,500",
    change: "Last deposit: Jan 10",
    icon: Wallet,
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
  },
  {
    title: "Membership",
    value: "Gold",
    change: "Valid until Dec 2026",
    icon: Crown,
    color: "text-yellow-500",
    bgColor: "bg-yellow-500/10",
    badge: "tier-gold",
  },
];

const serviceCategories = [
  {
    title: "Travel & Assistance",
    titleBn: "ভ্রমণ ও সহায়তা",
    description: "Air tickets, accommodation, transport, visa processing",
    icon: Plane,
    href: "/travel",
    color: "from-blue-500 to-cyan-500",
    services: ["Air Ticket", "Accommodation", "Transport", "Visa"],
  },
  {
    title: "Asset Guardian",
    titleBn: "সম্পদ রক্ষক",
    description: "Property monitoring, legal protection, maintenance",
    icon: Home,
    href: "/asset-guardian",
    color: "from-green-500 to-emerald-500",
    services: [
      "Property Monitoring",
      "Legal Protection",
      "Maintenance",
      "Security",
    ],
  },
  {
    title: "Wellness with Care",
    titleBn: "সুস্থতা সেবা",
    description: "Medical appointments, medicine delivery, elderly care",
    icon: Heart,
    href: "/wellness",
    color: "from-pink-500 to-rose-500",
    services: ["Specialist", "Medicine", "Elderly Care", "Fitness"],
  },
];

const recentActivity = [
  {
    title: "Property Inspection Completed",
    description: "Monthly inspection for Dhaka property",
    time: "2 hours ago",
    status: "completed",
  },
  {
    title: "Doctor Appointment Booked",
    description: "With Dr. Rahman on Jan 15",
    time: "5 hours ago",
    status: "pending",
  },
  {
    title: "Visa Application Submitted",
    description: "UK Visa processing started",
    time: "1 day ago",
    status: "in_progress",
  },
  {
    title: "Rent Collected",
    description: "৳25,000 from Gulshan apartment",
    time: "3 days ago",
    status: "completed",
  },
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <Card className="bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 border-primary/20">
        <CardContent className="py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-foreground">
                স্বাগতম, প্রবাসী! 👋
              </h2>
              <p className="text-muted-foreground mt-1">
                Welcome back! Here&apos;s an overview of your services and
                activities.
              </p>
            </div>
            <div className="flex gap-2">
              <Badge className="tier-gold text-sm px-3 py-1">
                <Crown className="h-4 w-4 mr-1" />
                Gold Member
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

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
                  <div className="flex items-center gap-2 mt-1">
                    {stat.badge ? (
                      <Badge className={stat.badge}>{stat.value}</Badge>
                    ) : (
                      <p className="text-2xl font-bold">{stat.value}</p>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {stat.change}
                  </p>
                </div>
                <div className={cn("p-3 rounded-full", stat.bgColor)}>
                  <stat.icon className={cn("h-6 w-6", stat.color)} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Service Categories */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Service Categories</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {serviceCategories.map((category) => (
            <Link key={category.href} href={category.href}>
              <Card className="card-hover h-full cursor-pointer group overflow-hidden">
                <CardHeader className="pb-2">
                  <div
                    className={cn(
                      "w-12 h-12 rounded-xl bg-gradient-to-br flex items-center justify-center mb-2",
                      category.color
                    )}
                  >
                    <category.icon className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-lg group-hover:text-primary transition-colors">
                    {category.title}
                  </CardTitle>
                  <CardDescription className="text-sm">
                    {category.titleBn}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    {category.description}
                  </p>
                  <div className="flex flex-wrap gap-1 mb-4">
                    {category.services.map((service) => (
                      <Badge
                        key={service}
                        variant="secondary"
                        className="text-xs"
                      >
                        {service}
                      </Badge>
                    ))}
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="p-0 h-auto group-hover:text-primary"
                  >
                    Explore Services
                    <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Recent Activity</CardTitle>
          <CardDescription>
            Your latest service updates and notifications
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div
                key={index}
                className="flex items-start gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div
                  className={cn(
                    "w-2 h-2 mt-2 rounded-full",
                    activity.status === "completed" && "bg-green-500",
                    activity.status === "pending" && "bg-orange-500",
                    activity.status === "in_progress" && "bg-blue-500"
                  )}
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium">{activity.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {activity.description}
                  </p>
                </div>
                <span className="text-xs text-muted-foreground whitespace-nowrap">
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
