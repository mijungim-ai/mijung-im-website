import { getTranslations, getLocale } from "next-intl/server";
import { MediaTabs } from "@/components/MediaTabs";
import { PageHeaderStatement } from "@/components/PageHeaderStatement";
import { SocialIconRow } from "@/components/SocialIconRow";

export default async function MediaPage() {
  const t = await getTranslations("media");
  const locale = await getLocale();
  const isEn = locale === "en";

  return (
    <div>
      <section className="pt-16">
        <div className="mx-auto max-w-6xl px-6 py-28 border-b border-hairline">
          <h1 className="sr-only">{t("title")}</h1>
          {isEn ? (
            <>
              <p className="display-serif text-h1 text-ivory">
                {t("headerTitle")}
              </p>
              <div className="space-y-4 mt-6 max-w-2xl">
                {t("headerStatement")
                  .split("\n\n")
                  .map((sentence, i) => (
                    <PageHeaderStatement key={i} className="text-grey-muted">
                      {sentence}
                    </PageHeaderStatement>
                  ))}
              </div>
            </>
          ) : (
            <p className="display-serif text-h2 text-grey-muted">
              {t("subtitle")}
            </p>
          )}
          <SocialIconRow className="mt-8" />
        </div>
      </section>

      <div className="mx-auto max-w-3xl px-6 py-28">
        <MediaTabs />
      </div>
    </div>
  );
}
