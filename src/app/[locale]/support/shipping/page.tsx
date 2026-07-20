import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import ShippingClient from "./ShippingClient";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "shippingPage" });
  return {
    title: `HANCOCO — Shipping & Return`,
    description: t("hero.copy"),
    openGraph: { type: "website", locale: locale === "id" ? "id_ID" : "en_US" },
  };
}

export default async function ShippingPage({ params }: { params: Promise<{ locale: string }> }) {
  await params;
  return <ShippingClient />;
}
