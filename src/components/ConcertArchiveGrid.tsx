"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Lightbox } from "@/components/Lightbox";
import { concertArchive } from "@/data/concertArchive";
import type { MediaImage } from "@/data/media";

function buildCaption(entry: (typeof concertArchive)[number]) {
  const parts = [`${entry.year} — ${entry.title}`];
  if (entry.venue) parts.push(entry.venue);
  if (entry.program) parts.push(entry.program);
  return parts.join(" · ");
}

const lightboxImages: MediaImage[] = concertArchive.map((entry) => ({
  src: entry.image,
  alt: entry.title,
  caption: buildCaption(entry),
}));

export function ConcertArchiveGrid() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  function openLightbox(index: number, trigger: HTMLButtonElement) {
    triggerRef.current = trigger;
    setLightboxIndex(index);
  }

  function closeLightbox() {
    triggerRef.current?.focus();
    setLightboxIndex(null);
  }

  return (
    <div>
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
        {concertArchive.map((entry, i) => (
          <div key={entry.image}>
            <button
              type="button"
              onClick={(e) => openLightbox(i, e.currentTarget)}
              aria-label={buildCaption(entry)}
              className="block w-full group"
            >
              <div className="photo-frame relative aspect-[3/4] overflow-hidden">
                <Image
                  src={entry.image}
                  alt={entry.title}
                  fill
                  sizes="(min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-200 group-hover:scale-[1.02]"
                />
              </div>
            </button>
            <p className="text-caption text-grey-muted mt-2.5">{entry.year}</p>
            <p className="text-body text-ivory">{entry.title}</p>
          </div>
        ))}
      </div>

      <Lightbox
        images={lightboxImages}
        index={lightboxIndex}
        onClose={closeLightbox}
        onNavigate={setLightboxIndex}
      />
    </div>
  );
}
