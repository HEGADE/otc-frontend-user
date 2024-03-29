import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useUserStore = create(
  persist(
    (set) => ({
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
        console.log('clearing storage');
        localStorage.clear();
        sessionStorage.clear();
        return set({ user: null, accessToken: null, refreshToken: null });
      },
    }),
    {
      name: "user-storage",
      getStorage: () => sessionStorage,
    }
  )
);
