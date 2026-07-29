import { getTranslations } from "next-intl/server";
import { PageSubtitle } from "@/components/PageSubtitle";
import { PageHeaderStatement } from "@/components/PageHeaderStatement";
import { PageHeaderSection } from "@/components/PageHeaderSection";
import { Section } from "@/components/Section";

export default async function ContactPage() {
  const t = await getTranslations("contact");

  return (
    <div>
      <PageHeaderSection>
        <h1 className="sr-only">{t("title")}</h1>
        <PageSubtitle>{t("title")}</PageSubtitle>
        <PageHeaderStatement className="text-sage mt-3">
          {t("subtitle")}
        </PageHeaderStatement>
      </PageHeaderSection>

      <Section className="pt-7 md:pt-14">
        <h2 className="label text-xs text-grey-muted mb-4">
          {t("generalTitle")}
        </h2>
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
      </Section>
    </div>
  );
}
