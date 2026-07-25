"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { LOCALES } from "@/i18n/locales";
import { SOCIALS } from "@/data/socials";

export function Footer() {
  const t = useTranslations("footer");
  const locale = useLocale();
  const pathname = usePathname();

  return (
    <footer className="border-t border-hairline bg-ink-deep mt-24">
      <div className="mx-auto max-w-6xl px-6 py-12 flex flex-col md:flex-row md:items-center md:justify-between gap-8">
        <div>
          <p className="logotype text-sm uppercase text-ivory">Mijung IM</p>
          <p className="text-caption text-grey-muted mt-1">{t("tagline")}</p>
        </div>

        <ul className="flex flex-wrap gap-x-6 gap-y-2">
          {SOCIALS.map((social) =>
            social.href ? (
              <li key={social.label}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="label text-xs text-grey-muted hover:text-sage transition-colors"
                >
                  {social.label}
                </a>
              </li>
            ) : (
              <li key={social.label}>
                <span className="label text-xs text-grey-muted/40 cursor-default">
                  {social.label}
                </span>
              </li>
            ),
          )}
        </ul>

        <div className="flex items-center gap-3">
          <span className="text-caption text-grey-muted">{t("language")}</span>
          {LOCALES.map((l) => (
            <Link
              key={l.code}
              href={pathname}
              locale={l.code}
              className={`label text-xs ${
                locale === l.code
                  ? "text-brass"
                  : "text-grey-muted hover:text-ivory"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-6 pb-8">
        <p className="text-caption text-grey-muted">
          © {new Date().getFullYear()} Mijung IM. {t("rights")}
        </p>
      </div>
    </footer>
  );
}
