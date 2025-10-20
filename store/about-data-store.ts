import { create } from "zustand";
import { useQueryClient } from "@tanstack/react-query";

interface SiteContentState {
  aboutContent: AboutData | null;
  setAboutContent: (data: any) => void;
  getFromCache: () => void;
}

export const useAboutContentStore = create<SiteContentState>((set) => ({
  aboutContent: null,
  setAboutContent: (data) => set({ aboutContent: data }),
  getFromCache: () => {
    const queryClient = useQueryClient();
    const cached = queryClient.getQueryData(["about-content"]);
    if (cached) set({ aboutContent: cached as AboutData });
  },
}));
