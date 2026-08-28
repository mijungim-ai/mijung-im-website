import { Suspense } from "react";
import { getTranslations } from "next-intl/server";
import { MediaTabs } from "@/components/MediaTabs";
import { PageHeaderStatement } from "@/components/PageHeaderStatement";
import { PageSubtitle } from "@/components/PageSubtitle";
import { PageHeaderSection } from "@/components/PageHeaderSection";
import { Section } from "@/components/Section";
import { SocialIconRow } from "@/components/SocialIconRow";
import { getGalleryImages } from "@/data/mediaGallery";
import { getVideoItems, getTalkItems } from "@/data/videos";

export default async function MediaPage() {
  const t = await getTranslations("media");
  const galleryImages = getGalleryImages();
  const videoItems = getVideoItems();
  const talkItems = getTalkItems();

  return (
    <div>
      <PageHeaderSection>
        <h1 className="sr-only">{t("title")}</h1>
        <PageSubtitle>{t("headerTitle")}</PageSubtitle>
        <div className="space-y-4 mt-6">
          {t("headerStatement")
            .split("\n\n")
            .map((sentence, i) => (
              <PageHeaderStatement key={i} className="text-sage">
                {sentence}
              </PageHeaderStatement>
            ))}
        </div>
        <SocialIconRow className="mt-8" />
      </PageHeaderSection>

      <Section className="pt-5 md:pt-8">
        <Suspense fallback={null}>
          <MediaTabs
            galleryImages={galleryImages}
            videoItems={videoItems}
            talkItems={talkItems}
          />
        </Suspense>
      </Section>
    </div>
  );
}
