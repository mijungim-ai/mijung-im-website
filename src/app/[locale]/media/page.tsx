import { getTranslations, getLocale } from "next-intl/server";
import { MediaTabs } from "@/components/MediaTabs";
import { PageHeaderStatement } from "@/components/PageHeaderStatement";
import { PageSubtitle } from "@/components/PageSubtitle";
import { PageHeaderSection } from "@/components/PageHeaderSection";
import { Section } from "@/components/Section";
import { SocialIconRow } from "@/components/SocialIconRow";

export default async function MediaPage() {
  const t = await getTranslations("media");
  const locale = await getLocale();
  const isEn = locale === "en";

  return (
    <div>
      <PageHeaderSection>
        <h1 className="sr-only">{t("title")}</h1>
        {isEn ? (
          <>
            <PageSubtitle>{t("headerTitle")}</PageSubtitle>
            <div className="space-y-4 mt-6 max-w-2xl">
              {t("headerStatement")
                .split("\n\n")
                .map((sentence, i) => (
                  <PageHeaderStatement key={i} className="text-sage">
                    {sentence}
                  </PageHeaderStatement>
                ))}
            </div>
          </>
        ) : (
          <PageSubtitle>{t("subtitle")}</PageSubtitle>
        )}
        <SocialIconRow className="mt-8" />
      </PageHeaderSection>

      <Section>
        <MediaTabs />
      </Section>
    </div>
  );
}
