"use client";

import { useRef, useState } from "react";
import { LinkEntry } from "@/components/LinkEntry";
import { Pagination } from "@/components/Pagination";
import { DetailModal, type DetailModalEntry } from "@/components/DetailModal";
import type { EssayEntry } from "@/data/dialogue";

const PAGE_SIZE = 4;

// Row click behavior is conditional per entry: body present -> opens
// the detail modal (title/date/body/image); no body -> the row is a
// plain external link via externalUrl instead (same body-takes-
// priority rule the old inline WritingEntryRow used). image only ever
// surfaces inside the modal, since the list itself shows title only.
export function EssaysList({ essays }: { essays: EssayEntry[] }) {
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<DetailModalEntry | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  const totalPages = Math.ceil(essays.length / PAGE_SIZE);
  const pageItems = essays.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  function openModal(entry: EssayEntry, trigger: HTMLButtonElement) {
    triggerRef.current = trigger;
    setSelected({
      title: entry.title,
      date: entry.date,
      content: entry.body,
      image: entry.image,
    });
  }

  function closeModal() {
    triggerRef.current?.focus();
    setSelected(null);
  }

  return (
    <div>
      <div>
        {pageItems.map((entry, i) =>
          entry.body ? (
            <button
              key={`${entry.title}-${i}`}
              type="button"
              onClick={(e) => openModal(entry, e.currentTarget)}
              className="block w-full text-left border-b border-hairline py-4 text-body text-ivory/90 hover:text-sage transition-colors"
            >
              {entry.title}
            </button>
          ) : (
            <LinkEntry
              key={`${entry.title}-${i}`}
              title={entry.title}
              href={entry.externalUrl ?? ""}
            />
          ),
        )}
      </div>

      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />

      <DetailModal entry={selected} onClose={closeModal} />
    </div>
  );
}
