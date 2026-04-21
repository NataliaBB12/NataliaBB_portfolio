"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Photo } from "@/lib/types";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const polaroidVariants = {
  enter: (dir: number) => ({
    opacity: 0,
    rotate: dir > 0 ? 8 : -8,
    x: dir > 0 ? 120 : -120,
    scale: 0.9,
  }),
  center: {
    opacity: 1,
    rotate: 0,
    x: 0,
    scale: 1,
    transition: {
      duration: 0.45,
      ease: EASE,
    },
  },
  exit: (dir: number) => ({
    opacity: 0,
    rotate: dir > 0 ? -6 : 6,
    x: dir > 0 ? -100 : 100,
    scale: 0.92,
    transition: {
      duration: 0.3,
      ease: EASE,
    },
  }),
};

export default function PhotobookModal({
  photos,
  onClose,
}: {
  photos: Photo[];
  onClose: () => void;
}) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const navigate = useCallback(
    (dir: number) => {
      setDirection(dir);
      setIndex((prev) => (prev + dir + photos.length) % photos.length);
    },
    [photos.length]
  );

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") navigate(-1);
      if (e.key === "ArrowRight") navigate(1);
    };
    window.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKey);
    };
  }, [onClose, navigate]);

  const photo = photos[index];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Photobook"
      className="fixed inset-0 z-50 flex items-center justify-center"
      onClick={onClose}
    >
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="absolute inset-0"
        style={{ backgroundColor: "rgba(25, 42, 81, 0.92)" }}
      />

      {/* Content */}
      <div
        className="relative z-10 flex flex-col items-center w-full max-w-lg px-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <div className="w-full flex justify-between items-center mb-6">
          <span className="text-white/40 text-[13px] font-light tracking-wide">
            {index + 1} / {photos.length}
          </span>
          <button
            onClick={onClose}
            className="text-white/60 hover:text-white transition-colors duration-200"
            aria-label="Close photobook"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            >
              <line x1="4" y1="4" x2="16" y2="16" />
              <line x1="16" y1="4" x2="4" y2="16" />
            </svg>
          </button>
        </div>

        {/* Polaroid card */}
        <div className="relative w-full flex items-center justify-center">
          {/* Prev button */}
          <button
            onClick={() => navigate(-1)}
            className="absolute -left-2 md:-left-14 z-20 w-10 h-10 flex items-center justify-center text-white/50 hover:text-white transition-colors duration-200"
            aria-label="Previous photo"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 4l-6 6 6 6" />
            </svg>
          </button>

          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={index}
              custom={direction}
              variants={polaroidVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="w-full max-w-sm"
            >
              {/* Polaroid frame */}
              <div className="bg-white rounded-sm p-3 pb-14 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.4)] relative">
                {/* Photo */}
                <div className="relative aspect-square bg-gray-100 overflow-hidden">
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 90vw, 400px"
                  />
                </div>

                {/* Caption area — handwritten style */}
                <div className="absolute bottom-0 left-0 right-0 h-14 flex items-center justify-center px-4">
                  {photo.caption && (
                    <p className="font-signature text-text-primary/70 text-lg text-center truncate">
                      {photo.caption}
                    </p>
                  )}
                </div>

                {/* Subtle tape effect at top */}
                <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-16 h-4 bg-white/40 backdrop-blur-sm rounded-sm opacity-60" />
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Next button */}
          <button
            onClick={() => navigate(1)}
            className="absolute -right-2 md:-right-14 z-20 w-10 h-10 flex items-center justify-center text-white/50 hover:text-white transition-colors duration-200"
            aria-label="Next photo"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M8 4l6 6-6 6" />
            </svg>
          </button>
        </div>

        {/* Dots */}
        <div className="flex gap-2 mt-8">
          {photos.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setDirection(i > index ? 1 : -1);
                setIndex(i);
              }}
              className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                i === index
                  ? "bg-white w-4"
                  : "bg-white/25 hover:bg-white/50"
              }`}
              aria-label={`Go to photo ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
