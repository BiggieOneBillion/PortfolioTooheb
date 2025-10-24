"use client";
import React, { useEffect, useRef, useState, memo } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export const ImageRevealCard = ({
  baseImage,
  revealImage,
  height = 400,
  children,
  className,
}: {
  baseImage: string;
  revealImage: string;
  height?: number;
  children?: React.ReactNode;
  className?: string;
}) => {
  const [widthPercentage, setWidthPercentage] = useState(0);
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [left, setLeft] = useState(0);
  const [localWidth, setLocalWidth] = useState(0);
  const [isMouseOver, setIsMouseOver] = useState(false);

  useEffect(() => {
    if (cardRef.current) {
      const { left, width: localWidth } =
        cardRef.current.getBoundingClientRect();
      setLeft(left);
      setLocalWidth(localWidth);
    }
  }, []);

  function mouseMoveHandler(event: any) {
    event.preventDefault();

    const { clientX } = event;
    if (cardRef.current) {
      const relativeX = clientX - left;
      setWidthPercentage((relativeX / localWidth) * 100);
    }
  }

  function mouseLeaveHandler() {
    setIsMouseOver(false);
    setWidthPercentage(0);
  }

  function mouseEnterHandler() {
    setIsMouseOver(true);
  }

  function touchMoveHandler(event: React.TouchEvent<HTMLDivElement>) {
    event.preventDefault();
    const clientX = event.touches[0]!.clientX;
    if (cardRef.current) {
      const relativeX = clientX - left;
      setWidthPercentage((relativeX / localWidth) * 100);
    }
  }

  const rotateDeg = (widthPercentage - 50) * 0.1;

  return (
    <div
      onMouseEnter={mouseEnterHandler}
      onMouseLeave={mouseLeaveHandler}
      onMouseMove={mouseMoveHandler}
      onTouchStart={mouseEnterHandler}
      onTouchEnd={mouseLeaveHandler}
      onTouchMove={touchMoveHandler}
      ref={cardRef}
      className={cn(
        "bg-[#1d1c20]y border border-black/[0.08] w-[40rem] rounded-lg p-8y relative overflow-hidden",
        className
      )}
    >
      {children}

      <div
        className="relative flex items-center overflow-hidden"
        style={{ height: `${height}px` }}
      >
        {/* Reveal Image Layer */}
        <motion.div
          style={{
            width: "100%",
            height: "100%",
          }}
          animate={
            isMouseOver
              ? {
                  opacity: widthPercentage > 0 ? 1 : 0,
                  clipPath: `inset(0 ${100 - widthPercentage}% 0 0)`,
                }
              : {
                  clipPath: `inset(0 ${100 - widthPercentage}% 0 0)`,
                }
          }
          transition={isMouseOver ? { duration: 0 } : { duration: 0.4 }}
          className="absolute bg-[#1d1c20] z-20 will-change-transform"
        >
          <img
            src={revealImage}
            alt="Reveal"
            className="w-full h-full object-cover"
            style={
              {
                //   filter: "drop-shadow(4px 4px 15px rgba(0,0,0,0.5))y",
              }
            }
          />
        </motion.div>

        {/* Divider Line */}
        {/* <motion.div
          animate={{
            left: `${widthPercentage}%`,
            rotate: `${rotateDeg}deg`,
            opacity: widthPercentage > 0 ? 1 : 0,
          }}
          transition={isMouseOver ? { duration: 0 } : { duration: 0.4 }}
          className="w-[8px] bg-gradient-to-b from-transparent via-neutral-800 to-transparent absolute z-50 will-change-transform"
          style={{ height: `${height}px` }}
        ></motion.div> */}

        {/* Base Image Layer */}
        <div className="overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,white,transparent)]y w-full h-full">
          <img
            src={baseImage}
            alt="Base"
            className="w-full h-full object-cover opacity-100"
          />
          {/* <MemoizedStars /> */}
        </div>
      </div>
    </div>
  );
};

export const ImageRevealCardTitle = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <h2 className={cn("text-white text-lg mb-2", className)}>{children}</h2>
  );
};

export const ImageRevealCardDescription = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return <p className={cn("text-[#a9a9a9] text-sm", className)}>{children}</p>;
};

const Stars = () => {
  const randomMove = () => Math.random() * 4 - 2;
  const randomOpacity = () => Math.random();
  const random = () => Math.random();
  return (
    <div className="absolute inset-0">
      {[...Array(80)].map((_, i) => (
        <motion.span
          key={`star-${i}`}
          animate={{
            top: `calc(${random() * 100}% + ${randomMove()}px)`,
            left: `calc(${random() * 100}% + ${randomMove()}px)`,
            opacity: randomOpacity(),
            scale: [1, 1.2, 0],
          }}
          transition={{
            duration: random() * 10 + 20,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            position: "absolute",
            top: `${random() * 100}%`,
            left: `${random() * 100}%`,
            width: `2px`,
            height: `2px`,
            backgroundColor: "white",
            borderRadius: "50%",
            zIndex: 1,
          }}
          className="inline-block"
        ></motion.span>
      ))}
    </div>
  );
};

export const MemoizedStars = memo(Stars);

// Example Usage Component
export default function ImageRevealDemo() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <ImageRevealCard
        baseImage="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80"
        revealImage="https://images.unsplash.com/photo-1511593358241-7eea1f3c84e5?w=800&q=80"
        height={500}
      >
        <ImageRevealCardTitle>Mountain Landscapes</ImageRevealCardTitle>
        <ImageRevealCardDescription>
          Hover or drag to reveal the hidden image
        </ImageRevealCardDescription>
      </ImageRevealCard>
    </div>
  );
}
