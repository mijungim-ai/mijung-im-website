import type { ReactNode } from "react";

export function Placeholder({
  label,
  children,
  surfaceClassName = "bg-ink",
  compact = false,
}: {
  label: string;
  children: ReactNode;
  surfaceClassName?: string;
  compact?: boolean;
}) {
  if (compact) {
    return (
      <div className="border border-dashed border-grey-muted/50 px-4 py-3 flex items-center justify-between gap-4">
        {children}
        <span className="label shrink-0 text-[10px] text-grey-muted">
          {label}
        </span>
      </div>
    );
  }

  return (
    <div className="relative border border-dashed border-grey-muted/50 p-6">
      <span
        className={`label absolute -top-3 left-4 px-2 text-[11px] text-grey-muted ${surfaceClassName}`}
      >
        {label}
      </span>
      <div className="pt-1">{children}</div>
    </div>
  );
}
