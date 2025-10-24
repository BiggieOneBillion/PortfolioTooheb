import apiClient from "@/lib/api-client";
import { useQuery } from "@tanstack/react-query";
import React from "react";

const useGetSiteData = () => {
  const { data: contactData, isLoading: isLoadingContactData } = useQuery({
    queryKey: ["contact-content"],
    queryFn: async () => {
      const response = await apiClient.get("/content/contact");
      return response.data.data;
    },
    staleTime: 100000,
    refetchOnWindowFocus: false,
  });

  const { data: homeData, isLoading: isLoadingHomeData } = useQuery({
    queryKey: ["home-content"],
    queryFn: async () => {
      const response = await apiClient.get("/content/home");
      return response.data.data;
    },
    staleTime: 100000,
    refetchOnWindowFocus: false,
  });

  const { data: aboutData, isLoading: isLoadingAboutData } = useQuery({
    queryKey: ["about-content"],
    queryFn: async () => {
      const response = await apiClient.get("/content/about");
      return response.data.data;
    },
    staleTime: 100000,
    refetchOnWindowFocus: false,
  });

  return {
    // Home
    isLoadingHomeData,
    homeData,
    //  About
    isLoadingAboutData,
    aboutData,
    // contact
    isLoadingContactData,
    contactData,
  };
};

export default useGetSiteData;
