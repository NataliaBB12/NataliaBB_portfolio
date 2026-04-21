"use client";

type CaseVideoProps = {
  srcs: string;
  caption?: string;
  width?: string;
  height?: string;
  fit?: "contain" | "cover" | "natural";
};

export default function CaseVideo({
  srcs,
  caption,
  width = "360",
  height = "640",
  fit = "cover",
}: CaseVideoProps) {
  const videos = srcs.split(",").map((s) => s.trim()).filter(Boolean);
  const w = parseInt(width, 10) || 360;
  const h = parseInt(height, 10) || 640;
  const isNatural = fit === "natural";

  return (
    <div className="my-8 flex flex-wrap gap-6 justify-center">
      {videos.map((src, i) => (
        <figure key={i} className="flex flex-col items-center gap-3">
          <div
            className="overflow-hidden shadow-[0_4px_24px_-6px_rgba(25,42,81,0.12)] bg-black"
            style={{
              borderRadius: 20,
              ...(isNatural
                ? { maxWidth: "100%" }
                : { width: w, height: h, flexShrink: 0 }),
            }}
          >
            <video
              src={src}
              autoPlay
              loop
              muted
              playsInline
              style={{
                display: "block",
                borderRadius: 20,
                ...(isNatural
                  ? { width: "100%", height: "auto", maxWidth: "900px" }
                  : { width: "100%", height: "100%", objectFit: fit, objectPosition: "center" }),
              }}
            />
          </div>
          {caption && (
            <figcaption className="text-center text-xs font-light text-text-secondary mt-1">
              {caption}
            </figcaption>
          )}
        </figure>
      ))}
    </div>
  );
}
