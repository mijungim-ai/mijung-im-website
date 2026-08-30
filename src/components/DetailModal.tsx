"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Lightbox } from "@/components/Lightbox";

export type DetailModalEntry = {
  title: string;
  date?: string;
  location?: string;
  content?: string;
  image?: string;
  link?: { href: string; label: string };
};

const THUMB_SIZES = "160px";

// Generic single-entry detail modal — same visual/interaction tone as
// ConcertArchiveModal (fade-in, focus trap, scroll lock) but without
// its prev/next carousel, since every board reusing this shows exactly
// one entry per click rather than paging through a set from inside the
// modal. ConcertArchiveModal itself is untouched — it keeps its own
// carousel behavior per spec.
export function DetailModal({
  entry,
  onClose,
}: {
  entry: DetailModalEntry | null;
  onClose: () => void;
}) {
  const t = useTranslations("common");
  const tMedia = useTranslations("media");
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const thumbButtonRef = useRef<HTMLButtonElement>(null);
  const wasOpenRef = useRef(false);
  const scrollYRef = useRef(0);
  const [visible, setVisible] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [prevEntry, setPrevEntry] = useState(entry);

  const isOpen = entry !== null;

  // Reset so switching to a different entry never leaves a stale
  // lightbox open over the wrong image — adjusted during render (same
  // pattern as Nav.tsx's prevPathname) rather than in an effect.
  if (entry !== prevEntry) {
    setPrevEntry(entry);
    setLightboxOpen(false);
  }

  // Same fade-in-on-open pattern as Lightbox/ConcertArchiveModal.
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

  // Same iOS-safe scroll lock as Lightbox/ConcertArchiveModal.
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

  if (!isOpen || !entry) {
    return null;
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    if (e.key === "Escape") {
      onClose();
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
      aria-label={t("detailModalLabel")}
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
        aria-label={t("closeLabel")}
        className="fixed z-10 top-4 right-4 sm:top-6 sm:right-6 text-on-photo text-3xl leading-none hover:text-sage transition-colors"
      >
        ×
      </button>

      <div
        className="photo-frame bg-ink w-[90vw] max-w-2xl cursor-default overflow-hidden"
        onClick={(e) => {
          e.stopPropagation();
          dialogRef.current?.focus();
        }}
      >
        <div className="p-6 sm:p-8">
          {entry.image && (
            <button
              ref={thumbButtonRef}
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setLightboxOpen(true);
              }}
              aria-label={tMedia("enlargeLabel", { alt: entry.title })}
              className="block w-full max-w-[200px] mb-6 group"
            >
              <div className="photo-frame relative aspect-[4/3] overflow-hidden">
                <Image
                  src={entry.image}
                  alt={entry.title}
                  fill
                  sizes={THUMB_SIZES}
                  quality={85}
                  className="object-cover transition-transform duration-200 group-hover:scale-[1.02]"
                />
              </div>
            </button>
          )}
          {entry.date && (
            <p className="label text-xs text-sage mb-2">{entry.date}</p>
          )}
          <h3 className="text-h2 font-display-bold! font-bold not-italic text-ivory mb-4">
            {entry.title}
          </h3>
          {entry.location && (
            <p className="text-body text-ivory/90">{entry.location}</p>
          )}
          {entry.content && (
            <p className="text-body text-ivory/70 mt-1 whitespace-pre-line">
              {entry.content}
            </p>
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
