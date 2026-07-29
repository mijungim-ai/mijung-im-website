import type { ReactNode } from "react";

// Standard body-section wrapper — centralizes the site's vertical
// rhythm. Two adjacent <Section>s combine to ~224px on desktop
// (112px padding each), the value validated on About's photo
// grid/Bio/EPK sequence, now applied everywhere. py-14 on mobile
// halves that, matching the existing pt-10 md:pt-16 precedent on the
// Home hero title.
export function Section({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={`mx-auto max-w-3xl px-6 py-14 md:py-28 ${className}`}>
      {children}
    </section>
  );
}
