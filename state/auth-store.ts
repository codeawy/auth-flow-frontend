import { create } from "zustand";

interface User {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
}

interface AuthStore {
  isLoading: boolean;
  user: User | null;
  register: ({
    email,
    password,
    firstName,
    lastName,
  }: {
    email: string;
    password: string;
    firstName?: string;
    lastName?: string;
  }) => Promise<void>;
}

export const useAuthStore = create<AuthStore>((set) => ({
  isLoading: false,
  user: null,
  register: ({
    email,
    password,
    firstName,
    lastName,
  }: {
    email: string;
    password: string;
    firstName?: string;
    lastName?: string;
  }) => {
    set({
      isLoading: true,
    });
    return new Promise((resolve) => {
      setTimeout(() => {
        set({
          user: { email, password, firstName, lastName },
          isLoading: false,
        });
        resolve();
      }, 1000);
    });
  },
}));
