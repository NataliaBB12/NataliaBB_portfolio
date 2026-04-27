"use client";

import { motion } from "framer-motion";
import { useI18n } from "@/lib/i18n";

export default function Manifesto() {
  const { t } = useI18n();

  return (
    <section className="relative px-6 lg:px-24 pt-24 pb-16 overflow-hidden overflow-x-hidden">
      {/* Gradient glow — organic peach->pink->lavender blob */}
      <motion.div
        animate={{ scale: [1, 1.06, 1], rotate: [0, 2, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] h-[260px] pointer-events-none"
        aria-hidden="true"
      >
        <div
          className="absolute inset-0 rounded-full blur-[60px] opacity-70"
          style={{
            background:
              "radial-gradient(ellipse 70% 60% at 35% 30%, rgba(216, 160, 130, 0.8) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute inset-0 rounded-full blur-[60px] opacity-65"
          style={{
            background:
              "radial-gradient(ellipse 65% 55% at 45% 45%, rgba(210, 150, 175, 0.75) 0%, transparent 65%)",
          }}
        />
        <div
          className="absolute inset-0 rounded-full blur-[60px] opacity-60"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 55% 60%, rgba(185, 160, 210, 0.7) 0%, transparent 65%)",
          }}
        />
        <div
          className="absolute inset-0 rounded-full blur-[70px] opacity-40"
          style={{
            background:
              "radial-gradient(ellipse 50% 35% at 50% 20%, rgba(240, 220, 230, 0.8) 0%, transparent 60%)",
          }}
        />
      </motion.div>

      {/* Content — right-aligned */}
      <div className="relative mx-auto max-w-7xl flex flex-col items-end text-right">
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-sans font-normal text-text-primary mb-6 text-[44px] sm:text-[64px] md:text-[96px] lg:text-[120px] xl:text-[146px] leading-none"
        >
          {t.manifesto.title}
          <br />
          {t.manifesto.titleLine2}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="text-lg text-text-secondary leading-relaxed max-w-xl"
        >
          {t.manifesto.subtitle}
        </motion.p>
      </div>
    </section>
  );
}
