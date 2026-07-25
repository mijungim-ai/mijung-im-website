import Image from "next/image";
import { getTranslations, getLocale } from "next-intl/server";
import { PageHeader } from "@/components/PageHeader";
import { Placeholder } from "@/components/Placeholder";

export default async function ProjectsPage() {
  const t = await getTranslations("projects");
  const tc = await getTranslations("common");
  const locale = await getLocale();
  const isEn = locale === "en";

  const projects = [
    {
      title: t("plzTitle"),
      body: t("plzBody"),
      final: isEn,
      image: "/images/east_sea_plz_festival.jpg",
      imageAlt: isEn
        ? t("plzImageCaption")
        : "Piano performance on the beach, PLZ Festival",
      imageCaption: isEn ? t("plzImageCaption") : undefined,
    },
    { title: t("dmzTitle"), body: t("dmzBody"), final: isEn },
    { title: t("foundationTitle"), body: t("foundationBody"), final: isEn },
    { title: t("educationTitle"), body: t("educationBody"), final: false },
  ];

  return (
    <div>
      <PageHeader
        eyebrow={t("eyebrow")}
        title={t("title")}
        subtitle={t("subtitle")}
      />

      <div className="mx-auto max-w-3xl px-6 py-20 space-y-16">
        {projects.map((project) => (
          <section key={project.title}>
            {project.image && (
              <div className="relative aspect-video mb-6 overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.imageAlt ?? ""}
                  fill
                  sizes="(min-width: 768px) 48rem, 100vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/25" aria-hidden />
              </div>
            )}
            {project.imageCaption && (
              <p className="text-[12px] text-grey-muted mb-6">
                {project.imageCaption}
              </p>
            )}
            <h2 className="text-h2 text-ivory mb-4">{project.title}</h2>
            {project.final ? (
              <p className="text-body text-ivory/90">{project.body}</p>
            ) : (
              <Placeholder label={tc("placeholderLabel")}>
                <p className="text-body text-ivory/90">{project.body}</p>
              </Placeholder>
            )}
          </section>
        ))}
      </div>
    </div>
  );
}
