import { readOrderedContent } from "@/lib/orderedContent";

// Essays (undated magazine op-eds) and Artistic Director's Letters
// (dated festival notes) were merged into one section per artist
// feedback, and are now a single content source too — see
// docs/TODO.md. Each entry is either a link out to the original post
// (externalUrl) or the full text shown directly on the page (body);
// exactly one is expected to be set per entry (a CMS field hint says
// so, not a hard schema constraint — Decap has no conditional-required
// validation). `date` is optional and only meaningful for dated notes.
export type EssayEntry = {
  order: number;
  title: string;
  date?: string;
  body?: string;
  externalUrl?: string;
};

// Content lives in content/essays/*.json (Decap CMS folder collection)
// instead of two hardcoded arrays.
export function getEssays(): EssayEntry[] {
  return readOrderedContent<EssayEntry>("essays");
}
