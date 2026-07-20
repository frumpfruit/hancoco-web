"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { useLocale } from "next-intl";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

export default function ManufacturingSection() {
  const t = useTranslations("manufacturing");
  const locale = useLocale();
  const pills = ["pill1", "pill2", "pill3", "pill4", "pill5"] as const;

  return (
    <section className="section">
      <div className="wrap">
        <div className="manu-inner" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "72px", alignItems: "center" }}>

          {/* LEFT — Overlap collage */}
          <div className="manu-collage" style={{ position: "relative", height: "460px" }}>
            {/* Block 1 — main image */}
            <div 
              style={{
                position: "absolute", width: "66%", height: "72%",
                top: 0, left: 0, zIndex: 1,
                borderRadius: "18px",
                background: "var(--forest-dark)",
                boxShadow: "0 24px 48px -20px rgba(18,40,31,0.4)",
                overflow: "hidden",
                transition: "transform 0.4s ease, box-shadow 0.4s ease, z-index 0s",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.zIndex = "10";
                el.style.transform = "scale(1.03)";
                el.style.boxShadow = "0 32px 64px -20px rgba(18,40,31,0.5)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.zIndex = "1";
                el.style.transform = "scale(1)";
                el.style.boxShadow = "0 24px 48px -20px rgba(18,40,31,0.4)";
              }}
            >
              <Image
                src="/assets/images/pexels-alexeydemidov-11120914.webp"
                alt="Processing Facility"
                fill
                priority
                sizes="(max-width: 900px) 100vw, 33vw"
                style={{ objectFit: "cover", zIndex: 0 }}
              />
              <div style={{ position: "absolute", inset: 0, background: "rgba(18,40,31,0.3)", zIndex: 0, pointerEvents: "none" }} />
              <div style={{
                position: "absolute", bottom: "20px", left: "20px",
                fontFamily: "var(--font-mono)", fontSize: "11px",
                color: "rgba(251,250,246,0.9)", letterSpacing: "0.08em",
                textTransform: "uppercase",
                zIndex: 1, pointerEvents: "none"
              }}>
                Processing Facility — Indonesia
              </div>
            </div>

            {/* Block 3 — ISO badge image */}
            <div 
              style={{
                position: "absolute", width: "36%", height: "32%",
                top: "36%", right: "8%", zIndex: 2,
                borderRadius: "14px",
                overflow: "hidden",
                transform: "rotate(-4deg)",
                boxShadow: "0 16px 32px -14px rgba(18,40,31,0.25)",
                transition: "transform 0.4s ease, box-shadow 0.4s ease, z-index 0s",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.zIndex = "10";
                el.style.transform = "rotate(0deg) scale(1.08)";
                el.style.boxShadow = "0 32px 64px -14px rgba(18,40,31,0.35)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.zIndex = "2";
                el.style.transform = "rotate(-4deg) scale(1)";
                el.style.boxShadow = "0 16px 32px -14px rgba(18,40,31,0.25)";
              }}
            >
              <Image
                src="/assets/images/iso.webp"
                alt="ISO Process Aligned"
                fill
                sizes="(max-width: 900px) 50vw, 18vw"
                style={{ objectFit: "contain", padding: "12px" }}
              />
            </div>

            {/* Block 2 — secondary image, rotated (NOW FRONT LAYER) */}
            <div 
              style={{
                position: "absolute", width: "52%", height: "46%",
                bottom: 0, right: 0, zIndex: 3,
                borderRadius: "18px",
                background: "var(--sand-deep)",
                transform: "rotate(3deg)",
                boxShadow: "0 24px 48px -20px rgba(18,40,31,0.3)",
                overflow: "hidden",
                transition: "transform 0.4s ease, box-shadow 0.4s ease, z-index 0s",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.zIndex = "10";
                el.style.transform = "rotate(0deg) scale(1.05)";
                el.style.boxShadow = "0 32px 64px -20px rgba(18,40,31,0.4)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.zIndex = "3";
                el.style.transform = "rotate(3deg) scale(1)";
                el.style.boxShadow = "0 24px 48px -20px rgba(18,40,31,0.3)";
              }}
            >
              <Image
                src="/assets/images/manufacturing.webp"
                alt="Manufacturing Plant"
                fill
                sizes="(max-width: 900px) 100vw, 33vw"
                style={{ objectFit: "cover", zIndex: 0 }}
              />
              <div style={{ position: "absolute", inset: 0, background: "rgba(232, 223, 200, 0.15)", mixBlendMode: "multiply", zIndex: 0, pointerEvents: "none" }} />
            </div>
          </div>

          {/* RIGHT — Text */}
          <div className="manu-text">
            <span className="eyebrow">{t("eyebrow")}</span>
            <h2 style={{ fontFamily: "var(--font-fraunces)", fontSize: "clamp(2rem, 3.2vw, 2.8rem)", marginBottom: "22px" }}>
              {t("headline")}
            </h2>
            <p style={{ color: "var(--charcoal-soft)", fontSize: "16px", lineHeight: "1.7", marginBottom: "32px", maxWidth: "440px" }}>
              {t("description")}
            </p>

            {/* Pills */}
            <div className="manu-pills" style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginBottom: "36px" }}>
              {pills.map((key) => (
                <span key={key} style={{
                  fontFamily: "var(--font-mono)", fontSize: "12px",
                  padding: "8px 16px", border: "1px solid var(--line)",
                  borderRadius: "100px", color: "var(--charcoal-soft)",
                }}>
                  {t(key)}
                </span>
              ))}
            </div>

            <Link href={`/${locale}/about/manufacturing`} className="btn btn-primary manu-cta" style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
              {t("cta")} <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </div>
      <style>{`
        @media(max-width:900px){.manu-inner{grid-template-columns:1fr!important; gap:40px!important}}
        @media(max-width:640px){
          .manu-collage{height:320px!important}
          .manu-text{padding:0 16px!important}
          .manu-text h2{font-size:clamp(1.5rem,6vw,2rem)!important}
          .manu-text .manu-pills{justify-content:center!important}
          .manu-text .manu-cta{width:100%!important;justify-content:center!important}
        }
        @media(max-width:480px){.manu-collage{height:260px!important}}
      `}</style>
    </section>
  );
}
