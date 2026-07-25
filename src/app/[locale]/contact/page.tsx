import { getTranslations, getLocale } from "next-intl/server";
import { PageHeader } from "@/components/PageHeader";
import { Placeholder } from "@/components/Placeholder";
import { SOCIALS } from "@/data/socials";

export default async function ContactPage() {
  const t = await getTranslations("contact");
  const tc = await getTranslations("common");
  const locale = await getLocale();
  const isEn = locale === "en";

  const categories = [
    t("concertTitle"),
    t("masterclassTitle"),
    t("mediaTitle"),
    t("generalTitle"),
  ];

  return (
    <div>
      <PageHeader
        eyebrow={t("eyebrow")}
        title={t("title")}
        subtitle={t("subtitle")}
      />

      <div className="mx-auto max-w-3xl px-6 py-28 grid gap-10 sm:grid-cols-2">
        {categories.map((category) => (
          <div key={category}>
            <h2 className="label text-xs text-grey-muted mb-4">{category}</h2>
            {isEn ? (
              <div className="border border-hairline px-4 py-3">
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
        ))}
      </div>

      {isEn && (
        <div className="mx-auto max-w-3xl px-6 pb-28">
          <h2 className="label text-xs text-grey-muted mb-4">
            {t("followTitle")}
          </h2>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {SOCIALS.map((social) =>
              social.href ? (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="label text-xs text-grey-muted hover:text-sage transition-colors"
                  >
                    {social.label}
                  </a>
                </li>
              ) : (
                <li key={social.label}>
                  <span className="label text-xs text-grey-muted/40 cursor-default">
                    {social.label}
                  </span>
                </li>
              ),
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
