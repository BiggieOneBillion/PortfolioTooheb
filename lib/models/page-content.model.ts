import mongoose, { Schema, type Document } from "mongoose";

// Home Page Schema
export interface IHomePageContent extends Document {
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
      services: Array<{
        title: string;
        description: string;
      }>;
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
      services: Array<{
        title: string;
        description: string;
      }>;
      leftImage: string;
      rightImage: string;
    };
    gallery: {
      images: string[];
    };
  };
  updatedAt: Date;
}

const HomePageContentSchema = new Schema<IHomePageContent>({
  mobile: {
    hero: {
      title: [String],
      animatedWords: [String],
      carouselImages: [String],
    },
    description: {
      heading: String,
      text: String,
      images: [String],
    },
    cta: {
      heading: String,
      services: [
        {
          title: String,
          description: String,
        },
      ],
    },
    photoGrid: {
      images: [String],
    },
  },
  desktop: {
    hero: {
      leftImage: String,
      centerImage: String,
      rightImage: String,
      heading: String,
      description: String,
    },
    cta: {
      heading: String,
      services: [
        {
          title: String,
          description: String,
        },
      ],
      leftImage: String,
      rightImage: String,
    },
    gallery: {
      images: [String],
    },
    imageGallery: {
      image1: String,
      image2: String,
      image3: String,
      image4: String,
      image5: String,
      image6: String,
      image7: String,
      image8: String,
      image9: String,
    },
  },
  updatedAt: { type: Date, default: Date.now },
});

// About Page Schema
export interface IAboutPageContent extends Document {
  mobile: {
    heading: string;
    subtitle: string;
    images: string[];
    paragraphs: string[];
    whyChooseMe: {
      heading: string;
      points: string[];
      closingText: string;
    };
  };
  desktop: {
    heading: string;
    subtitle: string;
    images: string[];
    paragraphs: string[];
    whyChooseMe: {
      heading: string;
      text: string;
    };
  };
  updatedAt: Date;
}

const AboutPageContentSchema = new Schema<IAboutPageContent>({
  mobile: {
    heading: String,
    subtitle: String,
    images: [String],
    paragraphs: [String],
    whyChooseMe: {
      heading: String,
      points: [String],
      closingText: String,
    },
  },
  desktop: {
    heading: String,
    subtitle: String,
    images: [String],
    paragraphs: [String],
    whyChooseMe: {
      heading: String,
      text: String,
    },
  },
  updatedAt: { type: Date, default: Date.now },
});

// Contact Page Schema
export interface IContactPageContent extends Document {
  mobile: {
    heading: string;
    image: string;
    paragraphs: string[];
  };
  desktop: {
    heading: string;
    image: string;
    paragraphs: string[];
  };
  updatedAt: Date;
}

const ContactPageContentSchema = new Schema<IContactPageContent>({
  mobile: {
    heading: String,
    image: String,
    paragraphs: [String],
  },
  desktop: {
    heading: String,
    image: String,
    paragraphs: [String],
  },
  updatedAt: { type: Date, default: Date.now },
});

export const HomePageContent =
  mongoose.models.HomePageContent ||
  mongoose.model<IHomePageContent>("HomePageContent", HomePageContentSchema);
export const AboutPageContent =
  mongoose.models.AboutPageContent ||
  mongoose.model<IAboutPageContent>("AboutPageContent", AboutPageContentSchema);
export const ContactPageContent =
  mongoose.models.ContactPageContent ||
  mongoose.model<IContactPageContent>(
    "ContactPageContent",
    ContactPageContentSchema
  );
