import { create } from "zustand";
import { isAxiosError } from "axios";
import api from "@/lib/axios";
import { toast } from "sonner";

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
  verifyEmail: (token: string) => Promise<void>;
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
  verifyEmail: async (token: string) => {
    try {
      set({
        isLoading: true,
      });
      await api.post("/api/v1/auth/verify-email", {
        token,
      });
      toast("Email verified successfully! You can now log in.");
    } catch (error) {
      console.log(error);

      const errorMessage = isAxiosError(error)
        ? error.response?.data?.message
        : "An error occurred during email verification";

      set({
        error: errorMessage,
      });
      toast(errorMessage);
    } finally {
      set({
        isLoading: false,
      });
    }
  },
}));
