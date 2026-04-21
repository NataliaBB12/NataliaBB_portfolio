"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useI18n } from "@/lib/i18n";
import PhotobookModal from "./PhotobookModal";
import { Photo } from "@/lib/types";

export default function PhotobookTrigger({ photos }: { photos: Photo[] }) {
  const [open, setOpen] = useState(false);
  const { t } = useI18n();

  // Pick 3 preview photos spread across the collection
  const previewPhotos = [
    photos[0],
    photos[Math.floor(photos.length / 2)],
    photos[photos.length - 1],
  ].filter(Boolean);

  return (
    <>
      <section className="py-12">
        <h2 className="font-sans text-xs font-medium uppercase tracking-[0.15em] text-text-secondary/50 mb-8">
          {t.about.photobook.heading}
        </h2>

        <motion.button
          onClick={() => setOpen(true)}
          className="group relative w-full cursor-pointer"
          whileHover={{ y: -4 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
        >
          {/* Stacked cards behind */}
          <div
            className="absolute inset-0 rounded-2xl border border-text-primary/6 bg-white"
            style={{ transform: "rotate(3deg) translate(6px, 4px)" }}
          />
          <div
            className="absolute inset-0 rounded-2xl border border-text-primary/6 bg-white"
            style={{ transform: "rotate(-2deg) translate(-4px, 2px)" }}
          />

          {/* Main card */}
          <div className="relative rounded-2xl border border-border-subtle bg-white overflow-hidden shadow-[0_2px_20px_-4px_rgba(25,42,81,0.08)] group-hover:shadow-[0_8px_40px_-8px_rgba(25,42,81,0.14)] transition-shadow duration-500">
            {/* Photo area */}
            <div className="relative aspect-[16/9] bg-gradient-to-br from-text-primary/[0.02] to-text-primary/[0.06] overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center gap-4 md:gap-6 p-6 md:p-10">
                {/* Left polaroid */}
                <div
                  className="w-[28%] max-w-[140px] bg-white rounded-sm shadow-md p-1.5 pb-5 flex flex-col transition-transform duration-500 group-hover:rotate-[-2deg] group-hover:translate-y-[-4px]"
                  style={{ transform: "rotate(-6deg) translateY(8px)" }}
                >
                  <div className="relative aspect-square overflow-hidden rounded-[1px] bg-gray-100">
                    {previewPhotos[0] && (
                      <Image
                        src={previewPhotos[0].src}
                        alt={previewPhotos[0].alt}
                        fill
                        className="object-cover"
                        sizes="140px"
                      />
                    )}
                  </div>
                </div>

                {/* Center polaroid (largest) */}
                <div
                  className="w-[34%] max-w-[170px] bg-white rounded-sm shadow-lg p-2 pb-6 flex flex-col z-10 transition-transform duration-500 group-hover:scale-[1.04]"
                  style={{ transform: "rotate(2deg)" }}
                >
                  <div className="relative aspect-square overflow-hidden rounded-[1px] bg-gray-100">
                    {previewPhotos[1] && (
                      <Image
                        src={previewPhotos[1].src}
                        alt={previewPhotos[1].alt}
                        fill
                        className="object-cover"
                        sizes="170px"
                      />
                    )}
                  </div>
                </div>

                {/* Right polaroid */}
                <div
                  className="w-[28%] max-w-[140px] bg-white rounded-sm shadow-md p-1.5 pb-5 flex flex-col transition-transform duration-500 group-hover:rotate-[2deg] group-hover:translate-y-[-4px]"
                  style={{ transform: "rotate(5deg) translateY(12px)" }}
                >
                  <div className="relative aspect-square overflow-hidden rounded-[1px] bg-gray-100">
                    {previewPhotos[2] && (
                      <Image
                        src={previewPhotos[2].src}
                        alt={previewPhotos[2].alt}
                        fill
                        className="object-cover"
                        sizes="140px"
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom bar */}
            <div className="px-6 py-4 flex items-center justify-between">
              <span className="text-[13px] text-text-secondary/60 font-medium">
                {t.about.photobook.cta}
              </span>
              <div className="flex items-center gap-2 text-text-primary/40 group-hover:text-accent-coral transition-colors duration-300">
                <span className="text-[12px] font-medium">
                  {photos.length} {t.about.photobook.count}
                </span>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  className="transition-transform duration-300 group-hover:translate-x-1"
                >
                  <path
                    d="M3 8h10M9 4l4 4-4 4"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
          </div>
        </motion.button>
      </section>

      {open && (
        <PhotobookModal
          photos={photos}
          onClose={() => setOpen(false)}
        />
      )}
    </>
  );
}
