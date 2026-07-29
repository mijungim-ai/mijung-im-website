"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import type { MediaImage } from "@/data/media";

const SIZES = "(max-width: 768px) 100vw, 85vw";
const SWIPE_THRESHOLD = 50;

export function Lightbox({
  images,
  index,
  onClose,
  onNavigate,
}: {
  images: MediaImage[];
  index: number | null;
  onClose: () => void;
  onNavigate: (index: number) => void;
}) {
  const t = useTranslations("media");
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const wasOpenRef = useRef(false);
  const scrollYRef = useRef(0);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);
  const [visible, setVisible] = useState(false);

  const isOpen = index !== null;
  const image = index !== null ? images[index] : null;
  const canPrev = index !== null && index > 0;
  const canNext = index !== null && index < images.length - 1;

  // Fade-in on open; skipped visually under prefers-reduced-motion via
  // the motion-reduce:transition-none class below. Resetting to false
  // happens in the cleanup so it's ready to fade in again next open.
  useEffect(() => {
    if (!isOpen) return;
    const id = requestAnimationFrame(() => setVisible(true));
    return () => {
      cancelAnimationFrame(id);
      setVisible(false);
    };
  }, [isOpen]);

  // Focus the close button only on the closed -> open transition, not
  // on every subsequent index change while navigating.
  useEffect(() => {
    if (isOpen && !wasOpenRef.current) {
      closeButtonRef.current?.focus();
    }
    wasOpenRef.current = isOpen;
  }, [isOpen]);

  // iOS-safe scroll lock: fixing body position (rather than just
  // overflow:hidden) prevents Safari from scrolling the background
  // behind the lightbox, and we restore the exact scroll offset on close.
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

  if (!isOpen || !image || index === null) {
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

  function handleTouchStart(e: React.TouchEvent<HTMLDivElement>) {
    const touch = e.touches[0];
    touchStartRef.current = { x: touch.clientX, y: touch.clientY };
  }

  function handleTouchEnd(e: React.TouchEvent<HTMLDivElement>) {
    const start = touchStartRef.current;
    touchStartRef.current = null;
    if (!start) return;
    const touch = e.changedTouches[0];
    const deltaX = touch.clientX - start.x;
    const deltaY = touch.clientY - start.y;
    if (
      Math.abs(deltaX) < SWIPE_THRESHOLD ||
      Math.abs(deltaX) <= Math.abs(deltaY)
    ) {
      return;
    }
    if (deltaX < 0) {
      goNext();
    } else {
      goPrev();
    }
  }

  const preloadIndices = [index - 1, index + 1].filter(
    (i) => i >= 0 && i < images.length,
  );

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={t("lightbox.dialogLabel")}
      tabIndex={-1}
      onClick={onClose}
      onKeyDown={handleKeyDown}
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black/90 outline-none transition-opacity duration-200 motion-reduce:transition-none ${
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
        aria-label={t("lightbox.close")}
        className="absolute z-10 top-4 right-4 sm:top-6 sm:right-6 text-on-photo text-3xl leading-none hover:text-sage transition-colors"
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
          aria-label={t("lightbox.previous")}
          className="absolute z-10 left-2 sm:left-6 text-on-photo text-4xl leading-none hover:text-sage transition-colors px-2"
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
          aria-label={t("lightbox.next")}
          className="absolute z-10 right-2 sm:right-6 text-on-photo text-4xl leading-none hover:text-sage transition-colors px-2"
        >
          ›
        </button>
      )}

      <div
        className="flex flex-col items-center"
        onClick={(e) => {
          e.stopPropagation();
          // Clicking non-focusable content (image, caption) would
          // otherwise leave focus on <body>, and a keydown targeting
          // <body> never bubbles into the dialog to reach onKeyDown.
          // Returning focus to the dialog itself keeps arrow/Escape
          // keys working after such a click.
          dialogRef.current?.focus();
        }}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div className="relative w-[90vw] h-[82vh]">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes={SIZES}
            quality={85}
            className="object-contain"
          />
        </div>
        {image.caption && (
          <p className="text-on-photo text-[14px] mt-4 text-center max-w-[90vw]">
            {image.caption}
          </p>
        )}
        {image.link && (
          <a
            href={image.link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-on-photo text-[14px] underline mt-2 hover:text-sage transition-colors"
          >
            {image.link.label}
          </a>
        )}
        {images.length > 1 && (
          <p className="text-on-photo text-[14px] mt-3 select-none">
            {t("lightbox.counter", { current: index + 1, total: images.length })}
          </p>
        )}
      </div>

      {preloadIndices.map((i) => (
        <div
          key={images[i].src}
          className="absolute inset-0 opacity-0 pointer-events-none"
          aria-hidden
        >
          <Image
            src={images[i].src}
            alt=""
            fill
            sizes={SIZES}
            quality={85}
          />
        </div>
      ))}
    </div>
  );
}
