"use client";

import { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { LOCALES } from "@/i18n/locales";

const ITEMS = [
  { key: "home", href: "/" },
  { key: "about", href: "/about" },
  { key: "performances", href: "/performances" },
  {
    key: "media",
    href: "/media",
    submenu: [
      { key: "video", href: "/media?tab=youtube" },
      { key: "gallery", href: "/media?tab=gallery" },
    ],
  },
  { key: "dialogue", href: "/dialogue" },
  { key: "projects", href: "/projects" },
  { key: "contact", href: "/contact" },
] as const;

export function Nav() {
  const t = useTranslations("nav");
  // Media's dropdown/submenu labels reuse the Media page's own tab
  // labels (media.tabs.video/gallery) instead of new nav-specific
  // keys, since they mean the same thing there.
  const tMedia = useTranslations("media");
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
          aria-label="Mijung IM"
          className="shrink-0 flex items-center justify-center w-11 h-11 rounded-full bg-sage"
        >
          <span
            className="display-serif text-[24.3px] text-white leading-none"
            style={{ fontWeight: 900 }}
          >
            IM
          </span>
        </Link>

        <div className="flex items-center gap-4 md:gap-5">
          <ul className="hidden md:flex items-center gap-5">
            {ITEMS.map((item) => (
              <li
                key={item.key}
                className={"submenu" in item ? "relative group" : undefined}
              >
                <Link
                  href={item.href}
                  className={`nav-label text-xs pb-1 border-b-2 transition-colors ${
                    isActive(item.href)
                      ? "text-sage border-sage"
                      : "text-grey-muted border-transparent hover:text-ivory"
                  }`}
                >
                  {t(item.key)}
                </Link>

                {"submenu" in item && (
                  <ul
                    className="absolute left-0 top-full pt-2 hidden group-hover:block group-focus-within:block"
                  >
                    <li className="bg-ink-deep border border-hairline min-w-[8rem] py-1">
                      {item.submenu.map((sub) => (
                        <Link
                          key={sub.key}
                          href={sub.href}
                          className="nav-label text-xs block px-4 py-2 text-grey-muted hover:text-ivory transition-colors"
                        >
                          {tMedia(`tabs.${sub.key}`)}
                        </Link>
                      ))}
                    </li>
                  </ul>
                )}
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

              {"submenu" in item && (
                <ul className="pl-4 pb-5 space-y-4">
                  {item.submenu.map((sub) => (
                    <li key={sub.key}>
                      <Link
                        href={sub.href}
                        className="nav-label text-xs block text-grey-muted hover:text-sage transition-colors"
                      >
                        {tMedia(`tabs.${sub.key}`)}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
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
