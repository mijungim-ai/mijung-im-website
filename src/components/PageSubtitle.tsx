import type { ReactNode } from "react";

// Shared subtitle style for page-header intros — a single short line in
// text-grey-muted, sitting under the H1. Centralized here (font-size,
// color, italic serif face) so About/Performances/Media/Dialogue/
// Projects/Contact stay in sync. Margin is left to the caller via
// className.
export function PageSubtitle({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p className={`display-serif text-h2 text-grey-muted ${className}`}>
      {children}
    </p>
  );
}
