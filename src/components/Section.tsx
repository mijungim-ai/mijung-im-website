import type { ReactNode } from "react";

// Standard body-section wrapper — horizontal centering only. Vertical
// rhythm is NOT this component's job: siblings get their single
// 112px (56px mobile) gap from the parent's space-y-14 md:space-y-28
// wrapper, so two adjacent <Section>s never double-pad into 224px.
export function Section({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={`mx-auto max-w-3xl px-6 ${className}`}>
      {children}
    </section>
  );
}
