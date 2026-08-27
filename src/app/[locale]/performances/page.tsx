import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { PageHeaderStatement } from "@/components/PageHeaderStatement";
import { PageHeaderSection } from "@/components/PageHeaderSection";
import { Section } from "@/components/Section";
import { ConcertArchiveList } from "@/components/ConcertArchiveList";
import { getEngagements, type Engagement } from "@/data/engagements";
import { getConcertArchive } from "@/data/concertArchive";

function EngagementsList({ engagements }: { engagements: Engagement[] }) {
  return (
    <div className="space-y-6">
      {engagements.map((engagement) => (
        <div
          key={engagement.title}
          className="border-b border-hairline pb-6"
        >
          {engagement.image && (
            <div className="photo-frame relative aspect-video mb-4 overflow-hidden">
              <Image
                src={engagement.image}
                alt={engagement.title}
                fill
                sizes="(min-width: 768px) 48rem, 100vw"
                className="object-cover"
              />
            </div>
          )}
          <p className="text-body font-bold text-ivory">{engagement.title}</p>
          <p className="text-body text-ivory/70 mt-1">
            {engagement.dateLabel} &mdash; {engagement.location}
          </p>
          {engagement.content && (
            <p className="text-body text-ivory/90 mt-2 whitespace-pre-line">
              {engagement.content}
            </p>
          )}
          {engagement.link && (
            <a
              href={engagement.link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="label text-xs text-sage hover:text-ivory transition-colors mt-3 inline-block"
            >
              {engagement.link.label} →
            </a>
          )}
        </div>
      ))}
    </div>
  );
}

export default async function PerformancesPage() {
  const t = await getTranslations("performances");
  const engagements = getEngagements();
  const concertArchive = getConcertArchive();

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
