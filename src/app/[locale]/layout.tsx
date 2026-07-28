import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { Manrope, Bricolage_Grotesque, Merriweather } from "next/font/google";
import localFont from "next/font/local";
import { routing } from "@/i18n/routing";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  weight: ["300", "400", "700"],
});

const merriweatherItalic = Merriweather({
  variable: "--font-bodoni",
  subsets: ["latin"],
  weight: ["700"],
  style: ["italic"],
});

const merriweatherBold = Merriweather({
  variable: "--font-bodoni-bold",
  subsets: ["latin"],
  weight: ["700"],
  style: ["normal"],
});

const pretendard = localFont({
  src: "../../fonts/PretendardVariable.woff2",
  variable: "--font-pretendard",
  weight: "45 920",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Mijung IM — Pianist of Peace & Nature",
  description:
    "Mijung IM, international concert pianist. Performances at the intersection of music, peace, and nature.",
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html
      lang={locale}
      className={`${manrope.variable} ${pretendard.variable} ${bricolage.variable} ${merriweatherItalic.variable} ${merriweatherBold.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-ink text-ivory">
        <NextIntlClientProvider>
          <Nav />
          <main className="flex-1">{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
