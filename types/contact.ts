interface ContactData {
  mobile: ContactPlatformData;
  desktop: ContactPlatformData;
}

interface ContactPlatformData {
  heading: string;
  image: string;
  paragraphs: string[];
}