"use client";
import { useHomeContentStore } from "@/store/home-data-store";
import Image from "next/image";
import React from "react";
import ExpandableImage from "./expandable-img";

const Photogrid = () => {
  const homeContent = useHomeContentStore((state) => state.homeContent);

  const { images } = homeContent!.mobile.photoGrid;
  return (
    <section className="columns-2 gap-4 p-8 [column-fill:_balance]">
      <ExpandableImage src={images[0]}>
        <div className="h-80 w-full bg-green-200 rounded-xl mb-4y overflow-hidden">
          <Image
            src={images[0]}
            alt="photo-grid"
            width={160}
            height={160}
            className="w-full h-full object-cover"
          />
        </div>
      </ExpandableImage>
      <ExpandableImage src={images[1]}>
        <div className="h-20 bg-gray-200 rounded-xl mb-4 overflow-hidden">
          <Image
            src={images[1]}
            alt="photo-grid"
            width={160}
            height={160}
            className="w-full h-[20] object-cover"
          />
        </div>
      </ExpandableImage>
      <ExpandableImage src={images[2]}>
        <div className="h-40 bg-gray-200 rounded-xl mb-4 overflow-hidden">
          <Image
            src={images[2]}
            alt="photo-grid"
            width={160}
            height={160}
            className="w-full h-full object-cover"
          />
        </div>
      </ExpandableImage>
      <ExpandableImage src={images[3]}>
        <div className="h-40 bg-gray-200 rounded-xl mb-4 overflow-hidden">
          <Image
            src={images[3]}
            alt="photo-grid"
            width={160}
            height={160}
            className="w-full h-full object-cover"
          />
        </div>
      </ExpandableImage>
      <ExpandableImage src={images[4]}>
        <div className="h-40 bg-gray-200 rounded-xl mb-4 overflow-hidden">
          <Image
            src={images[4]}
            alt="photo-grid"
            width={160}
            height={160}
            className="w-full h-full object-cover"
          />
        </div>
      </ExpandableImage>
      <ExpandableImage src={images[5]}>
        <div className="h-40 bg-gray-200 rounded-xl mb-4 overflow-hidden">
          <Image
            src={images[5]}
            alt="photo-grid"
            width={160}
            height={160}
            className="w-full h-full object-cover"
          />
        </div>
      </ExpandableImage>

      {/* <!-- Alternating (staggered heights) --> */}
      <ExpandableImage src={images[6]}>
        <div className="h-80 bg-gray-300 rounded-xl mb-4 overflow-hidden">
          <Image
            src={images[6]}
            alt="photo-grid"
            width={160}
            height={160}
            className="w-full h-full object-cover"
          />
        </div>
      </ExpandableImage>
      <ExpandableImage src={images[7]}>
        <div className="h-40 bg-gray-200 rounded-xl mb-4 overflow-hidden">
          <Image
            src={images[7]}
            alt="photo-grid"
            width={160}
            height={160}
            className="w-full h-full object-cover"
          />
        </div>
      </ExpandableImage>
      <ExpandableImage src={images[8]}>
        <div className="h-40 bg-gray-200 rounded-xl mb-4 overflow-hidden">
          <Image
            src={images[8]}
            alt="photo-grid"
            width={160}
            height={160}
            className="w-full h-full object-cover"
          />
        </div>
      </ExpandableImage>
      <ExpandableImage src={images[9]}>
        <div className="h-80 bg-gray-300 rounded-xl mb-4 overflow-hidden">
          <Image
            src={images[9]}
            alt="photo-grid"
            width={160}
            height={160}
            className="w-full h-full object-cover"
          />
        </div>
      </ExpandableImage>
      <ExpandableImage src={images[10]}>
        <div className="h-80 bg-gray-300 rounded-xl mb-4 overflow-hidden">
          <Image
            src={images[10]}
            alt="photo-grid"
            width={160}
            height={160}
            className="w-full h-full object-cover"
          />
        </div>
      </ExpandableImage>
      <ExpandableImage src={images[11]}>
        <div className="h-40 bg-gray-200 rounded-xl mb-4 overflow-hidden">
          <Image
            src={images[11]}
            alt="photo-grid"
            width={160}
            height={160}
            className="w-full h-full object-cover"
          />
        </div>
      </ExpandableImage>
    </section>
  );
};

export default Photogrid;
