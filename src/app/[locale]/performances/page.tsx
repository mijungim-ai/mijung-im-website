import Image from "next/image";
import { getTranslations, getLocale } from "next-intl/server";
import { Placeholder } from "@/components/Placeholder";
import { PageHeaderStatement } from "@/components/PageHeaderStatement";
import { engagements } from "@/data/engagements";
import { concertArchive } from "@/data/concertArchive";

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
                  <PageHeaderStatement key={i} className="text-ivory">
                    {sentence}
                  </PageHeaderStatement>
                ))}
            </div>
          ) : (
            <p className="display-serif text-h2 text-grey-muted">
              {t("subtitle")}
            </p>
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
          {concertArchive.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
              {concertArchive.map((entry) => (
                <div
                  key={`${entry.year}-${entry.title}`}
                  className="photo-frame relative aspect-[3/4] overflow-hidden"
                >
                  <Image
                    src={entry.image}
                    alt={entry.title}
                    fill
                    sizes="(min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-black/60 px-3 py-2">
                    <p className="text-caption text-on-photo">
                      {entry.year}
                    </p>
                    <p className="text-body text-on-photo">{entry.title}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : isEn ? (
            <p className="text-body text-grey-muted italic text-center py-16 border border-dashed border-grey-muted/50">
              {t("archiveBody")}
            </p>
          ) : (
            <Placeholder label={tc("placeholderLabel")}>
              <p className="text-body text-ivory/90">{t("archiveBody")}</p>
            </Placeholder>
          )}
        </section>
      </div>
    </div>
  );
}
