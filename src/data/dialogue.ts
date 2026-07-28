export type EssayLink = {
  title: string;
  href: string;
};

// Display order = publish order. Add new essays here as they appear.
export const essays: EssayLink[] = [
  {
    title: "[임미정의 삶의 안단테] 명품 피아노를 사랑하는 이유 — 국민일보",
    href: "https://www.kmib.co.kr/article/view.asp?arcid=0923631614",
  },
  {
    title: "[임미정의 삶의 안단테] 피아노와 삶의 연주 — 국민일보",
    href: "https://www.kmib.co.kr/article/view.asp?arcid=0923623875",
  },
];

// Each entry is either a link out to the original post ("link") or the
// full text shown directly on the page ("text") — e.g. once a letter's
// original host page goes offline.
export type DirectorLetterEntry = { title: string; date?: string } & (
  | { type: "link"; href: string }
  | { type: "text"; body: string }
);

export const directorLetters: DirectorLetterEntry[] = [
  {
    title: "예술감독노트 2020 — PLZ 페스티벌",
    type: "link",
    href: "http://plzfe.com/2020/07/24/to-artists-2020/",
  },
  {
    title: "예술감독노트 2021 — PLZ 페스티벌",
    type: "link",
    href: "http://plzfe.com/2021/07/08/to-artists/",
  },
];
