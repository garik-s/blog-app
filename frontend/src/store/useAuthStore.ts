import { create } from "zustand";
import { persist } from "zustand/middleware";
import axios from "axios";
import { toast } from "react-hot-toast";


const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

interface AuthStore {
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
}

const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      
      login: async (username, password) => {
        try {
          await axios.post(`${API_URL}/auth/login`, { username, password }, { withCredentials: true });

          set({ isAuthenticated: true });
          toast.success("Login successful!");
          return true;
        } catch (error) {
          toast.error("Login failed! Invalid credentials.");
          console.error("Login error:", error);
          return false;
        }
      },

      logout: async () => {
        try {
          await axios.post(`${API_URL}/auth/logout`, {}, { withCredentials: true });
          set({ isAuthenticated: false });
          toast.success("Logged out successfully!");
        } catch (error) {
          toast.error("Logout failed!");
          console.error("Logout error:", error);
        }
      },
    }),
    {
      name: "auth-storage",
      storage: {
        getItem: (key) => {
          const value = localStorage.getItem(key);
          return value ? JSON.parse(value) : null;
        },
        setItem: (key, value) => {
          localStorage.setItem(key, JSON.stringify(value));
        },
        removeItem: (key) => {
          localStorage.removeItem(key);
        },
      },
    }
  )
);

export default useAuthStore;
