"use client";

import { useI18n } from "@/lib/i18n";

export default function AffirmationTrigger({
  onClick,
}: {
  onClick: () => void;
}) {
  const { t } = useI18n();

  return (
    <button
      onClick={onClick}
      className="w-full flex items-center justify-between border border-text-primary/10 rounded-2xl px-7 py-5 hover:bg-text-primary/[0.05] transition-colors text-left"
    >
      <span className="text-base text-text-primary">
        {t.about.affirmation.trigger}
      </span>
      <span className="text-sm font-medium text-text-primary">
        {t.about.affirmation.open} ✦
      </span>
    </button>
  );
}
