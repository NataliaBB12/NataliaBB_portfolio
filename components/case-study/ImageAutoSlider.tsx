"use client";

import Image from "next/image";
import { useRef, useState, useEffect } from "react";

type ImageAutoSliderProps = {
  title?: string;
  subtitle?: string;
  srcs?: string;
  speed?: string; // kept for backwards compat, unused
  bg?: "light" | "dark" | "gradient" | "black";
};

const bgStyles = {
  light: "bg-[#ffffff]",
  dark: "bg-[#ffffff]",
  gradient: "bg-[#ffffff]",
  black: "bg-[#ffffff]",
};

export default function ImageAutoSlider({
  title,
  subtitle,
  srcs = "",
  bg = "light",
}: ImageAutoSliderProps) {
  const images = srcs
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  const scrollRef = useRef<HTMLDivElement>(null);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(false);

  const imgW = 360;
  const imgH = 800;

  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanLeft(el.scrollLeft > 4);
    setCanRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    checkScroll();
    el.addEventListener("scroll", checkScroll, { passive: true });
    window.addEventListener("resize", checkScroll);
    return () => {
      el.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, []);

  const scroll = (dir: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: dir === "right" ? imgW + 24 : -(imgW + 24), behavior: "smooth" });
  };

  return (
    <div
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

      {/* Row */}
      {images.length > 0 && (
        <div className="relative group px-2 md:px-6 py-6">
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth"
            style={{ scrollSnapType: "x mandatory" }}
          >
            {images.map((src, i) => (
              <div
                key={i}
                className="flex-shrink-0 overflow-hidden shadow-[0_4px_24px_-6px_rgba(25,42,81,0.12)] bg-white"
                style={{ width: imgW, height: imgH, borderRadius: 20, scrollSnapAlign: "start" }}
              >
                <Image
                  src={src}
                  alt={`Screen ${i + 1}`}
                  width={imgW * 2}
                  height={imgH * 2}
                  className="w-full h-full object-cover"
                  style={{ borderRadius: 20 }}
                  loading="lazy"
                />
              </div>
            ))}
          </div>

          {/* Left button */}
          {canLeft && (
            <button
              onClick={() => scroll("left")}
              className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-white border border-border-subtle text-text-secondary hover:text-text-primary flex items-center justify-center shadow-md transition-all duration-200 hover:shadow-lg"
              aria-label="Scroll left"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M10 3L5 8l5 5" />
              </svg>
            </button>
          )}

          {/* Right button */}
          {canRight && (
            <button
              onClick={() => scroll("right")}
              className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-white border border-border-subtle text-text-secondary hover:text-text-primary flex items-center justify-center shadow-md transition-all duration-200 hover:shadow-lg"
              aria-label="Scroll right"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 3l5 5-5 5" />
              </svg>
            </button>
          )}
        </div>
      )}

      {/* Placeholder */}
      {images.length === 0 && (
        <div className="px-6 md:px-10 pb-8">
          <div className="rounded-xl border-2 border-dashed border-text-primary/10 bg-white/30 flex items-center justify-center h-56">
            <p className="text-[13px] text-text-primary/30 font-medium">
              Add product screenshots to start the slider
            </p>
          </div>
        </div>
      )}

      <style>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}
