"use client";

import { Calendar, UserCheck, Dumbbell, Stethoscope } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ServiceView } from "@/components/services/service-components";
import { getCategoryConfig } from "@/data/services";
import { cn } from "@/lib/utils";

// Get category data from centralized config
const category = getCategoryConfig("wellness")!;

// Example appointments data - would come from API
const upcomingAppointments = [
  {
    id: "1",
    title: "Dr. Rahman - Cardiologist",
    date: "Jan 15, 2026",
    time: "10:00 AM",
    location: "United Hospital, Dhaka",
    status: "confirmed",
  },
  {
    id: "2",
    title: "Dental Checkup",
    date: "Jan 18, 2026",
    time: "3:00 PM",
    location: "Smile Dental Clinic",
    status: "pending",
  },
  {
    id: "3",
    title: "Physiotherapy Session",
    date: "Jan 20, 2026",
    time: "11:00 AM",
    location: "Home Visit",
    status: "confirmed",
  },
];

export default function WellnessPage() {
  const handleServiceRequest = (service: { id: string; name: string }) => {
    console.log("Requesting service:", service);
    // TODO: Implement service request modal/flow
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <div
              className={`p-2 rounded-lg bg-gradient-to-br ${category.gradient}`}
            >
              <category.icon className="h-6 w-6 text-white" />
            </div>
            {category.name}
          </h1>
          <p className="text-muted-foreground mt-1">
            {category.nameBn} - স্বাস্থ্য ও কল্যাণ
          </p>
        </div>
        <Button className="bg-gradient-to-r from-pink-500 to-rose-500">
          <Calendar className="h-4 w-4 mr-2" />
          Book Appointment
        </Button>
      </div>

      {/* Health Overview Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-br from-pink-500/10 to-rose-500/10 border-pink-500/20">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-pink-500/20">
                <Calendar className="h-6 w-6 text-pink-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {upcomingAppointments.length}
                </p>
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
            {upcomingAppointments.map((appointment) => (
              <div
                key={appointment.id}
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

      {/* Services - Using reusable component with centralized data */}
      <ServiceView
        services={category.services}
        categoryColor="from-pink-500/10 to-rose-500/10"
        onRequest={handleServiceRequest}
      />
    </div>
  );
}
