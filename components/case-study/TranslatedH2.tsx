"use client";

import { useI18n } from "@/lib/i18n";
import { ReactNode } from "react";

export default function TranslatedH2({ children }: { children?: ReactNode }) {
  const { t } = useI18n();
  const text = typeof children === "string" ? children : "";
  const sections = t.caseStudyPage.sections as Record<string, string>;
  const translated = sections[text] ?? text;

  return (
    <h2 className="font-sans text-2xl font-bold text-text-primary border-b border-border-subtle pb-3 mt-16 mb-6">
      {translated}
    </h2>
  );
}
