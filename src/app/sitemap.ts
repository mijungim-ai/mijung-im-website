import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { ROUTES, SITE_URL } from "@/lib/siteMeta";

// Emitted at /sitemap.xml. Lives at the app root rather than under
// [locale] because there is one sitemap for the whole site; it lists
// both language versions of every route and pairs them with hreflang
// so Google treats EN/KO as translations rather than duplicates.
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return ROUTES.flatMap(({ path }) =>
    routing.locales.map((locale) => ({
      url: `${SITE_URL}/${locale}${path}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: path === "" ? 1 : 0.8,
      alternates: {
        languages: Object.fromEntries(
          routing.locales.map((l) => [l, `${SITE_URL}/${l}${path}`]),
        ),
      },
    })),
  );
}
