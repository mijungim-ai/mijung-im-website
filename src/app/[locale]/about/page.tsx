import Image from "next/image";
import { getTranslations, getLocale } from "next-intl/server";
import { Placeholder } from "@/components/Placeholder";
import { PageHeaderStatement } from "@/components/PageHeaderStatement";
import { PageSubtitle } from "@/components/PageSubtitle";
import { PageHeaderSection } from "@/components/PageHeaderSection";
import { Section } from "@/components/Section";

export default async function AboutPage() {
  const t = await getTranslations("about");
  const tc = await getTranslations("common");
  const locale = await getLocale();
  const isEn = locale === "en";

  return (
    <div>
      <PageHeaderSection>
        <h1 className="display-serif text-h1 text-ivory">{t("title")}</h1>
        <PageSubtitle className="mt-3">{t("subtitle")}</PageSubtitle>
        {isEn && (
          <PageHeaderStatement className="text-sage mt-6 max-w-xl">
            &ldquo;{t("quoteText")}&rdquo;
            <br />
            &mdash; {t("quoteAttribution")}
          </PageHeaderStatement>
        )}
      </PageHeaderSection>

      <div className="space-y-14 md:space-y-28">
        <Section className="pt-7 md:pt-14">
          <p className="label text-xs text-sage mb-6">The Artist</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
            <div className="photo-frame relative aspect-[3/4] overflow-hidden">
              <Image
                src="/images/about_headshot.jpg"
                alt="Portrait of Mijung IM"
                fill
                sizes="(min-width: 640px) 22rem, 100vw"
                className="object-cover"
              />
            </div>
            <div className="photo-frame relative aspect-[3/4] overflow-hidden">
              <Image
                src="/images/about/studio_portrait_piano_profile.jpg"
                alt="Mijung IM in a formal studio portrait at the piano"
                fill
                sizes="(min-width: 640px) 22rem, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </Section>

        <Section>
          <h2 className="label text-xs text-grey-muted mb-6">Biography</h2>
          {isEn ? (
            <div className="space-y-4">
              {t("bioMedium")
                .split("\n\n")
                .map((paragraph, i) => (
                  <p key={i} className="text-body text-ivory/90">
                    {paragraph}
                  </p>
                ))}
            </div>
          ) : (
            <Placeholder label={tc("placeholderLabel")}>
              <div className="space-y-4">
                {t("bioMedium")
                  .split("\n\n")
                  .map((paragraph, i) => (
                    <p key={i} className="text-body text-ivory/90">
                      {paragraph}
                    </p>
                  ))}
              </div>
            </Placeholder>
          )}
        </Section>

        <Section className="text-center">
          <a
            href="/epk/mijung-im-epk.pdf"
            className="label text-xs inline-flex items-center border border-sage text-sage px-[28px] py-[12px] hover:bg-sage hover:text-ink transition-colors"
          >
            {t("epkLabel")}
          </a>
          <p className="text-caption text-grey-muted mt-4">{t("epkNote")}</p>
        </Section>
      </div>
    </div>
  );
}
