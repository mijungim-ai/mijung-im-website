import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Placeholder } from "@/components/Placeholder";
import { HeroRotator } from "@/components/HeroRotator";
import { Section } from "@/components/Section";
import { HomeNewsList } from "@/components/HomeNewsList";
import { getHomeNews } from "@/data/homeNews";
import { pageMetadata } from "@/lib/siteMeta";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata({ locale });
}

export default async function Home() {
  const t = await getTranslations("home");
  const tc = await getTranslations("common");
  const newsItems = getHomeNews();

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
        </div>
      </section>

      <div className="pt-14 md:pt-28 space-y-14 md:space-y-28">
        <Section>
          <div className="mb-8">
            <p className="font-display-bold font-bold not-italic text-[clamp(32px,4vw,40px)] leading-tight text-ivory">
              {t("statementHeadline")}
            </p>
            <p className="display-serif text-[clamp(18px,2vw,20px)] text-sage mt-3">
              {t("statementTagline")}
            </p>
          </div>
          <p className="text-body text-ivory/90">{t("introBody")}</p>
        </Section>

        <Section>
          <h2 className="text-h2 font-display-bold! font-bold not-italic text-ivory mb-6">
            {t("videoTitle")}
          </h2>
          <div className="aspect-video">
            <iframe
              className="w-full h-full"
              src={t("videoEmbedUrl")}
              title={t("videoTitle")}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        </Section>

        <Section>
          <h2 className="text-h2 font-display-bold! font-bold not-italic text-ivory mb-6">
            {t("newsTitle")}
          </h2>
          {newsItems.length > 0 ? (
            <HomeNewsList items={newsItems} />
          ) : (
            <Placeholder label={tc("placeholderLabel")}>
              <p className="text-body text-ivory/90">{t("newsBody")}</p>
            </Placeholder>
          )}
        </Section>

        {/*
         * -mb-24 cancels out Footer's own mt-24 (see Footer.tsx) so this
         * photo runs flush into the footer with no white gap below it —
         * a deliberate exception for this section only. The gap here
         * wasn't from the space-y-14/28 rhythm above (that only adds
         * margin-top between siblings, never below the last one); it's
         * Footer's global top margin, which reads fine as breathing room
         * after ordinary text/card content but leaves an odd seam under
         * a full-bleed photo like this one.
         *
         * The min-h steps below are sized for this specific photo: the
         * PLZ sign and the piano sit near its opposite edges (~8%-97%
         * of its width), so object-cover's side crop can only stay off
         * both of them if the section's own ratio tracks the photo's
         * native ~3.16:1 fairly closely at every width — a flat 420px
         * crops well into both edges below the xl breakpoint.
         */}
        <section className="photo-frame relative bg-ink-deep border-y border-sage/25 overflow-hidden min-h-[105px] sm:min-h-[210px] md:min-h-[250px] lg:min-h-[340px] xl:min-h-[420px] flex items-start -mb-24">
          <Image
            src="/images/home/east_sea_plz_beach.jpg"
            alt={t("projectImageCaption")}
            fill
            sizes="100vw"
            className="object-cover object-bottom"
          />
          <div className="relative z-10 mx-auto max-w-3xl w-full px-6 pt-12 pb-10">
            <h2 className="text-h2 font-display-bold! font-bold not-italic text-on-photo mb-3 [text-shadow:0_1px_3px_rgba(0,0,0,0.9),0_2px_10px_rgba(0,0,0,0.85)]">
              {t("projectTitle")}
            </h2>
            <Link
              href="/projects"
              className="label text-xs text-on-photo hover:text-sage transition-colors mt-6 inline-block [text-shadow:0_1px_3px_rgba(0,0,0,0.9),0_2px_10px_rgba(0,0,0,0.85)]"
            >
              {t("projectLink")} →
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
