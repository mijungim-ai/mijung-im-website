import type { ReactNode } from "react";

// Standard page-header wrapper — the pt-16 (nav clearance) + bordered
// intro block duplicated near-identically across About/Performances/
// Media/Dialogue/Projects/Contact, now centralized. The border-b sits
// at this div's bottom edge, so pb-5 md:pb-8 only carries HALF of
// the header-to-body gap (A) — the other half (pt-5 md:pt-8) belongs
// on the page's first <Section> only, never on Section itself or the
// whole space-y wrapper, so the line ends up with even space above
// and below it instead of being glued to the next heading.
export function PageHeaderSection({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className="pt-16">
      <div
        className={`mx-auto max-w-6xl px-6 pt-10 md:pt-16 pb-5 md:pb-8 border-b border-sage/25 ${className}`}
      >
        {children}
      </div>
    </section>
  );
}
