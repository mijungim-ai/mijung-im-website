"use client";

import { useRef, useState } from "react";
import { ConcertArchiveModal } from "@/components/ConcertArchiveModal";
import type { ConcertArchiveEntry } from "@/data/concertArchive";

export function ConcertArchiveList({
  entries: concertArchive,
}: {
  entries: ConcertArchiveEntry[];
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

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
        {concertArchive.map((entry, i) => (
          <button
            key={`${entry.title}-${i}`}
            type="button"
            onClick={(e) => openModal(i, e.currentTarget)}
            className="block w-full text-left border-b border-hairline pb-6 group"
          >
            <p className="text-body font-bold text-ivory group-hover:text-sage transition-colors">
              {entry.title}
            </p>
            <p className="text-body text-ivory/70 mt-1">
              {entry.date} — {entry.location}
            </p>
          </button>
        ))}
      </div>

      <ConcertArchiveModal
        entries={concertArchive}
        index={openIndex}
        onClose={closeModal}
        onNavigate={setOpenIndex}
      />
    </div>
  );
}
