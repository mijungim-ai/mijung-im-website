"use client";

import { useState } from "react";
import { LinkEntry } from "@/components/LinkEntry";
import { Pagination } from "@/components/Pagination";
import type { PressArticle } from "@/data/pressArticles";

const PAGE_SIZE = 4;

export function PressList({ articles }: { articles: PressArticle[] }) {
  const [page, setPage] = useState(1);

  const totalPages = Math.ceil(articles.length / PAGE_SIZE);
  const pageItems = articles.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div>
      <div>
        {pageItems.map((article) => (
          <LinkEntry
            key={article.url}
            title={article.title}
            href={article.url}
          />
        ))}
      </div>

      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />
    </div>
  );
}
