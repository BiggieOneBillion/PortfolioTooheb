import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

function getSessionStorageLike() {
  if (typeof window !== "undefined" && window.sessionStorage) {
    try {
      // quick feature test
      const testKey = "__test__";
      window.sessionStorage.setItem(testKey, "1");
      window.sessionStorage.removeItem(testKey);
      return window.sessionStorage;
    } catch {
      // sessionStorage exists but is unusable (blocked/quota) — fall through
    }
  }

  // fallback in-memory storage (cleared on refresh)
  const memory = new Map<string, string | null>();
  return {
    getItem: (key: string) => {
      return memory.has(key) ? (memory.get(key) as string) : null;
    },
    setItem: (key: string, value: string) => {
      memory.set(key, value);
    },
    removeItem: (key: string) => {
      memory.delete(key);
    },
  } as Storage;
}

interface AuthState {
  otpToken: {
    otp: string;
    expiresAt: number;
  } | null;
  email: string | null;
  setOtpToken: (token: string) => void;
  clearOtpToken: () => void;
  setEmail: (email: string) => void;
  clearMail: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      otpToken: null,
      email: " admin@portfolio.com",
      setEmail: (email) => set({ email: email }),
      setOtpToken: (token) =>
        set({
          otpToken: { otp: token, expiresAt: Date.now() + 10 * 60 * 1000 },
        }),
      clearOtpToken: () => set({ otpToken: null, email: null }),
      clearMail: () => set({ email: null }),
    }),
    {
      name: "auth-session", // key name in sessionStorage
      storage: createJSONStorage(() => getSessionStorageLike()),
    }
  )
);
