import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import FAQClient from "./FAQClient";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "faqPage" });
  return {
    title: `HANCOCO — FAQ`,
    description: t("hero.copy"),
    openGraph: { type: "website", locale: locale === "id" ? "id_ID" : "en_US" },
  };
}

export default async function FAQPage({ params }: { params: Promise<{ locale: string }> }) {
  await params;
  return <FAQClient />;
}
