"use client";
import { useHomeContentStore } from "@/store/home-data-store";
import Image from "next/image";
import React from "react";

const Photogrid = () => {
  const homeContent = useHomeContentStore((state) => state.homeContent);

  const { images } = homeContent!.mobile.photoGrid;
  return (
    <section className="columns-2 gap-4 p-8 [column-fill:_balance]">
      {/* <!-- Uniform items --> */}
      <div className="h-80 bg-gray-200 rounded-xl mb-4 overflow-hidden">
        <Image
          src={images[0]}
          alt="photo-grid"
          width={160}
          height={160}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="h-20 bg-gray-200 rounded-xl mb-4 overflow-hidden">
        <Image
          src={images[1]}
          alt="photo-grid"
          width={160}
          height={160}
          className="w-full h-[20] object-cover"
        />
      </div>
      <div className="h-40 bg-gray-200 rounded-xl mb-4 overflow-hidden">
        <Image
          src={images[2]}
          alt="photo-grid"
          width={160}
          height={160}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="h-40 bg-gray-200 rounded-xl mb-4 overflow-hidden">
        <Image
          src={images[3]}
          alt="photo-grid"
          width={160}
          height={160}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="h-40 bg-gray-200 rounded-xl mb-4 overflow-hidden">
        <Image
          src={images[4]}
          alt="photo-grid"
          width={160}
          height={160}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="h-40 bg-gray-200 rounded-xl mb-4 overflow-hidden">
        <Image
          src={images[5]}
          alt="photo-grid"
          width={160}
          height={160}
          className="w-full h-full object-cover"
        />
      </div>

      {/* <!-- Alternating (staggered heights) --> */}
      <div className="h-80 bg-gray-300 rounded-xl mb-4 overflow-hidden">
        <Image
          src={images[6]}
          alt="photo-grid"
          width={160}
          height={160}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="h-40 bg-gray-200 rounded-xl mb-4 overflow-hidden">
        <Image
          src={images[7]}
          alt="photo-grid"
          width={160}
          height={160}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="h-40 bg-gray-200 rounded-xl mb-4 overflow-hidden">
        <Image
          src={images[8]}
          alt="photo-grid"
          width={160}
          height={160}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="h-80 bg-gray-300 rounded-xl mb-4 overflow-hidden">
        <Image
          src={images[9]}
          alt="photo-grid"
          width={160}
          height={160}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="h-80 bg-gray-300 rounded-xl mb-4 overflow-hidden">
        <Image
          src={images[10]}
          alt="photo-grid"
          width={160}
          height={160}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="h-40 bg-gray-200 rounded-xl mb-4 overflow-hidden">
        <Image
          src={images[11]}
          alt="photo-grid"
          width={160}
          height={160}
          className="w-full h-full object-cover"
        />
      </div>
    </section>
  );
};

export default Photogrid;
