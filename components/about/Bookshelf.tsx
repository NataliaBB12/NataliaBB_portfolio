"use client";

import { motion } from "framer-motion";
import { Book } from "@/lib/types";
import { useI18n } from "@/lib/i18n";

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export default function Bookshelf({ books }: { books: Book[] }) {
  const { t } = useI18n();

  const groups: { key: Book["status"]; label: string }[] = [
    { key: "reading", label: t.about.bookshelf.reading },
    { key: "finished", label: t.about.bookshelf.finished },
    { key: "up-next", label: t.about.bookshelf.upNext },
  ];

  return (
    <section className="py-12">
      <h2 className="font-sans text-xs font-medium uppercase tracking-[0.15em] text-text-secondary/50 mb-10">
        {t.about.bookshelf.heading}
      </h2>

      <div className="space-y-10">
        {groups.map((group) => {
          const items = books.filter((b) => b.status === group.key);
          if (items.length === 0) return null;

          return (
            <motion.div
              key={group.key}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              <h3 className="font-sans text-[11px] font-semibold uppercase tracking-[0.12em] text-text-primary/40 mb-4">
                {group.label}
              </h3>

              <div className="space-y-0 divide-y divide-text-primary/6">
                {items.map((book) => (
                  <BookRow key={book.title} book={book} />
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

function BookRow({ book }: { book: Book }) {
  const inner = (
    <div className="group flex items-baseline justify-between gap-4 py-3">
      <div className="min-w-0">
        <span className="font-sans text-[15px] text-text-primary group-hover:text-accent-coral transition-colors duration-200">
          {book.title}
        </span>
        {book.link && (
          <svg
            width="11"
            height="11"
            viewBox="0 0 10 10"
            fill="none"
            className="inline-block ml-1.5 -mt-0.5 text-text-primary/25 group-hover:text-accent-coral transition-colors duration-200"
          >
            <path
              d="M3 1h6v6M9 1L1 9"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </div>
      <span className="font-sans text-[12px] text-text-secondary/40 whitespace-nowrap shrink-0">
        {book.author}
      </span>
    </div>
  );

  if (book.link) {
    return (
      <a
        href={book.link}
        target="_blank"
        rel="noopener noreferrer"
        className="block cursor-pointer"
      >
        {inner}
      </a>
    );
  }

  return inner;
}
