"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { heroImages } from "@/data/hero";

const ROTATION_INTERVAL_MS = 5500;
const FADE_MS = 1000;

const OBJECT_POSITION_CLASS = {
  center: "object-center",
  top: "object-top",
  bottom: "object-bottom",
} as const;

export function HeroRotator() {
  const t = useTranslations("home");
  const [index, setIndex] = useState(0);
  const [hoverPaused, setHoverPaused] = useState(false);
  const [manuallyPaused, setManuallyPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const paused = hoverPaused || manuallyPaused;

  useEffect(() => {
    if (reducedMotion || paused || heroImages.length <= 1) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % heroImages.length);
    }, ROTATION_INTERVAL_MS);
    return () => clearInterval(id);
  }, [reducedMotion, paused]);

  function goToSlide(i: number) {
    setIndex(i);
    setManuallyPaused(true);
  }

  return (
    <div
      className="absolute inset-0"
      onMouseEnter={() => setHoverPaused(true)}
      onMouseLeave={() => setHoverPaused(false)}
    >
      {heroImages.map((img, i) => (
        <div
          key={img.src}
          className={`absolute inset-0 transition-opacity motion-reduce:transition-none ${
            i === index ? "opacity-100" : "opacity-0"
          }`}
          style={{ transitionDuration: `${FADE_MS}ms` }}
          aria-hidden={i !== index}
        >
          <Image
            src={img.src}
            alt={img.alt}
            fill
            priority={i === 0}
            sizes="100vw"
            className={`object-cover ${OBJECT_POSITION_CLASS[img.objectPosition]}`}
          />
        </div>
      ))}

      {heroImages.length > 1 && (
        <div className="absolute inset-x-0 bottom-6 md:bottom-8 z-20 flex justify-center">
          <div className="flex items-center gap-3 rounded-full bg-black/30 px-4 py-2 shadow-[0_1px_6px_rgba(0,0,0,0.5)] backdrop-blur-sm">
            {heroImages.map((img, i) => (
              <button
                key={img.src}
                type="button"
                onClick={() => goToSlide(i)}
                aria-label={t("heroSlideLabel", { number: i + 1 })}
                aria-current={i === index}
                className={`rounded-full transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${
                  i === index
                    ? "w-2.5 h-2.5 bg-white"
                    : "w-2 h-2 bg-white/50 hover:bg-white/75"
                }`}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
