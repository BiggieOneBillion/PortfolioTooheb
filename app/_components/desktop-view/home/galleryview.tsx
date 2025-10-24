import { BlurOverlay } from "@/components/ui/blur-overlay";
import { FadeInView } from "@/components/ui/fade-in-when-in-view";
import { useHomeContentStore } from "@/store/home-data-store";
import { v4 as uuidv4 } from "uuid";

export default function GalleryView() {
  const homeContent = useHomeContentStore((state) => state.homeContent);

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
    image1,
    image2,
    image3,
    image4,
    image5,
    image6,
    image7,
    image8,
    image9,
  ];

  return (
    <section className="bg-[#ede4d2] py-16 px-16">
      <div
        className="grid gap-4"
        style={{
          gridTemplateColumns: "repeat(3, 1fr)",
          gridAutoRows: "10px",
        }}
      >
        {images.map((src, index) => (
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
                    src={src}
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
