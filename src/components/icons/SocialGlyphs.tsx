// lucide-react has no Instagram/Facebook/YouTube/Spotify/Apple Music
// marks in the installed version (only generic shapes remain), so these
// are small hand-built glyphs instead — single-color, currentColor fill,
// consistent 24x24 viewBox, styled to match the site's minimal line art.

type IconProps = { className?: string };

export function InstagramGlyph({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className={className}
      aria-hidden="true"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function FacebookGlyph({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.4h-1.2c-1.2 0-1.6.8-1.6 1.6V12h2.8l-.4 2.9h-2.4v7A10 10 0 0 0 22 12z" />
    </svg>
  );
}

export function YoutubeGlyph({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M23 12s0-3.4-.4-5a3 3 0 0 0-2.1-2.1C18.9 4.5 12 4.5 12 4.5s-6.9 0-8.5.4A3 3 0 0 0 1.4 7C1 8.6 1 12 1 12s0 3.4.4 5a3 3 0 0 0 2.1 2.1c1.6.4 8.5.4 8.5.4s6.9 0 8.5-.4A3 3 0 0 0 22.6 17c.4-1.6.4-5 .4-5zM9.8 15.5v-7l6 3.5-6 3.5z" />
    </svg>
  );
}

export function SpotifyGlyph({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm4.4 14.4a.6.6 0 0 1-.8.2c-2.3-1.4-5.2-1.7-8.6-.9a.6.6 0 1 1-.3-1.2c3.7-.9 6.9-.5 9.5 1.1a.6.6 0 0 1 .2.8zm1.2-2.8a.8.8 0 0 1-1.1.3c-2.6-1.6-6.6-2.1-9.7-1.1a.8.8 0 1 1-.5-1.5c3.5-1.1 7.9-.6 10.9 1.2a.8.8 0 0 1 .4 1.1zm.1-2.9C14.7 9 8.9 8.8 5.9 9.7a1 1 0 1 1-.6-1.9c3.5-1 9.9-.8 13.4 1.3a1 1 0 0 1-1 1.6z" />
    </svg>
  );
}

export function AppleMusicGlyph({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm3.5 5.4v6.4a2.2 2.2 0 1 1-1.2-2V9.6l-3.6.9v4.9a2.2 2.2 0 1 1-1.2-2V8.2l6-1.5z" />
    </svg>
  );
}
