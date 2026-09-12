import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/siteMeta";

// Emitted at /robots.txt. /admin is the Decap CMS login shell — there
// is nothing there for a crawler to index, and keeping it out of search
// results avoids pointing strangers at the editor sign-in page.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/admin/"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
