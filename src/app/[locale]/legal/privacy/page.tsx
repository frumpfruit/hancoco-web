import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import PrivacyClient from "./PrivacyClient";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "privacyPage" });
  return {
    title: `HANCOCO — ${t("hero.headline")}`,
    description: t("hero.copy"),
    openGraph: { type: "website", locale: locale === "id" ? "id_ID" : "en_US" },
  };
}

export default async function PrivacyPage({ params }: { params: Promise<{ locale: string }> }) {
  await params;
  return <PrivacyClient />;
}
