"use client";

import { useRef, useState } from "react";
import { ConcertArchiveModal } from "@/components/ConcertArchiveModal";
import { Pagination } from "@/components/Pagination";
import type { ConcertArchiveEntry } from "@/data/concertArchive";

const PAGE_SIZE = 4;

export function ConcertArchiveList({
  entries: concertArchive,
}: {
  entries: ConcertArchiveEntry[];
}) {
  const [page, setPage] = useState(1);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  const totalPages = Math.ceil(concertArchive.length / PAGE_SIZE);
  const pageStart = (page - 1) * PAGE_SIZE;
  const pageItems = concertArchive.slice(pageStart, pageStart + PAGE_SIZE);

  function openModal(index: number, trigger: HTMLButtonElement) {
    triggerRef.current = trigger;
    setOpenIndex(index);
  }

  function closeModal() {
    triggerRef.current?.focus();
    setOpenIndex(null);
  }

  return (
    <div>
      <div className="space-y-6">
        {pageItems.map((entry, localIndex) => {
          // The modal's prev/next carousel operates on the full,
          // unpaginated array (see ConcertArchiveModal) — passing a
          // page-relative index would make it jump to the wrong entry
          // and break navigation across page boundaries. List rows are
          // paginated; the modal's index space is not.
          const fullIndex = pageStart + localIndex;
          return (
            <button
              key={`${entry.title}-${fullIndex}`}
              type="button"
              onClick={(e) => openModal(fullIndex, e.currentTarget)}
              className="block w-full text-left border-b border-hairline pb-6 group"
            >
              <p className="text-body font-bold text-ivory group-hover:text-sage transition-colors">
                {entry.title}
              </p>
              <p className="text-body text-ivory/70 mt-1">
                {entry.date} — {entry.location}
              </p>
            </button>
          );
        })}
      </div>

      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />

      <ConcertArchiveModal
        entries={concertArchive}
        index={openIndex}
        onClose={closeModal}
        onNavigate={setOpenIndex}
      />
    </div>
  );
}
