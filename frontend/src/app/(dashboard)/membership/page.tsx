"use client";

import { Crown, Check, ArrowRight } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const membershipPlans = [
  {
    name: "Silver",
    nameBn: "সিলভার",
    price: "৳2,500",
    period: "/month",
    description: "For basic coverage and essential services",
    features: [
      "Economy Air Tickets",
      "Budget Accommodation",
      "Basic Property Monitoring",
      "Local Medicine Delivery",
      "Online Specialist Appointments",
      "Basic Utility Management",
    ],
    limitations: [
      "No Visa Processing",
      "No Legal Protection",
      "No Renovation Support",
    ],
    popular: false,
    tier: "silver",
    gradient: "from-gray-400 to-slate-500",
  },
  {
    name: "Gold",
    nameBn: "গোল্ড",
    price: "৳7,500",
    period: "/month",
    description: "Perfect for comprehensive family coverage",
    features: [
      "Regular Air Tickets",
      "3-4 Star Accommodation",
      "Quarterly Property Monitoring",
      "Domestic Medicine Delivery",
      "Regular Specialist Appointments",
      "Standard Visa Processing",
      "Basic Legal Support",
      "On-Demand Maintenance",
      "Home Visit Elder Care",
    ],
    limitations: ["Limited Renovation Support"],
    popular: true,
    tier: "gold",
    gradient: "from-yellow-400 to-amber-500",
  },
  {
    name: "Platinum",
    nameBn: "প্লাটিনাম",
    price: "৳20,000",
    period: "/month",
    description: "VIP treatment with dedicated support",
    features: [
      "Business Class Air Tickets",
      "5 Star Luxury Accommodation",
      "Monthly Real-time Monitoring",
      "International Medicine Delivery",
      "Priority VIP Appointments",
      "Fast Track Visa Processing",
      "Dedicated Lawyer Support",
      "Full Maintenance Coverage",
      "24/7 Dedicated Elder Care",
      "Full Renovation Projects",
      "Dedicated Investment Consultant",
      "Cloud + AI Document Archive",
    ],
    limitations: [],
    popular: false,
    tier: "platinum",
    gradient: "from-purple-500 to-indigo-600",
  },
];

const membershipDurations = [
  { label: "1 Month", value: "1_month", discount: 0 },
  { label: "5 Years", value: "5_years", discount: 15 },
  { label: "10 Years", value: "10_years", discount: 25 },
  { label: "Lifetime", value: "lifetime", discount: 40 },
];

export default function MembershipPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="text-center max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold flex items-center justify-center gap-2">
          <Crown className="h-8 w-8 text-yellow-500" />
          Membership Plans
        </h1>
        <p className="text-muted-foreground mt-2">
          সদস্যপদ পরিকল্পনা - Choose the plan that fits your needs
        </p>
        <p className="text-sm text-muted-foreground mt-1">
          1 / 5 / 10 Years or Lifetime membership available
        </p>
      </div>

      {/* Current Membership */}
      <Card className="border-yellow-500/50 bg-gradient-to-r from-yellow-500/10 to-amber-500/10">
        <CardContent className="py-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-gradient-to-br from-yellow-400 to-amber-500">
                <Crown className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-lg font-semibold">Current Plan: Gold</p>
                <p className="text-sm text-muted-foreground">
                  Valid until December 31, 2026
                </p>
              </div>
            </div>
            <Badge className="tier-gold text-sm px-4 py-1">Active</Badge>
          </div>
        </CardContent>
      </Card>

      {/* Duration Options */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Membership Duration</CardTitle>
          <CardDescription>Select duration for extra savings</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {membershipDurations.map((duration) => (
              <button
                key={duration.value}
                className={cn(
                  "p-4 rounded-lg border-2 text-center transition-all hover:border-primary",
                  duration.value === "1_month" && "border-primary bg-primary/5"
                )}
              >
                <p className="font-semibold">{duration.label}</p>
                {duration.discount > 0 && (
                  <Badge
                    variant="secondary"
                    className="mt-1 bg-green-500/10 text-green-600"
                  >
                    Save {duration.discount}%
                  </Badge>
                )}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Plans Comparison */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {membershipPlans.map((plan) => (
          <Card
            key={plan.name}
            className={cn(
              "relative overflow-hidden card-hover",
              plan.popular &&
                "border-2 border-yellow-500 shadow-lg shadow-yellow-500/20"
            )}
          >
            {plan.popular && (
              <div className="absolute top-4 right-4">
                <Badge className="bg-gradient-to-r from-yellow-400 to-amber-500 text-white">
                  Most Popular
                </Badge>
              </div>
            )}

            <CardHeader>
              <div
                className={cn(
                  "w-12 h-12 rounded-xl bg-gradient-to-br flex items-center justify-center",
                  plan.gradient
                )}
              >
                <Crown className="h-6 w-6 text-white" />
              </div>
              <CardTitle className="text-xl mt-2">
                {plan.name}
                <span className="text-sm font-normal text-muted-foreground ml-2">
                  {plan.nameBn}
                </span>
              </CardTitle>
              <CardDescription>{plan.description}</CardDescription>
              <div className="mt-4">
                <span className="text-3xl font-bold">{plan.price}</span>
                <span className="text-muted-foreground">{plan.period}</span>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <div>
                <p className="text-sm font-medium mb-2">Included:</p>
                <ul className="space-y-2">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-2 text-sm"
                    >
                      <Check className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {plan.limitations.length > 0 && (
                <div>
                  <p className="text-sm font-medium mb-2 text-muted-foreground">
                    Not included:
                  </p>
                  <ul className="space-y-1">
                    {plan.limitations.map((limitation) => (
                      <li
                        key={limitation}
                        className="flex items-start gap-2 text-sm text-muted-foreground"
                      >
                        <span className="text-muted-foreground">—</span>
                        <span>{limitation}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </CardContent>

            <CardFooter>
              <Button
                className={cn(
                  "w-full",
                  plan.popular
                    ? "bg-gradient-to-r from-yellow-400 to-amber-500 text-white hover:opacity-90"
                    : plan.tier === "platinum"
                    ? "bg-gradient-to-r from-purple-500 to-indigo-600 text-white hover:opacity-90"
                    : ""
                )}
                variant={plan.tier === "silver" ? "outline" : "default"}
              >
                {plan.tier === "gold" ? "Current Plan" : "Choose Plan"}
                {plan.tier !== "gold" && (
                  <ArrowRight className="ml-2 h-4 w-4" />
                )}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* FAQ or Additional Info */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Membership Notes</CardTitle>
        </CardHeader>
        <CardContent className="prose prose-sm max-w-none">
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>• All plans can be upgraded or downgraded at any time</li>
            <li>• Unused credits carry forward to the next billing cycle</li>
            <li>• Family members can be added at a discounted rate</li>
            <li>• 24/7 customer support available for all tiers</li>
            <li>• Cancel anytime with prorated refund available</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
