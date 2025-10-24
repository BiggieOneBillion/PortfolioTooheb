"use client";
import React from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export const FadeIn = ({
  children,
  direction = "up",
  distance = 10,
  duration = 0.5,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  direction?: "up" | "down" | "left" | "right";
  distance?: number;
  duration?: number;
  delay?: number;
  className?: string;
}) => {
  // Calculate initial position based on direction
  const getInitialPosition = () => {
    switch (direction) {
      case "up":
        return { y: distance, x: 0 };
      case "down":
        return { y: -distance, x: 0 };
      case "left":
        return { x: distance, y: 0 };
      case "right":
        return { x: -distance, y: 0 };
      default:
        return { y: distance, x: 0 };
    }
  };

  const initialPos = getInitialPosition();

  return (
    <motion.div
      initial={{
        opacity: 0,
        ...initialPos,
      }}
      animate={{
        opacity: 1,
        x: 0,
        y: 0,
      }}
      transition={{
        duration,
        delay,
        ease: "easeOut",
      }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
};

// Example Usage Component
export default function FadeInDemo() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black flex flex-col items-center justify-center p-8 gap-8">
      {/* Default fade in from bottom */}
      <FadeIn>
        <h1 className="text-5xl font-bold text-white">
          Welcome to Our Site
        </h1>
      </FadeIn>

      {/* Fade in from top with delay */}
      <FadeIn direction="down" delay={0.2}>
        <p className="text-xl text-gray-300 text-center max-w-2xl">
          This is a beautiful fade-in animation component that brings your content to life
        </p>
      </FadeIn>

      {/* Fade in from left with custom distance */}
      <FadeIn direction="left" distance={50} delay={0.4} duration={0.8}>
        <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6 border border-white/20">
          <h3 className="text-2xl font-semibold text-white mb-2">Feature One</h3>
          <p className="text-gray-300">Smooth animations with customizable options</p>
        </div>
      </FadeIn>

      {/* Fade in from right */}
      <FadeIn direction="right" distance={50} delay={0.6} duration={0.8}>
        <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6 border border-white/20">
          <h3 className="text-2xl font-semibold text-white mb-2">Feature Two</h3>
          <p className="text-gray-300">Easy to use and highly configurable</p>
        </div>
      </FadeIn>

      {/* Multiple elements with staggered delays */}
      <div className="flex gap-4 mt-8">
        {[1, 2, 3].map((item, index) => (
          <FadeIn
            key={item}
            direction="up"
            distance={20}
            delay={0.8 + index * 0.15}
            duration={0.5}
          >
            <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <span className="text-white text-2xl font-bold">{item}</span>
            </div>
          </FadeIn>
        ))}
      </div>

      {/* Button with slow animation */}
      <FadeIn direction="up" distance={15} delay={1.2} duration={1}>
        <button className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-full hover:scale-105 transition-transform">
          Get Started
        </button>
      </FadeIn>
    </div>
  );
}