"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { useLocale } from "next-intl";
import { ArrowRight } from "lucide-react";
import { insights } from "@/data/homepage";
import Image from "next/image";

export default function InsightsSection() {
  const t = useTranslations("insights");
  const locale = useLocale();
  const featured = insights.find((i) => i.featured)!;
  const sideItems = insights.filter((i) => !i.featured);

  return (
    <section className="section" style={{ position: "relative", overflow: "hidden", background: "var(--white)", borderTop: "1px solid var(--line)", padding: "120px 0" }}>
      {/* Background Texture with Gradient Fades */}
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(170deg, var(--forest-dark) 0%, #0F1A15 100%)",
        zIndex: 0
      }} />

      <div className="wrap" style={{ position: "relative", zIndex: 1 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "56px", flexWrap: "wrap", gap: "20px" }}>
          <div>
            <span className="eyebrow" style={{ color: "var(--ivory)" }}>{t("eyebrow")}</span>
            <h2 style={{ fontFamily: "var(--font-fraunces)", fontSize: "clamp(2rem, 3.2vw, 2.8rem)", color: "var(--ivory)" }}>
              {t("headline")}
            </h2>
          </div>
          <Link href={`/${locale}/about/insight`} style={{
            display: "inline-flex", alignItems: "center", gap: "8px",
            fontSize: "14px", fontWeight: 600, color: "var(--sand)",
            borderBottom: "1.5px solid var(--sand)", paddingBottom: "2px",
          }}>
            {t("viewAll")} <ArrowRight size={14} />
          </Link>
        </div>

        {/* MAGAZINE 70/30 SPLIT */}
        <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: "64px" }}>

          {/* Featured — large (No box) */}
          <Link href={`/${locale}/about/insight/${featured.slug}`} style={{ display: "block", textDecoration: "none" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.opacity = "0.85";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.opacity = "1";
              }}
            >
              {/* Visual */}
              <div style={{ aspectRatio: "16/9", borderRadius: "16px", overflow: "hidden", background: "linear-gradient(140deg, #2C6349, #12281F)", position: "relative" }}>
                {featured.image && (
                  <Image
                    src={featured.image}
                    alt={featured.title}
                    fill
                    sizes="(max-width: 900px) 100vw, 60vw"
                    style={{ objectFit: "cover", zIndex: 0 }}
                  />
                )}
                {/* Overlay gradient so category tag is legible */}
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 40%)", zIndex: 1 }} />
                
                <div style={{ position: "absolute", bottom: "24px", left: "24px", zIndex: 2 }}>
                  <span style={{
                    fontFamily: "var(--font-mono)", fontSize: "12px",
                    background: "rgba(251,250,246,0.25)", color: "var(--ivory)",
                    backdropFilter: "blur(4px)", WebkitBackdropFilter: "blur(4px)",
                    padding: "6px 14px", borderRadius: "100px", letterSpacing: "0.06em",
                  }}>
                    {featured.category}
                  </span>
                </div>
              </div>
              {/* Body */}
              <div>
                <div style={{ display: "flex", gap: "16px", marginBottom: "14px" }}>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: "12px", color: "var(--sand)", fontWeight: 500 }}>{featured.readTime}</span>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: "12px", color: "rgba(251,250,246,0.7)" }}>{featured.date}</span>
                </div>
                <h3 style={{ fontFamily: "var(--font-fraunces)", fontSize: "32px", marginBottom: "16px", lineHeight: "1.2", color: "var(--ivory)" }}>
                  {featured.title}
                </h3>
                <p style={{ color: "rgba(251,250,246,0.85)", fontSize: "16px", lineHeight: "1.65", marginBottom: "24px" }}>
                  {featured.excerpt}
                </p>
                <span style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontSize: "14px", fontWeight: 600, color: "var(--sand)" }}>
                  {t("readMore")} <ArrowRight size={14} />
                </span>
              </div>
            </div>
          </Link>

          {/* Side list */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            {sideItems.map((item, i) => (
              <Link
                key={item.id}
                href={`/${locale}/about/insight/${item.slug}`}
                style={{
                  display: "flex", gap: "16px",
                  padding: "20px 0",
                  borderBottom: i < sideItems.length - 1 ? "1px solid rgba(251,250,246,0.15)" : "none",
                  textDecoration: "none",
                }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.opacity = "0.75")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.opacity = "1")}
              >
                {/* Thumb */}
                <div style={{
                  width: "72px", height: "72px",
                  borderRadius: "10px", flexShrink: 0,
                  background: "var(--line)",
                  position: "relative", overflow: "hidden"
                }}>
                  {item.image && (
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="72px"
                      style={{ objectFit: "cover" }}
                    />
                  )}
                </div>
                <div>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: "10.5px", color: "var(--sand)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                    {item.category}
                  </span>
                  <h5 style={{ fontFamily: "var(--font-fraunces)", fontSize: "15px", fontWeight: 600, margin: "5px 0 4px", lineHeight: "1.3", color: "var(--ivory)" }}>
                    {item.title}
                  </h5>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: "11.5px", color: "rgba(251,250,246,0.7)" }}>
                    {item.readTime} · {item.date}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
