"use client";
import React from "react";
import ContactForm from "./contact-form";
import { Courier_Prime, Vollkorn, Work_Sans } from "next/font/google";
import { useAboutContentStore } from "@/store/about-data-store";
import { useContactContentStore } from "@/store/contact-data-store";

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

export default function ContactInfo() {
  const contactContent = useContactContentStore(
    (state) => state.contactContent
  );

  if (!contactContent) {
    return <p>Getting data...</p>;
  }

  const { image, heading, paragraphs } = contactContent.mobile;

  return (
    <section className="bg-[#ede4d2] text-[#1f1f1f] py-16 px-6 md:px-16 lg:px-32">
      <div className="mb-8">
        <img
          src={image || "/placeholder-img.jpg"}
          alt="Contact-me-image"
          className="rounded-md w-full h-56 md:h-72 object-cover"
        />
      </div>

      <h2
        className={`text-2xl md:text-3xl font-medium mb-1 ${vollkorn.className} antialiased text-[#30586C]`}
      >
        {heading}
      </h2>

      <section
        className={`${workSans.className} antialiased text-[#363636] font-medium`}
      >
        <div className="text-base leading-relaxed space-y-4 mb-10 max-w-2xl">
          {paragraphs.map((el) => (
            <p key={el}>{el}</p>
          ))}
        </div>
      </section>

      <ContactForm />
    </section>
  );
}
