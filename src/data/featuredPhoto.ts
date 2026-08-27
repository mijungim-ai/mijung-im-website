import { readJsonContent } from "@/lib/orderedContent";
import type { MediaImage } from "@/data/media";

// Content lives in content/featured-photo.json (Decap CMS "file
// collection" — one fixed record, not a folder of many) instead of a
// hardcoded one-item array — see docs/TODO.md. Kept in its own module
// (not media.ts) since this pulls in node:fs and must stay
// server-only; NytPressPhoto.tsx (a client component) now receives
// this as a prop instead of importing it directly.
export function getFeaturedPhoto(): MediaImage {
  return readJsonContent<MediaImage>("featured-photo.json");
}
