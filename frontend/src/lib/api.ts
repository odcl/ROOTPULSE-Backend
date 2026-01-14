// API Configuration and Client

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1";

interface RequestConfig extends RequestInit {
  params?: Record<string, string>;
}

class ApiClient {
  private baseUrl: string;
  private token: string | null = null;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  setToken(token: string | null) {
    this.token = token;
  }

  private getHeaders(): HeadersInit {
    const headers: HeadersInit = {
      "Content-Type": "application/json",
    };

    if (this.token) {
      headers["Authorization"] = `Bearer ${this.token}`;
    }

    return headers;
  }

  private buildUrl(endpoint: string, params?: Record<string, string>): string {
    const url = new URL(`${this.baseUrl}${endpoint}`);
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        url.searchParams.append(key, value);
      });
    }
    return url.toString();
  }

  async request<T>(endpoint: string, config: RequestConfig = {}): Promise<T> {
    const { params, ...fetchConfig } = config;
    const url = this.buildUrl(endpoint, params);

    const response = await fetch(url, {
      ...fetchConfig,
      headers: {
        ...this.getHeaders(),
        ...fetchConfig.headers,
      },
    });

    if (!response.ok) {
      const error = await response
        .json()
        .catch(() => ({ message: "Unknown error" }));
      throw new ApiError(
        response.status,
        error.message || "Request failed",
        error
      );
    }

    return response.json();
  }

  async get<T>(endpoint: string, params?: Record<string, string>): Promise<T> {
    return this.request<T>(endpoint, { method: "GET", params });
  }

  async post<T>(endpoint: string, data?: unknown): Promise<T> {
    return this.request<T>(endpoint, {
      method: "POST",
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async put<T>(endpoint: string, data?: unknown): Promise<T> {
    return this.request<T>(endpoint, {
      method: "PUT",
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async patch<T>(endpoint: string, data?: unknown): Promise<T> {
    return this.request<T>(endpoint, {
      method: "PATCH",
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async delete<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: "DELETE" });
  }
}

class ApiError extends Error {
  status: number;
  data: unknown;

  constructor(status: number, message: string, data?: unknown) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.data = data;
  }
}

// Create singleton instance
export const api = new ApiClient(API_BASE_URL);

// Auth-specific API functions
export const authApi = {
  login: (credentials: { identifier: string; password: string }) =>
    api.post<{ access_token: string; refresh_token: string; user: unknown }>(
      "/auth/login",
      credentials
    ),

  register: (data: {
    email: string;
    username: string;
    phone: string;
    password: string;
    first_name?: string;
    last_name?: string;
  }) =>
    api.post<{ access_token: string; user: unknown }>("/auth/register", data),

  logout: () => api.post("/auth/logout"),

  refreshToken: (refreshToken: string) =>
    api.post<{ access_token: string }>("/auth/refresh", {
      refresh_token: refreshToken,
    }),

  getProfile: () => api.get<unknown>("/users/me"),

  updateProfile: (data: {
    first_name?: string;
    last_name?: string;
    phone?: string;
  }) => api.patch<unknown>("/users/me", data),
};

// Services API
export const servicesApi = {
  getCategories: () => api.get<unknown[]>("/services/categories"),

  getServices: (category?: string) =>
    api.get<unknown[]>("/services", category ? { category } : undefined),

  requestService: (serviceId: string, data: { notes?: string }) =>
    api.post<unknown>(`/services/${serviceId}/request`, data),

  getMyRequests: () => api.get<unknown[]>("/services/my-requests"),
};

// Membership API
export const membershipApi = {
  getCurrentMembership: () => api.get<unknown>("/membership/current"),

  getPlans: () => api.get<unknown[]>("/membership/plans"),

  upgradePlan: (planId: string) =>
    api.post<unknown>(`/membership/upgrade/${planId}`),
};

export { ApiError };
