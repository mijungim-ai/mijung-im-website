export type MediaImage = {
  src: string;
  alt: string;
  caption?: string;
  link?: { href: string; label: string };
};

// getGalleryImages() lives in src/data/mediaGallery.ts, not here — this
// module is value-imported by client components (NytPressPhoto.tsx
// imports pressImages directly), and mediaGallery.ts pulls in node:fs
// via the ordered-content loader, which Turbopack can't put in a
// client bundle. Keeping this file Node-free keeps that import safe.

// Press tab featured photo — rendered above the bulletin-style article
// list (see src/data/pressArticles.ts). Array of one so it can still be
// passed to the shared Lightbox component.
export const pressImages: MediaImage[] = [
  {
    src: "/images/press/nyt_frontpage_jejin_station.jpg",
    alt: "The New York Times front page of July 27, 2023, showing Mijung Im performing at a grand piano on the empty platform of Jejin Station near the Korean DMZ",
    caption:
      "The New York Times, front page — July 27, 2023. Photo: Chang W. Lee/The New York Times",
    // link: original article URL to be added once available
  },
];
