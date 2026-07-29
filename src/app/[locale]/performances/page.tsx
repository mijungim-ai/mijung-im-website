import { getTranslations, getLocale } from "next-intl/server";
import { Placeholder } from "@/components/Placeholder";
import { PageHeaderStatement } from "@/components/PageHeaderStatement";
import { PageSubtitle } from "@/components/PageSubtitle";
import { ConcertArchiveGrid } from "@/components/ConcertArchiveGrid";
import { engagements } from "@/data/engagements";

function EngagementsList() {
  return (
    <div className="space-y-6">
      {engagements.map((engagement) => (
        <div
          key={engagement.title}
          className="border-b border-hairline pb-6"
        >
          <p className="text-body font-bold text-ivory">{engagement.title}</p>
          <p className="text-body text-ivory/70 mt-1">
            {engagement.dateLabel} &mdash; {engagement.location}
          </p>
        </div>
      ))}
    </div>
  );
}

export default async function PerformancesPage() {
  const t = await getTranslations("performances");
  const tc = await getTranslations("common");
  const locale = await getLocale();
  const isEn = locale === "en";

  return (
    <div>
      <section className="pt-16">
        <div className="mx-auto max-w-6xl px-6 py-28 border-b border-hairline">
          <h1 className="sr-only">{t("title")}</h1>
          {isEn ? (
            <div className="space-y-4 max-w-2xl">
              {t("headerStatement")
                .split("\n\n")
                .map((sentence, i) => (
                  <PageHeaderStatement key={i} className="text-sage">
                    {sentence}
                  </PageHeaderStatement>
                ))}
            </div>
          ) : (
            <PageSubtitle>{t("subtitle")}</PageSubtitle>
          )}
        </div>
      </section>

      <div className="mx-auto max-w-3xl px-6 py-28 space-y-20">
        <section>
          <h2 className="text-h2 font-display-bold! font-bold not-italic text-ivory mb-6">
            {t("engagementsTitle")}
          </h2>
          {isEn ? (
            <EngagementsList />
          ) : (
            <Placeholder label={tc("placeholderLabel")}>
              <EngagementsList />
            </Placeholder>
          )}
        </section>

        <section>
          <h2 className="text-h2 font-display-bold! font-bold not-italic text-ivory mb-6">
            {t("archiveTitle")}
          </h2>
          <ConcertArchiveGrid />
        </section>
      </div>
    </div>
  );
}
