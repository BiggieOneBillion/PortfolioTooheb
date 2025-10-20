import React from "react";
import HeroSectionDesktop from "./herosection";
import CTA from "./cta";
import GalleryView from "./galleryview";
import { useHomeData } from "@/context/home-data-context";

const HomeViewDesktop = () => {

  return (
    <>
      <HeroSectionDesktop />
      <CTA />
      <GalleryView />
    </>
  );
};

export default HomeViewDesktop;
