export type ConcertArchiveEntry = {
  image: string;
  year: string;
  title: string;
  venue?: string;
  program?: string;
};

// Display order is controlled solely by array position — newest first.
// Entries render as a card grid (poster image + year + title), with
// venue/program (when present) shown in the lightbox only.
export const concertArchive: ConcertArchiveEntry[] = [
  {
    image: "/images/archive/recital_peace_life_2021.jpg",
    year: "2021",
    title: "Mijung IM Piano Recital — Peace & Life",
    venue: "예술의전당 IBK챔버홀, 서울",
    program: "Schubert: Four Impromptus, Op. 90, D. 899 / Liszt: Sonata in B minor",
  },
  {
    image: "/images/archive/america_human_nature_tour_2016.jpg",
    year: "2016",
    title: "세상의 모든 음악 시리즈 VI — 아메리카 대륙의 인간과 자연",
    venue: "목포·거창·서울·원주·부산 순회",
  },
  {
    image: "/images/archive/debussy_schubert_recital_2013.jpg",
    year: "2013",
    title: "I Love 드뷔시 & 슈베르트 — 세상의 모든 음악 Series V",
    venue: "예술의전당 IBK챔버홀, 서울",
    program: "Debussy & Schubert",
  },
  {
    image: "/images/archive/debut_recital_poster_1987.jpg",
    year: "1987",
    title: "도미기념 임미정 피아노 독주회",
    venue: "세종문화회관 소강당, 서울",
    program: "Mozart, Brahms, Chopin, Mussorgsky",
  },
];
