"use client";

import { useI18n } from "@/lib/i18n";

/**
 * T — Translated paragraph.
 * Use as a drop-in replacement for body paragraphs that need bilingual support.
 * Renders as a <p> tag with the same styling as the MDX paragraph override.
 */
export default function T({ en, es }: { en: string; es: string }) {
  const { locale } = useI18n();
  return (
    <p className="font-sans text-base leading-relaxed text-text-secondary mb-4">
      {locale === "es" ? es : en}
    </p>
  );
}
