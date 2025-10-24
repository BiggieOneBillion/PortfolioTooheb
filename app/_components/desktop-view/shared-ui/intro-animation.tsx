import React, { useEffect, useState } from "react";

const InfoAnimation = () => {
  const [progress, setProgress] = useState(0); // 0 --> 100
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const duration = 5000; // 5 seconds
    const updateInterval = 50; // Update every 50ms
    const increment = (100 / duration) * updateInterval;

    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + increment;
        if (next >= 100) {
          clearInterval(interval);
          // Hide component after animation completes
          setTimeout(() => setIsVisible(false), 100);
          return 100;
        }
        return next;
      });
    }, updateInterval);

    return () => clearInterval(interval);
  }, []);

  const displayProgress = Math.round(100 - progress);
  const blurAmount = 100 - progress;
  const barWidth = 100 - progress;

  if (!isVisible) return null;

  return (
    <div
      className="fixed z-[1000] top-0 bg-white/20 left-0 w-screen h-screen flex flex-col justify-between items-start"
      style={{
        backdropFilter: `blur(${blurAmount}px)`,
        WebkitBackdropFilter: `blur(${blurAmount}px)`,
      }}
    >
      <div></div>

      <div className="w-full flex justify-center items-center">
        <p className="text-black/50 font-extrabold text-[100px] font-mono">
          {displayProgress}
        </p>
      </div>

      {/* slider */}
      <section className="flex justify-end w-full">
        <div
          className="bg-blue-500 z-[1500] h-[20px] origin-right"
          style={{ 
            width: `${barWidth}%`,
            transition: 'width 50ms linear'
          }}
        ></div>
      </section>
    </div>
  );
};

export default InfoAnimation;