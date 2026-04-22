"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { CaseStudy } from "@/lib/types";
import { useI18n } from "@/lib/i18n";

export default function CaseStudyHeader({
  study,
}: {
  study: CaseStudy;
}) {
  const { locale } = useI18n();
  const displayTitle = locale === "es" && study.titleEs ? study.titleEs : study.title;

  return (
    <section
      className="relative w-full pt-24 pb-16 px-6 lg:px-24"
      style={{ backgroundColor: study.heroBg || study.cardBg }}
    >
      <div className="mx-auto max-w-7xl flex flex-col md:flex-row items-center gap-12">
        {study.heroImage && (
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="md:w-1/2 flex items-center justify-center"
          >
            {study.heroWide ? (
              /* Wide hero — two phones or landscape artwork */
              <div
                className="overflow-hidden shadow-[0_8px_40px_-8px_rgba(25,42,81,0.15)]"
                style={{ maxWidth: "100%", borderRadius: 20 }}
              >
                <Image
                  src={study.heroImage}
                  alt={`${study.client} hero`}
                  width={640}
                  height={420}
                  className="object-contain w-full h-auto block"
                  style={{ borderRadius: 20 }}
                  priority
                />
              </div>
            ) : (
              /* Portrait phone — single screenshot */
              <div
                className="overflow-hidden shadow-[0_8px_40px_-8px_rgba(25,42,81,0.15)]"
                style={{ width: 360, maxWidth: "100%", borderRadius: 20 }}
              >
                <Image
                  src={study.heroImage}
                  alt={`${study.client} hero`}
                  width={360}
                  height={640}
                  className="object-contain w-full h-auto block"
                  style={{ borderRadius: 20 }}
                  priority
                />
              </div>
            )}
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="md:w-1/2"
        >
          <span className="font-sans text-xs font-medium uppercase tracking-widest text-text-secondary mb-4 block">
            {study.client}
          </span>

          <h1 className="font-sans text-4xl lg:text-5xl font-extrabold tracking-tight text-text-primary mb-6">
            {displayTitle}
          </h1>

          <div className="flex flex-wrap items-center gap-3 text-sm text-text-secondary mb-4">
            {study.role && <span>{study.role}</span>}
            {study.platform && (
              <>
                <span className="text-border-subtle">·</span>
                <span>{study.platform}</span>
              </>
            )}
{/* timeline removed from header */}
          </div>

          <div className="flex flex-wrap gap-2">
            {study.tags?.map((tag) => (
              <span
                key={tag}
                className="text-xs font-medium text-text-secondary bg-white/50 px-3 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
