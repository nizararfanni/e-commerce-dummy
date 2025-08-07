import { create } from "zustand";
import { jwtDecode } from "jwt-decode";

interface authStore {
  token: string | null;
  setToken: (token: string | null) => void;
  logOut: () => void;
}

export const authStore = create<authStore>((set) => ({
  token: null,
  setToken: (token: string | null) => set({ token }),
  logOut: () => set({ token: null }),
}));



export const isTokenExpired = (token: string): boolean => {
  try {
    const decoded = jwtDecode<{ exp?: number }>(token);
    if (!decoded.exp) return false;

    const expMs = decoded.exp * 1000;

    return expMs < Date.now();
  } catch (error) {
    console.error("Gagal decode token:", error);
    return true; 
  }
};