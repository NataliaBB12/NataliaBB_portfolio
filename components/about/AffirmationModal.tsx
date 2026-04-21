"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useI18n } from "@/lib/i18n";

export default function AffirmationModal({
  isOpen,
  affirmation,
  onClose,
  onNext,
}: {
  isOpen: boolean;
  affirmation: string;
  onClose: () => void;
  onNext: () => void;
}) {
  const { t } = useI18n();
  const cardRef = useRef<HTMLDivElement>(null);
  const [spotlightPos, setSpotlightPos] = useState({ x: 0, y: 0 });
  const [spotlightOpacity, setSpotlightOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setSpotlightPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Affirmation card"
          className="fixed inset-0 z-50 flex items-center justify-center px-4"
          onClick={onClose}
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-text-primary/60 backdrop-blur-sm"
          />

          {/* Card with spotlight */}
          <motion.div
            ref={cardRef}
            initial={{ scale: 0.96, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.96, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="relative z-10 bg-bg-primary border border-text-primary/10 rounded-3xl max-w-sm w-full p-10 text-center overflow-hidden cursor-default"
            onClick={(e) => e.stopPropagation()}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setSpotlightOpacity(0.5)}
            onMouseLeave={() => setSpotlightOpacity(0)}
          >
            {/* Spotlight glow layer */}
            <div
              className="pointer-events-none absolute inset-0 transition-opacity duration-500 ease-in-out"
              style={{
                opacity: spotlightOpacity,
                background: `radial-gradient(circle at ${spotlightPos.x}px ${spotlightPos.y}px, rgba(255, 107, 107, 0.15), transparent 70%)`,
              }}
            />

            <button
              onClick={onClose}
              className="relative z-10 absolute top-4 right-5 text-text-secondary/50 hover:text-text-primary transition-colors duration-200"
              aria-label="Close"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              >
                <line x1="3" y1="3" x2="13" y2="13" />
                <line x1="13" y1="3" x2="3" y2="13" />
              </svg>
            </button>

            <span className="relative z-10 text-[28px] text-accent-coral/30 block mb-6">
              ✦
            </span>

            <AnimatePresence mode="wait">
              <motion.p
                key={affirmation}
                initial={{ rotateY: 90, opacity: 0 }}
                animate={{ rotateY: 0, opacity: 1 }}
                exit={{ rotateY: -90, opacity: 0 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                style={{ transformPerspective: 800 }}
                className="relative z-10 font-sans text-[22px] font-normal italic text-text-primary leading-snug mb-8"
                autoFocus
                tabIndex={0}
              >
                &ldquo;{affirmation}&rdquo;
              </motion.p>
            </AnimatePresence>

            <button
              onClick={onNext}
              className="relative z-10 border border-text-primary/15 rounded-full px-6 py-2.5 text-[13px] font-medium text-text-primary/70 hover:text-text-primary hover:border-text-primary/30 transition-all duration-200"
            >
              {t.about.affirmation.drawAnother}
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
