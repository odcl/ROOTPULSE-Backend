// =============================================================================
// SERVICE CATALOG DATA
// All service definitions are centralized here for easy management.
// Mobile/Web teams can use these as reference for API contracts.
// =============================================================================

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
  Home,
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
  Heart,
  Stethoscope,
  Pill,
  SmilePlus,
  UserCheck,
  Dumbbell,
  Sparkles,
  Activity,
  Trophy,
  LucideIcon,
} from "lucide-react";

// =============================================================================
// TYPES
// =============================================================================

export type ServiceCategory = "travel" | "asset" | "wellness";
export type MembershipTier = "platinum" | "gold" | "silver";

export interface ServiceItem {
  id: string;
  name: string;
  nameBn: string;
  icon: LucideIcon;
  description?: string;
  descriptionBn?: string;
  tiers: {
    platinum: string;
    gold: string;
    silver: string;
  };
  isActive?: boolean;
}

export interface ServiceCategoryConfig {
  id: ServiceCategory;
  name: string;
  nameBn: string;
  icon: LucideIcon;
  gradient: string;
  services: ServiceItem[];
}

// =============================================================================
// TRAVEL & ASSISTANCE SERVICES
// =============================================================================

export const travelServices: ServiceItem[] = [
  {
    id: "air-ticket",
    name: "Air Ticket",
    nameBn: "বিমান টিকিট",
    icon: Plane,
    tiers: {
      platinum: "Priority / Business",
      gold: "Regular",
      silver: "Economy",
    },
  },
  {
    id: "accommodation",
    name: "Accommodation Booking",
    nameBn: "থাকার ব্যবস্থা",
    icon: Hotel,
    tiers: {
      platinum: "5 Star / Luxury",
      gold: "3–4 Star",
      silver: "Budget",
    },
  },
  {
    id: "currency-exchange",
    name: "Currency Exchange",
    nameBn: "মুদ্রা বিনিময়",
    icon: CreditCard,
    tiers: {
      platinum: "VIP / Private Desk",
      gold: "Assisted",
      silver: "Basic Counter",
    },
  },
  {
    id: "pick-drop",
    name: "Pick & Drop",
    nameBn: "পিক অ্যান্ড ড্রপ",
    icon: Car,
    tiers: {
      platinum: "24/7 Chauffeur",
      gold: "On Demand",
      silver: "Fixed Route",
    },
  },
  {
    id: "transport",
    name: "Transport",
    nameBn: "পরিবহন",
    icon: Car,
    tiers: {
      platinum: "Business SUV",
      gold: "Sedan / Regular SUV",
      silver: "Shared (Mini / Micro)",
    },
  },
  {
    id: "driver",
    name: "Driver",
    nameBn: "ড্রাইভার",
    icon: Users,
    tiers: {
      platinum: "Dedicated Chauffeur",
      gold: "Assigned Driver",
      silver: "Common Pool",
    },
  },
  {
    id: "travel-guide",
    name: "Travel Guide",
    nameBn: "ট্রাভেল গাইড",
    icon: Map,
    tiers: {
      platinum: "Full Time (24/7)",
      gold: "On Request",
      silver: "—",
    },
  },
  {
    id: "sim-facility",
    name: "SIM Facility",
    nameBn: "সিম সুবিধা",
    icon: Smartphone,
    tiers: {
      platinum: "International",
      gold: "Roaming Support",
      silver: "Local",
    },
  },
  {
    id: "food-facility",
    name: "Food Facility",
    nameBn: "খাবার সুবিধা",
    icon: UtensilsCrossed,
    tiers: {
      platinum: "Dietary / VIP Menu",
      gold: "Custom Menu",
      silver: "Standard Menu",
    },
  },
  {
    id: "navigation",
    name: "Navigation",
    nameBn: "নেভিগেশন",
    icon: Navigation,
    tiers: {
      platinum: "Real-time GPS Concierge",
      gold: "Assisted",
      silver: "Map App",
    },
  },
  {
    id: "visa-processing",
    name: "Visa Processing",
    nameBn: "ভিসা প্রসেসিং",
    icon: FileText,
    tiers: {
      platinum: "Fast Track / VIP",
      gold: "Standard",
      silver: "—",
    },
  },
  {
    id: "shopping",
    name: "Shopping",
    nameBn: "শপিং",
    icon: ShoppingBag,
    tiers: {
      platinum: "Personal Shopper",
      gold: "Guided",
      silver: "Self",
    },
  },
];

// =============================================================================
// ASSET GUARDIAN SERVICES
// =============================================================================

