import { readOrderedContent } from "@/lib/orderedContent";

export type ConcertArchiveEntry = {
  order: number;
  title: string;
  date: string;
  location: string;
  content?: string;
  image?: string;
  link?: { href: string; label: string };
};

// Content lives in content/concert-archive/*.json (Decap CMS folder
// collection) instead of a hardcoded array — see docs/TODO.md. Entries
// render as a list (title + date + location), with content/image/link
// (when present) shown in the modal.
export function getConcertArchive(): ConcertArchiveEntry[] {
  return readOrderedContent<ConcertArchiveEntry>("concert-archive");
}
