"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { CaseStudy } from "@/lib/types";
import { useI18n } from "@/lib/i18n";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const cardReveal = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE },
  },
};

export default function CaseStudyGrid({
  caseStudies,
}: {
  caseStudies: CaseStudy[];
}) {
  const { t } = useI18n();

  return (
    <section id="work" className="px-6 lg:px-24 py-24">
      <div className="mx-auto max-w-7xl flex flex-col gap-6">
        {caseStudies.map((cs, i) => (
          <motion.div
            key={cs.slug}
            variants={cardReveal}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
          >
            <Link
              href={`/work/${cs.slug}`}
              aria-label={`View ${cs.client} case study`}
              className="group block"
            >
              <div className="flex flex-col md:flex-row rounded-2xl overflow-hidden border border-border-subtle hover:border-text-primary/15 transition-all duration-500 hover:shadow-[0_8px_40px_-12px_rgba(25,42,81,0.12)]">
                {/* Preview area */}
                <div
                  className="md:w-[45%] relative overflow-hidden"
                  style={{ backgroundColor: cs.cardBg }}
                >
                  <div className="p-8 md:p-10 flex items-center justify-center min-h-[260px] md:min-h-[320px]">
                    {cs.previewImage && (
                      <motion.div
                        className="relative"
                        whileHover={{ scale: 1.03 }}
                        transition={{
                          duration: 0.5,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                      >
                        <Image
                          src={cs.previewImage}
                          alt={`${cs.client} preview`}
                          width={400}
                          height={300}
                          className="object-contain w-auto drop-shadow-lg"
                          style={{ maxHeight: cs.previewMaxH ? `${cs.previewMaxH}px` : "240px" }}
                        />
                      </motion.div>
                    )}
                  </div>
                </div>

                {/* Info area */}
                <div className="md:w-[55%] bg-white p-8 md:p-10 lg:p-12 flex flex-col justify-center">
                  {/* Client label */}
                  <span className="text-[11px] font-medium uppercase tracking-[0.15em] text-text-secondary/50 mb-3">
                    {cs.client}
                  </span>

                  <h3 className="font-sans text-xl md:text-2xl font-normal text-text-primary leading-snug mb-5 tracking-[-0.01em]">
                    {cs.title}
                  </h3>

                  <div className="flex flex-wrap gap-2 mb-8">
                    {cs.tags?.map((tag) => (
                      <span
                        key={tag}
                        className="text-[11px] font-medium text-text-secondary/70 border border-text-primary/8 px-3 py-1 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <span className="inline-flex items-center gap-2 text-[13px] font-medium text-text-primary/70 group-hover:text-accent-coral transition-colors duration-300">
                    {t.caseStudy.cta}
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    >
                      <path
                        d="M3 8h10M9 4l4 4-4 4"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
