"use client";

import { ReactNode } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

type CaseShowcaseProps = {
  title?: string;
  subtitle?: string;
  images?: { src: string; alt: string }[];
  video?: string;
  layout?: "single" | "side-by-side" | "triple";
  bg?: "light" | "dark" | "gradient";
  children?: ReactNode;
};

const bgStyles = {
  light: "bg-white/40",
  dark: "bg-text-primary/[0.03]",
  gradient:
    "bg-gradient-to-br from-text-primary/[0.02] via-accent-coral/[0.04] to-text-primary/[0.02]",
};

const gridCols = {
  single: "grid-cols-1",
  "side-by-side": "grid-cols-1 md:grid-cols-2",
  triple: "grid-cols-1 md:grid-cols-3",
};

export default function CaseShowcase({
  title,
  subtitle,
  images,
  video,
  layout = "single",
  bg = "gradient",
  children,
}: CaseShowcaseProps) {
  const hasMedia = (images && images.length > 0) || video;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`rounded-2xl ${bgStyles[bg]} border border-border-subtle overflow-hidden my-10`}
    >
      {/* Header */}
      {(title || subtitle) && (
        <div className="px-6 md:px-10 pt-8 pb-2">
          {title && (
            <h4 className="font-sans text-xs font-medium uppercase tracking-[0.15em] text-text-secondary/50 mb-2">
              {title}
            </h4>
          )}
          {subtitle && (
            <p className="font-sans text-base text-text-secondary/70 max-w-xl">
              {subtitle}
            </p>
          )}
        </div>
      )}

      {/* Media area */}
      {hasMedia && (
        <div className="px-6 md:px-10 py-6">
          {video ? (
            <div className="flex items-center justify-center bg-white rounded-xl py-8">
              <div className="relative overflow-hidden shadow-[0_8px_40px_-8px_rgba(25,42,81,0.15)]" style={{ width: 360, maxWidth: "100%", borderRadius: 20 }}>
                <video
                  src={video}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-auto block"
                  style={{ aspectRatio: "9/16", borderRadius: 20 }}
                />
              </div>
            </div>
          ) : (
            <div className={`grid ${gridCols[layout]} gap-4 md:gap-6`}>
              {images?.map((img, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="relative rounded-xl overflow-hidden shadow-[0_2px_20px_-4px_rgba(25,42,81,0.08)] bg-white"
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    width={800}
                    height={600}
                    className="w-full h-auto object-cover"
                    loading="lazy"
                  />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Placeholder when no media yet */}
      {!hasMedia && !children && (
        <div className="px-6 md:px-10 py-8">
          <div className="rounded-xl border-2 border-dashed border-text-primary/10 bg-white/30 flex items-center justify-center min-h-[240px] md:min-h-[320px]">
            <div className="text-center px-6">
              <svg
                width="40"
                height="40"
                viewBox="0 0 24 24"
                fill="none"
                className="mx-auto mb-3 text-text-primary/20"
              >
                <rect
                  x="3"
                  y="3"
                  width="18"
                  height="18"
                  rx="3"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
                <circle
                  cx="9"
                  cy="9"
                  r="2"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
                <path
                  d="M3 16l5-5 4 4 3-3 6 6"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <p className="text-[13px] text-text-primary/30 font-medium">
                Add product screenshots, mockups, or GIFs
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Custom children content */}
      {children && (
        <div className="px-6 md:px-10 py-6">{children}</div>
      )}
    </motion.div>
  );
}
