"use client";

import { TextRotate } from "@/components/ui/text-rotate";
import { useI18n } from "@/lib/i18n";

type CaseTextRotateProps = {
  texts: string; // pipe-separated list: "Text one|Text two|Text three"
  textsEs?: string;
  label?: string;
  labelEs?: string;
  rotationInterval?: string; // ms as string for MDX compat
};

export default function CaseTextRotate({
  texts,
  textsEs,
  label = "What users were asking",
  labelEs,
  rotationInterval = "2800",
}: CaseTextRotateProps) {
  const { locale } = useI18n();
  const activeTexts = locale === "es" && textsEs ? textsEs : texts;
  const activeLabel = locale === "es" && labelEs ? labelEs : label;
  const items = activeTexts
    .split("|")
    .map((t) => t.trim())
    .filter(Boolean);

  return (
    <div className="relative my-10 rounded-2xl border border-border-subtle bg-white/60 backdrop-blur-sm overflow-hidden px-8 py-10 flex flex-col items-center gap-4">
      {/* Label */}
      <span className="font-sans text-[11px] font-medium uppercase tracking-widest text-text-secondary/60">
        {activeLabel}
      </span>

      {/* Rotating text */}
      <div className="w-full flex justify-center min-h-[2.5rem] overflow-hidden">
        <TextRotate
          texts={items}
          rotationInterval={parseInt(rotationInterval, 10)}
          splitBy="words"
          mainClassName="text-xl sm:text-2xl font-semibold text-text-primary text-center justify-center"
          splitLevelClassName="overflow-hidden"
          staggerFrom="first"
          staggerDuration={0.04}
          animatePresenceMode="wait"
          loop
          auto
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30 }}
          transition={{ type: "spring", duration: 0.5, bounce: 0 }}
        />
      </div>

      {/* Dot indicators */}
      <div className="flex gap-1.5 mt-2">
        {items.map((_, i) => (
          <span
            key={i}
            className="w-1.5 h-1.5 rounded-full bg-text-secondary/30"
          />
        ))}
      </div>
    </div>
  );
}
