# mijungim.com

Official website of the pianist **Mijung IM** — [mijungim.com](https://mijungim.com)

Bilingual (EN/KO) Next.js site with a Git-backed CMS, so the artist and her
manager can publish news, concert listings, media and essays without a
developer in the loop.

## Stack

| | |
|---|---|
| Framework | Next.js (App Router) |
| i18n | next-intl — `/en` and `/ko`, locale-prefixed routes |
| Styling | Tailwind CSS |
| CMS | Decap CMS at `/admin`, authenticated through DecapBridge (PKCE) |
| Hosting | Netlify, with Netlify DNS and Netlify Forms for the contact page |

## Running locally

```bash
npm install
npm run dev
```

Then open http://localhost:3000 — it redirects to `/en`.

`npm run build` also rebuilds `public/admin/preview.css`, the stylesheet that
makes the CMS preview pane resemble the live site.

## Layout

```
src/app/[locale]/     Pages — home, about, performances, media, dialogue,
                      projects, contact
src/app/sitemap.ts    /sitemap.xml, both locales with hreflang pairs
src/app/robots.ts     /robots.txt
src/content/{en,ko}/  UI strings and long-form copy per locale
src/lib/siteMeta.ts   Canonical/hreflang/Open Graph metadata helper
content/              CMS-managed entries (news, concerts, gallery, essays…)
public/admin/         Decap CMS config and its preview/behaviour scripts
```

Content under `content/` is written by the CMS and committed straight to
`main`, so that branch moves on its own — fetch and rebase before pushing.
