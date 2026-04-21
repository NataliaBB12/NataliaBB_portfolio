"use client";

import { ImageComparisonSlider } from "@/components/ui/image-comparison-slider-horizontal";

type CaseComparisonSliderProps = {
  leftImage: string;
  rightImage: string;
  altLeft?: string;
  altRight?: string;
  initialPosition?: string; // string for MDX compat
  height?: string;           // px height as string
  label?: string;
};

export default function CaseComparisonSlider({
  leftImage,
  rightImage,
  altLeft = "Before",
  altRight = "After",
  initialPosition = "50",
  height = "560",
  label,
}: CaseComparisonSliderProps) {
  return (
    <div className="my-10 flex flex-col gap-3">
      {label && (
        <span className="font-sans text-[11px] font-medium uppercase tracking-widest text-text-secondary/60">
          {label}
        </span>
      )}
      <div
        className="w-full rounded-2xl overflow-hidden shadow-[0_8px_40px_-8px_rgba(25,42,81,0.12)]"
        style={{ height: parseInt(height, 10) }}
      >
        <ImageComparisonSlider
          leftImage={leftImage}
          rightImage={rightImage}
          altLeft={altLeft}
          altRight={altRight}
          initialPosition={parseInt(initialPosition, 10)}
          className="rounded-2xl"
        />
      </div>
    </div>
  );
}
