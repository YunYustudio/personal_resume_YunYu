export type Lang = "zh" | "en";
export type Localized = { zh: string; en: string };

export interface LinkItem {
  label: Localized;
  href: string;
}

export interface MediaImage {
  src: string;
  shape?: "phone";
  alt: Localized;
}

export interface Project {
  id: string;
  kicker: Localized;
  title: Localized;
  desc: Localized;
  bullets: Localized[];
  tags: Localized[];
  links: LinkItem[];
  images: MediaImage[];
  layout: "default" | "reverse";
  media: "three-up" | "phone-strip" | "dashboard-pair";
}

export interface GalleryItem {
  category: string;
  project: Localized;
  title: Localized;
  src: string;
  shape?: "phone";
}

export interface TimelineEntry {
  time: Localized;
  title: Localized;
  desc: Localized;
}

export interface ResumeExperience {
  time: Localized;
  title: Localized;
  org: Localized;
  points: Localized[];
}

export interface ResumeProjectRef {
  title: Localized;
  summary: Localized;
}
