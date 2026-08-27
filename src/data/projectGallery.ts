import { readOrderedContent } from "@/lib/orderedContent";
import type { MediaImage } from "@/data/media";

type ProjectGalleryImageFile = MediaImage & { order: number };

// Content lives in content/projects-gallery/*.json (Decap CMS folder
// collection) instead of a hardcoded array — see docs/TODO.md.
export function getProjectGalleryImages(): MediaImage[] {
  return readOrderedContent<ProjectGalleryImageFile>("projects-gallery");
}
