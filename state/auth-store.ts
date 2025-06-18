import { create } from "zustand";
import api from "@/lib/axios";
import { isAxiosError } from "axios";

interface User {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
}

interface AuthStore {
  isLoading: boolean;
  error: null | string | string[];
  user: User | null;
  register: ({
    email,
    password,
    firstName,
    lastName,
  }: RegisterParams) => Promise<void>;
}

interface RegisterParams {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
}

export const useAuthStore = create<AuthStore>((set) => ({
  isLoading: false,
  error: null,
  user: null,
  register: async ({
    email,
    password,
    firstName,
    lastName,
  }: RegisterParams) => {
    try {
      set({
        isLoading: true,
      });
      await api.post("/api/v1/auth/register", {
        email,
        password,
        firstName,
        lastName,
      });
    } catch (error) {
      const errorMessage = isAxiosError(error)
        ? error.response?.data?.message
        : "An error occurred during registration";

      set({
        error: errorMessage,
      });
    } finally {
      set({
        isLoading: false,
      });
    }
  },
}));
