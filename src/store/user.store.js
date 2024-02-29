import { create } from "zustand";

export const useUserStore = create((set) => ({
  user: null,
  accessToken: localStorage.getItem("accessToken") || null,
  refreshToken: localStorage.getItem("refreshToken") || null,

  setUser: (user) => set({ user }),
  setAuthToken: (token) => {
    localStorage.setItem("accessToken", token?.access?.token);
    localStorage.setItem("refreshToken", token?.refresh?.token);

    return set({
      accessToken: token?.access?.token,
      refreshToken: token?.refresh?.token,
    });
  },
  clear: () => {
    localStorage.clear();
    return set({ user: null, accessToken: null, refreshToken: null });
  },
}));
