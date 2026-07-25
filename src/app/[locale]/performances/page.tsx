import { getTranslations, getLocale } from "next-intl/server";
import { PageHeader } from "@/components/PageHeader";
import { Placeholder } from "@/components/Placeholder";

export default async function PerformancesPage() {
  const t = await getTranslations("performances");
  const tc = await getTranslations("common");
  const locale = await getLocale();
  const isEn = locale === "en";

  const engagementsList = isEn ? t.raw("engagementsList") : null;
  const repertoireList = isEn ? t.raw("repertoireList") : null;

  return (
    <div>
      <PageHeader
        eyebrow={t("eyebrow")}
        title={t("title")}
        subtitle={t("subtitle")}
      />

      <div className="mx-auto max-w-3xl px-6 py-28 space-y-20">
        {isEn && (
          <section>
            <p className="font-display-bold font-bold not-italic text-[clamp(32px,4vw,40px)] leading-tight text-ivory mb-6">
              {t("introHeadline")}
            </p>
            <div className="space-y-4">
              {t("introBody")
                .split("\n\n")
                .map((paragraph, i) => (
                  <p key={i} className="text-body text-ivory/90">
                    {paragraph}
                  </p>
                ))}
            </div>
          </section>
        )}

        <section>
          <h2 className="text-h2 font-display-bold! font-bold not-italic text-ivory mb-6">
            {t("engagementsTitle")}
          </h2>
          {engagementsList ? (
            <ul className="grid gap-x-8 gap-y-2 sm:grid-cols-2">
              {(engagementsList as string[]).map((item) => (
                <li
                  key={item}
                  className="text-body text-ivory/90 border-b border-hairline py-2"
                >
                  {item}
                </li>
              ))}
            </ul>
          ) : (
            <Placeholder label={tc("placeholderLabel")}>
              <p className="text-body text-ivory/90">
                {t("engagementsBody")}
              </p>
            </Placeholder>
          )}
        </section>

        <section>
          <h2 className="text-h2 font-display-bold! font-bold not-italic text-ivory mb-6">
            {t("archiveTitle")}
          </h2>
          <Placeholder label={tc("placeholderLabel")}>
            <p className="text-body text-ivory/90">{t("archiveBody")}</p>
          </Placeholder>
        </section>

        <section>
          <h2 className="text-h2 font-display-bold! font-bold not-italic text-ivory mb-6">
            {t("repertoireTitle")}
          </h2>
          {repertoireList ? (
            <ul className="grid gap-x-8 gap-y-2 sm:grid-cols-3">
              {(repertoireList as string[]).map((item) => (
                <li
                  key={item}
                  className="text-body text-ivory/90 border-b border-hairline py-2"
                >
                  {item}
                </li>
              ))}
            </ul>
          ) : (
            <Placeholder label={tc("placeholderLabel")}>
              <p className="text-body text-ivory/90">
                {t("repertoireBody")}
              </p>
            </Placeholder>
          )}
        </section>
      </div>
    </div>
  );
}
