"use client";

import Image from "next/image";
import { useState } from "react";
import { CaseImageProps } from "@/lib/types";

const sizeClasses = {
  full: "-mx-6 lg:-mx-32",
  wide: "-mx-6 lg:-mx-16",
  contained: "max-w-prose mx-auto",
};

export default function CaseImage({
  src,
  alt,
  caption,
  size = "contained",
  clickable,
}: CaseImageProps & { clickable?: boolean }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <figure className={`my-8 ${sizeClasses[size]}`}>
        <div className={clickable ? "cursor-zoom-in" : ""} onClick={clickable ? () => setOpen(true) : undefined}>
          <Image
            src={src}
            alt={alt}
            width={1200}
            height={800}
            className="rounded-lg w-full h-auto"
            loading="lazy"
          />
        </div>
        {caption && (
          <figcaption className="text-center text-xs font-light text-text-secondary mt-3">
            {caption}
          </figcaption>
        )}
      </figure>

      {/* Lightbox */}
      {clickable && open && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-[fadeIn_0.2s_ease]"
          onClick={() => setOpen(false)}
          style={{ animation: "fadeIn 0.2s ease" }}
        >
          <style>{`
            @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
            @keyframes zoomIn { from { opacity: 0; transform: scale(0.92) } to { opacity: 1; transform: scale(1) } }
          `}</style>
          <button
            onClick={() => setOpen(false)}
            className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
            aria-label="Close"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              <path d="M3 3l10 10M13 3L3 13" />
            </svg>
          </button>
          <div
            className="relative max-w-[90vw] max-h-[90vh] overflow-auto rounded-xl"
            style={{ animation: "zoomIn 0.25s cubic-bezier(0.22,1,0.36,1)" }}
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={src}
              alt={alt}
              width={2400}
              height={1600}
              className="rounded-xl w-auto h-auto max-w-[90vw] max-h-[85vh] object-contain shadow-2xl"
            />
            {caption && (
              <p className="text-center text-xs text-white/60 mt-3">{caption}</p>
            )}
          </div>
        </div>
      )}
    </>
  );
}
