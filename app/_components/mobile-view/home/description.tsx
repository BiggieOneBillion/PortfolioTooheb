import React from "react";
import { Work_Sans } from "next/font/google";
import { useHomeContentStore } from "@/store/home-data-store";
import Image from "next/image";
import { FadeInView } from "@/components/ui/fade-in-when-in-view";
import { FadeIn } from "@/components/ui/fade-in-animation";
import { v4 as uuidv4 } from "uuid";

const workSans = Work_Sans({
  subsets: ["latin"],
  variable: "--font-work-sans",
});

const Description = () => {
  const homeContent = useHomeContentStore((state) => state.homeContent);

  const { heading, text, images } = homeContent!.mobile.description;
  return (
    <FadeInView delay={0.4} duration={0.5}>
      <section className="h-full mx-4 mt-10 space-y-10">
        {/* description */}
        <div className="space-y-5">
          <FadeInView>
            <h3 className="text-xl font-semibold text-[#31576c]">{heading}</h3>
          </FadeInView>
          <FadeInView delay={0.6}>
            <p
              className={`text-lg ${workSans.className} antialiased text-[#363636] text-[15px]  font-medium leading-[27px]`}
            >
              {text}
            </p>
          </FadeInView>
        </div>
        {/* image */}
        <div className="grid grid-cols-2 gap-5 h-[200px]">
          {images.map((el, i) => (
            <FadeInView delay={i + 0.2} key={uuidv4()}>
              <div
                key={el}
                className="w-full h-full rounded-xl overflow-hidden"
              >
                <Image
                  src={el}
                  width={100}
                  height={100}
                  alt="images"
                  className="w-full h-full"
                />
              </div>
            </FadeInView>
          ))}
        </div>
      </section>
    </FadeInView>
  );
};

export default Description;
