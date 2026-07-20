import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { Fraunces, Inter, IBM_Plex_Mono } from "next/font/google";
import LenisProvider from "@/components/providers/LenisProvider";
import Announcement from "@/components/layout/Announcement";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { RFQProvider } from "@/context/RFQContext";
import "@/app/globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const messages = await getMessages();
  console.log("LAYOUT LOCALE:", locale, "MESSAGES KEYS:", Object.keys(messages).length);

  return (
    <html
      lang={locale}
      className={`${fraunces.variable} ${inter.variable} ${ibmPlexMono.variable}`}
      data-scroll-behavior="smooth"
    >
      <body>
        <NextIntlClientProvider messages={messages} locale={locale}>
          <RFQProvider>
            <LenisProvider>
              <Announcement />
              <Header />
              <main>{children}</main>
              <Footer />
            </LenisProvider>
          </RFQProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
