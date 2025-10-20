import { create } from "zustand";
import { useQueryClient } from "@tanstack/react-query";
import { HomeContent } from "@/types/home";

interface SiteContentState {
  homeContent: HomeContent | null;
  setHomeContent: (data: any) => void;
  getFromCache: () => void;
}

export const useHomeContentStore = create<SiteContentState>((set) => ({
  homeContent: null,
  setHomeContent: (data) => set({ homeContent: data }),
  getFromCache: () => {
    const queryClient = useQueryClient();
    const cached = queryClient.getQueryData(["home-content"]);
    if (cached) set({ homeContent: cached as HomeContent });
  },
}));
