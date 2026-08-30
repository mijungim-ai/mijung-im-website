"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Lightbox } from "@/components/Lightbox";
import type { ConcertArchiveEntry } from "@/data/concertArchive";

const MAX_IMAGE_SIZE = 600;

export function ConcertArchiveModal({
  entries,
  index,
  onClose,
  onNavigate,
}: {
  entries: ConcertArchiveEntry[];
  index: number | null;
  onClose: () => void;
  onNavigate: (index: number) => void;
}) {
  const t = useTranslations("performances");
  const tMedia = useTranslations("media");
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const thumbButtonRef = useRef<HTMLButtonElement>(null);
  const wasOpenRef = useRef(false);
  const scrollYRef = useRef(0);
  const [visible, setVisible] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [prevIndex, setPrevIndex] = useState(index);

  const isOpen = index !== null;
  const entry = index !== null ? entries[index] : null;
  const canPrev = index !== null && index > 0;
  const canNext = index !== null && index < entries.length - 1;

  // Reset so paging to a different archive entry (prev/next) never
  // leaves a stale lightbox open over the wrong image — adjusted during
  // render (same pattern as Nav.tsx's prevPathname) rather than in an
  // effect.
  if (index !== prevIndex) {
    setPrevIndex(index);
    setLightboxOpen(false);
  }

  // Same fade-in-on-open pattern as Lightbox.
  useEffect(() => {
    if (!isOpen) return;
    const id = requestAnimationFrame(() => setVisible(true));
    return () => {
      cancelAnimationFrame(id);
      setVisible(false);
    };
  }, [isOpen]);

  // Focus the close button only on the closed -> open transition.
  useEffect(() => {
    if (isOpen && !wasOpenRef.current) {
      closeButtonRef.current?.focus();
    }
    wasOpenRef.current = isOpen;
  }, [isOpen]);

  // Same iOS-safe scroll lock as Lightbox.
  useEffect(() => {
    if (!isOpen) return;
    const scrollY = window.scrollY;
    scrollYRef.current = scrollY;
    const body = document.body;
    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.left = "0";
    body.style.right = "0";
    return () => {
      body.style.position = "";
      body.style.top = "";
      body.style.left = "";
      body.style.right = "";
      window.scrollTo(0, scrollYRef.current);
    };
  }, [isOpen]);

  if (!isOpen || !entry || index === null) {
    return null;
  }

  const goPrev = () => {
    if (canPrev) onNavigate(index - 1);
  };
  const goNext = () => {
    if (canNext) onNavigate(index + 1);
  };

  function handleKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    if (e.key === "Escape") {
      onClose();
      return;
    }
    if (e.key === "ArrowLeft") {
      goPrev();
      return;
    }
    if (e.key === "ArrowRight") {
      goNext();
      return;
    }
    if (e.key === "Tab") {
      const focusables = dialogRef.current?.querySelectorAll<HTMLElement>(
        "button:not([disabled]), a[href]",
      );
      if (!focusables || focusables.length === 0) return;
      const list = Array.from(focusables);
      const first = list[0];
      const last = list[list.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  }

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={t("archiveModal.dialogLabel")}
      tabIndex={-1}
      onClick={onClose}
      onKeyDown={handleKeyDown}
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black/90 outline-none cursor-pointer transition-opacity duration-200 motion-reduce:transition-none overflow-y-auto py-8 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    >
      <button
        ref={closeButtonRef}
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        aria-label={t("archiveModal.close")}
        className="fixed z-10 top-4 right-4 sm:top-6 sm:right-6 text-on-photo text-3xl leading-none hover:text-sage transition-colors"
      >
        ×
      </button>

      {canPrev && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            goPrev();
          }}
          aria-label={t("archiveModal.previous")}
          className="fixed z-10 left-2 sm:left-6 top-1/2 -translate-y-1/2 text-on-photo text-4xl leading-none hover:text-sage transition-colors px-2"
        >
          ‹
        </button>
      )}
      {canNext && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            goNext();
          }}
          aria-label={t("archiveModal.next")}
          className="fixed z-10 right-2 sm:right-6 top-1/2 -translate-y-1/2 text-on-photo text-4xl leading-none hover:text-sage transition-colors px-2"
        >
          ›
        </button>
      )}

      <div
        className="photo-frame bg-ink w-[90vw] max-w-2xl cursor-default overflow-hidden"
        onClick={(e) => {
          e.stopPropagation();
          dialogRef.current?.focus();
        }}
      >
        <div className="p-6 sm:p-8">
          {entry.image && (
            // No fixed aspect-ratio box here on purpose — a cropping
            // container (aspect-[4/3] + object-cover) chopped off tall
            // portrait photos. width/height below are just a layout
            // hint; the style overrides let the browser size the
            // rendered <img> from the file's own intrinsic ratio,
            // capped at MAX_IMAGE_SIZE on whichever side is longer.
            //
            // unoptimized is required here, not just a shortcut: when
            // the source file is SMALLER than MAX_IMAGE_SIZE (e.g. an
            // old poster scan), next/image's srcset still advertises a
            // "600px-wide" (or DPR-multiplied, e.g. 1200w) candidate,
            // the optimizer serves the original un-enlarged, and the
            // browser — trusting the advertised width it asked for —
            // renders the auto-sized <img> at a fraction of the file's
            // real size (observed: a 401px-wide file rendering at
            // ~200px). Skipping next/image's own srcset generation
            // avoids that; the tradeoff is no format/size optimization
            // for this one thumbnail, which is acceptable at this
            // scale (a single small accompanying image, not a hero).
            <button
              ref={thumbButtonRef}
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setLightboxOpen(true);
              }}
              aria-label={tMedia("enlargeLabel", { alt: entry.title })}
              className="block mb-6 group"
            >
              <Image
                src={entry.image}
                alt={entry.title}
                width={MAX_IMAGE_SIZE}
                height={MAX_IMAGE_SIZE}
                unoptimized
                className="photo-frame transition-transform duration-200 group-hover:scale-[1.02]"
                style={{
                  width: "auto",
                  height: "auto",
                  maxWidth: `${MAX_IMAGE_SIZE}px`,
                  maxHeight: `${MAX_IMAGE_SIZE}px`,
                }}
              />
            </button>
          )}
          <p className="label text-xs text-sage mb-2">{entry.date}</p>
          <h3 className="text-h2 font-display-bold! font-bold not-italic text-ivory mb-4">
            {entry.title}
          </h3>
          <p className="text-body text-ivory/90">{entry.location}</p>
          {entry.content && (
            <p className="text-body text-ivory/70 mt-1">{entry.content}</p>
          )}
          {entry.link && (
            <a
              href={entry.link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="label text-xs text-sage hover:text-ivory transition-colors mt-4 inline-block"
            >
              {entry.link.label} →
            </a>
          )}
        </div>
      </div>

      {entry.image && (
        <Lightbox
          images={[{ src: entry.image, alt: entry.title }]}
          index={lightboxOpen ? 0 : null}
          onClose={() => {
            setLightboxOpen(false);
            thumbButtonRef.current?.focus();
          }}
          onNavigate={() => {}}
          lockScroll={false}
        />
      )}
    </div>
  );
}
