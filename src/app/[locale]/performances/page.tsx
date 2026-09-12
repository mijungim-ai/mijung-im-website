import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { PageHeaderStatement } from "@/components/PageHeaderStatement";
import { PageHeaderSection } from "@/components/PageHeaderSection";
import { Section } from "@/components/Section";
import { ConcertArchiveList } from "@/components/ConcertArchiveList";
import { EngagementsList } from "@/components/EngagementsList";
import { getEngagements } from "@/data/engagements";
import { getConcertArchive } from "@/data/concertArchive";
import { pageMetadata } from "@/lib/siteMeta";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata({ locale, path: "/performances", navKey: "performances" });
}

export default async function PerformancesPage() {
  const t = await getTranslations("performances");
  const engagements = getEngagements();
  const concertArchive = getConcertArchive();

  return (
    <div>
      <PageHeaderSection>
        <h1 className="sr-only">{t("title")}</h1>
        <div className="space-y-4">
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
        <Section className="pt-5 md:pt-8">
          <h2 className="text-h2 font-display-bold! font-bold not-italic text-ivory mb-6">
            {t("engagementsTitle")}
          </h2>
          <EngagementsList engagements={engagements} />
        </Section>

        <Section>
          <h2 className="text-h2 font-display-bold! font-bold not-italic text-ivory mb-6">
            {t("archiveTitle")}
          </h2>
          <ConcertArchiveList entries={concertArchive} />
        </Section>
      </div>
    </div>
  );
}
