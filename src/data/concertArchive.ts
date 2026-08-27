import { readOrderedContent } from "@/lib/orderedContent";

export type ConcertArchiveEntry = {
  order: number;
  image: string;
  year: string;
  title: string;
  venue?: string;
  program?: string;
};

// Content now lives in content/concert-archive/*.json (Decap CMS folder
// collection) instead of a hardcoded array — see docs/TODO.md. Entries
// render as a card grid (poster image + year + title), with
// venue/program (when present) shown in the lightbox only.
export function getConcertArchive(): ConcertArchiveEntry[] {
  return readOrderedContent<ConcertArchiveEntry>("concert-archive");
}
