import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import HeroSection from "@/components/sections/HeroSection";
import TrustBar from "@/components/sections/TrustBar";
import GlanceSection from "@/components/sections/GlanceSection";
import StorySection from "@/components/sections/StorySection";
import EcosystemSection from "@/components/sections/EcosystemSection";
import ProductsSection from "@/components/sections/ProductsSection";
import ManufacturingSection from "@/components/sections/ManufacturingSection";
import QASection from "@/components/sections/QASection";
import SustainabilitySection from "@/components/sections/SustainabilitySection";
import WhySection from "@/components/sections/WhySection";
import GlobalSection from "@/components/sections/GlobalSection";
import InnovationSection from "@/components/sections/InnovationSection";
import JourneySection from "@/components/sections/JourneySection";
import CertificationsSection from "@/components/sections/CertificationsSection";
import InsightsSection from "@/components/sections/InsightsSection";
import PartnershipSection from "@/components/sections/PartnershipSection";
import RFQSection from "@/components/sections/RFQSection";
import ManifestoSection from "@/components/sections/ManifestoSection";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: locale === "id"
      ? "HANCOCO — Perusahaan Pengolahan Kelapa Terintegrasi Indonesia"
      : "HANCOCO — Indonesia's Integrated Coconut Processing Company",
    description: locale === "id"
      ? "HANCOCO memproduksi White Copra, Black Copra, Arang Tempurung Kelapa, dan Minyak Kelapa RBD untuk pasar B2B internasional. Export Ready. Halal Certified."
      : "HANCOCO produces White Copra, Black Copra, Coconut Shell Charcoal, and RBD Coconut Oil for international B2B markets. Export Ready. Halal Certified.",
    keywords: ["coconut", "copra", "coconut charcoal", "coconut oil", "B2B export", "Indonesia", "HANCOCO"],
    openGraph: {
      type: "website",
      locale: locale === "id" ? "id_ID" : "en_US",
    },
  };
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <HeroSection />
      <TrustBar />
      <GlanceSection />
      <StorySection />
      <EcosystemSection />
      <ProductsSection />
      <ManufacturingSection />
      <QASection />
      <SustainabilitySection />
      <WhySection />
      <GlobalSection />
      <InnovationSection />
      <JourneySection />
      <CertificationsSection />
      <InsightsSection />
      <PartnershipSection />
      <RFQSection />
      <ManifestoSection />
    </>
  );
}
