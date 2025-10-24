import { cn } from "@/lib/utils";
import Image from "next/image";
import { ReactNode, useState } from "react";

type ImageLoaderProp = {
  imgString: string;
  alt: string;
  classsName: string;
};

export default function ImageLoader({
  imgString,
  alt,
  classsName,
}: ImageLoaderProp) {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {loading && (
        <div className="absolute inset-0 bg-gray-300 backdrop:backdrop-blur-lg animate-pulse rounded-lg"></div>
      )}

      <Image
        src={imgString}
        alt={alt}
        fill
        className={cn(classsName)}
        onLoadStart={() => setLoading(true)} // not built-in, so use fallback logic
        onLoadingComplete={() => setLoading(false)} // built-in Next.js event
      />
    </>
  );
}
