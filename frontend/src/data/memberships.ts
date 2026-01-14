// =============================================================================
// MEMBERSHIP PLANS DATA
// Centralized configuration for membership tiers and plans.
// =============================================================================

import { Crown, LucideIcon } from "lucide-react";

// =============================================================================
// TYPES
// =============================================================================

export type MembershipTierType = "platinum" | "gold" | "silver";

export interface MembershipPlan {
  id: MembershipTierType;
  name: string;
  nameBn: string;
  price: number;
  currency: string;
  period: "month" | "year";
  description: string;
  descriptionBn: string;
  gradient: string;
  icon: LucideIcon;
  features: string[];
  limitations: string[];
  isPopular?: boolean;
}

export interface MembershipDuration {
  id: string;
  label: string;
  labelBn: string;
  months: number;
  discountPercent: number;
}

// =============================================================================
// MEMBERSHIP PLANS
// =============================================================================

export const membershipPlans: MembershipPlan[] = [
  {
    id: "platinum",
    name: "Platinum",
    nameBn: "প্লাটিনাম",
    price: 20000,
    currency: "BDT",
    period: "month",
    description: "VIP treatment with dedicated support",
    descriptionBn: "ভিআইপি সেবা ডেডিকেটেড সাপোর্ট সহ",
    gradient: "from-purple-500 to-indigo-600",
    icon: Crown,
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
    isPopular: false,
  },
  {
    id: "gold",
    name: "Gold",
    nameBn: "গোল্ড",
    price: 7500,
    currency: "BDT",
    period: "month",
    description: "Perfect for comprehensive family coverage",
    descriptionBn: "পরিবারের সম্পূর্ণ কভারেজের জন্য আদর্শ",
    gradient: "from-yellow-400 to-amber-500",
    icon: Crown,
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
    isPopular: true,
  },
  {
    id: "silver",
    name: "Silver",
    nameBn: "সিলভার",
    price: 2500,
    currency: "BDT",
    period: "month",
    description: "For basic coverage and essential services",
    descriptionBn: "বেসিক কভারেজ এবং প্রয়োজনীয় সেবার জন্য",
    gradient: "from-gray-400 to-slate-500",
    icon: Crown,
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
    isPopular: false,
  },
];

// =============================================================================
// MEMBERSHIP DURATIONS
// =============================================================================

export const membershipDurations: MembershipDuration[] = [
  {
    id: "1_month",
    label: "1 Month",
    labelBn: "১ মাস",
    months: 1,
    discountPercent: 0,
  },
  {
    id: "5_years",
    label: "5 Years",
    labelBn: "৫ বছর",
    months: 60,
    discountPercent: 15,
  },
  {
    id: "10_years",
    label: "10 Years",
    labelBn: "১০ বছর",
    months: 120,
    discountPercent: 25,
  },
  {
    id: "lifetime",
    label: "Lifetime",
    labelBn: "আজীবন",
    months: 0,
    discountPercent: 40,
  },
];

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

/**
 * Get membership plan by ID
 */
export function getMembershipPlan(
  planId: MembershipTierType
): MembershipPlan | undefined {
  return membershipPlans.find((p) => p.id === planId);
}

/**
 * Calculate discounted price
 */
export function calculateDiscountedPrice(
  basePricePerMonth: number,
  duration: MembershipDuration
): number {
  if (duration.months === 0) {
    // Lifetime: assume 20 years equivalent
    const totalMonths = 240;
    const total = basePricePerMonth * totalMonths;
    return total * (1 - duration.discountPercent / 100);
  }
  const total = basePricePerMonth * duration.months;
  return total * (1 - duration.discountPercent / 100);
}

/**
 * Format price in BDT
 */
export function formatPrice(amount: number): string {
  return new Intl.NumberFormat("bn-BD", {
    style: "currency",
    currency: "BDT",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Get tier badge CSS class
 */
export function getTierBadgeClass(tier: MembershipTierType): string {
  const classes: Record<MembershipTierType, string> = {
    platinum: "tier-platinum",
    gold: "tier-gold",
    silver: "tier-silver",
  };
  return classes[tier];
}
