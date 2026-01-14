// TypeScript types for RootPulse Frontend

// User and Authentication Types
export interface User {
  id: string;
  email: string;
  username: string;
  phone?: string;
  firstName?: string;
  lastName?: string;
  avatar?: string;
  membershipTier: MembershipTier;
  isActive: boolean;
  createdAt: string;
}

export type MembershipTier = "platinum" | "gold" | "silver" | "free";

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface LoginCredentials {
  identifier: string; // email, phone, or username
  password: string;
  rememberMe?: boolean;
}

export interface RegisterData {
  email: string;
  username: string;
  phone: string;
  password: string;
  confirmPassword: string;
  firstName?: string;
  lastName?: string;
}

// Service Types
export interface Service {
  id: string;
  name: string;
  nameBn?: string;
  description: string;
  category: ServiceCategory;
  icon: string;
  availability: TierAvailability;
  isActive: boolean;
}

export type ServiceCategory = "travel" | "asset-guardian" | "wellness";

export interface TierAvailability {
  platinum: ServiceLevel;
  gold: ServiceLevel;
  silver: ServiceLevel;
}

export type ServiceLevel = "full" | "partial" | "basic" | "none";

// Travel & Assistance
export interface TravelService {
  airTicket: TierAvailability;
  accommodation: TierAvailability;
  currencyExchange: TierAvailability;
  pickDrop: TierAvailability;
  transport: TierAvailability;
  driver: TierAvailability;
  travelGuide: TierAvailability;
  simFacility: TierAvailability;
  foodFacility: TierAvailability;
  navigation: TierAvailability;
  visaProcessing: TierAvailability;
  shopping: TierAvailability;
}

// Asset Guardian
export interface AssetGuardianService {
  propertyMonitoring: TierAvailability;
  assetDocumentation: TierAvailability;
  legalProtection: TierAvailability;
  maintenanceService: TierAvailability;
  securityService: TierAvailability;
  valuationAppraisal: TierAvailability;
  insuranceCoverage: TierAvailability;
  rentalManagement: TierAvailability;
  utilityBillManagement: TierAvailability;
  renovationRepair: TierAvailability;
  digitalRecordKeeping: TierAvailability;
  taxCompliance: TierAvailability;
  encroachmentProtection: TierAvailability;
  assetTransferSupport: TierAvailability;
  investmentAdvisory: TierAvailability;
}

// Wellness with Care
export interface WellnessService {
  specialistAppointment: TierAvailability;
  medicineDelivery: TierAvailability;
  dentalService: TierAvailability;
  elderlyParentCare: TierAvailability;
  fitnessGym: TierAvailability;
  beautyPersonalCare: TierAvailability;
  houseKeeping: TierAvailability;
  physiotherapy: TierAvailability;
  matrimonyService: TierAvailability;
  sports: TierAvailability;
}

// Membership
export interface Membership {
  id: string;
  userId: string;
  tier: MembershipTier;
  duration: MembershipDuration;
  startDate: string;
  endDate: string;
  isActive: boolean;
  autoRenew: boolean;
}

export type MembershipDuration =
  | "1_month"
  | "5_years"
  | "10_years"
  | "lifetime";

// Dashboard Stats
export interface DashboardStats {
  activeServices: number;
  pendingRequests: number;
  walletBalance: number;
  upcomingAppointments: number;
}

// Service Request
export interface ServiceRequest {
  id: string;
  serviceId: string;
  serviceName: string;
  category: ServiceCategory;
  status: RequestStatus;
  createdAt: string;
  updatedAt: string;
  notes?: string;
}

export type RequestStatus =
  | "pending"
  | "in_progress"
  | "completed"
  | "cancelled";

// Navigation
export interface NavItem {
  title: string;
  href: string;
  icon: string;
  badge?: number;
  children?: NavItem[];
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  errors?: Record<string, string[]>;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}
