import type { ReactNode } from "react";

// Shared italic statement style for page-header intros (About's Hinson
// quote, Performances' header statement, and future Media/Dialogue/
// Projects intros) — font-size, line-height, and the italic serif face
// are centralized here so they stay in sync across pages. Color, margin,
// and max-width are left to the caller via className.
export function PageHeaderStatement({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p
      className={`display-serif text-[clamp(16px,1.8vw,20px)] leading-relaxed ${className}`}
    >
      {children}
    </p>
  );
}
