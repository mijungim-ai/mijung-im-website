"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Lightbox } from "@/components/Lightbox";
import type { MediaImage } from "@/data/media";
import type { ProjectGalleryPhoto } from "@/data/projectGallery";

export function ProjectGallery({ images }: { images: ProjectGalleryPhoto[] }) {
  const t = useTranslations("media");

  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  // Entries only carry caption+image — caption doubles as alt text, so
  // this is the one place that shape gets converted into the fuller
  // MediaImage shape Lightbox expects.
  const lightboxImages: MediaImage[] = images.map((img) => ({
    src: img.image,
    alt: img.caption,
    caption: img.caption,
  }));

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
      <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
        {images.map((img, i) => (
          <button
            key={img.image}
            type="button"
            onClick={(e) => openLightbox(i, e.currentTarget)}
            aria-label={t("enlargeLabel", { alt: img.caption })}
            className="block w-full group"
          >
            <div className="photo-frame relative aspect-[4/3] overflow-hidden">
              <Image
                src={img.image}
                alt={img.caption}
                fill
                sizes="(min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover transition-transform duration-200 group-hover:scale-[1.02]"
              />
            </div>
          </button>
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
