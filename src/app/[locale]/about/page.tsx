import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { PageHeaderStatement } from "@/components/PageHeaderStatement";
import { PageHeaderSection } from "@/components/PageHeaderSection";
import { Section } from "@/components/Section";

export default async function AboutPage() {
  const t = await getTranslations("about");

  return (
    <div>
      <PageHeaderSection>
        <h1 className="display-serif text-h1 text-ivory">{t("title")}</h1>
        <PageHeaderStatement className="text-sage mt-6 max-w-xl">
          &ldquo;{t("quoteText")}&rdquo;
          <br />
          &mdash; {t("quoteAttribution")}
        </PageHeaderStatement>
      </PageHeaderSection>

      <div className="space-y-14 md:space-y-28">
        <Section className="pt-5 md:pt-8">
          <p className="label text-xs text-sage mb-6">{t("theArtistLabel")}</p>
          <div className="grid grid-cols-2 gap-6 sm:gap-8">
            <div className="photo-frame relative aspect-[3/4] overflow-hidden">
              <Image
                src="/images/about_headshot.jpg"
                alt="Portrait of Mijung IM"
                fill
                sizes="(min-width: 1152px) 536px, 50vw"
                className="object-cover"
              />
            </div>
            <div className="photo-frame relative aspect-[3/4] overflow-hidden">
              <Image
                src="/images/about/studio_portrait_piano_profile.jpg"
                alt="Mijung IM in a formal studio portrait at the piano"
                fill
                sizes="(min-width: 1152px) 536px, 50vw"
                className="object-cover"
              />
            </div>
          </div>
        </Section>

        <Section>
          <h2 className="label text-xs text-sage mb-6">{t("biographyLabel")}</h2>
          <div className="space-y-4">
            {t("bioMedium")
              .split("\n\n")
              .map((paragraph, i) => (
                <p key={i} className="text-body text-ivory/90">
                  {paragraph}
                </p>
              ))}
          </div>
        </Section>

        <Section className="text-center">
          <a
            href="/downloads/mijung-im-press-kit.pdf"
            download
            className="label text-xs inline-flex items-center border border-sage bg-sage text-ink px-[28px] py-[12px] hover:bg-transparent hover:text-sage transition-colors"
          >
            {t("epkLabel")}
          </a>
          <p className="text-caption text-grey-muted mt-4">{t("epkNote")}</p>
        </Section>
      </div>
    </div>
  );
}
