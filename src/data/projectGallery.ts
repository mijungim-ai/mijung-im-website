import type { MediaImage } from "@/data/media";

// Display order is controlled solely by array position — do not add
// filename-based sorting. Filenames are permanent identifiers; to
// reorder photos, move entries within this array, never rename files.
export const projectGalleryImages: MediaImage[] = [
  {
    src: "/images/projects/costa_rica_president_meeting.jpg",
    alt: "Mijung IM meeting with former Costa Rican President Laura Chinchilla and her husband",
  },
  {
    src: "/images/projects/un_orchestra_peace_concert_2016.jpg",
    alt: "Mijung IM with the UN Orchestra after a Music for Peace concert, Kyung Hee University, October 2016",
  },
  {
    src: "/images/projects/asian_youth_choir_ayco.jpg",
    alt: "Mijung IM with the Korea-ASEAN Asian Youth Choir for One (AYCO) in traditional dress",
  },
  {
    src: "/images/projects/gyeongju_un_education_forum_2016.jpg",
    alt: "Panel discussion at the 66th UN DPI/NGO Conference on Education for Global Citizenship, Gyeongju, 2016",
  },
  {
    src: "/images/projects/tanzania_arusha_music_education.jpg",
    alt: "Music for One Foundation music education program with schoolchildren in Arusha, Tanzania",
  },
  {
    src: "/images/projects/park_kallin_heart_to_heart_interview.jpg",
    alt: "Mijung IM interviewed by Park Kallin on the television program Heart to Heart",
  },
];
