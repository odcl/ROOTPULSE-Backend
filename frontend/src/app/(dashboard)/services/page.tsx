"use client";

import {
  Package,
  Plus,
  MoreHorizontal,
  Edit,
  Eye,
  Power,
  Plane,
  Home,
  Heart,
  Search,
  Filter,
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
import { Input } from "@/components/ui/input";
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

const serviceCategories = [
  {
    title: "Travel & Assistance",
    titleBn: "ভ্রমণ ও সহায়তা",
    icon: Plane,
    href: "/services/travel",
    color: "from-blue-500 to-cyan-500",
    servicesCount: 12,
    activeCount: 12,
  },
  {
    title: "Asset Guardian",
    titleBn: "সম্পদ রক্ষক",
    icon: Home,
    href: "/services/asset-guardian",
    color: "from-green-500 to-emerald-500",
    servicesCount: 16,
    activeCount: 14,
  },
  {
    title: "Wellness with Care",
    titleBn: "সুস্থতা সেবা",
    icon: Heart,
    href: "/services/wellness",
    color: "from-pink-500 to-rose-500",
    servicesCount: 10,
    activeCount: 9,
  },
];

const recentServices = [
  { name: "Air Ticket", category: "Travel", status: "active", requests: 45 },
  {
    name: "Property Monitoring",
    category: "Asset",
    status: "active",
    requests: 32,
  },
  {
    name: "Doctor Appointment",
    category: "Wellness",
    status: "active",
    requests: 28,
  },
  {
    name: "Visa Processing",
    category: "Travel",
    status: "active",
    requests: 24,
  },
  {
    name: "Medicine Delivery",
    category: "Wellness",
    status: "active",
    requests: 21,
  },
  {
    name: "Rental Management",
    category: "Asset",
    status: "active",
    requests: 19,
  },
];

export default function ServicesPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Package className="h-6 w-6 text-primary" />
            Service Catalog
          </h1>
          <p className="text-muted-foreground">
            Manage all services offered to members
          </p>
        </div>
        <Button className="bg-gradient-to-r from-primary to-accent">
          <Plus className="h-4 w-4 mr-2" />
          Add New Service
        </Button>
      </div>

      {/* Category Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {serviceCategories.map((category) => (
          <Link key={category.href} href={category.href}>
            <Card className="card-hover cursor-pointer group overflow-hidden">
              <CardHeader>
                <div
                  className={cn(
                    "w-12 h-12 rounded-xl bg-gradient-to-br flex items-center justify-center",
                    category.color
                  )}
                >
                  <category.icon className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-lg group-hover:text-primary transition-colors mt-2">
                  {category.title}
                </CardTitle>
                <CardDescription>{category.titleBn}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between text-sm">
                  <div>
                    <p className="text-2xl font-bold">
                      {category.servicesCount}
                    </p>
                    <p className="text-muted-foreground">Total Services</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-green-500">
                      {category.activeCount}
                    </p>
                    <p className="text-muted-foreground">Active</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Search */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search services..." className="pl-10" />
            </div>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Top Services */}
      <Card>
        <CardHeader>
          <CardTitle>Top Requested Services</CardTitle>
          <CardDescription>
            Services with most requests this month
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-4 font-medium">Service Name</th>
                  <th className="text-left p-4 font-medium">Category</th>
                  <th className="text-left p-4 font-medium">Status</th>
                  <th className="text-left p-4 font-medium">
                    Requests (Month)
                  </th>
                  <th className="text-right p-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {recentServices.map((service, index) => (
                  <tr key={index} className="border-b hover:bg-muted/50">
                    <td className="p-4 font-medium">{service.name}</td>
                    <td className="p-4">
                      <Badge variant="secondary">{service.category}</Badge>
                    </td>
                    <td className="p-4">
                      <Badge className="bg-green-500/10 text-green-500">
                        {service.status}
                      </Badge>
                    </td>
                    <td className="p-4">{service.requests}</td>
                    <td className="p-4 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Eye className="h-4 w-4 mr-2" />
                            View
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="h-4 w-4 mr-2" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-500">
                            <Power className="h-4 w-4 mr-2" />
                            Disable
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
