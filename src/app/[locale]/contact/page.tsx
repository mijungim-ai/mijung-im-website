import { getTranslations, getLocale } from "next-intl/server";
import { PageSubtitle } from "@/components/PageSubtitle";
import { PageHeaderStatement } from "@/components/PageHeaderStatement";
import { PageHeaderSection } from "@/components/PageHeaderSection";
import { Section } from "@/components/Section";
import { Placeholder } from "@/components/Placeholder";

export default async function ContactPage() {
  const t = await getTranslations("contact");
  const tc = await getTranslations("common");
  const locale = await getLocale();
  const isEn = locale === "en";

  return (
    <div>
      <PageHeaderSection>
        <h1 className="sr-only">{t("title")}</h1>
        <PageSubtitle>{t("title")}</PageSubtitle>
        <PageHeaderStatement className="text-sage mt-3">
          {t("subtitle")}
        </PageHeaderStatement>
      </PageHeaderSection>

      <Section>
        <h2 className="label text-xs text-grey-muted mb-4">
          {t("generalTitle")}
        </h2>
        {isEn ? (
          <div className="border border-hairline px-4 py-3 max-w-sm">
            <a
              href={`mailto:${t("email")}`}
              className="text-body text-sage hover:text-ivory transition-colors"
            >
              {t("email")}
            </a>
            <p className="text-caption text-grey-muted mt-1">
              {t("contactPerson")}
            </p>
            <p className="text-caption text-grey-muted">{t("phone")}</p>
          </div>
        ) : (
          <Placeholder label={tc("placeholderLabel")} compact>
            <p className="text-caption text-ivory/60 italic">
              {t("emailPlaceholder")}
            </p>
          </Placeholder>
        )}
      </Section>
    </div>
  );
}
