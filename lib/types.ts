import { ReactNode } from "react";

export type CaseStudy = {
  slug: string;
  client: string;
  title: string;
  headline: string;
  role: string;
  platform: string;
  timeline: string;
  cardBg: string;
  previewImage: string;
  tags: string[];
  year: string;
  heroImage: string;
  heroBg: string;
  nextSlug: string;
  nextClient: string;
  featured: boolean;
  order: number;
  password?: string;
  heroWide?: boolean;
  previewMaxH?: number;
  titleEs?: string;
  headlineEs?: string;
};

export type Photo = {
  src: string;
  alt: string;
  caption?: string;
  orientation: "portrait" | "landscape" | "square";
};

export type LearningItem = {
  topic: string;
  context?: string;
  status: "in-progress" | "just-started" | "wrapping-up";
};

export type Book = {
  title: string;
  author: string;
  cover: string;
  status: "reading" | "finished" | "up-next";
  link?: string;
};

export type InsightCardProps = {
  label: string;
  children: ReactNode;
  accent?: boolean;
};

export type ExternalLinkProps = {
  href: string;
  label: string;
  icon: "figma" | "prototype" | "research" | "link";
};

export type CaseImageProps = {
  src: string;
  alt: string;
  caption?: string;
  size?: "full" | "wide" | "contained";
};

export type CaseImageGridProps = {
  columns?: 2 | 3;
  children: ReactNode;
};

export type PlaylistLinkProps = {
  href: string;
  label: string;
  platform: "spotify" | "apple-music" | "youtube" | "other";
};
