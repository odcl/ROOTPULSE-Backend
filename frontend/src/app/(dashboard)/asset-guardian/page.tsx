"use client";

import { Building, Shield, Receipt, Plus } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ServiceView } from "@/components/services/service-components";
import { getCategoryConfig } from "@/data/services";

// Get category data from centralized config
const category = getCategoryConfig("asset")!;

export default function AssetGuardianPage() {
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
            {category.nameBn} - সম্পত্তি ও সম্পদ ব্যবস্থাপনা সেবা
          </p>
        </div>
        <Button className="bg-gradient-to-r from-green-500 to-emerald-500">
          <Building className="h-4 w-4 mr-2" />
          Add Property
        </Button>
      </div>

      {/* Property Overview Cards - Example dynamic stats */}
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

      {/* Services - Using reusable component with centralized data */}
      <ServiceView
        services={category.services}
        categoryColor="from-green-500/10 to-emerald-500/10"
        onRequest={handleServiceRequest}
      />
    </div>
  );
}
