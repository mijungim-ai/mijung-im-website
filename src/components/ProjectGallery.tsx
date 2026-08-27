"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Lightbox } from "@/components/Lightbox";
import { Pagination } from "@/components/Pagination";
import type { MediaImage } from "@/data/media";
import type { ProjectGalleryPhoto } from "@/data/projectGallery";

const PAGE_SIZE = 6;

export function ProjectGallery({ images }: { images: ProjectGalleryPhoto[] }) {
  const t = useTranslations("media");

  const [page, setPage] = useState(1);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  const totalPages = Math.ceil(images.length / PAGE_SIZE);
  const pageStart = (page - 1) * PAGE_SIZE;
  const pageItems = images.slice(pageStart, pageStart + PAGE_SIZE);

  // Entries only carry caption+image — caption doubles as alt text, so
  // this is the one place that shape gets converted into the fuller
  // MediaImage shape Lightbox expects. Built from the full array (not
  // just the current page) so lightbox prev/next can still traverse
  // every photo — list pagination and the lightbox's index space are
  // independent, same as Concert Archive's modal.
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
        {pageItems.map((img, i) => {
          const fullIndex = pageStart + i;
          return (
            <div key={img.image}>
              <button
                type="button"
                onClick={(e) => openLightbox(fullIndex, e.currentTarget)}
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
              <p className="text-caption text-grey-muted mt-2.5">
                {img.caption}
              </p>
            </div>
          );
        })}
      </div>

      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />

      <Lightbox
        images={lightboxImages}
        index={lightboxIndex}
        onClose={closeLightbox}
        onNavigate={setLightboxIndex}
      />
    </div>
  );
}
