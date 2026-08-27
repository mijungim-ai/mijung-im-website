"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Lightbox } from "@/components/Lightbox";
import type { MediaImage } from "@/data/media";

export function ProjectGallery({ images }: { images: MediaImage[] }) {
  const t = useTranslations("media");

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
      <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
        {images.map((img, i) => (
          <button
            key={img.src}
            type="button"
            onClick={(e) => openLightbox(i, e.currentTarget)}
            aria-label={t("enlargeLabel", { alt: img.alt })}
            className="block w-full group"
          >
            <div className="photo-frame relative aspect-[4/3] overflow-hidden">
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover transition-transform duration-200 group-hover:scale-[1.02]"
              />
            </div>
          </button>
        ))}
      </div>

      <Lightbox
        images={images}
        index={lightboxIndex}
        onClose={closeLightbox}
        onNavigate={setLightboxIndex}
      />
    </div>
  );
}
