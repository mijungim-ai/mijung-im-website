import { readOrderedContent } from "@/lib/orderedContent";

export type HomeNewsItem = {
  order: number;
  title: string;
  body: string;
  image?: string;
};

// Content lives in content/home-news/*.json (Decap CMS folder
// collection). Empty by default — content/home-news/.gitkeep keeps the
// otherwise-empty folder in git so fs.readdirSync doesn't throw. The
// Home page falls back to the "content coming soon" placeholder when
// this returns an empty array.
export function getHomeNews(): HomeNewsItem[] {
  return readOrderedContent<HomeNewsItem>("home-news");
}
