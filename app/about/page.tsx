"use client";

import PhotobookTrigger from "@/components/about/PhotobookTrigger";
import WhoIsNat from "@/components/about/WhoIsNat";
import CurrentlyLearning from "@/components/about/CurrentlyLearning";
import Bookshelf from "@/components/about/Bookshelf";
import PlaylistLink from "@/components/about/PlaylistLink";
import AffirmationSection from "./AffirmationSection";
import { photos, learningItems, books, playlist } from "@/content/about";
import { useI18n } from "@/lib/i18n";

export default function AboutPage() {
  const { t } = useI18n();

  const sections = [
    { label: t.about.curious.label, text: t.about.curious.text },
    { label: t.about.human.label, text: t.about.human.text },
    { label: t.about.ethical.label, text: t.about.ethical.text },
  ];

  return (
    <div className="max-w-3xl mx-auto px-6 pt-32 pb-16">
      {/* Header */}
      <h1 className="font-sans text-7xl font-normal tracking-tight text-text-primary mb-4">
        {t.about.title}
      </h1>
      <p className="text-lg text-text-secondary mb-16">{t.about.tagline}</p>

      {/* Photobook */}
      <PhotobookTrigger photos={photos} />

      {/* Who Is Nat */}
      <section className="mb-16">
        <WhoIsNat
          sections={sections}
          lifestyle={t.about.lifestyle.text}
          currentlyLearning={t.about.currentlyLearning}
          goal={t.about.goal}
        />
      </section>

      {/* Affirmation Cards */}
      <section className="mb-16">
        <AffirmationSection />
      </section>

      {/* Currently Learning */}
      <CurrentlyLearning items={learningItems} />

      {/* Bookshelf */}
      <Bookshelf books={books} />

      {/* Playlist */}
      <PlaylistLink
        href={playlist.href}
        label={playlist.label}
        platform={playlist.platform}
      />
    </div>
  );
}
