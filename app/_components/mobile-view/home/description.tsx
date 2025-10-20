import React from "react";
import { Work_Sans } from "next/font/google";
import { useHomeContentStore } from "@/store/home-data-store";
import Image from "next/image";

const workSans = Work_Sans({
  subsets: ["latin"],
  variable: "--font-work-sans",
});

const Description = () => {
  const homeContent = useHomeContentStore((state) => state.homeContent);

  const { heading, text, images } = homeContent!.mobile.description;
  return (
    <section className="h-full mx-4 mt-10 space-y-10">
      {/* description */}
      <div className="space-y-5">
        <h3 className="text-xl font-semibold text-[#31576c]">{heading}</h3>
        <p
          className={`text-lg ${workSans.className} antialiased text-[#363636] text-[15px]  font-medium leading-[27px]`}
        >
          {text}
        </p>
      </div>
      {/* image */}
      <div className="grid grid-cols-2 gap-5 h-[200px]">
        {images.map((el) => (
          <div className="w-full  h-full rounded-xl overflow-hidden">
            <Image
              src={el}
              width={100}
              height={100}
              alt="images"
              className="w-full h-full"
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Description;
