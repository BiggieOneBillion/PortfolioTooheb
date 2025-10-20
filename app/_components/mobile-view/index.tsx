import React from "react";
import Navbar from "./shared-ui/mobile-navbar";
import HeroSection from "./home/herosection";
import { Work_Sans } from "next/font/google";
import { services } from "./home/data/services-data";

const workSans = Work_Sans({
  subsets: ["latin"],
  variable: "--font-work-sans",
});

const MobileView = () => {
  const date = new Date().getFullYear();
  return (
    <main className="h-full">
      {/* Nav and Herosection */}
      <section className="h-[200hv] flex flex-col justify-between">
        {/* conatiner for both the navbar and herosection */}
        <Navbar />
        <section className="px-6 mt-10 ">
          <HeroSection />
        </section>
      </section>
      {/* mid section */}
      <section className="h-full mx-4 mt-10 space-y-10">
        {/* description */}
        <div className="space-y-5">
          <h3 className="text-2xl font-semibold text-[#31576c]">
            Your moments. My lens. Pure art. Capture Your Best Moments
          </h3>
          <p
            className={`text-lg ${workSans.className} antialiased text-[#363636] font-medium`}
          >
            Vacation, engagement, fashion or wedding, your story deserves
            beautiful photos. I'm a professional photographer in Abuja offering
            unforgettable photoshoots all over the country. Book your
            photographer today.
          </p>
        </div>
        {/* image */}
        <div className="grid grid-cols-2 gap-5 h-[200px]">
          <div className="w-full bg-black h-full"></div>
          <div className="w-full bg-red-400 h-full"></div>
        </div>
      </section>
      {/* cta */}
      <section className="bg-[#c7ceb0] py-10 space-y-10 mt-3 mx-4 px-10 mb-10">
        <header className="text-center text-3xl font-medium">
          Abuja Finnest <br /> Photographer At Your Service
        </header>
        <ul className="space-y-10">
          {services.map((el) => (
            <li key={el.description} className="space-y-3 text-center">
              <h3 className="font-semibold">{el.title}</h3>
              <p className="">{el.description}</p>
            </li>
          ))}
        </ul>
      </section>
      {/* photogrid */}
      <section className="columns-2 gap-4 p-8 [column-fill:_balance]">
        {/* <!-- Uniform items --> */}
        <div className="h-40 bg-gray-200 rounded-xl mb-4"></div>
        <div className="h-40 bg-gray-200 rounded-xl mb-4"></div>
        <div className="h-40 bg-gray-200 rounded-xl mb-4"></div>
        <div className="h-40 bg-gray-200 rounded-xl mb-4"></div>
        <div className="h-40 bg-gray-200 rounded-xl mb-4"></div>
        <div className="h-40 bg-gray-200 rounded-xl mb-4"></div>

        {/* <!-- Alternating (staggered heights) --> */}
        <div className="h-80 bg-gray-300 rounded-xl mb-4"></div>
        <div className="h-40 bg-gray-200 rounded-xl mb-4"></div>
        <div className="h-40 bg-gray-200 rounded-xl mb-4"></div>
        <div className="h-80 bg-gray-300 rounded-xl mb-4"></div>
        <div className="h-80 bg-gray-300 rounded-xl mb-4"></div>
        <div className="h-40 bg-gray-200 rounded-xl mb-4"></div>
      </section>
      {/* footer */}
      <footer className="h-20 text-black mt-10">
        <p className="font-medium text-center text-sm flex flex-col justify-center gap-4">
          <span>&copy; {date} Abuja Portrait House</span>
          <span className="text-black/50">All rights reserved.</span>
        </p>
      </footer>
    </main>
  );
};

export default MobileView;
