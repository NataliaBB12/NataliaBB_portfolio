export const affirmations = [
  "You are doing better than you think.",
  "Your curiosity is your greatest tool.",
  "Rest is part of the process.",
  "Good design starts with listening.",
  "You don't have to figure it all out today.",
  "Your perspective is exactly what's needed.",
  "Progress, not perfection.",
  "The right idea will come. Stay open.",
  "You belong in every room you enter.",
  "Small steps are still steps forward.",
  "I am in charge of how I feel and I choose to feel happy.",
  "I am proud of myself for daring to try; most people don't even do that.",
  "I can handle whatever comes at me. I am a strong, capable person.",
  "I have done difficult things in the past, and I can do them again.",
  "I trust my intuition and inner wisdom to guide my decisions.",
  "I am doing the best I can with what I have.",
  "I am open to receiving new opportunities and blessings.",
];

/** Fisher-Yates shuffle */
export function shuffleArray<T>(arr: T[]): T[] {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}
