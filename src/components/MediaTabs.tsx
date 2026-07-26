"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { Placeholder } from "@/components/Placeholder";
import { Lightbox } from "@/components/Lightbox";
import { galleryImages, pressImages, type MediaImage } from "@/data/media";

const TABS = ["gallery", "video", "audio", "press"] as const;
type Tab = (typeof TABS)[number];

type VideoItem = { title: string; body: string; embedUrl: string };
type TalkItem = { title: string; embedUrl: string };
type PressItem = { title: string; source: string; url: string };

export function MediaTabs() {
  const t = useTranslations("media");
  const tc = useTranslations("common");
  const locale = useLocale();
  const [active, setActive] = useState<Tab>("gallery");
  const isEn = locale === "en";

  const [lightbox, setLightbox] = useState<{
    images: MediaImage[];
    index: number;
  } | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  function openLightbox(
    images: MediaImage[],
    index: number,
    trigger: HTMLButtonElement,
  ) {
    triggerRef.current = trigger;
    setLightbox({ images, index });
  }

  function closeLightbox() {
    triggerRef.current?.focus();
    setLightbox(null);
  }

  function navigateLightbox(index: number) {
    setLightbox((prev) => (prev ? { ...prev, index } : prev));
  }

  const bodyKey = {
    gallery: "galleryBody",
    video: "videoBody",
    audio: "audioBody",
    press: "pressBody",
  }[active] as "galleryBody" | "videoBody" | "audioBody" | "pressBody";

  const videoItems: VideoItem[] | null =
    isEn && active === "video" ? (t.raw("videoItems") as VideoItem[]) : null;
  const talkItems: TalkItem[] | null =
    isEn && active === "video" ? (t.raw("talkItems") as TalkItem[]) : null;
  const pressItems: PressItem[] | null =
    isEn && active === "press" ? (t.raw("pressItems") as PressItem[]) : null;

  return (
    <div>
      <div
        role="tablist"
        aria-label="Media category"
        className="flex gap-6 border-b border-hairline mb-8 flex-wrap"
      >
        {TABS.map((tab) => (
          <button
            key={tab}
            role="tab"
            aria-selected={active === tab}
            onClick={() => setActive(tab)}
            className={`label text-xs pb-3 -mb-px border-b transition-colors ${
              active === tab
                ? "text-sage border-sage"
                : "text-grey-muted border-transparent hover:text-ivory"
            }`}
          >
            {t(`tabs.${tab}`)}
          </button>
        ))}
      </div>

      {videoItems && talkItems ? (
        <div className="space-y-20">
          <div>
            <h3 className="label text-xs text-grey-muted mb-8">
              {t("videoGroups.performancesTitle")}
            </h3>
            <div className="space-y-12">
              {videoItems.map((item) => (
                <div key={item.title}>
                  <div className="aspect-video mb-4">
                    <iframe
                      className="w-full h-full"
                      src={item.embedUrl}
                      title={item.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    />
                  </div>
                  <h4 className="font-sans font-bold text-[22px] text-ivory mb-3">
                    {item.title}
                  </h4>
                  <p className="text-body text-ivory/90">{item.body}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="label text-xs text-grey-muted mb-8">
              {t("videoGroups.talksTitle")}
            </h3>
            <div className="grid gap-10 sm:grid-cols-2">
              {talkItems.map((item, i) => (
                <div key={`${item.title}-${i}`}>
                  <div className="aspect-video mb-3">
                    <iframe
                      className="w-full h-full"
                      src={item.embedUrl}
                      title={`${item.title} ${i + 1}`}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    />
                  </div>
                  <p className="label text-xs text-grey-muted">
                    {item.title}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : isEn && active === "gallery" ? (
        <div className="grid gap-8 sm:grid-cols-2">
          {galleryImages.map((img, i) => (
            <div key={img.src}>
              <button
                type="button"
                onClick={(e) => openLightbox(galleryImages, i, e.currentTarget)}
                aria-label={t("enlargeLabel", { alt: img.alt })}
                className="block w-full group"
              >
                <div className="photo-frame relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    sizes="(min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-200 group-hover:scale-[1.02]"
                  />
                </div>
              </button>
              {img.caption && (
                <p className="text-caption text-grey-muted mt-2.5">
                  {img.caption}
                </p>
              )}
            </div>
          ))}
        </div>
      ) : pressItems ? (
        <div className="grid gap-4 sm:grid-cols-2">
          {pressItems.map((item) => (
            <a
              key={item.url}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block border border-hairline px-5 py-4 hover:border-sage transition-colors"
            >
              <p className="text-body text-ivory/90">{item.title}</p>
              <p className="text-caption text-grey-muted mt-2">
                {item.source}
              </p>
            </a>
          ))}
          {pressImages.map((img, i) => (
            <div
              key={img.src}
              className="photo-frame border border-hairline overflow-hidden"
            >
              <button
                type="button"
                onClick={(e) => openLightbox(pressImages, i, e.currentTarget)}
                aria-label={t("enlargeLabel", { alt: img.alt })}
                className="block w-full group"
              >
                <div className="relative aspect-[3/2]">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    sizes="(min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-200 group-hover:scale-[1.02]"
                  />
                </div>
              </button>
              {img.caption && (
                <p className="text-caption text-grey-muted px-5 py-4">
                  {img.caption}
                </p>
              )}
            </div>
          ))}
        </div>
      ) : (
        <Placeholder label={tc("placeholderLabel")}>
          <p className="text-body text-ivory/90">{t(bodyKey)}</p>
        </Placeholder>
      )}

      <Lightbox
        images={lightbox?.images ?? []}
        index={lightbox?.index ?? null}
        onClose={closeLightbox}
        onNavigate={navigateLightbox}
      />
    </div>
  );
}
