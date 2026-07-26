import { getTranslations } from "next-intl/server";
import { PageHeader } from "@/components/PageHeader";
import { MediaTabs } from "@/components/MediaTabs";

export default async function MediaPage() {
  const t = await getTranslations("media");

  return (
    <div>
      <PageHeader title={t("title")} subtitle={t("subtitle")} />

      <div className="mx-auto max-w-3xl px-6 py-28">
        <MediaTabs />
      </div>
    </div>
  );
}
