import { readOrderedContent } from "@/lib/orderedContent";

export type GalleryPhoto = {
  order: number;
  caption: string;
  image: string;
};

// Content lives in content/media-gallery/*.json (Decap CMS folder
// collection) instead of a hardcoded array — see docs/TODO.md. Display
// order comes from each file's `order` field, not filename. No
// separate alt-text field: the consuming component uses `caption` as
// the image's alt text too. Kept out of media.ts (which client
// components value-import for pressImages) since this pulls in
// node:fs and must stay server-only.
export function getGalleryImages(): GalleryPhoto[] {
  return readOrderedContent<GalleryPhoto>("media-gallery");
}
