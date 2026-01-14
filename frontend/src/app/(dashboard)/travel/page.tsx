"use client";

import {
  Plane,
  Hotel,
  Car,
  CreditCard,
  Map,
  Users,
  Smartphone,
  UtensilsCrossed,
  ShoppingBag,
  FileText,
  Navigation,
  Globe,
  Check,
  Minus,
  X,
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

const travelServices: ServiceItem[] = [
  {
    name: "Air Ticket",
    nameBn: "বিমান টিকিট",
    icon: Plane,
    platinum: "Priority / Business",
    gold: "Regular",
    silver: "Economy",
  },
  {
    name: "Accommodation Booking",
    nameBn: "থাকার ব্যবস্থা",
    icon: Hotel,
    platinum: "5 Star / Luxury",
    gold: "3–4 Star",
    silver: "Budget",
  },
  {
    name: "Currency Exchange",
    nameBn: "মুদ্রা বিনিময়",
    icon: CreditCard,
    platinum: "VIP / Private Desk",
    gold: "Assisted",
    silver: "Basic Counter",
  },
  {
    name: "Pick & Drop",
    nameBn: "পিক অ্যান্ড ড্রপ",
    icon: Car,
    platinum: "24/7 Chauffeur",
    gold: "On Demand",
    silver: "Fixed Route",
  },
  {
    name: "Transport",
    nameBn: "পরিবহন",
    icon: Car,
    platinum: "Business SUV",
    gold: "Sedan / Regular SUV",
    silver: "Shared (Mini / Micro)",
  },
  {
    name: "Driver",
    nameBn: "ড্রাইভার",
    icon: Users,
    platinum: "Dedicated Chauffeur",
    gold: "Assigned Driver",
    silver: "Common Pool",
  },
  {
    name: "Travel Guide",
    nameBn: "ট্রাভেল গাইড",
    icon: Map,
    platinum: "Full Time (24/7)",
    gold: "On Request",
    silver: "—",
  },
  {
    name: "SIM Facility",
    nameBn: "সিম সুবিধা",
    icon: Smartphone,
    platinum: "International",
    gold: "Roaming Support",
    silver: "Local",
  },
  {
    name: "Food Facility",
    nameBn: "খাবার সুবিধা",
    icon: UtensilsCrossed,
    platinum: "Dietary / VIP Menu",
    gold: "Custom Menu",
    silver: "Standard Menu",
  },
  {
    name: "Navigation",
    nameBn: "নেভিগেশন",
    icon: Navigation,
    platinum: "Real-time GPS Concierge",
    gold: "Assisted",
    silver: "Map App",
  },
  {
    name: "Visa Processing",
    nameBn: "ভিসা প্রসেসিং",
    icon: FileText,
    platinum: "Fast Track / VIP",
    gold: "Standard",
    silver: "—",
  },
  {
    name: "Shopping",
    nameBn: "শপিং",
    icon: ShoppingBag,
    platinum: "Personal Shopper",
    gold: "Guided",
    silver: "Self",
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

export default function TravelPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500">
              <Plane className="h-6 w-6 text-white" />
            </div>
            Travel & Assistance
          </h1>
          <p className="text-muted-foreground mt-1">ভ্রমণ ও সহায়তা সেবা</p>
        </div>
        <Button className="bg-gradient-to-r from-primary to-accent">
          <Globe className="h-4 w-4 mr-2" />
          Request New Service
        </Button>
      </div>

      {/* Service Tier Legend */}
      <Card>
        <CardContent className="py-4">
          <div className="flex flex-wrap gap-4 justify-center">
            <div className="flex items-center gap-2">
              <Badge className="tier-platinum">Platinum</Badge>
              <span className="text-sm text-muted-foreground">
                VIP / Premium
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Badge className="tier-gold">Gold</Badge>
              <span className="text-sm text-muted-foreground">
                Standard Quality
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Badge className="tier-silver">Silver</Badge>
              <span className="text-sm text-muted-foreground">
                Basic / Economy
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Services Tabs */}
      <Tabs defaultValue="grid" className="space-y-4">
        <TabsList>
          <TabsTrigger value="grid">Grid View</TabsTrigger>
          <TabsTrigger value="table">Comparison Table</TabsTrigger>
        </TabsList>

        {/* Grid View */}
        <TabsContent value="grid" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {travelServices.map((service) => (
              <Card key={service.name} className="card-hover">
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500/10 to-cyan-500/10">
                      <service.icon className="h-5 w-5 text-blue-500" />
                    </div>
                    {service.platinum !== "—" && (
                      <Badge variant="secondary" className="text-xs">
                        Available
                      </Badge>
                    )}
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
                    {travelServices.map((service, index) => (
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
