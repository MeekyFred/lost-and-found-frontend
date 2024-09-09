import { StateCreator } from "zustand";

import { User } from "@/app/types/auth";

export interface AuthSlice {
  isLoggedIn: boolean;
  user: User | null;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
  setUser: (user: User) => void;
  resetAuth: () => void;
}

export type AuthState = {
  isLoggedIn: boolean;
  user: User | null;
};

export const defaultAuthState: AuthState = {
  isLoggedIn: false,
  user: null,
};

export const createAuthSlice: StateCreator<AuthSlice> = (set) => ({
  ...defaultAuthState,
  setIsLoggedIn: (isLoggedIn: boolean) => set({ isLoggedIn }),
  setUser: (user: User) => set({ user }),
  resetAuth: () => set({ user: null, isLoggedIn: false }),
});
