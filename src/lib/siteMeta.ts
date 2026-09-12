import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";

// Single source of truth for the production origin. Used by
// metadataBase (which turns every relative URL below into an absolute
// one) and by sitemap.ts / robots.ts, which must emit absolute URLs.
export const SITE_URL = "https://mijungim.com";

// Routes rendered under [locale], as they appear after the locale
// segment. "" is the home page. sitemap.ts walks the same list, so a
// new page only needs adding here once.
export const ROUTES = [
  { path: "", navKey: null },
  { path: "/about", navKey: "about" },
  { path: "/performances", navKey: "performances" },
  { path: "/media", navKey: "media" },
  { path: "/dialogue", navKey: "dialogue" },
  { path: "/projects", navKey: "projects" },
  { path: "/contact", navKey: "contact" },
] as const;

type PageMetaOptions = {
  locale: string;
  /** Route below the locale segment, e.g. "/about". Omit for home. */
  path?: string;
  /** Key in the `nav` namespace used as this page's title prefix. */
  navKey?: string;
};

/**
 * Per-page metadata: title, description, self-referencing canonical and
 * the EN/KO hreflang pair.
 *
 * This deliberately lives on the pages rather than on [locale]/layout.
 * `alternates` set on a layout is inherited by every route beneath it,
 * so a canonical declared there would tell search engines that
 * /en/about, /en/media and the rest are all really /en — which is an
 * invitation to drop them from the index. Canonical has to be built
 * from the page's own path, so each page calls this with its own.
 */
export async function pageMetadata({
  locale,
  path = "",
  navKey,
}: PageMetaOptions): Promise<Metadata> {
  const tMeta = await getTranslations({ locale, namespace: "meta" });

  let title = tMeta("title");
  if (navKey) {
    const tNav = await getTranslations({ locale, namespace: "nav" });
    title = `${tNav(navKey)} — ${tMeta("siteName")}`;
  }

  const description = tMeta("description");
  const url = `/${locale}${path}`;

  return {
    title,
    description,
    alternates: {
      // Self-referencing: each language version is canonical for
      // itself, and the two are tied together by the languages map.
      // A shared canonical across locales would suppress one of them.
      canonical: url,
      languages: {
        ...Object.fromEntries(
          routing.locales.map((l) => [l, `/${l}${path}`]),
        ),
        "x-default": `/${routing.defaultLocale}${path}`,
      },
    },
    openGraph: {
      type: "website",
      siteName: tMeta("siteName"),
      title,
      description,
      url,
      locale: locale === "ko" ? "ko_KR" : "en_US",
    },
  };
}
