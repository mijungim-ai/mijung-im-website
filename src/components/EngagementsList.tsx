"use client";

import { useRef, useState } from "react";
import { Pagination } from "@/components/Pagination";
import { DetailModal, type DetailModalEntry } from "@/components/DetailModal";
import type { Engagement } from "@/data/engagements";

const PAGE_SIZE = 3;

export function EngagementsList({
  engagements,
}: {
  engagements: Engagement[];
}) {
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<DetailModalEntry | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  const totalPages = Math.ceil(engagements.length / PAGE_SIZE);
  const pageItems = engagements.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  function openModal(engagement: Engagement, trigger: HTMLButtonElement) {
    triggerRef.current = trigger;
    setSelected({
      title: engagement.title,
      date: engagement.dateLabel,
      location: engagement.location,
      content: engagement.content,
      image: engagement.image,
      link: engagement.link,
    });
  }

  function closeModal() {
    triggerRef.current?.focus();
    setSelected(null);
  }

  return (
    <div>
      <div className="space-y-6">
        {pageItems.map((engagement, i) => (
          <button
            key={`${engagement.title}-${i}`}
            type="button"
            onClick={(e) => openModal(engagement, e.currentTarget)}
            className="block w-full text-left border-b border-hairline pb-6 group"
          >
            <p className="text-body font-bold text-ivory group-hover:text-sage transition-colors">
              {engagement.title}
            </p>
            <p className="text-body text-ivory/70 mt-1">
              {engagement.dateLabel} &mdash; {engagement.location}
            </p>
          </button>
        ))}
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
