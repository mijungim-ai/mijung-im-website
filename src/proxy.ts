import createMiddleware from "next-intl/middleware";
import { NextResponse, type NextRequest } from "next/server";
import { routing } from "./i18n/routing";

const handleI18nRouting = createMiddleware(routing);

export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // The Korean locale segment is /ko (ISO 639-1, a language code), but
  // /kr — Korea's ISO 3166 country code — is the likelier guess and an
  // easy thing to mistype into a programme note or print on a card.
  //
  // This has to live here rather than in netlify.toml or next.config's
  // redirects(): @netlify/plugin-nextjs ships this middleware as a
  // Netlify Edge Function, which runs ahead of the platform's redirect
  // rules, and Next runs middleware ahead of next.config redirects too.
  // Either way next-intl would see /kr first, fail to recognise it as a
  // locale, and send the visitor to /en/kr — a 404 with an extra hop.
  if (pathname === "/kr" || pathname.startsWith("/kr/")) {
    const url = request.nextUrl.clone();
    url.pathname = `/ko${pathname.slice("/kr".length)}`;
    return NextResponse.redirect(url, 308);
  }

  return handleI18nRouting(request);
}

export const config = {
  matcher: ["/((?!api|trpc|admin|_next|_vercel|.*\\..*).*)"],
};
