"use client";
import React from "react";
import { Courier_Prime, Vollkorn, Work_Sans } from "next/font/google";
import { useAboutContentStore } from "@/store/about-data-store";

const courierPrime = Courier_Prime({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-courier-prime",
});

const vollkorn = Vollkorn({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-vollkorn",
});

const workSans = Work_Sans({
  subsets: ["latin"],
  variable: "--font-work-sans",
});

export default function Info() {
  const aboutContent = useAboutContentStore((state) => state.aboutContent);

  if (!aboutContent) {
    return <p>Getting data....</p>;
  }

  console.log("ABOUT DATA", aboutContent)

  const { heading, subtitle, paragraphs, whyChooseMe, images } =
    aboutContent!.mobile!;
  return (
    <section className="bg-[#ede4d2] text-[#1f1f1f] py-6 px-6 md:px-16 lg:px-32">
      <div className="grid md:grid-cols-2 gap-12 items-start">
        {/* Left - Images */}
        <div className="flex flex-col gap-4 relative">
          <img
            src={images[0] || "/placeholder-img.jpg"}
            alt="Photographer working in Croatia"
            className="rounded-lg object-cover w-3/4 h-[400px] "
          />
          <img
            src={images[1] || "/placeholder-img.jpg"}
            alt="Croatia street photography"
            className="rounded-lg object-cover w-2/4 mx-auto absolute bottom-0 right-0 transform translate-y-1/2"
          />
        </div>

        {/* Right - Text content */}

        <div className="mt-24">
          <h2
            className={`text-2xl md:text-3xl font-medium mb-1 ${vollkorn.className} antialiased text-[#30586C]`}
          >
            {/* Meet Your Photographer */}
            {heading}
          </h2>
          <p
            className={`mb-6 ${courierPrime.className} text-[11px] uppercase font-semibold antialiased text-[#30586C]`}
          >
            {/* Abuja Photographer with steeze */}
            {subtitle}
          </p>
          <aside
            className={`${workSans.className} antialiased text-[#363636] font-medium`}
          >
            {paragraphs.map((el) => (
              <p key={el} className="mb-4 leading-relaxed">
                {el}
              </p>
            ))}
          </aside>
        </div>
      </div>

      {/* Why Choose Me */}
      <div className="mt-16">
        <h2
          className={`text-2xl md:text-3xl font-medium mb-1 ${vollkorn.className} antialiased text-[#30586C]`}
        >
          Why Choose Me:
        </h2>
        <div
          className={`${workSans.className} antialiased text-[#363636] font-medium`}
        >
          <ul className="space-y-3 leading-relaxed">
            {whyChooseMe.points?.map((el) => (
              <li key={el}>{el}</li>
            ))}
            {/* <li>
              Local Photographer in Abuja, Global Quality — I know the best
              times, locations, and lighting.
            </li>
            <li>Fluent in English and Italian for smooth communication.</li>
            <li>Relaxed and natural posing guidance.</li>
            <li>Fast delivery with professionally edited images.</li>
            <li>
              Over 700 happy couples, families, and travelers photographed!
            </li>
            <li>Available also for weddings, events, and commercial shoots.</li> */}
          </ul>
        </div>

        <p
          className={`${workSans.className} antialiased text-[#363636] font-medium my-6`}
        >
          {whyChooseMe.closingText}
          {/* Let’s make your Croatia photoshoot unforgettable. Tell me your travel
          dates, location, and the type of session you’re dreaming of and I’ll
          take care of the rest. */}
        </p>
      </div>
    </section>
  );
}
