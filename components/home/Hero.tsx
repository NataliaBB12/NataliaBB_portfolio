"use client";

import { motion } from "framer-motion";
import { useI18n } from "@/lib/i18n";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

export default function Hero() {
  const { t } = useI18n();

  return (
    <section className="relative min-h-screen flex flex-col justify-start md:justify-center px-6 lg:px-24 pt-28 md:pt-0">
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="max-w-3xl"
      >
        <motion.h1
          variants={item}
          className="font-sans text-7xl lg:text-9xl font-normal tracking-tight text-text-primary mb-6"
        >
          <span className="text-4xl lg:text-5xl inline-block mb-2">👋</span>
          <br />
          {t.hero.greeting}
          <br />
          {t.hero.name}
        </motion.h1>

        <motion.p
          variants={item}
          className="text-base lg:text-lg text-text-secondary leading-relaxed max-w-2xl mb-6"
        >
          {t.hero.intro}
        </motion.p>

        <motion.p
          variants={item}
          className="text-base lg:text-lg text-text-secondary leading-relaxed max-w-2xl"
        >
          {t.hero.experience}
        </motion.p>

        <motion.p
          variants={item}
          className="text-base lg:text-lg text-text-secondary leading-relaxed max-w-2xl mt-6"
        >
          {t.hero.social}
        </motion.p>
      </motion.div>

      {/* Decorative floating dot */}
      <motion.div
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute right-12 lg:right-24 top-1/3 w-10 h-10 rounded-full bg-accent-coral hidden md:block"
      />
    </section>
  );
}
