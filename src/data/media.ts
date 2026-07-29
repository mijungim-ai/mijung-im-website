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
    src: "/images/gallery/goseong_hwajinpo_beach_2020.jpg",
    alt: "Piano performance inside a transparent dome on Hwajinpo Beach, Goseong, 2020",
    caption: "Goseong, Hwajinpo Beach, 2020",
  },
  {
    src: "/images/gallery/artistic_director_jeil_church_cheorwon_2020.jpg",
    alt: "Artistic Director Mijung IM performing at the war-damaged Jeil Church ruins in Cheorwon, 2020",
    caption: "Artistic Director Mijung IM, Jeil Church, Cheorwon, 2020",
  },
  {
    src: "/images/gallery/goseong_geonbongsa_opening_concert_2020.jpg",
    alt: "Opening concert at Geonbongsa Temple, Geumgangsan, Goseong, 2020",
    caption: "Opening Concert, Geonbongsa Temple, Geumgangsan, Goseong, 2020",
  },
  {
    src: "/images/gallery/mijung_im_dmz_plz_portrait.jpg",
    alt: "Mijung IM at the DMZ PLZ Festival",
  },
  {
    src: "/images/gallery/artistic_director_hwajinpo_beach_2020.jpg",
    alt: "Artistic Director Mijung IM at Hwajinpo Beach, Goseong, 2020",
    caption: "Artistic Director Mijung IM, Hwajinpo Beach, 2020",
  },
  {
    src: "/images/gallery/pyongyang_visit_2006.jpg",
    alt: "Mijung IM during a visit to Pyongyang, 2006",
    caption: "Pyongyang Visit, 2006",
  },
  {
    src: "/images/gallery/world_piano_competition.jpg",
    alt: "Mijung IM at the World Piano Competition",
    caption: "World Piano Competition",
  },
  {
    src: "/images/gallery/dmz_plz_performance_01.jpg",
    alt: "Mijung IM performing at the DMZ PLZ Festival",
  },
  {
    src: "/images/gallery/dmz_plz_performance_02.jpg",
    alt: "Mijung IM performing at the DMZ PLZ Festival",
  },
  {
    src: "/images/gallery/dmz_plz_performance_03.jpg",
    alt: "Mijung IM performing at the DMZ PLZ Festival",
  },
  {
    src: "/images/gallery/dmz_open_deokpojin.jpg",
    alt: "DMZ OPEN Festival gathering at Deokpojin",
    caption: "DMZ OPEN Festival, Deokpojin",
  },
  {
    src: "/images/gallery/dmz_plz_performance_04.jpg",
    alt: "Mijung IM performing at the DMZ PLZ Festival",
  },
  {
    src: "/images/gallery/dmz_plz_performance_05.jpg",
    alt: "Mijung IM performing at the DMZ PLZ Festival",
  },
  {
    src: "/images/gallery/dmz_plz_evening_2023_a.jpg",
    alt: "Evening performance at the DMZ PLZ Festival, July 2023",
    caption: "DMZ PLZ Festival, July 2023",
  },
  {
    src: "/images/gallery/dmz_plz_evening_2023_b.jpg",
    alt: "Evening performance at the DMZ PLZ Festival, July 2023",
    caption: "DMZ PLZ Festival, July 2023",
  },
  {
    src: "/images/gallery/dmz_plz_performance_06.jpg",
    alt: "Mijung IM performing at the DMZ PLZ Festival",
  },
  {
    src: "/images/gallery/dmz_plz_rehearsal.jpg",
    alt: "Rehearsal at the DMZ PLZ Festival",
    caption: "Rehearsal, DMZ PLZ Festival",
  },
  {
    src: "/images/gallery/dmz_plz_performance_07.jpg",
    alt: "Mijung IM performing at the DMZ PLZ Festival",
  },
  {
    src: "/images/gallery/dmz_plz_performance_08.jpg",
    alt: "Mijung IM performing at the DMZ PLZ Festival",
  },
  {
    src: "/images/gallery/horogoru_fortress.jpg",
    alt: "Piano performance at Horogoru Fortress",
    caption: "Horogoru Fortress",
  },
];

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
