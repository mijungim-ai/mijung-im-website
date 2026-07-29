import Image from "next/image";
import { getTranslations, getLocale } from "next-intl/server";
import { PageSubtitle } from "@/components/PageSubtitle";
import { PageHeaderStatement } from "@/components/PageHeaderStatement";
import { PageHeaderSection } from "@/components/PageHeaderSection";
import { Section } from "@/components/Section";
import { Placeholder } from "@/components/Placeholder";
import { ProjectGallery } from "@/components/ProjectGallery";

export default async function ProjectsPage() {
  const t = await getTranslations("projects");
  const tc = await getTranslations("common");
  const tm = await getTranslations("media");
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
      href: "http://plzfe.com/",
    },
    {
      title: t("dmzTitle"),
      body: t("dmzBody"),
      final: isEn,
      href: "https://www.gg.go.kr/dmzopen/index.do",
    },
    {
      title: t("foundationTitle"),
      body: t("foundationBody"),
      final: isEn,
      href: "http://www.music4one.org/",
    },
  ];

  return (
    <div>
      <PageHeaderSection>
        <h1 className="sr-only">{t("title")}</h1>
        <PageSubtitle>{t("title")}</PageSubtitle>
        <PageHeaderStatement className="text-sage mt-3">
          {t("subtitle")}
        </PageHeaderStatement>
      </PageHeaderSection>

      <>
        {projects.map((project) => (
          <Section key={project.title}>
            {project.image && (
              <div
                className={`photo-frame relative aspect-video overflow-hidden ${
                  project.imageCaption ? "mb-2.5" : "mb-8"
                }`}
              >
                <Image
                  src={project.image}
                  alt={project.imageAlt ?? ""}
                  fill
                  sizes="(min-width: 768px) 48rem, 100vw"
                  className="object-cover"
                />
              </div>
            )}
            {project.imageCaption && (
              <p className="text-caption text-grey-muted mb-6">
                {project.imageCaption}
              </p>
            )}
            <h2 className="text-h2 font-display-bold! font-bold not-italic text-ivory mb-6">
              {project.title}
            </h2>
            {project.final ? (
              <p className="text-body text-ivory/90">{project.body}</p>
            ) : (
              <Placeholder label={tc("placeholderLabel")}>
                <p className="text-body text-ivory/90">{project.body}</p>
              </Placeholder>
            )}
            {project.final && project.href && (
              <a
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
                className="label text-xs text-sage hover:text-ivory transition-colors mt-6 inline-block"
              >
                Visit Website →
              </a>
            )}
          </Section>
        ))}

        <Section>
          <h2 className="text-h2 font-display-bold! font-bold not-italic text-ivory mb-6">
            {tm("tabs.gallery")}
          </h2>
          <ProjectGallery />
        </Section>
      </>
    </div>
  );
}
