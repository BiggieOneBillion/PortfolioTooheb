"use client";

import { FadeIn } from "@/components/ui/fade-in-animation";
import { FadeInView } from "@/components/ui/fade-in-when-in-view";
import { useAboutContentStore } from "@/store/about-data-store";
import { Courier_Prime, Vollkorn, Work_Sans } from "next/font/google";
import { v4 as uuidv4 } from "uuid";

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

  if (aboutContent == null) {
    return <p>Loading....</p>;
  }

  const { desktop } = aboutContent!;

  const { heading, images, paragraphs, subtitle, whyChooseMe } = desktop!;
  return (
    <div className="min-h-screen bg-[#ede4d2]">
      <div className="w-[90%] mx-auto grid grid-cols-2 gap-0">
        {/* Left Content Column */}
        <div className="py-20 px-16">
          <FadeIn>
            <h1
              className={`text-5xl font-serif text-[#4a6b7c] mb-4 ${vollkorn.className} antialiased text-[#30586C]`}
            >
              {/* Meet Your Photographer */}
              {heading}
            </h1>
          </FadeIn>
          <FadeIn>
            <p
              className={`text-[#4a6b7c] text-xs tracking-widest mb-16 uppercase ${courierPrime.className} antialiased text-[#30586C]`}
            >
              {/* Croatia Family Engagment and Wedding Photographer */}
              {subtitle}
            </p>
          </FadeIn>
          <div
            className={`space-y-6 ${workSans.className} antialiased text-[#363636] font-medium`}
          >
            {paragraphs.map((el, i) => (
              <FadeInView
                key={uuidv4()}
                direction="up"
                distance={30}
                delay={i * 0.15}
                duration={0.6}
                threshold={0.5}
              >
                <p key={el} className="leading-relaxed">
                  {el}
                </p>
              </FadeInView>
            ))}
          </div>
          <FadeIn delay={0.6}>
            <h2
              className={`text-4xl mt-16 mb-8 font-serif text-[#4a6b7c] ${vollkorn.className} antialiased text-[#30586C]`}
            >
              Why Choose Me:
            </h2>
          </FadeIn>
          <FadeIn delay={0.6}>
            <div
              className={`space-y-6 ${workSans.className} antialiased text-[#363636] font-medium`}
            >
              <p className="text-[#3d3d3d] leading-relaxed">
                {whyChooseMe.text}
              </p>
            </div>
          </FadeIn>
        </div>

        {/* Right Image Column */}
        <div className="relative">
          <div className="w-[60%] h-[80%] image-con overflow-hidden">
            <img
              src={images[0]}
              alt="Croatian architecture with bell tower"
              className="w-full h-full object-cover py-20"
            />
          </div>
          <div className="w-[60%] absolute bottom-0 right-0 z-10 h-[70%] object-cover py-20 image-con overflow-hidden">
            <img
              src={images[1]}
              alt="Croatian architecture with bell tower"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
