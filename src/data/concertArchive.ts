export type ConcertArchiveEntry = {
  image: string;
  year: string;
  title: string;
};

// Display order is controlled solely by array position. Empty until
// concert posters/photos are available — the Concert Archive section on
// the Performances page renders an empty-state message while this is [].
// Once populated, entries render as a card grid (poster image + year +
// performance title).
export const concertArchive: ConcertArchiveEntry[] = [];
