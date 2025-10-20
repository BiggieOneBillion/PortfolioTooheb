import React from "react";
import { services } from "./data/services-data";
import { Work_Sans, Vollkorn } from "next/font/google";
import { useHomeContentStore } from "@/store/home-data-store";

const workSans = Work_Sans({
  subsets: ["latin"],
  variable: "--font-work-sans",
});

const vollkorn = Vollkorn({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-vollkorn",
});

const CTA = () => {
  const homeContent = useHomeContentStore((state) => state.homeContent);

  const { services } = homeContent!.desktop.cta;

  const { heading } = homeContent!.mobile.cta;

  return (
    <section className="bg-[#c7ceb0] py-10 space-y-10 mt-3 mx-4 px-10 mb-10">
      <header
        className={`text-center text-3xl font-medium ${vollkorn.className} antialiased text-[#30586C]`}
      >
        {heading}
      </header>
      <ul className="space-y-10">
        {services.map((el) => (
          <li
            key={el.description}
            className={`space-y-3 text-center ${workSans.className} antialiased text-[#363636] font-medium`}
          >
            <h3 className="font-semibold">{el.title}</h3>
            <p className="leading-[25px]">{el.description}</p>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default CTA;
