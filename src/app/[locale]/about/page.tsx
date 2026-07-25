import Image from "next/image";
import { getTranslations, getLocale } from "next-intl/server";
import { BioTabs } from "@/components/BioTabs";
import { Placeholder } from "@/components/Placeholder";

export default async function AboutPage() {
  const t = await getTranslations("about");
  const tc = await getTranslations("common");
  const locale = await getLocale();
  const isEn = locale === "en";

  return (
    <div className="pt-16">
      <section className="relative h-[60vh] min-h-[420px] flex items-end overflow-hidden">
        <div
          className="absolute inset-0 bg-gradient-to-br from-ink-deep via-ink to-ink"
          aria-hidden
        />
        <div className="absolute inset-0 bg-black/25" aria-hidden />
        <div className="relative z-10 mx-auto max-w-6xl w-full px-6 pb-14">
          <p className="label text-xs text-sage mb-3">{t("eyebrow")}</p>
          <h1 className="text-h1 text-ivory">{t("title")}</h1>
          <p className="text-h2 text-grey-muted mt-2">{t("subtitle")}</p>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6 py-20">
        <div className="flex flex-col sm:flex-row gap-8 sm:items-start mb-12">
          <div className="photo-frame relative w-40 sm:w-48 aspect-[3/4] shrink-0 overflow-hidden">
            <Image
              src="/images/about_headshot.jpg"
              alt="Portrait of Mijung IM"
              fill
              sizes="(min-width: 640px) 12rem, 10rem"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/25" aria-hidden />
          </div>
          <div>
            <p className="label text-xs text-sage mb-2">The Artist</p>
            <h2 className="label text-xs text-grey-muted">Biography</h2>
          </div>
        </div>
        <BioTabs />
      </section>

      <section className="bg-ink-deep border-y border-hairline">
        <div className="mx-auto max-w-3xl px-6 py-20">
          <h2 className="text-h2 text-ivory mb-4">{t("visionTitle")}</h2>
          {isEn ? (
            <p className="text-body text-ivory/90">{t("visionBody")}</p>
          ) : (
            <Placeholder
              label={tc("placeholderLabel")}
              surfaceClassName="bg-ink-deep"
            >
              <p className="text-body text-ivory/90">{t("visionBody")}</p>
            </Placeholder>
          )}
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6 py-20 text-center">
        <a
          href="/epk/mijung-im-epk.pdf"
          className="label text-xs inline-flex items-center border border-sage text-sage px-6 py-4 hover:bg-sage hover:text-ink transition-colors"
        >
          {t("epkLabel")}
        </a>
        <p className="text-caption text-grey-muted mt-3">{t("epkNote")}</p>
      </section>
    </div>
  );
}
