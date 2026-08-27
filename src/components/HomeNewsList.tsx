"use client";

import { useRef, useState } from "react";
import { Pagination } from "@/components/Pagination";
import { DetailModal, type DetailModalEntry } from "@/components/DetailModal";
import type { HomeNewsItem } from "@/data/homeNews";

const PAGE_SIZE = 3;

export function HomeNewsList({ items }: { items: HomeNewsItem[] }) {
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<DetailModalEntry | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  const totalPages = Math.ceil(items.length / PAGE_SIZE);
  const pageItems = items.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  function openModal(item: HomeNewsItem, trigger: HTMLButtonElement) {
    triggerRef.current = trigger;
    setSelected({ title: item.title, content: item.body, image: item.image });
  }

  function closeModal() {
    triggerRef.current?.focus();
    setSelected(null);
  }

  return (
    <div>
      <div className="space-y-6">
        {pageItems.map((item, i) => (
          <button
            key={`${item.title}-${i}`}
            type="button"
            onClick={(e) => openModal(item, e.currentTarget)}
            className="block w-full text-left border-b border-hairline pb-6 group"
          >
            <p className="text-body font-bold text-ivory group-hover:text-sage transition-colors">
              {item.title}
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
