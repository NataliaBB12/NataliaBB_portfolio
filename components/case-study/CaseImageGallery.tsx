"use client";

import { useState } from "react";
import Image from "next/image";

type CaseImageGalleryProps = {
  srcs: string; // comma-separated image paths
  alts?: string; // comma-separated alt texts (optional)
  height?: string; // height in px, default "420"
};

export default function CaseImageGallery({
  srcs,
  alts = "",
  height = "420",
}: CaseImageGalleryProps) {
  const images = srcs
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  const altList = alts
    .split(",")
    .map((s) => s.trim());

  const [active, setActive] = useState<number | null>(null);

  const h = parseInt(height, 10) || 420;

  return (
    <div
      className="flex gap-2 w-full my-8 rounded-2xl overflow-hidden"
      style={{ height: h }}
    >
      {images.map((src, i) => {
        const isActive = active === i;
        return (
          <div
            key={i}
            onMouseEnter={() => setActive(i)}
            onMouseLeave={() => setActive(null)}
            style={{
              flex: isActive ? "4 1 0%" : "1 1 0%",
              transition: "flex 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
              position: "relative",
              overflow: "hidden",
              cursor: "pointer",
              borderRadius: "16px",
            }}
          >
            <Image
              src={src}
              alt={altList[i] || `Gallery image ${i + 1}`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            {/* Subtle dark overlay that fades on hover */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: isActive
                  ? "rgba(0,0,0,0)"
                  : "rgba(0,0,0,0.25)",
                transition: "background 0.4s ease",
              }}
            />
          </div>
        );
      })}
    </div>
  );
}
