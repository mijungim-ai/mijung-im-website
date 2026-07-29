export type VideoItem = { title: string; body: string; embedUrl: string };
export type TalkItem = { title: string; embedUrl: string };

// Display order is controlled solely by array position. Content is
// EN/KO-agnostic (real video titles/embeds), so it lives here rather
// than in content/*/common.json — matches the same pattern already
// used for galleryImages, pressArticles, engagements, and dialogue.
export const videoItems: VideoItem[] = [
  {
    title: "Mozart",
    body: "A performance demonstrating her clarity of musical structure, tonal imagination, and ability to move naturally between intimacy and dramatic breadth.",
    embedUrl: "https://www.youtube.com/embed/K5szUe81A_c",
  },
  {
    title: "Chopin",
    body: "A performance revealing Mijung IM's affinity for Chopin's inward lyricism, emotional ambiguity, and expansive sense of time.",
    embedUrl: "https://www.youtube.com/embed/cMkheKmwu6c",
  },
  {
    title: "Performance at the Korean DMZ",
    body: "A performance that brings music into direct conversation with landscape, history, and the continuing memory of division on the east sea of the Korean Peninsula.",
    embedUrl: "https://www.youtube.com/embed/QLA9hIY6gv4",
  },
];

export const talkItems: TalkItem[] = [
  { title: "Talk", embedUrl: "https://www.youtube.com/embed/WBDHRLvgeSs" },
  { title: "Interview", embedUrl: "https://www.youtube.com/embed/wzIBs-jVN1M" },
  { title: "Talk", embedUrl: "https://www.youtube.com/embed/-zHnMgmeOPM" },
  { title: "Interview", embedUrl: "https://www.youtube.com/embed/KTEHqzXg-CI" },
];
