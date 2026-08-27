import { readOrderedContent } from "@/lib/orderedContent";

export type VideoItem = { title: string; body: string; embedUrl: string };
export type TalkItem = { title: string; embedUrl: string };

type VideoItemFile = VideoItem & { order: number };
type TalkItemFile = TalkItem & { order: number };

// Content now lives in content/videos-performances/*.json and
// content/videos-talks/*.json (Decap CMS folder collections) instead
// of hardcoded arrays — see docs/TODO.md.
export function getVideoItems(): VideoItem[] {
  return readOrderedContent<VideoItemFile>("videos-performances");
}

export function getTalkItems(): TalkItem[] {
  return readOrderedContent<TalkItemFile>("videos-talks");
}
