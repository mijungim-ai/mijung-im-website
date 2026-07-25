"use client";

import { useState } from "react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { Placeholder } from "@/components/Placeholder";

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

  const galleryImages = [
    {
      src: "/images/dmz_dome_beach.jpg",
      alt: "Performance inside a dome on the DMZ coastline",
      caption: undefined as string | undefined,
    },
    {
      src: "/images/jeil_church_cheorwon.jpg",
      alt: isEn
        ? t("jeilChurchCaption")
        : "Performance at the Jeil Church ruins, Cheorwon",
      caption: isEn ? t("jeilChurchCaption") : undefined,
    },
  ];

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
        className="flex gap-6 border-b border-hairline mb-6 flex-wrap"
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
        <div className="space-y-16">
          <div>
            <h3 className="label text-xs text-grey-muted mb-6">
              {t("videoGroups.performancesTitle")}
            </h3>
            <div className="space-y-10">
              {videoItems.map((item) => (
                <div key={item.title}>
                  <div className="aspect-video mb-3">
                    <iframe
                      className="w-full h-full"
                      src={item.embedUrl}
                      title={item.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    />
                  </div>
                  <h4 className="text-h2 text-ivory mb-2">{item.title}</h4>
                  <p className="text-body text-ivory/90">{item.body}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="label text-xs text-grey-muted mb-6">
              {t("videoGroups.talksTitle")}
            </h3>
            <div className="grid gap-8 sm:grid-cols-2">
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
        <div className="grid gap-6 sm:grid-cols-2">
          {galleryImages.map((img) => (
            <div key={img.src}>
              <div className="photo-frame relative aspect-[4/3] overflow-hidden">
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="(min-width: 640px) 50vw, 100vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/25" aria-hidden />
              </div>
              {img.caption && (
                <p className="text-[12px] text-grey-muted mt-2">
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
          <div className="photo-frame border border-hairline overflow-hidden">
            <div className="relative aspect-[4/3]">
              <Image
                src="/images/nyt_frontpage_jejin_station.jpg"
                alt={t("nytCaption")}
                fill
                sizes="(min-width: 640px) 50vw, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/25" aria-hidden />
            </div>
            <p className="text-[12px] text-grey-muted px-5 py-4">
              {t("nytCaption")}
            </p>
          </div>
        </div>
      ) : (
        <Placeholder label={tc("placeholderLabel")}>
          <p className="text-body text-ivory/90">{t(bodyKey)}</p>
        </Placeholder>
      )}
    </div>
  );
}
