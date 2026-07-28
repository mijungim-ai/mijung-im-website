export type Engagement = {
  title: string;
  dateLabel: string;
  location: string;
};

// Display order is controlled solely by array position — earliest/most
// prominent engagement first. Update dateLabel with the exact date once
// confirmed (currently "March 2027" for two entries pending scheduling).
export const engagements: Engagement[] = [
  {
    title: "Recital at Harvey Mudd Concert Series",
    dateLabel: "Sunday, March 28, 2027 at 7:00 pm",
    location: "Claremont College, California, USA",
  },
  {
    title: "Recital at San Francisco",
    dateLabel: "March 2027",
    location: "San Francisco, California, USA",
  },
  {
    title: "Recital at Rockville",
    dateLabel: "March 2027",
    location: "Rockville, Maryland, USA",
  },
];