export const assetServices: ServiceItem[] = [
  {
    id: "property-monitoring",
    name: "Property Monitoring",
    nameBn: "সম্পত্তি পর্যবেক্ষণ",
    icon: Home,
    tiers: {
      platinum: "Monthly / Real-time",
      gold: "Quarterly",
      silver: "On Request",
    },
  },
  {
    id: "asset-documentation",
    name: "Asset Documentation",
    nameBn: "সম্পদ ডকুমেন্টেশন",
    icon: FileText,
    tiers: {
      platinum: "Full Digitization",
      gold: "Semi-Digital",
      silver: "Basic Upload",
    },
  },
  {
    id: "legal-protection",
    name: "Legal Protection",
    nameBn: "আইনি সুরক্ষা",
    icon: Scale,
    tiers: {
      platinum: "Dedicated Lawyer",
      gold: "Basic Support",
      silver: "Info Only",
    },
  },
  {
    id: "maintenance",
    name: "Maintenance Service",
    nameBn: "রক্ষণাবেক্ষণ",
    icon: Wrench,
    tiers: {
      platinum: "Full Coverage",
      gold: "On Demand",
      silver: "Basic",
    },
  },
  {
    id: "security",
    name: "Security Service",
    nameBn: "নিরাপত্তা সেবা",
    icon: Shield,
    tiers: {
      platinum: "CCTV + Guard Combo",
      gold: "Basic Guard",
      silver: "Optional",
    },
  },
  {
    id: "valuation",
    name: "Valuation & Appraisal",
    nameBn: "মূল্যায়ন",
    icon: DollarSign,
    tiers: {
      platinum: "Quarterly / On Demand",
      gold: "Yearly",
      silver: "—",
    },
  },
  {
    id: "insurance",
    name: "Insurance Coverage",
    nameBn: "বীমা কভারেজ",
    icon: Shield,
    tiers: {
      platinum: "Premium + Multi Policy",
      gold: "Standard",
      silver: "Optional",
    },
  },
  {
    id: "rental-management",
    name: "Rental & Lease Management",
    nameBn: "ভাড়া ব্যবস্থাপনা",
    icon: Building,
    tiers: {
      platinum: "Full Management",
      gold: "Active Support",
      silver: "Info Only",
    },
  },
  {
    id: "utility-bill",
    name: "Utility Bill Management",
    nameBn: "ইউটিলিটি বিল",
    icon: Receipt,
    tiers: {
      platinum: "Auto Payment",
      gold: "Included",
      silver: "Optional",
    },
  },
  {
    id: "renovation",
    name: "Renovation & Repair",
    nameBn: "সংস্কার ও মেরামত",
    icon: Hammer,
    tiers: {
      platinum: "Full Project",
      gold: "Partial",
      silver: "—",
    },
  },
  {
    id: "digital-records",
    name: "Digital Record Keeping",
    nameBn: "ডিজিটাল রেকর্ড",
    icon: Cloud,
    tiers: {
      platinum: "Cloud + AI Archive",
      gold: "Semi Auto",
      silver: "Manual Upload",
    },
  },
  {
    id: "tax-compliance",
    name: "Tax & Compliance",
    nameBn: "কর ও সম্মতি",
    icon: Calculator,
    tiers: {
      platinum: "Full Filing Support",
      gold: "Guidance",
      silver: "Info",
    },
  },
  {
    id: "encroachment",
    name: "Encroachment Protection",
    nameBn: "দখল সুরক্ষা",
    icon: AlertTriangle,
    tiers: {
      platinum: "Legal + Ground Team",
      gold: "Notice Support",
      silver: "—",
    },
  },
  {
    id: "asset-transfer",
    name: "Asset Transfer Support",
    nameBn: "সম্পদ হস্তান্তর",
    icon: ArrowRightLeft,
    tiers: {
      platinum: "Legal Execution",
      gold: "Advisory",
      silver: "—",
    },
  },
  {
    id: "investment-advisory",
    name: "Investment Advisory",
    nameBn: "বিনিয়োগ পরামর্শ",
    icon: TrendingUp,
    tiers: {
      platinum: "Dedicated Consultant",
      gold: "Periodic Tips",
      silver: "Info",
    },
  },
  {
    id: "gardening-pet",
    name: "Gardening / Pet Care",
    nameBn: "বাগান / পোষা প্রাণী",
    icon: Flower,
    tiers: {
      platinum: "Full Service",
      gold: "On Request",
      silver: "Basic",
    },
  },
];

// =============================================================================
// WELLNESS WITH CARE SERVICES
// =============================================================================

