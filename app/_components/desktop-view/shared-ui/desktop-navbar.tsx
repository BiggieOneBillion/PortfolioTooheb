"use client";

import { useState } from "react";
import { Vollkorn, Courier_Prime } from "next/font/google";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { Loader2, LogOut } from "lucide-react";

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

export default function DesktopNav() {
  const { session, isLoading, isAuthenticated, logout, isLoggingOut } =
      useAuth();
  return (
    <header className="bg-[#ede4d2]">
      <nav className="w-[90%] mx-auto px-6 md:px-10 lg:px-16y py-6 flex items-center justify-between relative z-[1000]">
        {/* Logo / Site title */}
        <div className={`flex items-center ${vollkorn.className} antialiased`}>
          <a
            href="/"
            className="text-[#234a56] font-medium tracking-wider text-lg md:text-xl"
          >
            <span className="block font-serif text-2xl md:text-3xl">
              BREAKPOINT
            </span>
            <span className="block text-sm md:text-base">PORTRAITS</span>
          </a>
        </div>

        {/* Desktop links */}
        <div
          className={`hidden md:flex items-center gap-8 text-sm uppercase text-[#30586C] ${courierPrime.className} antialiased font-semibold`}
        >
          <Link href="/" className="hover:underline">
            Home
          </Link>
          <Link href="about" className="hover:underline">
            About
          </Link>
          {/* <a href="#pricing" className="hover:underline">
            Info & Pricing
          </a> */}
          <Link href="contact" className="hover:underline">
            Contact
          </Link>
            {/* <Button
            variant="outline"
            onClick={logout}
            disabled={isLoggingOut}
            className="bg-white"
          >
            {isLoggingOut ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Logging out...
              </>
            ) : (
              <>
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </>
            )}
          </Button> */}
        </div>
      </nav>
    </header>
  );
}
