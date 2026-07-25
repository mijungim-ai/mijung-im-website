import Image from "next/image";
import { getTranslations, getLocale } from "next-intl/server";
import { BioTabs } from "@/components/BioTabs";
import { PageHeader } from "@/components/PageHeader";
import { Placeholder } from "@/components/Placeholder";

export default async function AboutPage() {
  const t = await getTranslations("about");
  const tc = await getTranslations("common");
  const locale = await getLocale();
  const isEn = locale === "en";

  return (
    <div>
      <PageHeader
        eyebrow={t("eyebrow")}
        title={t("title")}
        subtitle={t("subtitle")}
      />

      <section className="mx-auto max-w-3xl px-6 py-28">
        <div className="flex flex-col sm:flex-row gap-10 sm:items-start mb-16">
          <div className="photo-frame relative w-48 sm:w-60 aspect-[3/4] shrink-0 overflow-hidden">
            <Image
              src="/images/about_headshot.jpg"
              alt="Portrait of Mijung IM"
              fill
              sizes="(min-width: 640px) 15rem, 12rem"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/25" aria-hidden />
          </div>
          <div>
            <p className="label text-xs text-sage mb-3">The Artist</p>
            <h2 className="label text-xs text-grey-muted">Biography</h2>
          </div>
        </div>
        <BioTabs />
      </section>

      <section className="bg-ink-deep border-y border-hairline">
        <div className="mx-auto max-w-3xl px-6 py-28">
          <h2 className="text-h2 text-ivory mb-6">{t("visionTitle")}</h2>
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

      <section className="mx-auto max-w-3xl px-6 py-28 text-center">
        <a
          href="/epk/mijung-im-epk.pdf"
          className="label text-xs inline-flex items-center border border-sage text-sage px-[28px] py-[12px] hover:bg-sage hover:text-ink transition-colors"
        >
          {t("epkLabel")}
        </a>
        <p className="text-caption text-grey-muted mt-4">{t("epkNote")}</p>
      </section>
    </div>
  );
}
