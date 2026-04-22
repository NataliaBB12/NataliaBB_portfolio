"use client";

import { useI18n } from "@/lib/i18n";
import { ReactNode } from "react";

export default function TranslatedH3({ children }: { children?: ReactNode }) {
  const { t } = useI18n();
  const text = typeof children === "string" ? children : "";
  const map = (t.caseStudyPage as any).h3s as Record<string, string> | undefined;
  const translated = map?.[text] ?? text;

  return (
    <h3 className="font-sans text-lg font-semibold text-text-primary mt-8 mb-3">
      {translated}
    </h3>
  );
}
