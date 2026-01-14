"use client";

import {
  BarChart3,
  Download,
  Calendar,
  TrendingUp,
  Users,
  DollarSign,
  Package,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const monthlyData = [
  { month: "Jul", revenue: 65, users: 180 },
  { month: "Aug", revenue: 72, users: 210 },
  { month: "Sep", revenue: 68, users: 195 },
  { month: "Oct", revenue: 85, users: 280 },
  { month: "Nov", revenue: 78, users: 245 },
  { month: "Dec", revenue: 91, users: 320 },
];

const topServices = [
  { name: "Air Ticket Booking", requests: 156, revenue: "৳4,50,000" },
  { name: "Property Monitoring", requests: 134, revenue: "৳2,80,000" },
  { name: "Doctor Appointment", requests: 98, revenue: "৳1,45,000" },
  { name: "Visa Processing", requests: 67, revenue: "৳3,20,000" },
  { name: "Rental Management", requests: 54, revenue: "৳1,80,000" },
];

export default function ReportsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <BarChart3 className="h-6 w-6 text-primary" />
            Reports & Analytics
          </h1>
          <p className="text-muted-foreground">
            View system performance and statistics
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Calendar className="h-4 w-4 mr-2" />
            Last 30 Days
          </Button>
          <Button className="bg-gradient-to-r from-primary to-accent">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-green-500/10">
                <DollarSign className="h-6 w-6 text-green-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">৳91.5L</p>
                <p className="text-sm text-muted-foreground">Total Revenue</p>
                <Badge className="bg-green-500/10 text-green-500 text-xs mt-1">
                  +23%
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-blue-500/10">
                <Users className="h-6 w-6 text-blue-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">2,847</p>
                <p className="text-sm text-muted-foreground">Total Users</p>
                <Badge className="bg-blue-500/10 text-blue-500 text-xs mt-1">
                  +12%
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-purple-500/10">
                <Package className="h-6 w-6 text-purple-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">1,234</p>
                <p className="text-sm text-muted-foreground">Total Orders</p>
                <Badge className="bg-purple-500/10 text-purple-500 text-xs mt-1">
                  +18%
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-orange-500/10">
                <TrendingUp className="h-6 w-6 text-orange-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">94%</p>
                <p className="text-sm text-muted-foreground">Satisfaction</p>
                <Badge className="bg-orange-500/10 text-orange-500 text-xs mt-1">
                  +5%
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <Tabs defaultValue="revenue" className="space-y-4">
        <TabsList>
          <TabsTrigger value="revenue">Revenue</TabsTrigger>
          <TabsTrigger value="users">User Growth</TabsTrigger>
          <TabsTrigger value="services">Service Usage</TabsTrigger>
        </TabsList>

        <TabsContent value="revenue">
          <Card>
            <CardHeader>
              <CardTitle>Monthly Revenue</CardTitle>
              <CardDescription>
                Revenue trend over the last 6 months
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-end justify-around gap-4">
                {monthlyData.map((data) => (
                  <div
                    key={data.month}
                    className="flex flex-col items-center gap-2"
                  >
                    <div
                      className="w-12 bg-gradient-to-t from-primary to-accent rounded-t-lg transition-all hover:opacity-80"
                      style={{ height: `${data.revenue * 2}px` }}
                    />
                    <span className="text-sm text-muted-foreground">
                      {data.month}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users">
          <Card>
            <CardHeader>
              <CardTitle>User Growth</CardTitle>
              <CardDescription>
                New user registrations over time
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-end justify-around gap-4">
                {monthlyData.map((data) => (
                  <div
                    key={data.month}
                    className="flex flex-col items-center gap-2"
                  >
                    <div
                      className="w-12 bg-gradient-to-t from-blue-500 to-cyan-500 rounded-t-lg transition-all hover:opacity-80"
                      style={{ height: `${data.users * 0.7}px` }}
                    />
                    <span className="text-sm text-muted-foreground">
                      {data.month}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="services">
          <Card>
            <CardHeader>
              <CardTitle>Top Services</CardTitle>
              <CardDescription>
                Most requested services this month
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topServices.map((service, index) => (
                  <div key={service.name} className="flex items-center gap-4">
                    <span className="text-2xl font-bold text-muted-foreground w-8">
                      #{index + 1}
                    </span>
                    <div className="flex-1">
                      <p className="font-medium">{service.name}</p>
                      <div className="h-2 rounded-full bg-muted mt-2 overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
                          style={{
                            width: `${(service.requests / 156) * 100}%`,
                          }}
                        />
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">
                        {service.requests} requests
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {service.revenue}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
