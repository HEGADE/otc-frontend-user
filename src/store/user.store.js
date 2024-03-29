import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useUserStore = create(
  persist(
    (set) => ({
      user: null,
      accessToken: sessionStorage.getItem("accessToken") || null,
      refreshToken: sessionStorage.getItem("refreshToken") || null,

      setUser: (user) => set({ user }),
      setAuthToken: (token) => {
        sessionStorage.setItem("accessToken", token?.access?.token);
        sessionStorage.setItem("refreshToken", token?.refresh?.token);

        return set({
          accessToken: token?.access?.token,
          refreshToken: token?.refresh?.token,
        });
      },
      clear: () => {
        console.log("clearing storage");
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
