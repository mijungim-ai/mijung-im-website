import { ExternalLinkGlyph } from "@/components/icons/ExternalLinkGlyph";

export function LinkEntry({ title, href }: { title: string; href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center justify-between gap-4 border-b border-hairline py-4 text-ivory/90 hover:text-sage transition-colors"
    >
      <span className="text-body">{title}</span>
      <ExternalLinkGlyph className="w-4 h-4 shrink-0" />
    </a>
  );
}
