import { getTranslations } from "next-intl/server";
import { PageHeader } from "@/components/PageHeader";
import { Placeholder } from "@/components/Placeholder";

export default async function DialoguePage() {
  const t = await getTranslations("dialogue");
  const tc = await getTranslations("common");

  return (
    <div>
      <PageHeader
        eyebrow={t("eyebrow")}
        title={t("title")}
        subtitle={t("subtitle")}
      />

      <div className="mx-auto max-w-3xl px-6 py-20">
        <Placeholder label={tc("placeholderLabel")}>
          <p className="text-body text-ivory/90">{t("entriesBody")}</p>
        </Placeholder>
      </div>
    </div>
  );
}
