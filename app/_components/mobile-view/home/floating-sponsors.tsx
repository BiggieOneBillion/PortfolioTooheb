"use client";

import React, { useEffect, useState } from "react";
import { InfiniteMovingCards } from "../../../../components/ui/infinite-moving-cards";

export function InfiniteMovingCardsDemo() {
  return (
    <div className="h-[10rem] rounded-mdy flex flex-col antialiased bg-inherit dark:bg-black dark:bg-grid-white/[0.05] items-center justify-center relative overflow-hidden">
      {/* <p className="w-full text-2xl font-bold text-[#ded4c2] mb-2">Reviews</p> */}
      <InfiniteMovingCards items={testimonials} direction="left" speed="slow" />
    </div>
  );
}

const testimonials = [
  {
    name: "Charles Dickens",
    title: "A Tale of Two Cities",
    quote: "He is the best",
  },
  {
    name: "William Shakespeare",
    title: "Hamlet",
    quote: "So much experience, my pictures came out top notch",
  },
  {
    name: "Edgar Allan Poe",
    title: "A Dream Within a Dream",
    quote: "Professionality at it's peak",
  },
  {
    name: "Jane Austen",
    title: "Pride and Prejudice",
    quote: "We got more than we paid for, the best there is",
  },
  {
    name: "Herman Melville",
    title: "Moby-Dick",
    quote: "He is always on time, always on point, never lacks creativity",
  },
];
