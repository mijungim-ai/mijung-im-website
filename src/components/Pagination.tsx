"use client";

import { useTranslations } from "next-intl";

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}) {
  const t = useTranslations("common");

  if (totalPages <= 1) return null;

  return (
    <nav
      aria-label={t("paginationLabel")}
      className="flex justify-center gap-2 mt-10"
    >
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <button
          key={page}
          type="button"
          onClick={() => onPageChange(page)}
          aria-current={page === currentPage ? "page" : undefined}
          aria-label={t("goToPageLabel", { page })}
          className={`label text-xs w-9 h-9 flex items-center justify-center border transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage ${
            page === currentPage
              ? "border-sage text-sage"
              : "border-hairline text-grey-muted hover:text-ivory hover:border-ivory/40"
          }`}
        >
          {page}
        </button>
      ))}
    </nav>
  );
}
