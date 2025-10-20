"use client";
import { useHomeContentStore } from "@/store/home-data-store";
import Link from "next/link";
import { serialize } from "v8";

export default function CTA() {
  const homeContent = useHomeContentStore((state) => state.homeContent);
  const { heading, leftImage, rightImage, services } =
    homeContent?.desktop?.cta!;
  return (
    <div className="min-h-screen bg-[#e8e4dc] flex gap-10 items-center justify-center p-8">
      <div className="w-[90%] w-fully grid grid-cols-12  gap-5">
        {/* Left Image */}
        <div className="col-span-3 py-10">
          <img
            // src="https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=400&h=800&fit=crop"
            src={leftImage}
            alt="Couple sitting together"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Center Content */}
        <div className="col-span-6 bg-[#c7ceb0] p-16 flex flex-col justify-center">
          <h1 className="text-5xl w-[500px] mx-auto font-serif text-[#4a4a3d] mb-16 text-center leading-tight">
            {/* Croatia Photography
            <br />
            Services for Travelers */}
            {heading}
          </h1>

          <div className="space-y-10">
            {services.map((el) => (
              <div className="text-center">
                <h2 className="font-bold text-[#4a4a3d] mb-3">{el.title}</h2>
                <p className="text-[#4a4a3d] text-sm leading-relaxed">
                  {el.description}
                </p>
              </div>
            ))}
          </div>

          {/* Contact Button */}
          <div className="flex justify-center mt-12">
            <Link
              href={"/contact"}
              className="bg-[#c48563] text-white px-8 py-3 text-sm font-medium tracking-wide hover:bg-[#b57552] transition-colors"
            >
              CONTACT ME
            </Link>
          </div>
        </div>

        {/* Right Image */}
        <div className="col-span-3 py-10">
          <img
            // src="https://images.unsplash.com/photo-1519741497674-611481863552?w=400&h=800&fit=crop"
            src={rightImage}
            alt="Woman at sunset"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}
