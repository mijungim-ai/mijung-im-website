export type Social = {
  label: string;
  href: string | null;
  icon: "instagram" | "facebook" | "youtube" | "spotify" | "appleMusic";
};

// href: null marks a platform without a confirmed URL yet. Footer and
// the Contact page render these as dimmed, unclickable text; the Media
// page's icon row renders them as inert (href="#", click prevented)
// but visually identical to the real links — see SocialIconRow.
export const SOCIALS: Social[] = [
  { label: "Instagram", href: "https://instagram.com/mijungim", icon: "instagram" },
  { label: "Facebook", href: "https://facebook.com/mijungim", icon: "facebook" },
  { label: "YouTube", href: "https://www.youtube.com/@mijungim", icon: "youtube" },
  { label: "Spotify", href: null, icon: "spotify" }, // TODO: real Spotify URL needed
  { label: "Apple Music", href: null, icon: "appleMusic" }, // TODO: real Apple Music URL needed
];
