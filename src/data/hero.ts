export type HeroImage = {
  src: string;
  alt: string;
  objectPosition: "center" | "top" | "bottom";
};

// Array order is the rotation order shown on the Home hero.
export const heroImages: HeroImage[] = [
  {
    src: "/images/hero/jeil_church_cheorwon_2020.jpg",
    alt: "Mijung IM performing at the historic Jeil Church ruins in Cheorwon, 2020",
    objectPosition: "center",
  },
  {
    src: "/images/hero/piano_rehearsal_bw.jpg",
    alt: "Mijung IM in rehearsal at the piano",
    objectPosition: "center",
  },
  {
    src: "/images/hero/dmz_rusted_structure_beach.jpg",
    alt: "Mijung IM performing beside a rusted structure on the DMZ coastline",
    objectPosition: "bottom",
  },
  {
    src: "/images/hero/orchestra_concert_hall.jpg",
    alt: "Mijung IM performing with orchestra in a concert hall",
    objectPosition: "top",
  },
];
