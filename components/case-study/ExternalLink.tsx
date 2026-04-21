import { ExternalLinkProps } from "@/lib/types";

const icons: Record<ExternalLinkProps["icon"], string> = {
  figma: "🎨",
  prototype: "📱",
  research: "🔬",
  link: "🔗",
};

export default function ExternalLink({ href, label, icon }: ExternalLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center justify-between w-full border border-text-primary/20 rounded-full px-6 py-3 my-4 text-sm font-medium text-text-primary hover:bg-text-primary/[0.04] transition-colors"
    >
      <span className="flex items-center gap-3">
        <span>{icons[icon]}</span>
        {label}
      </span>
      <span>↗</span>
    </a>
  );
}
