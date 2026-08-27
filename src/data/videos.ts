import { readOrderedContent } from "@/lib/orderedContent";

// Both video collections share the same shape now — only embedUrl is
// required, title/body are optional so an entry can be "just a video".
export type VideoItem = { order: number; title?: string; body?: string; embedUrl: string };
export type TalkItem = VideoItem;

// Content lives in content/videos-performances/*.json and
// content/videos-talks/*.json (Decap CMS folder collections) instead
// of hardcoded arrays — see docs/TODO.md.
export function getVideoItems(): VideoItem[] {
  return readOrderedContent<VideoItem>("videos-performances");
}

export function getTalkItems(): TalkItem[] {
  return readOrderedContent<TalkItem>("videos-talks");
}
