"use client";

import {
  Heart,
  Stethoscope,
  Pill,
  SmilePlus,
  UserCheck,
  Dumbbell,
  Sparkles,
  Home,
  Activity,
  Users,
  Trophy,
  Check,
  X,
  Calendar,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

interface ServiceItem {
  name: string;
  nameBn: string;
  icon: React.ElementType;
  platinum: string;
  gold: string;
  silver: string;
}

const wellnessServices: ServiceItem[] = [
  {
    name: "Specialist Appointment",
    nameBn: "বিশেষজ্ঞ অ্যাপয়েন্টমেন্ট",
    icon: Stethoscope,
    platinum: "Priority / VIP",
    gold: "Regular",
    silver: "Online Only",
  },
  {
    name: "Medicine Delivery",
    nameBn: "ওষুধ ডেলিভারি",
    icon: Pill,
    platinum: "International",
    gold: "Domestic",
    silver: "Local",
  },
  {
    name: "Dental Service",
    nameBn: "দাঁতের সেবা",
    icon: SmilePlus,
    platinum: "Premium Plan",
    gold: "Basic",
    silver: "—",
  },
  {
    name: "Elderly Parent Care",
    nameBn: "বয়স্ক পিতামাতা সেবা",
    icon: UserCheck,
    platinum: "24/7 Dedicated",
    gold: "Home Visit",
    silver: "Day Support",
  },
  {
    name: "Fitness & Gym",
    nameBn: "ফিটনেস ও জিম",
    icon: Dumbbell,
    platinum: "Premium Club",
    gold: "Standard",
    silver: "Entry Level",
  },
  {
    name: "Beauty & Personal Care",
    nameBn: "বিউটি কেয়ার",
    icon: Sparkles,
    platinum: "Luxury Spa & Clinic",
    gold: "Standard",
    silver: "Basic Grooming",
  },
  {
    name: "House Keeping",
    nameBn: "গৃহস্থালি সেবা",
    icon: Home,
    platinum: "Full Service",
    gold: "Weekly",
    silver: "On Request",
  },
  {
    name: "Physiotherapy",
    nameBn: "ফিজিওথেরাপি",
    icon: Activity,
    platinum: "Home Sessions",
    gold: "Clinic Visit",
    silver: "Online Guidance",
  },
  {
    name: "Matrimony Service",
    nameBn: "বিবাহ সেবা",
    icon: Users,
    platinum: "Premium Matchmaking",
    gold: "Standard",
    silver: "Basic",
  },
  {
    name: "Sports",
    nameBn: "খেলাধুলা",
    icon: Trophy,
    platinum: "Club Membership",
    gold: "Access Pass",
    silver: "Basic",
  },
];

const upcomingAppointments = [
  {
    title: "Dr. Rahman - Cardiologist",
    date: "Jan 15, 2026",
    time: "10:00 AM",
    location: "United Hospital, Dhaka",
    status: "confirmed",
  },
  {
    title: "Dental Checkup",
    date: "Jan 18, 2026",
    time: "3:00 PM",
    location: "Smile Dental Clinic",
    status: "pending",
  },
  {
    title: "Physiotherapy Session",
    date: "Jan 20, 2026",
    time: "11:00 AM",
    location: "Home Visit",
    status: "confirmed",
  },
];

function getAvailabilityIcon(value: string) {
  if (value === "—") return <X className="h-4 w-4 text-muted-foreground" />;
  return <Check className="h-4 w-4 text-green-500" />;
}

function getAvailabilityBadge(
  value: string,
  tier: "platinum" | "gold" | "silver"
) {
  if (value === "—")
    return (
      <Badge variant="outline" className="text-muted-foreground">
        Not Available
      </Badge>
    );

  const tierClasses = {
    platinum: "tier-platinum",
    gold: "tier-gold",
    silver: "tier-silver",
  };

  return <Badge className={cn("text-xs", tierClasses[tier])}>{value}</Badge>;
}

export default function WellnessPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <div className="p-2 rounded-lg bg-gradient-to-br from-pink-500 to-rose-500">
              <Heart className="h-6 w-6 text-white" />
            </div>
            Wellness with Care
          </h1>
          <p className="text-muted-foreground mt-1">
            সুস্থতা সেবা - স্বাস্থ্য ও কল্যাণ
          </p>
        </div>
        <Button className="bg-gradient-to-r from-pink-500 to-rose-500">
          <Calendar className="h-4 w-4 mr-2" />
          Book Appointment
        </Button>
      </div>

      {/* Health Overview & Appointments */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Quick Stats */}
        <Card className="bg-gradient-to-br from-pink-500/10 to-rose-500/10 border-pink-500/20">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-pink-500/20">
                <Calendar className="h-6 w-6 text-pink-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">3</p>
                <p className="text-sm text-muted-foreground">
                  Upcoming Appointments
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-green-500/20">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-green-500/20">
                <UserCheck className="h-6 w-6 text-green-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">Active</p>
                <p className="text-sm text-muted-foreground">
                  Elder Care Status
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-purple-500/10 to-violet-500/10 border-purple-500/20">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-purple-500/20">
                <Dumbbell className="h-6 w-6 text-purple-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">Premium</p>
                <p className="text-sm text-muted-foreground">Gym Membership</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Upcoming Appointments */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Upcoming Appointments</CardTitle>
          <CardDescription>Your scheduled health appointments</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {upcomingAppointments.map((appointment, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="p-2 rounded-lg bg-pink-500/10">
                    <Stethoscope className="h-5 w-5 text-pink-500" />
                  </div>
                  <div>
                    <p className="font-medium">{appointment.title}</p>
                    <p className="text-sm text-muted-foreground">
                      {appointment.location}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">{appointment.date}</p>
                  <p className="text-xs text-muted-foreground">
                    {appointment.time}
                  </p>
                  <Badge
                    variant={
                      appointment.status === "confirmed"
                        ? "default"
                        : "secondary"
                    }
                    className={cn(
                      "mt-1",
                      appointment.status === "confirmed" && "bg-green-500"
                    )}
                  >
                    {appointment.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Services */}
      <Tabs defaultValue="grid" className="space-y-4">
        <TabsList>
          <TabsTrigger value="grid">Grid View</TabsTrigger>
          <TabsTrigger value="table">Comparison Table</TabsTrigger>
        </TabsList>

        {/* Grid View */}
        <TabsContent value="grid" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {wellnessServices.map((service) => (
              <Card key={service.name} className="card-hover">
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <div className="p-2 rounded-lg bg-gradient-to-br from-pink-500/10 to-rose-500/10">
                      <service.icon className="h-5 w-5 text-pink-500" />
                    </div>
                  </div>
                  <CardTitle className="text-base mt-2">
                    {service.name}
                  </CardTitle>
                  <CardDescription>{service.nameBn}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Platinum:</span>
                    {getAvailabilityBadge(service.platinum, "platinum")}
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Gold:</span>
                    {getAvailabilityBadge(service.gold, "gold")}
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Silver:</span>
                    {getAvailabilityBadge(service.silver, "silver")}
                  </div>
                  <Button variant="outline" size="sm" className="w-full mt-4">
                    Request Service
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Table View */}
        <TabsContent value="table">
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-4 font-medium">Service</th>
                      <th className="text-center p-4 font-medium">
                        <Badge className="tier-platinum">Platinum</Badge>
                      </th>
                      <th className="text-center p-4 font-medium">
                        <Badge className="tier-gold">Gold</Badge>
                      </th>
                      <th className="text-center p-4 font-medium">
                        <Badge className="tier-silver">Silver</Badge>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {wellnessServices.map((service, index) => (
                      <tr
                        key={service.name}
                        className={cn(
                          "border-b hover:bg-muted/50",
                          index % 2 === 0 && "bg-muted/20"
                        )}
                      >
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <service.icon className="h-4 w-4 text-muted-foreground" />
                            <div>
                              <p className="font-medium">{service.name}</p>
                              <p className="text-xs text-muted-foreground">
                                {service.nameBn}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="p-4 text-center text-sm">
                          <div className="flex items-center justify-center gap-1">
                            {getAvailabilityIcon(service.platinum)}
                            <span>{service.platinum}</span>
                          </div>
                        </td>
                        <td className="p-4 text-center text-sm">
                          <div className="flex items-center justify-center gap-1">
                            {getAvailabilityIcon(service.gold)}
                            <span>{service.gold}</span>
                          </div>
                        </td>
                        <td className="p-4 text-center text-sm">
                          <div className="flex items-center justify-center gap-1">
                            {getAvailabilityIcon(service.silver)}
                            <span>{service.silver}</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
