import { readOrderedContent } from "@/lib/orderedContent";

export type PressArticle = {
  order: number;
  title: string;
  url: string;
};

// Content now lives in content/press-articles/*.json (Decap CMS folder
// collection) instead of a hardcoded array — see docs/TODO.md. Bulletin-
// style list below the featured NYT photo (src/data/media.ts).
export function getPressArticles(): PressArticle[] {
  return readOrderedContent<PressArticle>("press-articles");
}
