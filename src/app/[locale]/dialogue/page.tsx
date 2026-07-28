import { getTranslations, getLocale } from "next-intl/server";
import { PageHeaderStatement } from "@/components/PageHeaderStatement";
import { ExternalLinkGlyph } from "@/components/icons/ExternalLinkGlyph";
import {
  essays,
  directorLetters,
  type DirectorLetterEntry,
} from "@/data/dialogue";

function LinkEntry({ title, href }: { title: string; href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center justify-between gap-4 border-b border-hairline py-4 text-ivory/90 hover:text-sage transition-colors"
    >
      <span className="text-body">{title}</span>
      <ExternalLinkGlyph className="w-4 h-4 shrink-0" />
    </a>
  );
}

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
                  <PageHeaderStatement key={i} className="text-grey-muted">
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
            Essays
          </h2>
          <div>
            {essays.map((essay) => (
              <LinkEntry key={essay.href} title={essay.title} href={essay.href} />
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-h2 font-display-bold! font-bold not-italic text-ivory mb-6">
            Artistic Director&rsquo;s Letter
          </h2>
          <div className="space-y-6">
            {directorLetters.map((entry) => (
              <DirectorLetterEntryRow key={entry.title} entry={entry} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
