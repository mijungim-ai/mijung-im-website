import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { PageSubtitle } from "@/components/PageSubtitle";
import { PageHeaderStatement } from "@/components/PageHeaderStatement";
import { PageHeaderSection } from "@/components/PageHeaderSection";
import { Section } from "@/components/Section";
import { ProjectGallery } from "@/components/ProjectGallery";

export default async function ProjectsPage() {
  const t = await getTranslations("projects");
  const tm = await getTranslations("media");

  const projects = [
    {
      title: t("plzTitle"),
      body: t("plzBody"),
      image: "/images/east_sea_plz_festival.jpg",
      imageAlt: t("plzImageCaption"),
      imageCaption: t("plzImageCaption"),
      href: "http://plzfe.com/",
    },
    {
      title: t("dmzTitle"),
      body: t("dmzBody"),
      href: "https://www.gg.go.kr/dmzopen/index.do",
    },
    {
      title: t("foundationTitle"),
      body: t("foundationBody"),
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

      <div className="space-y-14 md:space-y-28">
        {projects.map((project, i) => (
          <Section
            key={project.title}
            className={i === 0 ? "pt-7 md:pt-14" : undefined}
          >
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
            <p className="text-body text-ivory/90">{project.body}</p>
            {project.href && (
              <a
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
                className="label text-xs text-sage hover:text-ivory transition-colors mt-6 inline-block"
              >
                {t("visitWebsiteLabel")} →
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
      </div>
    </div>
  );
}
