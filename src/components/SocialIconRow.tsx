"use client";

import { SOCIALS } from "@/data/socials";
import {
  InstagramGlyph,
  FacebookGlyph,
  YoutubeGlyph,
  SpotifyGlyph,
  AppleMusicGlyph,
} from "@/components/icons/SocialGlyphs";

const GLYPHS = {
  instagram: InstagramGlyph,
  facebook: FacebookGlyph,
  youtube: YoutubeGlyph,
  spotify: SpotifyGlyph,
  appleMusic: AppleMusicGlyph,
};

export function SocialIconRow({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-5 ${className}`}>
      {SOCIALS.map((social) => {
        const Glyph = GLYPHS[social.icon];
        const isPlaceholder = social.href === null;
        return (
          <a
            key={social.label}
            href={social.href ?? "#"}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={social.label}
            onClick={isPlaceholder ? (e) => e.preventDefault() : undefined}
            className="text-ivory hover:text-sage transition-colors"
          >
            <Glyph className="w-6 h-6" />
          </a>
        );
      })}
    </div>
  );
}
