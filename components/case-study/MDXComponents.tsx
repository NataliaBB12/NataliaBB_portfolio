import type { MDXComponents } from "mdx/types";
import InsightCard from "./InsightCard";
import ExternalLink from "./ExternalLink";
import CaseImage from "./CaseImage";
import CaseImageGrid from "./CaseImageGrid";
import CaseShowcase from "./CaseShowcase";
import ImageAutoSlider from "./ImageAutoSlider";
import CaseImageGallery from "./CaseImageGallery";
import CaseTextRotate from "./CaseTextRotate";
import CasePhotobook from "./CasePhotobook";
import CaseComparisonSlider from "./CaseComparisonSlider";
import CaseScreenRow from "./CaseScreenRow";
import CaseVideo from "./CaseVideo";
import TranslatedH2 from "./TranslatedH2";
import TranslatedH3 from "./TranslatedH3";
import T from "./T";
import TQ from "./TQ";

export const mdxComponents: MDXComponents = {
  h2: (props) => <TranslatedH2>{props.children as string}</TranslatedH2>,
  h3: (props) => <TranslatedH3>{props.children as string}</TranslatedH3>,
  p: (props) => (
    <p
      className="font-sans text-base leading-relaxed text-text-secondary mb-4"
      {...props}
    />
  ),
  blockquote: (props) => (
    <blockquote
      className="border-l-4 border-text-primary/30 italic pl-6 my-6 text-text-secondary"
      {...props}
    />
  ),
  ul: (props) => (
    <ul
      className="list-disc pl-6 space-y-2 text-text-secondary mb-4"
      {...props}
    />
  ),
  ol: (props) => (
    <ol
      className="list-decimal pl-6 space-y-2 text-text-secondary mb-4"
      {...props}
    />
  ),
  hr: () => <hr className="border-border-subtle my-12" />,
  // Custom components
  InsightCard: InsightCard as any,
  ExternalLink: ExternalLink as any,
  CaseImage: CaseImage as any,
  CaseImageGrid: CaseImageGrid as any,
  CaseShowcase: CaseShowcase as any,
  ImageAutoSlider: ImageAutoSlider as any,
  CaseImageGallery: CaseImageGallery as any,
  CaseTextRotate: CaseTextRotate as any,
  CasePhotobook: CasePhotobook as any,
  CaseComparisonSlider: CaseComparisonSlider as any,
  CaseScreenRow: CaseScreenRow as any,
  CaseVideo: CaseVideo as any,
  T: T as any,
  TQ: TQ as any,
};
