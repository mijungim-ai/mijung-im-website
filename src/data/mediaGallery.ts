import { readOrderedContent } from "@/lib/orderedContent";
import type { MediaImage } from "@/data/media";

type GalleryImageFile = MediaImage & { order: number };

// Content lives in content/media-gallery/*.json (Decap CMS folder
// collection) instead of a hardcoded array — see docs/TODO.md. Display
// order comes from each file's `order` field, not filename. Kept out
// of media.ts (which client components value-import for pressImages)
// since this pulls in node:fs and must stay server-only.
export function getGalleryImages(): MediaImage[] {
  return readOrderedContent<GalleryImageFile>("media-gallery");
}
