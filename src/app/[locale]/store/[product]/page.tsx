import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import ProductClient from "./ProductClient";

export async function generateMetadata({ params }: { params: Promise<{ locale: string; product: string }> }): Promise<Metadata> {
  const { locale, product } = await params;
  const t = await getTranslations({ locale, namespace: "storePage" });
  const products = t.raw("products") as { slug: string; name: string; tagline: string }[];
  const found = products.find(p => p.slug === product);
  return {
    title: `HANCOCO — ${found?.name ?? "Product"}`,
    description: found?.tagline ?? "",
    openGraph: { type: "website", locale: locale === "id" ? "id_ID" : "en_US" },
  };
}

export default async function ProductPage({ params }: { params: Promise<{ locale: string; product: string }> }) {
  const { product } = await params;
  return <ProductClient slug={product} />;
}
