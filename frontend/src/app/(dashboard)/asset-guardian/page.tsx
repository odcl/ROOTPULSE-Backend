"use client";

import {
  Home,
  FileText,
  Scale,
  Wrench,
  Shield,
  DollarSign,
  Building,
  Receipt,
  Hammer,
  Cloud,
  Calculator,
  AlertTriangle,
  ArrowRightLeft,
  TrendingUp,
  Flower,
  Check,
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

const assetServices: ServiceItem[] = [
  {
    name: "Property Monitoring",
    nameBn: "সম্পত্তি পর্যবেক্ষণ",
    icon: Home,
    platinum: "Monthly / Real-time",
    gold: "Quarterly",
    silver: "On Request",
  },
  {
    name: "Asset Documentation",
    nameBn: "সম্পদ ডকুমেন্টেশন",
    icon: FileText,
    platinum: "Full Digitization",
    gold: "Semi-Digital",
    silver: "Basic Upload",
  },
  {
    name: "Legal Protection",
    nameBn: "আইনি সুরক্ষা",
    icon: Scale,
    platinum: "Dedicated Lawyer",
    gold: "Basic Support",
    silver: "Info Only",
  },
  {
    name: "Maintenance Service",
    nameBn: "রক্ষণাবেক্ষণ",
    icon: Wrench,
    platinum: "Full Coverage",
    gold: "On Demand",
    silver: "Basic",
  },
  {
    name: "Security Service",
    nameBn: "নিরাপত্তা সেবা",
    icon: Shield,
    platinum: "CCTV + Guard Combo",
    gold: "Basic Guard",
    silver: "Optional",
  },
  {
    name: "Valuation & Appraisal",
    nameBn: "মূল্যায়ন",
    icon: DollarSign,
    platinum: "Quarterly / On Demand",
    gold: "Yearly",
    silver: "—",
  },
  {
    name: "Insurance Coverage",
    nameBn: "বীমা কভারেজ",
    icon: Shield,
    platinum: "Premium + Multi Policy",
    gold: "Standard",
    silver: "Optional",
  },
  {
    name: "Rental & Lease Management",
    nameBn: "ভাড়া ব্যবস্থাপনা",
    icon: Building,
    platinum: "Full Management",
    gold: "Active Support",
    silver: "Info Only",
  },
  {
    name: "Utility Bill Management",
    nameBn: "ইউটিলিটি বিল",
    icon: Receipt,
    platinum: "Auto Payment",
    gold: "Included",
    silver: "Optional",
  },
  {
    name: "Renovation & Repair",
    nameBn: "সংস্কার ও মেরামত",
    icon: Hammer,
    platinum: "Full Project",
    gold: "Partial",
    silver: "—",
  },
  {
    name: "Digital Record Keeping",
    nameBn: "ডিজিটাল রেকর্ড",
    icon: Cloud,
    platinum: "Cloud + AI Archive",
    gold: "Semi Auto",
    silver: "Manual Upload",
  },
  {
    name: "Tax & Compliance",
    nameBn: "কর ও সম্মতি",
    icon: Calculator,
    platinum: "Full Filing Support",
    gold: "Guidance",
    silver: "Info",
  },
  {
    name: "Encroachment Protection",
    nameBn: "দখল সুরক্ষা",
    icon: AlertTriangle,
    platinum: "Legal + Ground Team",
    gold: "Notice Support",
    silver: "—",
  },
  {
    name: "Asset Transfer Support",
    nameBn: "সম্পদ হস্তান্তর",
    icon: ArrowRightLeft,
    platinum: "Legal Execution",
    gold: "Advisory",
    silver: "—",
  },
  {
    name: "Investment Advisory",
    nameBn: "বিনিয়োগ পরামর্শ",
    icon: TrendingUp,
    platinum: "Dedicated Consultant",
    gold: "Periodic Tips",
    silver: "Info",
  },
  {
    name: "Gardening / Pet Care",
    nameBn: "বাগান / পোষা প্রাণী",
    icon: Flower,
    platinum: "Full Service",
    gold: "On Request",
    silver: "Basic",
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

export default function AssetGuardianPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <div className="p-2 rounded-lg bg-gradient-to-br from-green-500 to-emerald-500">
              <Home className="h-6 w-6 text-white" />
            </div>
            Asset Guardian
          </h1>
          <p className="text-muted-foreground mt-1">
            সম্পদ রক্ষক - সম্পত্তি ও সম্পদ ব্যবস্থাপনা সেবা
          </p>
        </div>
        <Button className="bg-gradient-to-r from-green-500 to-emerald-500">
          <Building className="h-4 w-4 mr-2" />
          Add Property
        </Button>
      </div>

      {/* Property Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-green-500/20">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-green-500/20">
                <Building className="h-6 w-6 text-green-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">3</p>
                <p className="text-sm text-muted-foreground">
                  Properties Monitored
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border-blue-500/20">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-blue-500/20">
                <Shield className="h-6 w-6 text-blue-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">100%</p>
                <p className="text-sm text-muted-foreground">
                  Security Coverage
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-purple-500/20">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-purple-500/20">
                <Receipt className="h-6 w-6 text-purple-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">৳52,000</p>
                <p className="text-sm text-muted-foreground">
                  Monthly Rent Income
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Services */}
      <Tabs defaultValue="grid" className="space-y-4">
        <TabsList>
          <TabsTrigger value="grid">Grid View</TabsTrigger>
          <TabsTrigger value="table">Comparison Table</TabsTrigger>
        </TabsList>

        {/* Grid View */}
        <TabsContent value="grid" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {assetServices.map((service) => (
              <Card key={service.name} className="card-hover">
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <div className="p-2 rounded-lg bg-gradient-to-br from-green-500/10 to-emerald-500/10">
                      <service.icon className="h-5 w-5 text-green-500" />
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
                    {assetServices.map((service, index) => (
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
