"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Placeholder } from "@/components/Placeholder";

const TABS = ["short", "medium", "full"] as const;
type Tab = (typeof TABS)[number];

export function BioTabs() {
  const t = useTranslations("about");
  const tc = useTranslations("common");
  const locale = useLocale();
  const [active, setActive] = useState<Tab>("medium");
  const isFinal = locale === "en" && active !== "full";

  const bodyKey = {
    short: "bioShort",
    medium: "bioMedium",
    full: "bioFull",
  }[active] as "bioShort" | "bioMedium" | "bioFull";

  return (
    <div>
      <div
        role="tablist"
        aria-label="Biography length"
        className="flex gap-6 border-b border-hairline mb-6"
      >
        {TABS.map((tab) => (
          <button
            key={tab}
            role="tab"
            aria-selected={active === tab}
            onClick={() => setActive(tab)}
            className={`label text-xs pb-3 -mb-px border-b transition-colors ${
              active === tab
                ? "text-sage border-sage"
                : "text-grey-muted border-transparent hover:text-ivory"
            }`}
          >
            {t(`tabs.${tab}`)}
          </button>
        ))}
      </div>
      {isFinal ? (
        <div className="space-y-4">
          {t(bodyKey)
            .split("\n\n")
            .map((paragraph, i) => (
              <p key={i} className="text-body text-ivory/90">
                {paragraph}
              </p>
            ))}
        </div>
      ) : (
        <Placeholder label={tc("placeholderLabel")}>
          <div className="space-y-4">
            {t(bodyKey)
              .split("\n\n")
              .map((paragraph, i) => (
                <p key={i} className="text-body text-ivory/90">
                  {paragraph}
                </p>
              ))}
          </div>
        </Placeholder>
      )}
    </div>
  );
}
