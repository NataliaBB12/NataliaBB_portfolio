"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

type CasePhotobookProps = {
  srcs: string;   // comma-separated image paths
  label?: string;
};

const slideVariants = {
  enter: (dir: number) => ({
    opacity: 0,
    x: dir > 0 ? 80 : -80,
    scale: 0.96,
  }),
  center: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { duration: 0.38, ease: [0.22, 1, 0.36, 1] },
  },
  exit: (dir: number) => ({
    opacity: 0,
    x: dir > 0 ? -60 : 60,
    scale: 0.96,
    transition: { duration: 0.28, ease: [0.22, 1, 0.36, 1] },
  }),
};

const stackRotations = [-5, 2, -2, 4];

export default function CasePhotobook({
  srcs,
  label = "Product Preview",
}: CasePhotobookProps) {
  const images = srcs.split(",").map((s) => s.trim()).filter(Boolean);

  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const navigate = useCallback(
    (dir: number) => {
      setDirection(dir);
      setIndex((prev) => (prev + dir + images.length) % images.length);
    },
    [images.length]
  );

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
      if (e.key === "ArrowLeft") navigate(-1);
      if (e.key === "ArrowRight") navigate(1);
    };
    window.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKey);
    };
  }, [open, navigate]);

  return (
    <>
      {/* ── Inline stacked preview ── */}
      <div className="my-10 flex flex-col items-center gap-5">
        <span className="font-sans text-[11px] font-medium uppercase tracking-widest text-text-secondary/60">
          {label}
        </span>

        <button
          onClick={() => { setIndex(0); setOpen(true); }}
          className="relative cursor-pointer"
          style={{ width: 180, height: 340 }}
          aria-label="Open photobook"
        >
          {images.slice(0, Math.min(4, images.length)).map((src, i, arr) => {
            const isTop = i === arr.length - 1;
            return (
              <motion.div
                key={src}
                className="absolute inset-0 overflow-hidden rounded-2xl"
                style={{
                  rotate: stackRotations[i],
                  zIndex: i,
                  transformOrigin: "bottom center",
                  boxShadow: "0 8px 30px -8px rgba(0,0,0,0.18)",
                }}
                whileHover={isTop ? { rotate: stackRotations[i] - 2, y: -8 } : {}}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
              >
                <Image
                  src={src}
                  alt={`Screen ${i + 1}`}
                  fill
                  className="object-cover"
                  sizes="180px"
                />
              </motion.div>
            );
          })}
        </button>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="font-sans text-[12px] text-text-secondary/50 flex items-center gap-1.5"
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" /><path d="M12 8v4l2 2" />
          </svg>
          Tap to browse {images.length} screens
        </motion.p>
      </div>

      {/* ── Fullscreen modal ── */}
      <AnimatePresence>
        {open && (
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Product screens"
            className="fixed inset-0 z-50 flex items-center justify-center"
            onClick={() => setOpen(false)}
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="absolute inset-0"
              style={{ backgroundColor: "rgba(10, 20, 45, 0.95)" }}
            />

            {/* Content */}
            <div
              className="relative z-10 flex flex-col items-center w-full px-6"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Counter + close */}
              <div className="w-full max-w-xs flex justify-between items-center mb-6">
                <span className="text-white/40 text-[13px] font-light tracking-wide">
                  {index + 1} / {images.length}
                </span>
                <button
                  onClick={() => setOpen(false)}
                  className="text-white/60 hover:text-white transition-colors"
                  aria-label="Close"
                >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                    <line x1="4" y1="4" x2="16" y2="16" />
                    <line x1="16" y1="4" x2="4" y2="16" />
                  </svg>
                </button>
              </div>

              {/* Image */}
              <div className="relative w-full flex items-center justify-center">
                {/* Prev */}
                <button
                  onClick={() => navigate(-1)}
                  className="absolute left-0 md:-left-16 z-20 w-10 h-10 flex items-center justify-center text-white/50 hover:text-white transition-colors"
                  aria-label="Previous"
                >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 4l-6 6 6 6" />
                  </svg>
                </button>

                <AnimatePresence mode="wait" custom={direction}>
                  <motion.div
                    key={index}
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    className="relative overflow-hidden rounded-2xl"
                    style={{
                      width: 260,
                      aspectRatio: "9/16",
                      boxShadow: "0 24px 60px -12px rgba(0,0,0,0.6)",
                    }}
                  >
                    <Image
                      src={images[index]}
                      alt={`Screen ${index + 1}`}
                      fill
                      className="object-cover"
                      sizes="260px"
                    />
                  </motion.div>
                </AnimatePresence>

                {/* Next */}
                <button
                  onClick={() => navigate(1)}
                  className="absolute right-0 md:-right-16 z-20 w-10 h-10 flex items-center justify-center text-white/50 hover:text-white transition-colors"
                  aria-label="Next"
                >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M8 4l6 6-6 6" />
                  </svg>
                </button>
              </div>

              {/* Dots */}
              <div className="flex gap-2 mt-8">
                {images.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => { setDirection(i > index ? 1 : -1); setIndex(i); }}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      i === index ? "bg-white w-4" : "bg-white/25 hover:bg-white/50 w-1.5"
                    }`}
                    aria-label={`Go to screen ${i + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
