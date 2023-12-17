import { create } from "zustand";
import { persist } from "zustand/middleware";

interface User {
  id: string;
  role: string;
  name?: string;
  email?: string;
  token?: string;
}

interface StoreInterface {
  isLoggedIn: boolean;
  user: User | null;
  login: (userId: string, role: string) => void;
  logout: () => void;
  updateUserProfile: (profile: Partial<User>) => void;
}

const getDefaultAuthState = () => ({
  isLoggedIn: false,
  user: null,
});

export const userStore = create<StoreInterface>()(
  persist(
    (set) => ({
      ...getDefaultAuthState(),
      login: (userId, role) => {
        set({
          isLoggedIn: true,
          user: { id: userId, role },
        });
      },
      logout: () => {
        set(getDefaultAuthState());
      },
      updateUserProfile: (profile) => {
        set((state) => ({
          user: {
            id: profile.id !== undefined ? profile.id : state.user?.id || "",
            role:
              profile.role !== undefined
                ? profile.role
                : state.user?.role || "",
            email:
              profile.email !== undefined
                ? profile.email
                : state.user?.email || "",
            token:
              profile.token !== undefined
                ? profile.token
                : state.user?.token || "",
            // Add more properties as needed
          },
        }));
      },
    }),
    { name: "task-store" },
  ),
);
