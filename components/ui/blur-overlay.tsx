"use client";
import React, { useEffect, useState, useRef } from "react";

export const BlurOverlay = ({
  duration = 0.2,
  blurAmount = 10,
  threshold = 0.3,
  children,
}: {
  duration?: number;
  blurAmount?: number;
  threshold?: number;
  children: React.ReactNode;
}) => {
  const [isBlurred, setIsBlurred] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Remove blur after duration
          setTimeout(() => {
            setIsBlurred(false);
          }, duration * 1000);
          // Disconnect observer after first trigger
          observer.disconnect();
        }
      },
      {
        threshold: threshold,
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [duration, threshold]);

  return (
    <div ref={ref} className="relative">
      {isBlurred && isVisible && (
        <div
          className="absolute inset-0 z-10 bg-transparent pointer-events-none h-full"
          style={{
            backdropFilter: `blur(${blurAmount}px)`,
            WebkitBackdropFilter: `blur(${blurAmount}px)`,
            transition: `backdrop-filter ${duration}s ease-out, opacity ${duration}s ease-out`,
            opacity: isBlurred ? 1 : 0,
          }}
        />
      )}
      <div className={isVisible ? "relative z-0" : "relative z-0"}>
        {children}
      </div>
    </div>
  );
};

// Example Usage Component
export default function BlurOverlayDemo() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* Hero Section */}
      <div className="h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-white mb-4">
            Scroll Down to See Magic ✨
          </h1>
          <p className="text-xl text-gray-300">
            Elements will be blurred until 30% enters the viewport
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-8 py-20 space-y-32">
        {/* Section 1 - Default threshold (30%) */}
        <BlurOverlay duration={0.5} blurAmount={15}>
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-12 border border-white/20">
            <h2 className="text-4xl font-bold text-white mb-4">
              Section One (30% threshold)
            </h2>
            <p className="text-gray-300 text-lg leading-relaxed">
              This content starts blurred and clears after 0.5 seconds when 30% of it
              enters the viewport. The blur effect only happens once.
            </p>
          </div>
        </BlurOverlay>

        {/* Section 2 - 50% threshold */}
        <BlurOverlay duration={1} blurAmount={20} threshold={0.5}>
          <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-lg rounded-2xl p-12 border border-purple-500/30">
            <h2 className="text-4xl font-bold text-white mb-4">
              Section Two (50% threshold)
            </h2>
            <p className="text-gray-300 text-lg leading-relaxed">
              This section needs 50% visibility before the blur clears. It has a stronger
              blur (20px) and takes 1 second to clear.
            </p>
          </div>
        </BlurOverlay>

        {/* Section 3 - 70% threshold */}
        <BlurOverlay duration={0.3} blurAmount={25} threshold={0.7}>
          <div className="bg-gradient-to-l from-blue-500/20 to-cyan-500/20 backdrop-blur-lg rounded-2xl p-12 border border-blue-500/30">
            <h2 className="text-4xl font-bold text-white mb-4">
              Section Three (70% threshold)
            </h2>
            <p className="text-gray-300 text-lg leading-relaxed">
              This one requires 70% visibility with an intense 25px blur that clears
              quickly in 0.3 seconds. Perfect for dramatic reveals!
            </p>
          </div>
        </BlurOverlay>

        {/* Cards Grid */}
        <div className="space-y-8">
          <h2 className="text-4xl font-bold text-white text-center">
            Individual Card Blurs
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((item) => (
              <BlurOverlay
                key={item}
                duration={0.4}
                blurAmount={12}
                threshold={0.4}
              >
                <div className="bg-white/5 backdrop-blur rounded-xl p-8 border border-white/10 hover:border-white/30 transition-colors">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg mb-4 flex items-center justify-center">
                    <span className="text-white text-2xl font-bold">{item}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    Card {item}
                  </h3>
                  <p className="text-gray-400">
                    Each card blurs independently when it enters view
                  </p>
                </div>
              </BlurOverlay>
            ))}
          </div>
        </div>

        {/* Image Example */}
        <BlurOverlay duration={0.8} blurAmount={30} threshold={0.6}>
          <div className="rounded-2xl overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80"
              alt="Mountain landscape"
              className="w-full h-96 object-cover"
            />
            <div className="bg-white/10 backdrop-blur-lg p-6 border-t border-white/20">
              <h3 className="text-2xl font-bold text-white mb-2">
                Image with Blur Reveal
              </h3>
              <p className="text-gray-300">
                Images can be dramatically revealed with a blur-to-clear transition
              </p>
            </div>
          </div>
        </BlurOverlay>

        {/* Usage Guide */}
        <div className="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 backdrop-blur-lg rounded-2xl p-12 border border-yellow-500/30">
          <h2 className="text-4xl font-bold text-white mb-6 text-center">
            Usage Examples
          </h2>
          <div className="space-y-4 text-gray-300 font-mono text-sm">
            <div className="bg-black/30 rounded-lg p-4">
              <code>{'<BlurOverlay>'}</code><br/>
              <code>{'  <YourContent />'}</code><br/>
              <code>{'</BlurOverlay>'}</code>
            </div>
            <div className="bg-black/30 rounded-lg p-4">
              <code>{'<BlurOverlay duration={1} blurAmount={20}>'}</code><br/>
              <code>{'  <YourContent />'}</code><br/>
              <code>{'</BlurOverlay>'}</code>
            </div>
            <div className="bg-black/30 rounded-lg p-4">
              <code>{'<BlurOverlay threshold={0.5} duration={0.5}>'}</code><br/>
              <code>{'  <YourContent />'}</code><br/>
              <code>{'</BlurOverlay>'}</code>
            </div>
          </div>
        </div>

        {/* Spacer */}
        <div className="h-screen"></div>
      </div>
    </div>
  );
}