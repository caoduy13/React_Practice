//1. Define API functions for authentication
//1. Define API functions for authentication
import type { UserRole } from "../../shared/types";

export interface LoginRequest {
  email: string;
  password: string;
}
export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  subscription?: {
    hasActiveSubscription: boolean;
    subscriptionStatus: string;
  };
}

export interface User {
  id: string;
  email: string;
  fullName: string;
  phone?: string;
  birthday?: string;
  profilePicture?: string;
  role: UserRole;
  createdAt: string;
  updatedAt: string;
}

export interface RegisterRequest {
  fullName?: string;
  email: string;
  password: string;
  phone?: string;
}

export interface RegisterResponse {
  _id: string;
  fullName: string;
  email: string;
}

export interface AuthState {
  accessToken: string | null;
  role: UserRole | null;
}

export interface AuthActions {
    setAuth: (payload: {accessToken: string; role: UserRole | null}) => void;
    clearAuth: () => void;
}