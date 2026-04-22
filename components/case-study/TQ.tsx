"use client";

import { useI18n } from "@/lib/i18n";

/**
 * TQ — Translated blockquote.
 * Use instead of > markdown syntax when the quote needs a Spanish version.
 */
export default function TQ({ en, es }: { en: string; es: string }) {
  const { locale } = useI18n();
  return (
    <blockquote className="border-l-4 border-text-primary/30 italic pl-6 my-6 text-text-secondary">
      {locale === "es" ? es : en}
    </blockquote>
  );
}
