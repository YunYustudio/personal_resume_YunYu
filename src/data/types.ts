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
  badge?: Localized;
  title: Localized;
  desc: Localized;
  bullets: Localized[];
  tags: Localized[];
  links: LinkItem[];
  images: MediaImage[];
  layout: "default" | "reverse";
  media: "three-up" | "phone-strip" | "dashboard-pair";
  video?: FeaturedVideo;
}

export interface GalleryItem {
  category: string;
  project: Localized;
  title: Localized;
  src: string;
  shape?: "phone";
}

// 第三方公网视频（如 B 站）：不自行托管，直接使用用户提供的公网链接作为播放源。
export interface FeaturedVideo {
  id: string;
  bvid: string; // B 站视频 BV 号，用于官方播放器嵌入（player.bilibili.com）
  sourceUrl: string; // 用户提供的公网视频链接（作为播放源引用 / “在 B 站打开”）
  title: Localized;
  caption?: Localized;
  autoplay?: boolean;
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
