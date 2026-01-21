"use client";

import { Globe, Plus } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ServiceView } from "@/components/services/service-components";
import { getCategoryConfig } from "@/data/services";

// Get category data from centralized config
const category = getCategoryConfig("travel")!;

export default function TravelPage() {
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
          <p className="text-muted-foreground mt-1">{category.nameBn}</p>
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

      {/* Services - Using reusable component with centralized data */}
      <ServiceView
        services={category.services}
        categoryColor="from-blue-500/10 to-cyan-500/10"
        onRequest={handleServiceRequest}
      />
    </div>
  );
}
