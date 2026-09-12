import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { PageSubtitle } from "@/components/PageSubtitle";
import { PageHeaderStatement } from "@/components/PageHeaderStatement";
import { PageHeaderSection } from "@/components/PageHeaderSection";
import { Section } from "@/components/Section";
import { ProjectGallery } from "@/components/ProjectGallery";
import { getProjectGalleryImages } from "@/data/projectGallery";
import { pageMetadata } from "@/lib/siteMeta";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata({ locale, path: "/projects", navKey: "projects" });
}

export default async function ProjectsPage() {
  const t = await getTranslations("projects");
  const tm = await getTranslations("media");
  const galleryImages = getProjectGalleryImages();

  const projects = [
    {
      title: t("plzTitle"),
      body: t("plzBody"),
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
            className={i === 0 ? "pt-5 md:pt-8" : undefined}
          >
            <h2 className="text-h2 font-display-bold! font-bold not-italic text-sage mb-6">
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
          <ProjectGallery images={galleryImages} />
        </Section>
      </div>
    </div>
  );
}
