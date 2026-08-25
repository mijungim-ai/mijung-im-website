"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Lightbox } from "@/components/Lightbox";
import { pressImages } from "@/data/media";

export function NytPressPhoto() {
  const t = useTranslations("media");
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const photo = pressImages[0];

  function openLightbox(trigger: HTMLButtonElement) {
    triggerRef.current = trigger;
    setOpen(true);
  }

  function closeLightbox() {
    triggerRef.current?.focus();
    setOpen(false);
  }

  return (
    <div className="photo-frame border border-hairline overflow-hidden">
      <button
        type="button"
        onClick={(e) => openLightbox(e.currentTarget)}
        aria-label={t("enlargeLabel", { alt: photo.alt })}
        className="block w-full group"
      >
        <div className="relative aspect-[3/2]">
          <Image
            src={photo.src}
            alt={photo.alt}
            fill
            sizes="(min-width: 768px) 48rem, 100vw"
            className="object-cover transition-transform duration-200 group-hover:scale-[1.02]"
          />
        </div>
      </button>
      {photo.caption && (
        <p className="text-caption text-grey-muted px-5 py-4">
          {photo.caption}
        </p>
      )}

      <Lightbox
        images={pressImages}
        index={open ? 0 : null}
        onClose={closeLightbox}
        onNavigate={() => {}}
      />
    </div>
  );
}
