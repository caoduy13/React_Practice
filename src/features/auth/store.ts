import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import type { AuthState, AuthActions } from "./types";

export const useAuthStore = create<AuthState & AuthActions>()(
  devtools(
    persist(
      (set) => ({
        accessToken: null,
        role: null,

        setAuth: ({ accessToken, role }) => {
          set({ accessToken, role });
        },

        clearAuth: () => {
          set({ accessToken: null, role: null });
        },
      }),
      {
        name: "auth-storage",
      },
    ),
  ),
);
