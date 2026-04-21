"use client";

import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  },
};

type WhoIsNatProps = {
  sections: { label: string; text: string }[];
  lifestyle: string;
  currentlyLearning: string;
  goal: string;
};

export default function WhoIsNat({
  sections,
  lifestyle,
  currentlyLearning,
  goal,
}: WhoIsNatProps) {
  return (
    <div>
      {/* Main sections */}
      <div className="divide-y divide-text-primary/8">
        {sections.map((section) => (
          <motion.div
            key={section.label}
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="py-8"
          >
            <span className="font-sans text-[11px] font-medium uppercase tracking-[0.15em] text-text-secondary/50 block mb-4">
              {section.label}
            </span>
            <p className="font-sans text-base text-text-primary leading-relaxed">
              {section.text}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Lifestyle + Currently Learning + Goal */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="mt-6 space-y-4"
      >
        <p className="font-sans text-base text-text-primary leading-relaxed italic">
          {lifestyle}
        </p>

        <p className="font-sans text-base text-text-primary leading-relaxed">
          {currentlyLearning}
        </p>

        <p className="font-sans text-[13px] text-text-secondary/70 leading-relaxed mt-2">
          {goal}
        </p>
      </motion.div>
    </div>
  );
}
