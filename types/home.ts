export interface HomeContent {
  mobile: {
    hero: {
      title: string[];
      animatedWords: string[];
      carouselImages: string[];
    };
    description: {
      heading: string;
      text: string;
      images: string[];
    };
    cta: {
      heading: string;
      services: Service[];
    };
    photoGrid: {
      images: string[];
    };
  };
  desktop: {
    hero: {
      leftImage: string;
      centerImage: string;
      rightImage: string;
      heading: string;
      description: string;
    };
    cta: {
      heading: string;
      services: Service[];
      leftImage: string;
      rightImage: string;
    };
    gallery: {
      images: string[];
    };
    imageGallery: {
      image1: string;
      image2: string;
      image3: string;
      image4: string;
      image5: string;
      image6: string;
      image7: string;
      image8: string;
      image9: string;
    };
  };
  updatedAt: string;
}

export interface Service {
  title: string;
  description: string;
}
