"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useI18n } from "@/lib/i18n";

export default function NextProject({
  slug,
  client,
  headline,
  cardBg,
}: {
  slug: string;
  client: string;
  headline: string;
  cardBg: string;
}) {
  const { t } = useI18n();

  return (
    <section className="px-6 lg:px-24 py-16 border-t border-border-subtle">
      <div className="mx-auto max-w-7xl">
        <p className="text-xs font-medium uppercase tracking-widest text-text-secondary mb-6">
          {t.caseStudyPage.nextProject}
        </p>

        <motion.div
          whileHover={{ y: -4 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
        >
          <Link
            href={`/work/${slug}`}
            prefetch={true}
            className="group flex items-center gap-6 rounded-2xl overflow-hidden border border-border-subtle bg-white"
          >
            <div
              className="w-4 self-stretch shrink-0"
              style={{ backgroundColor: cardBg }}
            />
            <div className="flex-1 py-6 pr-6">
              <span className="text-xs font-medium uppercase tracking-widest text-text-secondary block mb-1">
                {client}
              </span>
              <span className="text-lg font-semibold text-text-primary group-hover:text-accent-coral transition-colors">
                {headline}
              </span>
            </div>
            <motion.span
              className="text-xl text-text-primary pr-6"
              initial={{ x: 0 }}
              whileHover={{ x: 4 }}
            >
              →
            </motion.span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
