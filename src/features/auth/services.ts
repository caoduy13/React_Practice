import { API_ENDPOINTS } from "@/shared/constants";
import apiClient from "../../lib/axios";
import type {
  AuthResponse,
  User,
  RegisterRequest,
  LoginRequest,
} from "./types";

export const authService = {
  // Login function
  async login(credentials: LoginRequest): Promise<AuthResponse> {
    // const { data } = await apiClient.post("/auth/login", credentials);
    // Backend trả { message, data: {accessToken, refreshToken}}
    // Frontend nhận {accessToken, refreshToken}
    // console.log(credentials);
    return apiClient.post<AuthResponse>(
      API_ENDPOINTS.AUTH.LOGIN,
      credentials,
    ) as unknown as Promise<AuthResponse>;
  },

  async getMe(): Promise<User> {
    const responseBody = await apiClient.get("/user/me");
    console.log(responseBody);
    return responseBody as unknown as User; // Assuming responseBody is User, data handled in interceptor
  },

  async register(data: RegisterRequest): Promise<AuthResponse> {
    return apiClient.post<AuthResponse>(
      API_ENDPOINTS.AUTH.REGISTER,
      data,
    ) as unknown as Promise<AuthResponse>;
  },

  async logout() {
    await apiClient.post(API_ENDPOINTS.AUTH.LOGOUT);
  },
};
