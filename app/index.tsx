"use client";
import React from "react";
import HomeView from "./_components/mobile-view/home";
import HomeViewDesktop from "./_components/desktop-view/home";
import { useHomeData } from "@/context/home-data-context";
import { useHomeContentStore } from "@/store/home-data-store";
import useGetSiteData from "@/hooks/use-get-sitedata";

const HomeIndex = () => {
  const { isLoadingHomeData, homeData } = useGetSiteData();

  const setHomeContent = useHomeContentStore((state) => state.setHomeContent);

  if (isLoadingHomeData) {
    return <p className="w-full text-center">Loading....</p>;
  }

  setHomeContent(homeData);

  return (
    <>
      <section>
        <div className="md:hidden">
          <HomeView />
        </div>
        <div className="hidden md:block">
          <HomeViewDesktop />
        </div>
      </section>
    </>
  );
};

export default HomeIndex;
