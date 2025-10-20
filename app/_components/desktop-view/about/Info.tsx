"use client";

import { useAboutContentStore } from "@/store/about-data-store";
import { Courier_Prime, Vollkorn, Work_Sans } from "next/font/google";

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
          <h1
            className={`text-5xl font-serif text-[#4a6b7c] mb-4 ${vollkorn.className} antialiased text-[#30586C]`}
          >
            {/* Meet Your Photographer */}
            {heading}
          </h1>
          <p
            className={`text-[#4a6b7c] text-xs tracking-widest mb-16 uppercase ${courierPrime.className} antialiased text-[#30586C]`}
          >
            {/* Croatia Family Engagment and Wedding Photographer */}
            {subtitle}
          </p>
          <div
            className={`space-y-6 ${workSans.className} antialiased text-[#363636] font-medium`}
          >
            {paragraphs.map((el) => (
              <p key={el} className="leading-relaxed">
                {el}
              </p>
            ))}
            {/* <p className="leading-relaxed"> */}
            {/* Hi, I'm Mario – a passionate photographer with over 17 years of
              professional experience behind the lens. I've photographed
              everything from weddings and fashion to travel adventures and
              underwater worlds, but my greatest joy is capturing real, human
              moments—especially here in my beautiful home, Croatia. */}
            {/* </p> */}

            {/* <p className="leading-relaxed">
              When I'm not behind the camera, you'll probably find me
              kitesurfing, diving, sailing, or exploring the coastline by bike.
              I'm also a proud homebrewer and a firm believer that life is best
              enjoyed with good people, good stories, and a big smile (which I
              usually have on my face!).
            </p>

            <p className="leading-relaxed">
              My style is relaxed, natural, and storytelling-focused. I'll guide
              you gently during the session so you feel comfortable, while
              keeping things fun and easy—whether it's a couple's shoot on the
              beach, a surprise proposal, or a family session with kids running
              wild in the waves.
            </p>

            <p className="leading-relaxed">
              Let's create something beautiful together—and make your time in
              Croatia truly unforgettable.
            </p> */}
          </div>
          <h2
            className={`text-4xl mt-16 mb-8 font-serif text-[#4a6b7c] ${vollkorn.className} antialiased text-[#30586C]`}
          >
            Why Choose Me:
          </h2>

          <div
            className={`space-y-6 ${workSans.className} antialiased text-[#363636] font-medium`}
          >
            <p className="text-[#3d3d3d] leading-relaxed">
              {/* Local Photographer in Croatia, Global Quality */}
              {whyChooseMe.text}
            </p>
            {/* <p>
              I know the best locations, light, and timing to make your photos
              truly special. I use top-tier gear and techniques to ensure
              stunning, high-resolution images that stand the test of time.
            </p>
            <p>
              Personalized Experience Tailored to You Every session is custom
              designed to fit your style, preferences, and story. I take the
              time to get to know you and understand your vision, so we can
              create photos that truly reflect who you are.
            </p> */}
          </div>
        </div>

        {/* Right Image Column */}
        <div className="relative">
          <img
            // src="https://images.unsplash.com/photo-1583422409516-2895a77efded?w=800&h=1200&fit=crop"
            src={images[0]}
            alt="Croatian architecture with bell tower"
            className="w-[60%] h-[80%] object-cover py-20"
          />
          <img
            // src="https://images.unsplash.com/photo-1583422409516-2895a77efded?w=800&h=1200&fit=crop"
            src={images[1]}
            alt="Croatian architecture with bell tower"
            className="w-[60%] absolute bottom-0 right-0 z-10 h-[70%] object-cover py-20"
          />
        </div>
      </div>
    </div>
  );
}
