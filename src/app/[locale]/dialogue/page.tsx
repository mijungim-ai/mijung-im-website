import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { PageHeaderStatement } from "@/components/PageHeaderStatement";
import { PageHeaderSection } from "@/components/PageHeaderSection";
import { Section } from "@/components/Section";
import { LinkEntry } from "@/components/LinkEntry";
import { getEssays, type EssayEntry } from "@/data/dialogue";
import { getPressArticles } from "@/data/pressArticles";

function WritingEntryRow({ entry }: { entry: EssayEntry }) {
  return (
    <div>
      {entry.image && (
        <div className="photo-frame relative aspect-video mb-4 max-w-md overflow-hidden">
          <Image
            src={entry.image}
            alt={entry.title}
            fill
            sizes="(min-width: 768px) 28rem, 100vw"
            className="object-cover"
          />
        </div>
      )}
      {entry.body ? (
        <div className="border-l-2 border-sage pl-6">
          <p className="label text-xs text-grey-muted mb-2">
            {entry.title}
            {entry.date ? ` — ${entry.date}` : ""}
          </p>
          <p className="text-body italic text-ivory/90 whitespace-pre-line">
            {entry.body}
          </p>
        </div>
      ) : (
        <LinkEntry title={entry.title} href={entry.externalUrl ?? ""} />
      )}
    </div>
  );
}

export default async function DialoguePage() {
  const t = await getTranslations("dialogue");
  const pressArticles = getPressArticles();
  const essays = getEssays();

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
            {t("pressTitle")}
          </h2>
          <div>
            {pressArticles.map((article) => (
              <LinkEntry key={article.url} title={article.title} href={article.url} />
            ))}
          </div>
        </Section>

        <Section>
          <h2 className="text-h2 font-display-bold! font-bold not-italic text-ivory mb-6">
            {t("essaysTitle")}
          </h2>
          <div>
            {essays.map((entry) => (
              <WritingEntryRow key={entry.title} entry={entry} />
            ))}
          </div>
        </Section>
      </div>
    </div>
  );
}
