import React from "react";
import CTA from "./cta";
import Photogrid from "./photogrid";
import HeroSection from "./herosection";
import Description from "./description";



const HomeView = () => {
  return (
    <main className="h-full">
      {/* Nav and Herosection */}
      <section className="px-6 mt-10">
        <HeroSection />
      </section>
      {/* mid section */}
      <Description />
      {/* cta */}
      <CTA />
      {/* photogrid */}
      <Photogrid />
    </main>
  );
};

export default HomeView;
