import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import OurStoryClient from "./OurStoryClient";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "ourStoryPage" });

  return {
    title: `HANCOCO — ${t("hero.headline")}`,
    description: t("hero.subheadline"),
    openGraph: {
      type: "website",
      locale: locale === "id" ? "id_ID" : "en_US",
    },
  };
}

export default async function OurStoryPage({ params }: { params: Promise<{ locale: string }> }) {
  await params; // Ensure params is awaited per Next.js App Router conventions if needed
  return <OurStoryClient />;
}
