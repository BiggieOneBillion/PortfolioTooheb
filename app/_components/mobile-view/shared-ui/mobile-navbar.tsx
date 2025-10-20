"use client";
import { AlignEndVertical, ArrowUpRight, Menu, X } from "lucide-react";
import React, { useState } from "react";
import { InfiniteMovingCardsDemo } from "../home/floating-sponsors";

const MobileNavbar = () => {
  const [toggleMeun, setToggleMenu] = useState(false);
  const handleToggleMenu = () => setToggleMenu(!toggleMeun);

  const navList = [
    {
      name: "Home",
      href: "/",
    },
    {
      name: "About",
      href: "/about",
    },
    // {
    //   name: "Services",
    //   href: "/services",
    // },
    // {
    //   name: "Portfolio",
    //   href: "/portfolio",
    // },
    {
      name: "Contact",
      href: "/contact",
    },
  ];

  return (
    <>
      <nav className="h-[10vh] px-4 flex justify-between items-center border-b-zinc-300 border-b border">
        <AlignEndVertical />
        <span onClick={handleToggleMenu}>{!toggleMeun ? <Menu /> : <X />}</span>
      </nav>
      {toggleMeun && (
        <div
          className={`fixed w-full h-screen top-[-100%] bg-black/70 backdrop-blur-sm z-50 flex flex-col justify-betweeny  Mobilenavbar animate-navbar`}
        >
          <nav className="p-5 pb-0 flex justify-between items-center text-white">
            <AlignEndVertical />
            <span onClick={handleToggleMenu}>
              {!toggleMeun ? <Menu /> : <X />}
            </span>
          </nav>
          {/* top nav */}
          <ul className="flex flex-col gap-8 text-white text-4xl font-mediumy p-10 w-[70%]y h-full">
            {navList.map((nav, index) => (
              <li key={index} className=" ">
                <a href={nav.href} onClick={handleToggleMenu}>
                  {nav.name}
                </a>
              </li>
            ))}
          </ul>
          {/* start a project */}
          <section className="flex justify-between items-start p-4 text-white border-t border-gray-600 ">
            <p className="text-4xl font-mediumy"> Start a Project</p>
            <ArrowUpRight />
          </section>
          {/* <InfiniteMovingCardsDemo /> */}
        </div>
      )}
    </>
  );
};

export default MobileNavbar;
