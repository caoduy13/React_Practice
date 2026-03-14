import { create } from "zustand";
import { AuthState, AuthActions } from "./types";

export const useAuthStore = create<AuthState & AuthActions>((set) => ({
  accessToken: null,
  role: null,
  setAuth: ({ accessToken, role }) => set({ accessToken, role }),
  clearAuth: () => set({ accessToken: null, role: null }),
}));
