"use client";

import { useState, useCallback, useMemo } from "react";
import AffirmationTrigger from "@/components/about/AffirmationTrigger";
import AffirmationModal from "@/components/about/AffirmationModal";
import { affirmations, shuffleArray } from "@/content/affirmations";

export default function AffirmationSection() {
  const [isOpen, setIsOpen] = useState(false);
  const [deck, setDeck] = useState(() => shuffleArray(affirmations));
  const [index, setIndex] = useState(0);

  const currentAffirmation = deck[index % deck.length];

  const handleNext = useCallback(() => {
    const nextIndex = index + 1;
    if (nextIndex >= deck.length) {
      setDeck(shuffleArray(affirmations));
      setIndex(0);
    } else {
      setIndex(nextIndex);
    }
  }, [index, deck.length]);

  return (
    <>
      <AffirmationTrigger onClick={() => setIsOpen(true)} />
      <AffirmationModal
        isOpen={isOpen}
        affirmation={currentAffirmation}
        onClose={() => setIsOpen(false)}
        onNext={handleNext}
      />
    </>
  );
}
