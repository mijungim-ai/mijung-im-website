export type MediaImage = {
  src: string;
  alt: string;
  caption?: string;
  link?: { href: string; label: string };
};

// Display order is controlled solely by array position — do not add
// filename-based sorting. Filenames are permanent identifiers; to
// reorder photos, move entries within this array, never rename files.
export const galleryImages: MediaImage[] = [
  {
    src: "/images/gallery/dmz_dome_beach.jpg",
    alt: "Performance inside a dome on the DMZ coastline",
  },
  {
    src: "/images/gallery/jeil_church_cheorwon.jpg",
    alt: "Mijung IM performing at the historic war-damaged Jeil Church in Cheorwon, near the Korean DMZ",
    caption:
      "Mijung IM performing at the historic war-damaged Jeil Church in Cheorwon, near the Korean DMZ",
  },
];

// Press tab lightbox covers the NYT front-page photo only — the
// sctoday.co.kr article card is an external link, not part of this list.
export const pressImages: MediaImage[] = [
  {
    src: "/images/press/nyt_frontpage_jejin_station.jpg",
    alt: "The New York Times front page of July 27, 2023, showing Mijung Im performing at a grand piano on the empty platform of Jejin Station near the Korean DMZ",
    caption:
      "The New York Times, front page — July 27, 2023. Photo: Chang W. Lee/The New York Times",
    // link: original article URL to be added once available
  },
];
