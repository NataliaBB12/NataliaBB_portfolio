"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Photo } from "@/lib/types";

export default function PhotoGalleryModal({
  photos,
  initialIndex,
  onClose,
}: {
  photos: Photo[];
  initialIndex: number;
  onClose: () => void;
}) {
  const [index, setIndex] = useState(initialIndex);
  const [direction, setDirection] = useState(0);

  const navigate = useCallback(
    (dir: number) => {
      setDirection(dir);
      setIndex((prev) => (prev + dir + photos.length) % photos.length);
    },
    [photos.length]
  );

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") navigate(-1);
      if (e.key === "ArrowRight") navigate(1);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose, navigate]);

  const photo = photos[index];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Photo gallery"
      className="fixed inset-0 z-50 flex items-center justify-center"
      onClick={onClose}
    >
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-text-primary/[0.92] backdrop-blur-sm"
      />

      {/* Content */}
      <div
        className="relative z-10 flex flex-col items-center max-w-5xl w-full px-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close + Counter */}
        <div className="flex justify-between w-full mb-4">
          <button
            onClick={onClose}
            className="text-text-inverse text-xl hover:text-accent-coral transition-colors"
            aria-label="Close gallery"
          >
            ✕
          </button>
          <span className="text-text-inverse/60 text-xs">
            {index + 1} / {photos.length}
          </span>
        </div>

        {/* Image */}
        <div className="relative w-full flex items-center justify-center min-h-[60vh]">
          <button
            onClick={() => navigate(-1)}
            className="absolute left-0 z-10 text-text-inverse text-3xl px-4 py-8 hover:text-accent-coral transition-colors"
            aria-label="Previous photo"
          >
            ‹
          </button>

          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={index}
              custom={direction}
              initial={{ opacity: 0, x: direction * 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -direction * 40 }}
              transition={{ duration: 0.25 }}
              className="flex justify-center"
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                width={900}
                height={600}
                className="max-h-[70vh] w-auto object-contain rounded-lg"
              />
            </motion.div>
          </AnimatePresence>

          <button
            onClick={() => navigate(1)}
            className="absolute right-0 z-10 text-text-inverse text-3xl px-4 py-8 hover:text-accent-coral transition-colors"
            aria-label="Next photo"
          >
            ›
          </button>
        </div>

        {/* Caption */}
        {photo.caption && (
          <p className="text-text-inverse/80 text-[13px] font-light mt-4">
            {photo.caption}
          </p>
        )}

        {/* Dots */}
        <div className="flex gap-2 mt-6">
          {photos.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setDirection(i > index ? 1 : -1);
                setIndex(i);
              }}
              className={`w-2 h-2 rounded-full transition-colors ${
                i === index ? "bg-text-inverse" : "bg-text-inverse/30"
              }`}
              aria-label={`Go to photo ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
