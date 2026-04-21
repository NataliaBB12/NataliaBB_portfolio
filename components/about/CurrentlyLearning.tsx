"use client";

import { LearningItem } from "@/lib/types";
import { useI18n } from "@/lib/i18n";

const statusColors = {
  "in-progress": "bg-green-400",
  "just-started": "bg-yellow-400",
  "wrapping-up": "bg-gray-400",
};

export default function CurrentlyLearning({
  items,
}: {
  items: LearningItem[];
}) {
  const { t } = useI18n();

  return (
    <section className="py-12">
      <h2 className="font-sans text-xs font-medium uppercase tracking-widest text-text-secondary mb-8">
        {t.about.learning.heading}
      </h2>

      <div className="space-y-6">
        {items.map((item) => (
          <div key={item.topic} className="flex gap-4">
            <span
              className={`w-2.5 h-2.5 rounded-full mt-1.5 shrink-0 ${statusColors[item.status]}`}
            />
            <div>
              <p className="font-sans text-base font-medium text-text-primary">
                {item.topic}
              </p>
              {item.context && (
                <p className="font-sans text-sm text-text-secondary mt-0.5">
                  {item.context}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
