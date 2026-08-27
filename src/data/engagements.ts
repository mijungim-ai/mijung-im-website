import { readOrderedContent } from "@/lib/orderedContent";

export type Engagement = {
  order: number;
  title: string;
  dateLabel: string;
  location: string;
  content?: string;
  image?: string;
  link?: { href: string; label: string };
};

// Content now lives in content/engagements/*.json (Decap CMS folder
// collection) instead of a hardcoded array — see docs/TODO.md.
export function getEngagements(): Engagement[] {
  return readOrderedContent<Engagement>("engagements");
}
