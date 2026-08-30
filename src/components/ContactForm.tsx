"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

type Status = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const t = useTranslations("contact");
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    const form = e.currentTarget;

    const params = new URLSearchParams();
    for (const [key, value] of new FormData(form).entries()) {
      if (typeof value === "string") params.append(key, value);
    }

    try {
      // Posting to "/" would hit the next-intl locale-redirect middleware
      // (307 -> /en), which fetch follows and which then just re-renders
      // the homepage with a 200 — a false "success" with no Netlify Forms
      // submission behind it. /__forms.html is a static file matched by
      // the middleware's own `.*\..*` exclusion, so it reaches Netlify's
      // form-capturing edge untouched (see public/__forms.html).
      const res = await fetch("/__forms.html", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: params.toString(),
      });
      if (!res.ok) throw new Error(`${res.status}`);
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="border border-hairline px-4 py-3 max-w-sm">
        <p className="label text-xs text-sage mb-2">
          {t("form.successTitle")}
        </p>
        <p className="text-caption text-grey-muted">
          {t("form.successMessage")}
        </p>
      </div>
    );
  }

  return (
    <form
      name="contact"
      method="POST"
      data-netlify="true"
      netlify-honeypot="bot-field"
      onSubmit={handleSubmit}
      className="max-w-sm space-y-4"
    >
      <input type="hidden" name="form-name" value="contact" />
      <p className="hidden">
        <label>
          Don&rsquo;t fill this out: <input name="bot-field" />
        </label>
      </p>

      <div>
        <label htmlFor="contact-subject" className="label text-xs text-grey-muted block mb-2">
          {t("form.subjectLabel")}
        </label>
        <input
          id="contact-subject"
          name="subject"
          type="text"
          required
          className="w-full border border-hairline bg-transparent px-3 py-2 text-body text-ivory focus:outline-none focus:border-sage transition-colors"
        />
      </div>

      <div>
        <label htmlFor="contact-email" className="label text-xs text-grey-muted block mb-2">
          {t("form.emailLabel")}
        </label>
        <input
          id="contact-email"
          name="email"
          type="email"
          required
          className="w-full border border-hairline bg-transparent px-3 py-2 text-body text-ivory focus:outline-none focus:border-sage transition-colors"
        />
      </div>

      <div>
        <label htmlFor="contact-message" className="label text-xs text-grey-muted block mb-2">
          {t("form.messageLabel")}
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={5}
          required
          className="w-full border border-hairline bg-transparent px-3 py-2 text-body text-ivory focus:outline-none focus:border-sage transition-colors resize-y"
        />
      </div>

      {status === "error" && (
        <p className="text-caption text-brass">{t("form.errorMessage")}</p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="label text-xs inline-flex items-center border border-sage bg-sage text-ink px-[28px] py-[12px] hover:bg-transparent hover:text-sage transition-colors disabled:opacity-50 disabled:pointer-events-none"
      >
        {status === "submitting" ? t("form.submittingLabel") : t("form.submitLabel")}
      </button>
    </form>
  );
}
