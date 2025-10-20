import { LayoutTextFlip } from "@/components/ui/layout-text-flip";
import React from "react";
import { CarouselOrientation } from "./carousel";
import { InfiniteMovingCardsDemo } from "./floating-sponsors";
import { useHomeContentStore } from "@/store/home-data-store";

const HeroSection = () => {
  const homeContent = useHomeContentStore((state) => state.homeContent);

  const { title, animatedWords, carouselImages } = homeContent!.mobile.hero;
  return (
    <section className="w-full overflow-auto">
      {/* top side text */}
      <section className="space-y-1">
        {/* Framing timeless  */}
        {title.map((el) => (
          <p key={el} className="text-3xl font-semibold">{el}</p>
        ))}

        {/* <p className="text-3xl font-semibold"> stories</p> */}
        <p className="flex items-center mt-1u">
          <span className="text-3xl font-semibold mb-2y">In </span>
          {/* <ContainerTextFlip
            words={["Weddings", "Portraits", "Events", "Landscapes"]}
          /> */}
          <LayoutTextFlip
            text=""
            // words={["weddings", "portraits", "landscapes", "celebrations"]}
            words={animatedWords}
          />
        </p>
      </section>
      {/* image slider */}
      <section className="mt-10  ">
        <CarouselOrientation images={carouselImages} />
      </section>
      {/* sponsors */}
      <section className="">
        <InfiniteMovingCardsDemo />
      </section>
    </section>
  );
};

export default HeroSection;

// function Slider({
//   images = [
//     "https://picsum.photos/id/1015/1200/800",
//     "https://picsum.photos/id/1016/1200/800",
//     "https://picsum.photos/id/1025/1200/800",
//   ],
// }) {
//   return (
//     <div className="w-full flex items-center justify-center p-8y">
//       <div className="max-w-6xl w-full h-[40vh] overflow-x-auto flex snap-x gap-4 snap-mandatory scroll-smooth">
//         {images.map((src, i) => (
//           <div key={i} className="flex-none w-full h-full snap-center">
//             <img
//               src={src}
//               alt={`Slide ${i + 1}`}
//               className="w-full h-full object-cover block"
//             />
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// function PeekSlider({ images = [] }) {
//   const items = images.length
//     ? images
//     : [
//         "https://picsum.photos/id/1015/1200/800",
//         "https://picsum.photos/id/1016/1200/800",
//         "https://picsum.photos/id/1025/1200/800",
//         "https://picsum.photos/id/1035/1200/800",
//       ];

//   return (
//     <div className="w-full flex items-center justify-center p-6">
//       <div className="w-[full] max-w-6xl">
//         <div
//           className="overflow-x-auto flex gap-4 snap-x snap-mandatory scroll-smooth"
//           aria-roledescription="carousel"
//           tabIndex={0}
//         >
//           {items.map((src, i) => (
//             <figure
//               key={i}
//               className="flex-none min-w-[80%] last:min-w-full snap-start"
//               aria-hidden={false}
//             >
//               {/* If using next/image, replace with <Image /> and ensure sizing works */}
//               <img
//                 src={src}
//                 alt={`Slide ${i + 1}`}
//                 className="w-full h-64 md:h-[36vh] object-cover rounded-lg shadow"
//               />
//             </figure>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }
