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
        {title.map((el) => (
          <p key={el} className="text-3xl font-semibold">
            {el}
          </p>
        ))}

        <p className="flex items-center mt-1u">
          <span className="text-3xl font-semibold mb-2y">In </span>

          <LayoutTextFlip text="" words={animatedWords} />
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

// export async function getStaticProps() {
//   // Call an external API endpoint to get posts
//   const res = await fetch("/data/home.json");
//   const homeContents = await res.json();

//   // By returning { props: { posts } }, the Blog component
//   // will receive `posts` as a prop at build time
//   return {
//     props: {
//       homeContents,
//     },
//   };
// }
