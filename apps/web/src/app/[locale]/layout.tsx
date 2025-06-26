// eslint-disable-next-line filenames/match-exported
import { jaJP } from "@clerk/localizations";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { ThemeProvider } from "next-themes";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import Layout from "./_components/Layout";
import type { Metadata } from "next";
import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/transitions/zoom.css";

export const metadata: Metadata = {
  description:
    "PocketCMSは、API1本から無料で使える日本製のヘッドレスCMSです。余計な機能を省いた設計で、最速のコンテンツ配信を実現します。",
  title: "PocketCMS",
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>): Promise<React.JSX.Element> {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <ClerkProvider localization={locale === "ja" ? jaJP : undefined}>
      <html lang={locale} suppressHydrationWarning={true}>
        <body>
          <NextIntlClientProvider>
            <ThemeProvider>
              <Layout>{children}</Layout>
            </ThemeProvider>
          </NextIntlClientProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
