interface AboutData {
  mobile: AboutformData;
  desktop: AboutformData;
}

interface AboutformData {
  heading: string;
  subtitle: string;
  images: string[];
  paragraphs: string[];
  whyChooseMe: WhyChooseMe;
}

interface WhyChooseMe {
  heading: string;
  points?: string[];   // present only in mobile
  text?: string;       // present only in desktop
  closingText?: string; // present only in mobile
}