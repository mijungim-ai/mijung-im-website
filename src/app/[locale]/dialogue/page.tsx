import { getTranslations } from "next-intl/server";
import { PageHeaderStatement } from "@/components/PageHeaderStatement";
import { PageHeaderSection } from "@/components/PageHeaderSection";
import { Section } from "@/components/Section";
import { LinkEntry } from "@/components/LinkEntry";
import {
  essays,
  directorLetters,
  type DirectorLetterEntry,
} from "@/data/dialogue";

function DirectorLetterEntryRow({ entry }: { entry: DirectorLetterEntry }) {
  if (entry.type === "link") {
    return <LinkEntry title={entry.title} href={entry.href} />;
  }
  return (
    <div className="border-l-2 border-sage pl-6">
      <p className="label text-xs text-grey-muted mb-2">
        {entry.title}
        {entry.date ? ` — ${entry.date}` : ""}
      </p>
      <p className="text-body italic text-ivory/90 whitespace-pre-line">
        {entry.body}
      </p>
    </div>
  );
}

export default async function DialoguePage() {
  const t = await getTranslations("dialogue");

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
            {t("essaysTitle")}
          </h2>
          <div>
            {essays.map((essay) => (
              <LinkEntry key={essay.href} title={essay.title} href={essay.href} />
            ))}
          </div>
        </Section>

        <Section>
          <h2 className="text-h2 font-display-bold! font-bold not-italic text-ivory mb-6">
            {t("directorLetterTitle")}
          </h2>
          <div className="space-y-6">
            {directorLetters.map((entry) => (
              <DirectorLetterEntryRow key={entry.title} entry={entry} />
            ))}
          </div>
        </Section>
      </div>
    </div>
  );
}
