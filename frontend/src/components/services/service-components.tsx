// =============================================================================
// REUSABLE SERVICE COMPONENTS
// These components can be used across all service category pages.
// =============================================================================

"use client";

import { Check, X } from "lucide-react";
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
import { ServiceItem, MembershipTier } from "@/data/services";

// =============================================================================
// TYPES
// =============================================================================

interface ServiceCardProps {
  service: ServiceItem;
  categoryColor?: string;
  onRequest?: (service: ServiceItem) => void;
}

interface ServiceGridProps {
  services: ServiceItem[];
  categoryColor?: string;
  onRequest?: (service: ServiceItem) => void;
}

interface ServiceTableProps {
  services: ServiceItem[];
}

interface ServiceViewProps {
  services: ServiceItem[];
  categoryColor?: string;
  defaultView?: "grid" | "table";
  onRequest?: (service: ServiceItem) => void;
}

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

function getTierBadgeClass(tier: MembershipTier): string {
  const classes: Record<MembershipTier, string> = {
    platinum: "tier-platinum",
    gold: "tier-gold",
    silver: "tier-silver",
  };
  return classes[tier];
}

function isAvailable(value: string): boolean {
  return value !== "—";
}

// =============================================================================
// SERVICE AVAILABILITY BADGE
// =============================================================================

export function ServiceAvailabilityBadge({
  value,
  tier,
}: {
  value: string;
  tier: MembershipTier;
}) {
  if (!isAvailable(value)) {
    return (
      <Badge variant="outline" className="text-muted-foreground text-xs">
        Not Available
      </Badge>
    );
  }
  return (
    <Badge className={cn("text-xs", getTierBadgeClass(tier))}>{value}</Badge>
  );
}

// =============================================================================
// SERVICE CARD
// =============================================================================

export function ServiceCard({
  service,
  categoryColor = "from-primary/10 to-accent/10",
  onRequest,
}: ServiceCardProps) {
  const Icon = service.icon;

  return (
    <Card className="card-hover">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div
            className={cn("p-2 rounded-lg bg-gradient-to-br", categoryColor)}
          >
            <Icon className="h-5 w-5 text-primary" />
          </div>
          {isAvailable(service.tiers.platinum) && (
            <Badge variant="secondary" className="text-xs">
              Available
            </Badge>
          )}
        </div>
        <CardTitle className="text-base mt-2">{service.name}</CardTitle>
        <CardDescription>{service.nameBn}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Platinum:</span>
          <ServiceAvailabilityBadge
            value={service.tiers.platinum}
            tier="platinum"
          />
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Gold:</span>
          <ServiceAvailabilityBadge value={service.tiers.gold} tier="gold" />
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Silver:</span>
          <ServiceAvailabilityBadge
            value={service.tiers.silver}
            tier="silver"
          />
        </div>
        <Button
          variant="outline"
          size="sm"
          className="w-full mt-4"
          onClick={() => onRequest?.(service)}
        >
          Request Service
        </Button>
      </CardContent>
    </Card>
  );
}

// =============================================================================
// SERVICE GRID
// =============================================================================

export function ServiceGrid({
  services,
  categoryColor,
  onRequest,
}: ServiceGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {services.map((service) => (
        <ServiceCard
          key={service.id}
          service={service}
          categoryColor={categoryColor}
          onRequest={onRequest}
        />
      ))}
    </div>
  );
}

// =============================================================================
// SERVICE TABLE
// =============================================================================

export function ServiceTable({ services }: ServiceTableProps) {
  return (
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
              {services.map((service, index) => {
                const Icon = service.icon;
                return (
                  <tr
                    key={service.id}
                    className={cn(
                      "border-b hover:bg-muted/50",
                      index % 2 === 0 && "bg-muted/20"
                    )}
                  >
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <Icon className="h-4 w-4 text-muted-foreground" />
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
                        {isAvailable(service.tiers.platinum) ? (
                          <Check className="h-4 w-4 text-green-500" />
                        ) : (
                          <X className="h-4 w-4 text-muted-foreground" />
                        )}
                        <span>{service.tiers.platinum}</span>
                      </div>
                    </td>
                    <td className="p-4 text-center text-sm">
                      <div className="flex items-center justify-center gap-1">
                        {isAvailable(service.tiers.gold) ? (
                          <Check className="h-4 w-4 text-green-500" />
                        ) : (
                          <X className="h-4 w-4 text-muted-foreground" />
                        )}
                        <span>{service.tiers.gold}</span>
                      </div>
                    </td>
                    <td className="p-4 text-center text-sm">
                      <div className="flex items-center justify-center gap-1">
                        {isAvailable(service.tiers.silver) ? (
                          <Check className="h-4 w-4 text-green-500" />
                        ) : (
                          <X className="h-4 w-4 text-muted-foreground" />
                        )}
                        <span>{service.tiers.silver}</span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}

// =============================================================================
// SERVICE VIEW (Combined Grid + Table with Tabs)
// =============================================================================

export function ServiceView({
  services,
  categoryColor,
  defaultView = "grid",
  onRequest,
}: ServiceViewProps) {
  return (
    <Tabs defaultValue={defaultView} className="space-y-4">
      <TabsList>
        <TabsTrigger value="grid">Grid View</TabsTrigger>
        <TabsTrigger value="table">Comparison Table</TabsTrigger>
      </TabsList>

      <TabsContent value="grid">
        <ServiceGrid
          services={services}
          categoryColor={categoryColor}
          onRequest={onRequest}
        />
      </TabsContent>

      <TabsContent value="table">
        <ServiceTable services={services} />
      </TabsContent>
    </Tabs>
  );
}
