"use client";

import { useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { Lightbox } from "@/components/Lightbox";
import { Pagination } from "@/components/Pagination";
import type { MediaImage } from "@/data/media";
import type { GalleryPhoto } from "@/data/mediaGallery";
import type { VideoItem, TalkItem } from "@/data/videos";

// Internal key stays "video" even though its label is now "YouTube" —
// KO common.json already has a translated tabs.video entry, and
// renaming the key would need a new KO key this codebase can't add
// without an explicit translation pass (see docs/TODO.md).
const TABS = ["video", "gallery"] as const;
type Tab = (typeof TABS)[number];

// The nav dropdown links to ?tab=youtube / ?tab=gallery — "youtube"
// rather than the internal "video" key, since that's the label users
// actually see. This is the one place the two vocabularies meet.
const TAB_PARAM: Record<Tab, string> = { video: "youtube", gallery: "gallery" };

function tabFromParam(param: string | null): Tab {
  return param === "gallery" ? "gallery" : "video";
}

const VIDEO_PAGE_SIZE = 3;
const TALK_PAGE_SIZE = 4;
const GALLERY_PAGE_SIZE = 20;

export function MediaTabs({
  galleryImages,
  videoItems,
  talkItems,
}: {
  galleryImages: GalleryPhoto[];
  videoItems: VideoItem[];
  talkItems: TalkItem[];
}) {
  const t = useTranslations("media");
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const tabParam = searchParams.get("tab");
  const [active, setActive] = useState<Tab>(() => tabFromParam(tabParam));

  // Keeps the tab in sync when ?tab= changes without a full remount —
  // e.g. clicking a Media dropdown link while already on /media only
  // updates the URL, it doesn't recreate this component. Adjusted
  // during render (same pattern as Nav.tsx's prevPathname) rather than
  // in an effect, so there's no extra render where the old tab flashes.
  const [prevTabParam, setPrevTabParam] = useState(tabParam);
  if (tabParam !== prevTabParam) {
    setPrevTabParam(tabParam);
    setActive(tabFromParam(tabParam));
  }

  function selectTab(tab: Tab) {
    setActive(tab);
    router.replace(`${pathname}?tab=${TAB_PARAM[tab]}`, { scroll: false });
  }

  const [videoPage, setVideoPage] = useState(1);
  const [talkPage, setTalkPage] = useState(1);
  const [galleryPage, setGalleryPage] = useState(1);

  const [lightbox, setLightbox] = useState<{
    images: MediaImage[];
    index: number;
  } | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  const videoTotalPages = Math.ceil(videoItems.length / VIDEO_PAGE_SIZE);
  const videoPageItems = videoItems.slice(
    (videoPage - 1) * VIDEO_PAGE_SIZE,
    videoPage * VIDEO_PAGE_SIZE,
  );

  const talkTotalPages = Math.ceil(talkItems.length / TALK_PAGE_SIZE);
  const talkPageItems = talkItems.slice(
    (talkPage - 1) * TALK_PAGE_SIZE,
    talkPage * TALK_PAGE_SIZE,
  );

  const galleryTotalPages = Math.ceil(
    galleryImages.length / GALLERY_PAGE_SIZE,
  );
  const galleryPageStart = (galleryPage - 1) * GALLERY_PAGE_SIZE;
  const galleryPageItems = galleryImages.slice(
    galleryPageStart,
    galleryPageStart + GALLERY_PAGE_SIZE,
  );

  // Gallery entries only carry caption+image — caption doubles as alt
  // text, so this is the one place that shape gets converted into the
  // fuller MediaImage shape Lightbox expects. Built from the full
  // array (not just the current page) so the lightbox's prev/next can
  // still traverse every photo, matching Concert Archive's modal —
  // list pagination and the lightbox's index space are independent.
  const lightboxGalleryImages: MediaImage[] = galleryImages.map((img) => ({
    src: img.image,
    alt: img.caption,
    caption: img.caption,
  }));

  function openLightbox(index: number, trigger: HTMLButtonElement) {
    triggerRef.current = trigger;
    setLightbox({ images: lightboxGalleryImages, index });
  }

  function closeLightbox() {
    triggerRef.current?.focus();
    setLightbox(null);
  }

  function navigateLightbox(index: number) {
    setLightbox((prev) => (prev ? { ...prev, index } : prev));
  }

  return (
    <div>
      <div
        role="tablist"
        aria-label={t("categoryLabel")}
        className="flex items-end gap-6 border-b border-hairline mb-8 flex-wrap"
      >
        {TABS.map((tab) =>
          active === tab ? (
            <button
              key={tab}
              role="tab"
              aria-selected
              onClick={() => selectTab(tab)}
              className="label text-xs px-4 py-2 mt-2 mb-0 bg-sage text-ink transition-colors"
            >
              {t(`tabs.${tab}`)}
            </button>
          ) : (
            <button
              key={tab}
              role="tab"
              aria-selected={false}
              onClick={() => selectTab(tab)}
              className="label text-xs pb-1 -mb-px border-b border-transparent text-grey-muted hover:text-ivory transition-colors"
            >
              {t(`tabs.${tab}`)}
            </button>
          ),
        )}
      </div>

      {active === "video" ? (
        <div className="space-y-20">
          <div>
            <h3 className="label text-xs text-sage mb-8">
              {t("videoGroups.performancesTitle")}
            </h3>
            <div className="space-y-12">
              {videoPageItems.map((item, i) => (
                <div key={`${item.title ?? "video"}-${i}`}>
                  <div className="aspect-video mb-4">
                    <iframe
                      className="w-full h-full"
                      src={item.embedUrl}
                      title={item.title ?? `Video ${i + 1}`}
                      loading="lazy"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    />
                  </div>
                  {item.title && (
                    <h4 className="font-sans font-bold text-[22px] text-ivory mb-3">
                      {item.title}
                    </h4>
                  )}
                  {item.body && (
                    <p className="text-body text-ivory/90">{item.body}</p>
                  )}
                </div>
              ))}
            </div>
            <Pagination
              currentPage={videoPage}
              totalPages={videoTotalPages}
              onPageChange={setVideoPage}
            />
          </div>

          <div>
            <h3 className="label text-xs text-sage mb-8">
              {t("videoGroups.talksTitle")}
            </h3>
            <div className="grid gap-10 sm:grid-cols-2">
              {talkPageItems.map((item, i) => (
                <div key={`${item.title ?? "talk"}-${i}`}>
                  <div className="aspect-video mb-3">
                    <iframe
                      className="w-full h-full"
                      src={item.embedUrl}
                      title={item.title ? `${item.title} ${i + 1}` : `Video ${i + 1}`}
                      loading="lazy"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    />
                  </div>
                  {item.title && (
                    <p className="label text-xs text-grey-muted">
                      {item.title}
                    </p>
                  )}
                  {item.body && (
                    <p className="text-body text-ivory/90 mt-2">{item.body}</p>
                  )}
                </div>
              ))}
            </div>
            <Pagination
              currentPage={talkPage}
              totalPages={talkTotalPages}
              onPageChange={setTalkPage}
            />
          </div>
        </div>
      ) : (
        <div>
          <div className="grid gap-8 grid-cols-2 sm:grid-cols-4">
            {galleryPageItems.map((img, i) => {
              const fullIndex = galleryPageStart + i;
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
                        sizes="(min-width: 640px) 50vw, 100vw"
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
            currentPage={galleryPage}
            totalPages={galleryTotalPages}
            onPageChange={setGalleryPage}
          />
        </div>
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
