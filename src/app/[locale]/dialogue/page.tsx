import { getTranslations } from "next-intl/server";
import { PageHeaderStatement } from "@/components/PageHeaderStatement";
import { PageHeaderSection } from "@/components/PageHeaderSection";
import { Section } from "@/components/Section";
import { PressList } from "@/components/PressList";
import { EssaysList } from "@/components/EssaysList";
import { NytPressPhoto } from "@/components/NytPressPhoto";
import { getEssays } from "@/data/dialogue";
import { getPressArticles } from "@/data/pressArticles";
import { getFeaturedPhoto } from "@/data/featuredPhoto";

export default async function DialoguePage() {
  const t = await getTranslations("dialogue");
  const pressArticles = getPressArticles();
  const essays = getEssays();
  const featuredPhoto = getFeaturedPhoto();

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
            {t("pressTitle")}
          </h2>
          <div className="mb-8">
            <NytPressPhoto photo={featuredPhoto} />
          </div>
          <PressList articles={pressArticles} />
        </Section>

        <Section>
          <h2 className="text-h2 font-display-bold! font-bold not-italic text-ivory mb-6">
            {t("essaysTitle")}
          </h2>
          <EssaysList essays={essays} />
        </Section>
      </div>
    </div>
  );
}
