"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  ReactNode,
} from "react";
import { User, AuthState } from "@/types";
import { api, authApi, ApiError } from "@/lib/api";
import {
  getLocalStorage,
  setLocalStorage,
  removeLocalStorage,
} from "@/lib/utils";

interface AuthContextType extends AuthState {
  login: (
    identifier: string,
    password: string,
    rememberMe?: boolean
  ) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  updateUser: (user: Partial<User>) => void;
}

interface RegisterData {
  email: string;
  username: string;
  phone: string;
  password: string;
  firstName?: string;
  lastName?: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const TOKEN_KEY = "rootpulse_token";
const USER_KEY = "rootpulse_user";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null,
    token: null,
    isAuthenticated: false,
    isLoading: true,
  });

  // Initialize auth state from localStorage
  useEffect(() => {
    const token = getLocalStorage<string | null>(TOKEN_KEY, null);
    const user = getLocalStorage<User | null>(USER_KEY, null);

    if (token && user) {
      api.setToken(token);
      setState({
        user,
        token,
        isAuthenticated: true,
        isLoading: false,
      });
    } else {
      setState((prev) => ({ ...prev, isLoading: false }));
    }
  }, []);

  const login = useCallback(
    async (identifier: string, password: string, rememberMe = false) => {
      setState((prev) => ({ ...prev, isLoading: true }));

      try {
        const response = await authApi.login({ identifier, password });
        const { access_token, user } = response;

        api.setToken(access_token);

        const userData = user as User;

        if (rememberMe) {
          setLocalStorage(TOKEN_KEY, access_token);
          setLocalStorage(USER_KEY, userData);
        } else {
          // Store in sessionStorage for session-only persistence
          if (typeof window !== "undefined") {
            sessionStorage.setItem(TOKEN_KEY, access_token);
            sessionStorage.setItem(USER_KEY, JSON.stringify(userData));
          }
        }

        setState({
          user: userData,
          token: access_token,
          isAuthenticated: true,
          isLoading: false,
        });
      } catch (error) {
        setState((prev) => ({ ...prev, isLoading: false }));
        if (error instanceof ApiError) {
          throw new Error(error.message);
        }
        throw error;
      }
    },
    []
  );

  const register = useCallback(async (data: RegisterData) => {
    setState((prev) => ({ ...prev, isLoading: true }));

    try {
      const response = await authApi.register({
        email: data.email,
        username: data.username,
        phone: data.phone,
        password: data.password,
        first_name: data.firstName,
        last_name: data.lastName,
      });

      const { access_token, user } = response;
      const userData = user as User;

      api.setToken(access_token);
      setLocalStorage(TOKEN_KEY, access_token);
      setLocalStorage(USER_KEY, userData);

      setState({
        user: userData,
        token: access_token,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error) {
      setState((prev) => ({ ...prev, isLoading: false }));
      if (error instanceof ApiError) {
        throw new Error(error.message);
      }
      throw error;
    }
  }, []);

  const logout = useCallback(() => {
    api.setToken(null);
    removeLocalStorage(TOKEN_KEY);
    removeLocalStorage(USER_KEY);

    if (typeof window !== "undefined") {
      sessionStorage.removeItem(TOKEN_KEY);
      sessionStorage.removeItem(USER_KEY);
    }

    setState({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
    });
  }, []);

  const updateUser = useCallback((updates: Partial<User>) => {
    setState((prev) => {
      if (!prev.user) return prev;

      const updatedUser = { ...prev.user, ...updates };
      setLocalStorage(USER_KEY, updatedUser);

      return { ...prev, user: updatedUser };
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{ ...state, login, register, logout, updateUser }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
