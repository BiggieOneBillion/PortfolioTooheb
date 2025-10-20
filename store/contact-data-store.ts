import { create } from "zustand";
import { useQueryClient } from "@tanstack/react-query";

interface SiteContentState {
  contactContent: ContactData | null;
  setcontactContent: (data: any) => void;
  getFromCache: () => void;
}

export const useContactContentStore = create<SiteContentState>((set) => ({
  contactContent: null,
  setcontactContent: (data) => set({ contactContent: data }),
  getFromCache: () => {
    const queryClient = useQueryClient();
    const cached = queryClient.getQueryData(["contact-content"]);
    if (cached) set({ contactContent: cached as ContactData });
  },
}));
