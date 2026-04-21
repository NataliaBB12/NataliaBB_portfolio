import { PlaylistLinkProps } from "@/lib/types";

const platformIcons: Record<PlaylistLinkProps["platform"], string> = {
  spotify: "🎵",
  "apple-music": "🎶",
  youtube: "▶️",
  other: "🔗",
};

export default function PlaylistLink({
  href,
  label,
  platform,
}: PlaylistLinkProps) {
  if (!href) return null;

  return (
    <section className="py-12">
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-between w-full border border-text-primary/20 rounded-full px-6 py-3 text-sm font-medium text-text-primary hover:bg-text-primary/[0.04] transition-colors"
      >
        <span className="flex items-center gap-3">
          <span>{platformIcons[platform]}</span>
          {label}
        </span>
        <span>↗</span>
      </a>
    </section>
  );
}
