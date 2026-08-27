import { readOrderedContent } from "@/lib/orderedContent";

export type ProjectGalleryPhoto = {
  order: number;
  caption: string;
  image: string;
};

// Content lives in content/projects-gallery/*.json (Decap CMS folder
// collection) instead of a hardcoded array — see docs/TODO.md. No
// separate alt-text field: the consuming component uses `caption` as
// the image's alt text too.
export function getProjectGalleryImages(): ProjectGalleryPhoto[] {
  return readOrderedContent<ProjectGalleryPhoto>("projects-gallery");
}
