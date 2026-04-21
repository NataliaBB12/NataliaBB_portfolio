"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useI18n } from "@/lib/i18n";

const pillarIcons = [
  "/images/icons/design-principle-actionable.svg",
  "/images/icons/design-principle-people.svg",
  "/images/icons/design-principle-kaizen.svg",
];

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

export default function Philosophy() {
  const { t } = useI18n();

  const pillars = [
    { icon: pillarIcons[0], ...t.philosophy.kaizen },
    { icon: pillarIcons[1], ...t.philosophy.people },
    { icon: pillarIcons[2], ...t.philosophy.actionable },
  ];

  return (
    <section className="px-6 lg:px-24 py-24">
      <div className="mx-auto max-w-7xl">
        <h2 className="font-sans text-4xl lg:text-5xl font-normal text-text-primary mb-16">
          {t.philosophy.heading}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {pillars.map((pillar, i) => (
            <motion.div
              key={pillar.title}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="relative w-12 h-12 mb-5">
                <Image
                  src={pillar.icon}
                  alt=""
                  width={48}
                  height={48}
                  className="w-12 h-12 object-contain"
                  aria-hidden="true"
                />
              </div>
              <h3 className="font-sans text-xl font-normal text-text-primary mb-3">
                {pillar.title}
              </h3>
              <p className="text-base text-text-secondary leading-relaxed">
                {pillar.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
