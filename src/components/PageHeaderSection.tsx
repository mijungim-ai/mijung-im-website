import type { ReactNode } from "react";

// Standard page-header wrapper — the pt-16 (nav clearance) + bordered
// intro block duplicated near-identically across About/Performances/
// Media/Dialogue/Projects/Contact, now centralized. The inner py-14
// md:py-28 pairs with Section's own top padding so the header-to-body
// gap (A) matches the section-to-section gap (B): ~224px on desktop,
// ~112px on mobile.
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
        className={`mx-auto max-w-6xl px-6 py-14 md:py-28 border-b border-hairline ${className}`}
      >
        {children}
      </div>
    </section>
  );
}
