"use client";

import { useState } from "react";
import Image from "next/image";
import { Photo } from "@/lib/types";
import PhotoGalleryModal from "./PhotoGalleryModal";

export default function PhotoGallery({ photos }: { photos: Photo[] }) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  return (
    <>
      <div className="columns-2 lg:columns-3 gap-3">
        {photos.map((photo, i) => (
          <button
            key={photo.src}
            onClick={() => setSelectedIndex(i)}
            className="group relative break-inside-avoid mb-3 rounded-xl overflow-hidden cursor-pointer block w-full"
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              width={photo.orientation === "portrait" ? 400 : 600}
              height={photo.orientation === "portrait" ? 600 : 400}
              className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-[1.02]"
            />
            <div className="absolute inset-0 bg-text-primary/0 group-hover:bg-text-primary/10 transition-colors flex items-center justify-center">
              <span className="opacity-0 group-hover:opacity-100 transition-opacity text-white text-2xl">
                ⤢
              </span>
            </div>
          </button>
        ))}
      </div>

      {selectedIndex !== null && (
        <PhotoGalleryModal
          photos={photos}
          initialIndex={selectedIndex}
          onClose={() => setSelectedIndex(null)}
        />
      )}
    </>
  );
}
