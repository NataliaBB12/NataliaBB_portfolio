"use client";

import { useI18n } from "@/lib/i18n";

export default function Footer() {
  const { t } = useI18n();

  return (
    <footer className="border-t border-border-subtle px-6 py-16 lg:px-24">
      <div className="mx-auto max-w-7xl">
        <h2 className="font-sans text-3xl md:text-4xl font-bold text-text-primary mb-4">
          {t.footer.heading}
        </h2>
        <p className="text-base text-text-secondary mb-8">
          {t.footer.emailPre}{" "}
          <a
            href="mailto:natalia.bustosbonfil@gmail.com"
            className="text-text-primary font-medium hover:text-accent-coral transition-colors underline underline-offset-4"
          >
            natalia.bustosbonfil@gmail.com
          </a>{" "}
          {t.footer.emailPost}
        </p>

        <div className="flex items-center gap-6 mb-12">
          <a
            href="https://docs.google.com/document/d/1mn3vAonlUZSNMq971rPfVNIFgDXQvxO9KXJyFDThdwk/edit?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-text-primary hover:text-accent-coral transition-colors"
          >
            {t.footer.resume}
          </a>
          <a
            href="https://www.linkedin.com/in/natalia-bubon/?skipRedirect=true"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-text-primary hover:text-accent-coral transition-colors"
          >
            LinkedIn
          </a>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-xs text-text-secondary">
          <p>📍 {t.footer.location}</p>
          <p>&copy; {new Date().getFullYear()} {t.footer.rights}</p>
        </div>
      </div>
    </footer>
  );
}
