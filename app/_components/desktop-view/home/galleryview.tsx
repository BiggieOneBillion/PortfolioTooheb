import { BlurOverlay } from "@/components/ui/blur-overlay";
import { FadeInView } from "@/components/ui/fade-in-when-in-view";
import { FocusCards } from "@/components/ui/focus-cards";
import { cn } from "@/lib/utils";
import { useHomeContentStore } from "@/store/home-data-store";
import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

export const Card = React.memo(
  ({
    card,
    index,
    hovered,
    setHovered,
  }: {
    card: any;
    index: number;
    hovered: number | null;
    setHovered: React.Dispatch<React.SetStateAction<number | null>>;
  }) => (
    <div
      onMouseEnter={() => setHovered(index)}
      onMouseLeave={() => setHovered(null)}
      className={cn(
        "rounded-lg relative bg-gray-100 dark:bg-neutral-900 overflow-hidden h-full w-full transition-all duration-300 ease-out",
        hovered !== null && hovered !== index && "blur-sm scale-[0.98]"
      )}
    >
      <img
        src={card.src}
        alt={card.title}
        className="object-cover absolute inset-0"
      />
      <div
        className={cn(
          "absolute inset-0 bg-black/50 flex items-end py-8 px-4 transition-opacity duration-300",
          hovered === index ? "opacity-100" : "opacity-0"
        )}
      >
        <div className="text-xl md:text-2xl font-medium bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-200">
          {card.title}
        </div>
      </div>
    </div>
  )
);

Card.displayName = "Card";

type Card = {
  title: string;
  src: string;
};

export default function GalleryView() {
  const homeContent = useHomeContentStore((state) => state.homeContent);
  const [hovered, setHovered] = useState<number | null>(null);

  const {
    desktop: {
      imageGallery: {
        image1,
        image2,
        image3,
        image4,
        image5,
        image6,
        image7,
        image8,
        image9,
      },
    },
  } = homeContent!;
  const images = [
    { src: image1, title: "" },
    { src: image2, title: "" },
    { src: image3, title: "" },
    { src: image4, title: "" },
    { src: image5, title: "" },
    { src: image6, title: "" },
    { src: image7, title: "" },
    { src: image8, title: "" },
    { src: image9, title: "" },
  ];

  return (
    <section className="bg-[#ede4d2] py-16 px-24">
      <div
        className="grid gap-4"
        style={{
          gridTemplateColumns: "repeat(3, 1fr)",
          gridAutoRows: "10px",
        }}
      >
        {images.map((card, index) => (
          <div
            key={uuidv4()}
            className="rounded-md overflow-hidden shadow-md hover:opacity-90 transition duration-300 relative"
            style={{
              gridRowEnd: `span ${Math.floor(Math.random() * 20) + 15}`,
            }}
          >
            <FadeInView
              key={uuidv4()}
              direction="up"
              distance={30}
              delay={index * 0.15}
              duration={0.6}
              threshold={0.5}
              className="h-full"
            >
              <div className="h-full overflow-hidden image-con">
              
                <img
                  src={card.src}
                  alt={`Photo ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            </FadeInView>
          </div>
        ))}
      </div>
    </section>
  );
}
