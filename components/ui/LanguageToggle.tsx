"use client";

import { useI18n } from "@/lib/i18n";
import { motion } from "framer-motion";

export default function LanguageToggle() {
  const { locale, toggleLocale } = useI18n();

  return (
    <button
      onClick={toggleLocale}
      className="relative flex items-center w-[52px] h-[28px] rounded-full border border-text-primary/15 bg-white/60 backdrop-blur-sm transition-colors hover:border-text-primary/30"
      aria-label={`Switch to ${locale === "en" ? "Spanish" : "English"}`}
    >
      <motion.div
        className="absolute w-[22px] h-[22px] rounded-full bg-text-primary flex items-center justify-center"
        animate={{ x: locale === "en" ? 3 : 25 }}
        transition={{ type: "spring", stiffness: 400, damping: 28 }}
      >
        <span className="text-[9px] font-semibold text-text-inverse uppercase leading-none">
          {locale === "en" ? "EN" : "ES"}
        </span>
      </motion.div>
      <span className="absolute left-[8px] text-[9px] font-medium text-text-secondary/60 uppercase">
        {locale === "en" ? "" : "EN"}
      </span>
      <span className="absolute right-[7px] text-[9px] font-medium text-text-secondary/60 uppercase">
        {locale === "en" ? "ES" : ""}
      </span>
    </button>
  );
}
