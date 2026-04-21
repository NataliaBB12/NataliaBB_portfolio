"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { InsightCardProps } from "@/lib/types";

export default function InsightCard({ label, children, accent }: InsightCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const springConfig = { stiffness: 200, damping: 20 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const rotateX = useTransform(smoothY, [0, 1], [6, -6]);
  const rotateY = useTransform(smoothX, [0, 1], [-6, 6]);

  const glowX = useMotionValue(50);
  const glowY = useMotionValue(50);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    mouseX.set(x);
    mouseY.set(y);
    glowX.set(x * 100);
    glowY.set(y * 100);
  }

  function handleMouseLeave() {
    mouseX.set(0.5);
    mouseY.set(0.5);
    glowX.set(50);
    glowY.set(50);
  }

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformPerspective: 800,
      }}
      className="relative rounded-xl border border-border-subtle bg-white/60 backdrop-blur-sm px-6 py-5 my-4 overflow-hidden cursor-default"
    >
      {/* Glow overlay */}
      <motion.div
        className="pointer-events-none absolute inset-0 rounded-xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: useTransform(
            [glowX, glowY],
            ([x, y]) =>
              `radial-gradient(circle at ${x}% ${y}%, rgba(255, 107, 107, 0.15) 0%, transparent 60%)`
          ),
          opacity: useTransform(smoothX, [0.3, 0.5, 0.7], [1, 0.6, 1]),
        }}
      />

      {/* Content */}
      <div className="relative z-10">
        <span className="font-sans text-[11px] font-medium uppercase tracking-widest text-text-secondary/70 block mb-2">
          {label}
        </span>
        <div className={`font-sans text-lg font-semibold text-text-primary ${accent ? "[&_strong]:text-accent-coral [&_strong]:font-bold" : ""}`}>
          {children}
        </div>
      </div>
    </motion.div>
  );
}
