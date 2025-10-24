"use client";
import React from "react";
import { Vollkorn, Courier_Prime, Work_Sans } from "next/font/google";
import { BackgroundRippleEffect } from "@/components/ui/background-ripple-effect";
import { useHomeData } from "@/context/home-data-context";
import { useHomeContentStore } from "@/store/home-data-store";
import { ImageThreeDCard } from "@/components/3d-image-card";
import { WobbleCard } from "@/components/ui/wobble-card";
import {
  ImageRevealCard,
  ImageRevealCardDescription,
  ImageRevealCardTitle,
} from "@/components/ui/image-reveal-card";
import FadeInDemo, { FadeIn } from "@/components/ui/fade-in-animation";
import ImageLoader from "@/components/image-loader";

const vollkorn = Vollkorn({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-vollkorn",
});

const courierPrime = Courier_Prime({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-courier-prime",
});

const workSans = Work_Sans({
  subsets: ["latin"],
  variable: "--font-work-sans",
});

type HeroProps = {
  leftImg?: string;
  centerImg?: string;
  rightImg?: string;
};

export default function HeroSectionDesktop({
  leftImg = "/placeholder-img.jpg",
  centerImg = "/placeholder-img.jpg",
  rightImg = "/placeholder-img.jpg",
}: HeroProps) {
  const homeContent = useHomeContentStore((state) => state.homeContent);

  const { centerImage, description, heading, leftImage, rightImage } =
    homeContent?.desktop?.hero!;

  return (
    <section className="relativey">
      <section className="bg-[#ede4d2] text-[#1f2b33] pb-16">
        <div className="w-[90%] mx-auto px-6 md:px-10 lg:px-16y pt-12 lg:pt-20">
          {/* Images row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            {/* left small image */}
            <div className="order-1 lg:order-none flex justify-center lg:justify-start">
              <FadeIn delay={0.6}>
                <div className="w-[260px] lg:w-[280px] image-con">
                  <img
                    src={leftImage}
                    alt="left image"
                    className="w-full object-cover rounded-sm shadow-md"
                    style={{ aspectRatio: "2/3" }}
                  />
                </div>
              </FadeIn>
            </div>

            <section className="order-2  lg:order-none flex justify-center">
              <FadeIn delay={0.8} duration={0.5}>
                <ImageRevealCard
                  baseImage={centerImage}
                  revealImage={leftImage}
                  height={600}
                ></ImageRevealCard>
              </FadeIn>
            </section>

            {/* right small image */}
            <div className="order-3 lg:order-none flex justify-center lg:justify-end">
              <FadeIn delay={0.6}>
                <div className="w-[260px] lg:w-[280px] image-con">
                  <img
                    src={rightImage}
                    alt="right image"
                    className="w-full object-cover rounded-sm shadow-md"
                    style={{ aspectRatio: "2/3" }}
                  />
                </div>
              </FadeIn>
            </div>
          </div>

          {/* Heading & text */}
          <div className="mt-12 lg:mt-16 max-w-4xl">
            <FadeIn delay={0.4}>
              <h1
                className={`text-3xl md:text-4xl leading-[41px] font-medium font-serif text-[#234a56] mb-6 ${vollkorn.className} antialiased`}
              >
                {heading}
              </h1>
            </FadeIn>
            <FadeIn delay={0.6}>
              <p
                className={`text-base text-[#363636] leading-[27px] max-w-3xl ${workSans.className} antialiased font-medium`}
              >
                {description}
              </p>
            </FadeIn>
          </div>
        </div>
      </section>
      {/* <BackgroundRippleEffect /> */}
    </section>
  );
}
