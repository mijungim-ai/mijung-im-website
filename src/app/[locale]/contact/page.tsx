import { getTranslations, getLocale } from "next-intl/server";
import { PageHeaderStatement } from "@/components/PageHeaderStatement";
import { Placeholder } from "@/components/Placeholder";

export default async function ContactPage() {
  const t = await getTranslations("contact");
  const tc = await getTranslations("common");
  const locale = await getLocale();
  const isEn = locale === "en";

  return (
    <div>
      <section className="pt-16">
        <div className="mx-auto max-w-6xl px-6 py-28 border-b border-hairline">
          <h1 className="display-serif text-h1 text-ivory">{t("title")}</h1>
          <PageHeaderStatement className="text-sage mt-3">
            {t("subtitle")}
          </PageHeaderStatement>
        </div>
      </section>

      <div className="mx-auto max-w-3xl px-6 py-28">
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
      </div>
    </div>
  );
}
