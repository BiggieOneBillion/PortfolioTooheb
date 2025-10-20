"use client";

import React, { useEffect } from "react";
import AboutView from "../_components/mobile-view/about";
import Info from "../_components/desktop-view/about/Info";
import useGetSiteData from "@/hooks/use-get-sitedata";
import { useAboutContentStore } from "@/store/about-data-store";

const AboutPage = () => {
  const { aboutData, isLoadingAboutData } = useGetSiteData();

  const setAboutContent = useAboutContentStore(
    (state) => state.setAboutContent
  );

  useEffect(() => {
    if (aboutData && Object.keys(aboutData).length > 0) {
      setAboutContent(aboutData);
    }
  }, [aboutData]);

  if (isLoadingAboutData) {
    return <p className="text-center">Loading....</p>;
  }

  return (
    <>
      <div className="md:hidden">
        <AboutView />
      </div>
      <div className="hidden md:block">
        <Info />
      </div>
    </>
  );
};

export default AboutPage;
