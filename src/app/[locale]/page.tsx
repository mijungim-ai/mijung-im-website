import Image from "next/image";
import { getTranslations, getLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Placeholder } from "@/components/Placeholder";

export default async function Home() {
  const t = await getTranslations("home");
  const tc = await getTranslations("common");
  const locale = await getLocale();
  const isEn = locale === "en";

  return (
    <div>
      <section className="relative h-screen min-h-[560px] flex items-end overflow-hidden">
        <Image
          src="/images/hero_home_conducting.jpg"
          alt="Mijung IM performing at the piano"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/25" aria-hidden />
        <div className="relative z-10 mx-auto max-w-6xl w-full px-6 pb-20">
          <p className="label text-xs text-sage mb-3">{t("kicker")}</p>
          <h1 className="logotype text-ivory text-5xl md:text-7xl font-light leading-tight">
            Mijung IM
          </h1>
          <p className="text-h2 text-grey-muted mt-2">{t("heroTitle")}</p>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6 py-20">
        {isEn ? (
          <p className="text-body text-ivory/90">{t("introBody")}</p>
        ) : (
          <Placeholder label={tc("placeholderLabel")}>
            <p className="text-body text-ivory/90">{t("introBody")}</p>
          </Placeholder>
        )}
      </section>

      <section className="mx-auto max-w-3xl px-6 py-20">
        <h2 className="text-h2 text-ivory mb-4">{t("videoTitle")}</h2>
        {isEn ? (
          <div className="aspect-video">
            <iframe
              className="w-full h-full"
              src={t("videoEmbedUrl")}
              title={t("videoTitle")}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        ) : (
          <Placeholder label={tc("placeholderLabel")}>
            <div className="aspect-video flex items-center justify-center text-grey-muted text-caption">
              {t("videoBody")}
            </div>
          </Placeholder>
        )}
      </section>

      <section className="relative bg-ink-deep border-y border-hairline overflow-hidden min-h-[520px] flex items-center">
        <Image
          src="/images/dmz_barbed_wire_beach.jpg"
          alt={
            isEn
              ? t("projectImageCaption")
              : "Piano performance at the DMZ coastline, PLZ Festival"
          }
          fill
          sizes="100vw"
          className="object-cover object-[90%_100%]"
        />
        <div className="absolute inset-0 bg-black/25" aria-hidden />
        <div
          className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/25 to-transparent"
          aria-hidden
        />
        <div className="relative z-10 mx-auto max-w-3xl w-full px-6 py-20">
          <h2 className="text-h2 text-ivory mb-4">{t("projectTitle")}</h2>
          {isEn ? (
            <p className="text-body text-ivory/90">{t("projectBody")}</p>
          ) : (
            <Placeholder label={tc("placeholderLabel")} surfaceClassName="bg-ink-deep">
              <p className="text-body text-ivory/90">{t("projectBody")}</p>
            </Placeholder>
          )}
          <Link
            href="/projects"
            className="label text-xs text-sage hover:text-ivory transition-colors mt-4 inline-block"
          >
            {t("projectLink")} →
          </Link>
        </div>
        {isEn && (
          <p className="absolute bottom-3 right-4 z-10 text-[12px] text-grey-muted">
            {t("projectImageCaption")}
          </p>
        )}
      </section>

      <section className="mx-auto max-w-3xl px-6 py-20">
        <h2 className="text-h2 text-ivory mb-4">{t("newsTitle")}</h2>
        <Placeholder label={tc("placeholderLabel")}>
          <p className="text-body text-ivory/90">{t("newsBody")}</p>
        </Placeholder>
      </section>

      <section className="mx-auto max-w-3xl px-6 py-20">
        <p className="label text-xs text-brass mb-4">{t("quoteTitle")}</p>
        {isEn ? (
          <blockquote className="border-l-2 border-brass pl-4">
            <p className="text-h2 text-ivory italic">
              &ldquo;{t("quoteText")}&rdquo;
            </p>
            <cite className="text-caption text-grey-muted mt-3 block not-italic">
              — {t("quoteAttribution")}
            </cite>
          </blockquote>
        ) : (
          <Placeholder label={tc("placeholderLabel")}>
            <p className="text-body text-ivory/90 border-l-2 border-brass pl-4">
              {t("quoteBody")}
            </p>
          </Placeholder>
        )}
      </section>

      <section className="mx-auto max-w-3xl px-6 py-24 text-center">
        <h2 className="text-h2 text-ivory mb-3">{t("ctaTitle")}</h2>
        <p className="text-body text-grey-muted mb-8">{t("ctaBody")}</p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/contact"
            className="label text-xs inline-flex items-center border border-sage text-sage px-6 py-4 hover:bg-sage hover:text-ink transition-colors"
          >
            {t("ctaContact")}
          </Link>
          <a
            href="/epk/mijung-im-epk.pdf"
            className="label text-xs inline-flex items-center border border-sage text-sage px-6 py-4 hover:bg-sage hover:text-ink transition-colors"
          >
            {t("ctaEpk")}
          </a>
        </div>
      </section>
    </div>
  );
}
