import { getTranslations } from "next-intl/server";
import { PageHeaderStatement } from "@/components/PageHeaderStatement";
import { PageHeaderSection } from "@/components/PageHeaderSection";
import { Section } from "@/components/Section";
import { ConcertArchiveList } from "@/components/ConcertArchiveList";
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

  return (
    <div>
      <PageHeaderSection>
        <h1 className="sr-only">{t("title")}</h1>
        <div className="space-y-4 max-w-2xl">
          {t("headerStatement")
            .split("\n\n")
            .map((sentence, i) => (
              <PageHeaderStatement key={i} className="text-sage">
                {sentence}
              </PageHeaderStatement>
            ))}
        </div>
      </PageHeaderSection>

      <div className="space-y-14 md:space-y-28">
        <Section className="pt-7 md:pt-14">
          <h2 className="text-h2 font-display-bold! font-bold not-italic text-ivory mb-6">
            {t("engagementsTitle")}
          </h2>
          <EngagementsList />
        </Section>

        <Section>
          <h2 className="text-h2 font-display-bold! font-bold not-italic text-ivory mb-6">
            {t("archiveTitle")}
          </h2>
          <ConcertArchiveList />
        </Section>
      </div>
    </div>
  );
}
