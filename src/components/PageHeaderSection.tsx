import type { ReactNode } from "react";

// Standard page-header wrapper — the pt-16 (nav clearance) + bordered
// intro block duplicated near-identically across About/Performances/
// Media/Dialogue/Projects/Contact, now centralized. The inner py-14
// md:py-28 is the SOLE contributor to the header-to-body gap (A) —
// <Section> has no padding of its own, so this single 112px (56px
// mobile) is never doubled.
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
