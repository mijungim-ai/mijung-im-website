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
      <section className="photo-frame relative w-full aspect-[3/2] max-h-[800px] overflow-hidden flex items-start">
        <Image
          src="/images/hero_home_conducting.jpg"
          alt="Mijung IM performing at the piano"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/25" aria-hidden />
        <div className="relative z-10 mx-auto max-w-6xl w-full px-6 pt-20 md:pt-32">
          <div className="max-w-[9rem] sm:max-w-none">
            <h1 className="display-serif text-on-photo text-[clamp(32px,6vw,64px)] leading-[1.05]">
              Mijung IM
            </h1>
            <p className="display-serif text-on-photo/80 text-[clamp(18px,3vw,32px)] mt-3">
              {t("heroTitle")}
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6 py-28">
        {isEn && (
          <div className="mb-8">
            <p className="font-display-bold font-bold not-italic text-[clamp(32px,4vw,40px)] leading-tight text-ivory">
              {t("statementHeadline")}
            </p>
            <p className="display-serif text-[clamp(18px,2vw,20px)] text-sage mt-3">
              {t("statementTagline")}
            </p>
          </div>
        )}
        {isEn ? (
          <p className="text-body text-ivory/90">{t("introBody")}</p>
        ) : (
          <Placeholder label={tc("placeholderLabel")}>
            <p className="text-body text-ivory/90">{t("introBody")}</p>
          </Placeholder>
        )}
      </section>

      <section className="mx-auto max-w-3xl px-6 py-28">
        <p className="label text-xs text-brass mb-6">{t("quoteTitle")}</p>
        {isEn ? (
          <blockquote className="border-l-2 border-brass pl-4">
            <p className="text-h2 font-display! font-semibold italic text-ivory">
              &ldquo;{t("quoteText")}&rdquo;
            </p>
            <cite className="text-caption text-grey-muted mt-4 block not-italic">
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

      <section className="mx-auto max-w-3xl px-6 py-28">
        <h2 className="text-h2 font-display-bold! font-bold not-italic text-ivory mb-6">
          {t("videoTitle")}
        </h2>
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

      <section className="photo-frame relative bg-ink-deep border-y border-hairline overflow-hidden min-h-[520px] flex items-center">
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
        <div className="relative z-10 mx-auto max-w-3xl w-full px-6 py-28">
          <h2 className="text-h2 font-display-bold! font-bold not-italic text-on-photo mb-6">
            {t("projectTitle")}
          </h2>
          {isEn ? (
            <p className="text-body text-on-photo/90">{t("projectBody")}</p>
          ) : (
            <Placeholder label={tc("placeholderLabel")} surfaceClassName="bg-ink-deep">
              <p className="text-body text-on-photo/90">{t("projectBody")}</p>
            </Placeholder>
          )}
          <Link
            href="/projects"
            className="label text-xs text-on-photo hover:text-sage transition-colors mt-6 inline-block"
          >
            {t("projectLink")} →
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6 py-28">
        <h2 className="text-h2 font-display-bold! font-bold not-italic text-ivory mb-6">
          {t("newsTitle")}
        </h2>
        <Placeholder label={tc("placeholderLabel")}>
          <p className="text-body text-ivory/90">{t("newsBody")}</p>
        </Placeholder>
      </section>

      <section className="mx-auto max-w-3xl px-6 py-32 text-center">
        <h2 className="text-h2 font-display-bold! font-bold not-italic text-ivory mb-4">
          {t("ctaTitle")}
        </h2>
        <p className="text-body text-ivory/90 mb-10">{t("ctaBody")}</p>
        <div className="flex flex-wrap items-center justify-center gap-6">
          <Link
            href="/contact"
            className="label text-xs inline-flex items-center border border-sage text-sage px-[28px] py-[12px] hover:bg-sage hover:text-ink transition-colors"
          >
            {t("ctaContact")}
          </Link>
          <a
            href="/epk/mijung-im-epk.pdf"
            className="label text-xs inline-flex items-center border border-sage text-sage px-[28px] py-[12px] hover:bg-sage hover:text-ink transition-colors"
          >
            {t("ctaEpk")}
          </a>
        </div>
      </section>
    </div>
  );
}
