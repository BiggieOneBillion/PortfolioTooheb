import * as React from "react";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";

type CarouselProps = {
  images: string[];
};

export function CarouselOrientation({ images }: CarouselProps) {
  return (
    <Carousel
      opts={{
        align: "center",
        loop: true,
        slidesToScroll: 1,
      }}
      orientation="horizontal"
      className="w-full max-w-xsy bg-red-700y"
    >
      <CarouselContent className="-mt-1 h-[415px]">
        {images.map((img, index) => (
          <CarouselItem key={index} className="pt-1 w-full">
            <div className="p-1">
              <Card className="h-[400px]  bg-amber-600 p-0 rounded-2xl overflow-hidden">
                <Image
                  src={img}
                  width={400}
                  height={400}
                  alt="Carousel-images"
                  className="w-full h-full"
                />
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      {/* <CarouselPrevious />
      <CarouselNext /> */}
    </Carousel>
  );
}
