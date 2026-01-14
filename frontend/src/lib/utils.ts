import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Format currency with Bangladeshi Taka
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("bn-BD", {
    style: "currency",
    currency: "BDT",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount);
}

// Format date in Bengali locale
export function formatDate(date: string | Date): string {
  return new Intl.DateTimeFormat("bn-BD", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(date));
}

// Format relative time
export function formatRelativeTime(date: string | Date): string {
  const now = new Date();
  const past = new Date(date);
  const diffInSeconds = Math.floor((now.getTime() - past.getTime()) / 1000);

  if (diffInSeconds < 60) return "Just now";
  if (diffInSeconds < 3600)
    return `${Math.floor(diffInSeconds / 60)} minutes ago`;
  if (diffInSeconds < 86400)
    return `${Math.floor(diffInSeconds / 3600)} hours ago`;
  if (diffInSeconds < 604800)
    return `${Math.floor(diffInSeconds / 86400)} days ago`;

  return formatDate(date);
}

// Get tier badge class
export function getTierBadgeClass(tier: string): string {
  switch (tier.toLowerCase()) {
    case "platinum":
      return "tier-platinum";
    case "gold":
      return "tier-gold";
    case "silver":
      return "tier-silver";
    default:
      return "bg-muted text-muted-foreground";
  }
}

// Get tier display name
export function getTierDisplayName(tier: string): string {
  const names: Record<string, string> = {
    platinum: "Platinum",
    gold: "Gold",
    silver: "Silver",
    free: "Free",
  };
  return names[tier.toLowerCase()] || tier;
}

// Get service level icon
export function getServiceLevelIcon(level: string): string {
  switch (level) {
    case "full":
      return "✓";
    case "partial":
      return "◐";
    case "basic":
      return "○";
    case "none":
      return "—";
    default:
      return "?";
  }
}

// Validate email
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Validate phone (Bangladesh format)
export function isValidPhone(phone: string): boolean {
  const phoneRegex = /^(\+88)?01[3-9]\d{8}$/;
  return phoneRegex.test(phone.replace(/\s/g, ""));
}

// Debounce function
export function debounce<T extends (...args: Parameters<T>) => ReturnType<T>>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;

  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

// Local storage helpers with SSR safety
export function getLocalStorage<T>(key: string, defaultValue: T): T {
  if (typeof window === "undefined") return defaultValue;

  try {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch {
    return defaultValue;
  }
}

export function setLocalStorage<T>(key: string, value: T): void {
  if (typeof window === "undefined") return;

  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    console.error("Failed to save to localStorage");
  }
}

export function removeLocalStorage(key: string): void {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(key);
}
