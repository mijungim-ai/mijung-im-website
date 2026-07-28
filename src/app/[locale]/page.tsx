import Image from "next/image";
import { getTranslations, getLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Placeholder } from "@/components/Placeholder";
import { HeroRotator } from "@/components/HeroRotator";

export default async function Home() {
  const t = await getTranslations("home");
  const tc = await getTranslations("common");
  const locale = await getLocale();
  const isEn = locale === "en";

  return (
    <div>
      <section className="photo-frame relative w-full aspect-[3/2] max-h-[735px] overflow-hidden flex items-start mt-[65px]">
        <HeroRotator />
        <div
          className="absolute inset-x-0 bottom-0 h-[38%] bg-gradient-to-t from-black/70 to-transparent"
          aria-hidden
        />
        <div className="relative z-10 mx-auto max-w-6xl w-full px-6 pt-10 md:pt-16">
          <h1 className="display-serif text-on-photo text-[clamp(40px,7.5vw,88px)] leading-[1.05] [text-shadow:0_2px_12px_rgba(0,0,0,0.6)]">
            Mijung IM
          </h1>
          <p className="display-serif text-on-photo/80 text-[clamp(16px,2.4vw,26px)] mt-3 [text-shadow:0_1px_8px_rgba(0,0,0,0.6)]">
            {t("heroTitle")}
          </p>
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

      <section className="photo-frame relative bg-ink-deep border-y border-hairline overflow-hidden min-h-[420px] flex items-start">
        <Image
          src="/images/home/plz_goseong_hwajinpo_beach_2020.jpg"
          alt={
            isEn
              ? t("projectImageCaption")
              : "Piano performance inside a transparent dome on the beach at Hwajinpo, Goseong"
          }
          fill
          sizes="100vw"
          className="object-cover object-bottom"
        />
        <div className="relative z-10 mx-auto max-w-3xl w-full px-6 pt-12 pb-10">
          <h2 className="text-h2 font-display-bold! font-bold not-italic text-on-photo mb-3 [text-shadow:0_1px_3px_rgba(0,0,0,0.9),0_2px_10px_rgba(0,0,0,0.85)]">
            {t("projectTitle")}
          </h2>
          {isEn ? (
            <p className="text-body text-on-photo/90 [text-shadow:0_1px_3px_rgba(0,0,0,0.9),0_2px_10px_rgba(0,0,0,0.85)]">
              {t("projectSubtitle")}
            </p>
          ) : (
            <Placeholder label={tc("placeholderLabel")} surfaceClassName="bg-ink-deep">
              <p className="text-body text-on-photo/90">{t("projectBody")}</p>
            </Placeholder>
          )}
          <Link
            href="/projects"
            className="label text-xs text-on-photo hover:text-sage transition-colors mt-6 inline-block [text-shadow:0_1px_3px_rgba(0,0,0,0.9),0_2px_10px_rgba(0,0,0,0.85)]"
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