export const wellnessServices: ServiceItem[] = [
  {
    id: "specialist-appointment",
    name: "Specialist Appointment",
    nameBn: "বিশেষজ্ঞ অ্যাপয়েন্টমেন্ট",
    icon: Stethoscope,
    tiers: {
      platinum: "Priority / VIP",
      gold: "Regular",
      silver: "Online Only",
    },
  },
  {
    id: "medicine-delivery",
    name: "Medicine Delivery",
    nameBn: "ওষুধ ডেলিভারি",
    icon: Pill,
    tiers: {
      platinum: "International",
      gold: "Domestic",
      silver: "Local",
    },
  },
  {
    id: "dental",
    name: "Dental Service",
    nameBn: "দাঁতের সেবা",
    icon: SmilePlus,
    tiers: {
      platinum: "Premium Plan",
      gold: "Basic",
      silver: "—",
    },
  },
  {
    id: "elderly-care",
    name: "Elderly Parent Care",
    nameBn: "বয়স্ক পিতামাতা সেবা",
    icon: UserCheck,
    tiers: {
      platinum: "24/7 Dedicated",
      gold: "Home Visit",
      silver: "Day Support",
    },
  },
  {
    id: "fitness",
    name: "Fitness & Gym",
    nameBn: "ফিটনেস ও জিম",
    icon: Dumbbell,
    tiers: {
      platinum: "Premium Club",
      gold: "Standard",
      silver: "Entry Level",
    },
  },
  {
    id: "beauty",
    name: "Beauty & Personal Care",
    nameBn: "বিউটি কেয়ার",
    icon: Sparkles,
    tiers: {
      platinum: "Luxury Spa & Clinic",
      gold: "Standard",
      silver: "Basic Grooming",
    },
  },
  {
    id: "housekeeping",
    name: "House Keeping",
    nameBn: "গৃহস্থালি সেবা",
    icon: Home,
    tiers: {
      platinum: "Full Service",
      gold: "Weekly",
      silver: "On Request",
    },
  },
  {
    id: "physiotherapy",
    name: "Physiotherapy",
    nameBn: "ফিজিওথেরাপি",
    icon: Activity,
    tiers: {
      platinum: "Home Sessions",
      gold: "Clinic Visit",
      silver: "Online Guidance",
    },
  },
  {
    id: "matrimony",
    name: "Matrimony Service",
    nameBn: "বিবাহ সেবা",
    icon: Users,
    tiers: {
      platinum: "Premium Matchmaking",
      gold: "Standard",
      silver: "Basic",
    },
  },
  {
    id: "sports",
    name: "Sports",
    nameBn: "খেলাধুলা",
    icon: Trophy,
    tiers: {
      platinum: "Club Membership",
      gold: "Access Pass",
      silver: "Basic",
    },
  },
];

// =============================================================================
// SERVICE CATEGORIES CONFIG
// =============================================================================

export const serviceCategories: ServiceCategoryConfig[] = [
  {
    id: "travel",
    name: "Travel & Assistance",
    nameBn: "ভ্রমণ ও সহায়তা",
    icon: Plane,
    gradient: "from-blue-500 to-cyan-500",
    services: travelServices,
  },
  {
    id: "asset",
    name: "Asset Guardian",
    nameBn: "সম্পদ রক্ষক",
    icon: Home,
    gradient: "from-green-500 to-emerald-500",
    services: assetServices,
  },
  {
    id: "wellness",
    name: "Wellness with Care",
    nameBn: "সুস্থতা সেবা",
    icon: Heart,
    gradient: "from-pink-500 to-rose-500",
    services: wellnessServices,
  },
];

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

/**
 * Get services by category ID
 */
export function getServicesByCategory(
  categoryId: ServiceCategory
): ServiceItem[] {
  const category = serviceCategories.find((c) => c.id === categoryId);
  return category?.services || [];
}

/**
 * Get category config by ID
 */
export function getCategoryConfig(
  categoryId: ServiceCategory
): ServiceCategoryConfig | undefined {
  return serviceCategories.find((c) => c.id === categoryId);
}

/**
 * Get service by ID across all categories
 */
export function getServiceById(serviceId: string): ServiceItem | undefined {
  for (const category of serviceCategories) {
    const service = category.services.find((s) => s.id === serviceId);
    if (service) return service;
  }
  return undefined;
}

/**
 * Check if a service is available for a tier
 */
export function isServiceAvailable(
  service: ServiceItem,
  tier: MembershipTier
): boolean {
  return service.tiers[tier] !== "—";
}

/**
 * Get all services count
 */
export function getTotalServicesCount(): number {
  return serviceCategories.reduce((acc, cat) => acc + cat.services.length, 0);
}
