"use client";

import { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { LOCALES } from "@/i18n/locales";

const ITEMS = [
  { key: "home", href: "/" },
  { key: "about", href: "/about" },
  { key: "performances", href: "/performances" },
  { key: "media", href: "/media" },
  { key: "dialogue", href: "/dialogue" },
  { key: "projects", href: "/projects" },
  { key: "contact", href: "/contact" },
] as const;

export function Nav() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [prevPathname, setPrevPathname] = useState(pathname);

  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setIsOpen(false);
  }

  useEffect(() => {
    document.documentElement.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [isOpen]);

  const isActive = (href: (typeof ITEMS)[number]["href"]) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const targetLocale = LOCALES.find((l) => l.code !== locale)!;

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-ink border-b border-hairline">
      <nav className="mx-auto max-w-6xl px-6 h-16 flex items-center justify-between">
        <Link
          href="/"
          className="logotype text-sm uppercase text-ivory tracking-wide shrink-0"
        >
          Mijung IM
        </Link>

        <div className="flex items-center gap-4 md:gap-5">
          <ul className="hidden md:flex items-center gap-5">
            {ITEMS.map((item) => (
              <li key={item.key}>
                <Link
                  href={item.href}
                  className={`nav-label text-xs transition-colors ${
                    isActive(item.href)
                      ? "text-sage"
                      : "text-grey-muted hover:text-ivory"
                  }`}
                >
                  {t(item.key)}
                </Link>
              </li>
            ))}
          </ul>

          <Link
            href={pathname}
            locale={targetLocale.code}
            className="label text-xs border border-hairline px-2.5 py-1 text-grey-muted hover:text-ivory hover:border-ivory transition-colors shrink-0"
          >
            {targetLocale.label}
          </Link>

          <button
            type="button"
            onClick={() => setIsOpen((v) => !v)}
            aria-expanded={isOpen}
            aria-label={isOpen ? t("closeMenu") : t("openMenu")}
            className="md:hidden relative w-8 h-8 flex items-center justify-center shrink-0"
          >
            <span
              className={`absolute h-px w-5 bg-ivory transition-transform duration-200 ${
                isOpen ? "rotate-45" : "-translate-y-1.5"
              }`}
            />
            <span
              className={`absolute h-px w-5 bg-ivory transition-opacity duration-200 ${
                isOpen ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`absolute h-px w-5 bg-ivory transition-transform duration-200 ${
                isOpen ? "-rotate-45" : "translate-y-1.5"
              }`}
            />
          </button>
        </div>
      </nav>

      <div
        aria-hidden={!isOpen}
        inert={!isOpen}
        className={`md:hidden fixed inset-x-0 top-16 bottom-0 bg-ink transition-opacity duration-200 ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <ul className="flex flex-col px-6 py-4">
          {ITEMS.map((item) => (
            <li key={item.key} className="border-b border-hairline">
              <Link
                href={item.href}
                className={`nav-label text-sm py-5 block transition-colors ${
                  isActive(item.href)
                    ? "text-sage"
                    : "text-ivory hover:text-sage"
                }`}
              >
                {t(item.key)}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3 px-6 pt-6">
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
    </header>
  );
}
