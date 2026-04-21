"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";

type CaseScreenRowProps = {
  srcs: string;
  alts?: string;
  labels?: string;
  height?: string;
  width?: string;
  fit?: "contain" | "cover";
  clickable?: boolean;
};

export default function CaseScreenRow({
  srcs,
  alts = "",
  labels = "",
  height = "480",
  width,
  fit = "contain",
  clickable,
}: CaseScreenRowProps) {
  const images = srcs.split(",").map((s) => s.trim()).filter(Boolean);
  const altList = alts.split(",").map((s) => s.trim());
  const labelList = labels.split(",").map((s) => s.trim());
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(false);
  const [lightbox, setLightbox] = useState<number | null>(null);

  const h = parseInt(height, 10) || 480;
  const imgW = width ? parseInt(width, 10) : Math.round(h * (9 / 16));

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

  // Close on Escape
  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
      if (e.key === "ArrowRight") setLightbox((i) => (i !== null ? Math.min(i + 1, images.length - 1) : null));
      if (e.key === "ArrowLeft") setLightbox((i) => (i !== null ? Math.max(i - 1, 0) : null));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox, images.length]);

  const scroll = (dir: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: dir === "right" ? imgW + 16 : -(imgW + 16), behavior: "smooth" });
  };

  return (
    <>
      <div className="relative my-8 group">
        {/* Scrollable row */}
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth"
          style={{ scrollSnapType: "x mandatory" }}
        >
          {images.map((src, i) => (
            <div
              key={i}
              className="flex-shrink-0 flex flex-col gap-2"
              style={{ scrollSnapAlign: "start" }}
            >
              {labelList[i] && (
                <span className="text-[11px] font-medium uppercase tracking-widest text-text-secondary/60 text-center">
                  {labelList[i]}
                </span>
              )}
              <div
                className={`overflow-hidden rounded-2xl shadow-[0_4px_24px_-6px_rgba(25,42,81,0.10)] ${clickable ? "cursor-zoom-in" : ""}`}
                style={{ width: imgW, height: h, backgroundColor: fit === "cover" ? "transparent" : "#FDF6F0" }}
                onClick={clickable ? () => setLightbox(i) : undefined}
              >
                <Image
                  src={src}
                  alt={altList[i] || `Screen ${i + 1}`}
                  width={imgW * 2}
                  height={h * 2}
                  className={`w-full h-full transition-transform duration-300 ${clickable ? "hover:scale-[1.03]" : ""} ${fit === "cover" ? "object-cover" : "object-contain"}`}
                  loading="lazy"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Left button */}
        {canLeft && (
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 z-10 w-9 h-9 rounded-full bg-white border border-border-subtle shadow-md flex items-center justify-center text-text-secondary hover:text-text-primary transition-all duration-200 hover:shadow-lg"
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
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 z-10 w-9 h-9 rounded-full bg-white border border-border-subtle shadow-md flex items-center justify-center text-text-secondary hover:text-text-primary transition-all duration-200 hover:shadow-lg"
            aria-label="Scroll right"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 3l5 5-5 5" />
            </svg>
          </button>
        )}

        <style>{`
          .scrollbar-hide::-webkit-scrollbar { display: none; }
          .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
        `}</style>
      </div>

      {/* Lightbox */}
      {clickable && lightbox !== null && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 backdrop-blur-sm p-4"
          onClick={() => setLightbox(null)}
          style={{ animation: "fadeIn 0.2s ease" }}
        >
          <style>{`
            @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
            @keyframes zoomIn { from { opacity: 0; transform: scale(0.92) } to { opacity: 1; transform: scale(1) } }
          `}</style>

          {/* Close */}
          <button
            onClick={() => setLightbox(null)}
            className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
            aria-label="Close"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              <path d="M3 3l10 10M13 3L3 13" />
            </svg>
          </button>

          {/* Prev */}
          {lightbox > 0 && (
            <button
              onClick={(e) => { e.stopPropagation(); setLightbox(lightbox - 1); }}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
              aria-label="Previous"
            >
              <svg width="18" height="18" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M10 3L5 8l5 5" />
              </svg>
            </button>
          )}

          {/* Next */}
          {lightbox < images.length - 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); setLightbox(lightbox + 1); }}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
              aria-label="Next"
            >
              <svg width="18" height="18" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 3l5 5-5 5" />
              </svg>
            </button>
          )}

          {/* Image */}
          <div
            className="relative"
            style={{ animation: "zoomIn 0.25s cubic-bezier(0.22,1,0.36,1)" }}
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={images[lightbox]}
              alt={altList[lightbox] || `Screen ${lightbox + 1}`}
              width={1600}
              height={1200}
              className="rounded-xl max-w-[90vw] max-h-[88vh] w-auto h-auto object-contain shadow-2xl"
            />
            {/* Counter */}
            <p className="text-center text-xs text-white/40 mt-3">
              {lightbox + 1} / {images.length}
            </p>
          </div>
        </div>
      )}
    </>
  );
}
