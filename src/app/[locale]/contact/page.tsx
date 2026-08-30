import { getTranslations } from "next-intl/server";
import { PageSubtitle } from "@/components/PageSubtitle";
import { PageHeaderStatement } from "@/components/PageHeaderStatement";
import { PageHeaderSection } from "@/components/PageHeaderSection";
import { Section } from "@/components/Section";
import { ContactForm } from "@/components/ContactForm";

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

      <div className="space-y-14 md:space-y-28">
        <Section className="pt-5 md:pt-8">
          <h2 className="label text-xs text-sage mb-4">
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
          </div>
        </Section>

        <Section>
          <ContactForm />
        </Section>
      </div>
    </div>
  );
}
