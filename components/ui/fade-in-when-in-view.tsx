"use client";
import React from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export const FadeInView = ({
  children,
  direction = "up",
  distance = 10,
  duration = 0.5,
  delay = 0,
  threshold = 0.3,
  className,
}: {
  children: React.ReactNode;
  direction?: "up" | "down" | "left" | "right";
  distance?: number;
  duration?: number;
  delay?: number;
  threshold?: number;
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
      whileInView={{
        opacity: 1,
        x: 0,
        y: 0,
      }}
      viewport={{ once: true, amount: threshold }}
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
export default function FadeInViewDemo() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black">
      {/* Hero Section */}
      <div className="h-screen flex items-center justify-center">
        <FadeInView>
          <h1 className="text-6xl font-bold text-white text-center">
            Scroll Down to See Magic ✨
          </h1>
        </FadeInView>
      </div>

      {/* Content Sections */}
      <div className="max-w-4xl mx-auto px-8 py-20 space-y-32">
        
        {/* Section 1 */}
        <FadeInView direction="up" distance={50} duration={0.8}>
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-12 border border-white/20">
            <h2 className="text-4xl font-bold text-white mb-4">
              Section One
            </h2>
            <p className="text-gray-300 text-lg leading-relaxed">
              This content will fade in from the bottom when 30% of it enters the viewport.
              The animation only happens once - no repeated animations on scroll.
            </p>
          </div>
        </FadeInView>

        {/* Section 2 - From Left */}
        <FadeInView direction="left" distance={80} duration={1}>
          <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-lg rounded-2xl p-12 border border-purple-500/30">
            <h2 className="text-4xl font-bold text-white mb-4">
              Section Two
            </h2>
            <p className="text-gray-300 text-lg leading-relaxed">
              This one slides in from the left with a longer distance and slower animation.
              Perfect for creating engaging scroll experiences.
            </p>
          </div>
        </FadeInView>

        {/* Section 3 - From Right */}
        <FadeInView direction="right" distance={80} duration={1} delay={0.2}>
          <div className="bg-gradient-to-l from-blue-500/20 to-cyan-500/20 backdrop-blur-lg rounded-2xl p-12 border border-blue-500/30">
            <h2 className="text-4xl font-bold text-white mb-4">
              Section Three
            </h2>
            <p className="text-gray-300 text-lg leading-relaxed">
              Coming from the right with a slight delay. You can adjust the threshold 
              to control when the animation triggers (default is 30% visible).
            </p>
          </div>
        </FadeInView>

        {/* Cards Grid */}
        <div>
          <FadeInView direction="down" distance={30}>
            <h2 className="text-4xl font-bold text-white mb-8 text-center">
              Feature Cards
            </h2>
          </FadeInView>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            {[1, 2, 3].map((item, index) => (
              <FadeInView
                key={item}
                direction="up"
                distance={40}
                delay={index * 0.15}
                duration={0.6}
                threshold={0.5}
              >
                <div className="bg-white/5 backdrop-blur rounded-xl p-8 border border-white/10 hover:border-white/30 transition-colors">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg mb-4 flex items-center justify-center">
                    <span className="text-white text-2xl font-bold">{item}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    Feature {item}
                  </h3>
                  <p className="text-gray-400">
                    Each card animates independently when it enters the viewport
                  </p>
                </div>
              </FadeInView>
            ))}
          </div>
        </div>

        {/* Final Section with custom threshold */}
        <FadeInView direction="up" distance={60} duration={1.2} threshold={0.8}>
          <div className="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 backdrop-blur-lg rounded-2xl p-12 border border-yellow-500/30 text-center">
            <h2 className="text-4xl font-bold text-white mb-4">
              Custom Threshold
            </h2>
            <p className="text-gray-300 text-lg leading-relaxed">
              This section needs 80% visibility before animating. Try adjusting the 
              threshold prop to control when animations trigger!
            </p>
          </div>
        </FadeInView>

        {/* Spacer for scroll */}
        <div className="h-screen"></div>
      </div>
    </div>
  );
}