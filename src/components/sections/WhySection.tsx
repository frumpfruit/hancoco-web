"use client";

import { useTranslations } from "next-intl";
import { differentiators } from "@/data/homepage";
import Image from "next/image";

export default function WhySection() {
  const t = useTranslations("why");

  return (
    <section className="section" style={{ background: "var(--ivory-dim)", borderTop: "1px solid var(--line)" }}>
      <div className="wrap">
        <div style={{ marginBottom: "56px" }}>
          <span className="eyebrow">{t("eyebrow")}</span>
          <h2 style={{ fontFamily: "var(--font-fraunces)", fontSize: "clamp(2rem, 3.2vw, 2.8rem)" }}>
            {t("headline")}
          </h2>
        </div>

        {/* ASYMMETRIC BENTO — no equal 4-col grid */}
        <div className="why-bento" style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gridAutoRows: "160px",
          gap: "16px",
        }}>
          {differentiators.map((item) => {
            const isTall = item.size === "tall";
            const isWide = item.size === "wide";
            return (
                <div
                  key={item.id}
                  className="why-card"
                  style={{
                    gridColumn: isWide ? "span 2" : "span 1",
                    gridRow: isTall ? "span 2" : "span 1",
                    background: "var(--forest-dark)",
                    border: "none",
                    color: "var(--ivory)",
                    borderRadius: "18px", padding: "26px",
                    display: "flex", flexDirection: "column",
                    justifyContent: "space-between",
                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                    cursor: "default",
                    position: "relative",
                    overflow: "hidden"
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.transform = "translateY(-4px)";
                    el.style.boxShadow = "0 20px 36px -20px rgba(18,40,31,0.3)";
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.transform = "translateY(0)";
                    el.style.boxShadow = "none";
                  }}
                >
                  {/* Background Image for ALL cards */}
                  {item.image && (
                    <>
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        sizes="(max-width: 900px) 100vw, 33vw"
                        style={{ objectFit: "cover", zIndex: 0 }}
                      />
                      <div style={{ position: "absolute", inset: 0, background: "rgba(18,40,31,0.65)", zIndex: 0, transition: "background 0.3s ease" }} className="card-overlay" />
                    </>
                  )}
                  
                  <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", height: "100%" }}>
                    <div style={{
                      width: "28px", height: "2px",
                      background: "var(--sand)",
                      marginBottom: "auto",
                    }} />
                  <div>
                    <h5 style={{
                      fontFamily: "var(--font-fraunces)",
                      fontSize: isTall ? "24px" : "18px",
                      fontWeight: 600, marginBottom: "8px",
                      color: "var(--ivory)",
                      lineHeight: "1.2"
                    }}>
                      {item.title}
                    </h5>
                    <p style={{
                      fontSize: "13.5px", lineHeight: "1.5",
                      color: "rgba(251,250,246,0.85)",
                    }}>
                      {item.description}
                    </p>
                  </div>
                  </div>
                </div>
            );
          })}
        </div>
      </div>
      <style>{`
        @media (max-width: 900px) {
          .why-bento { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 600px) {
          .why-bento { grid-template-columns: 1fr !important; grid-auto-rows: auto !important; }
          .why-card { 
            grid-column: 1 / -1 !important; 
            grid-row: auto !important; 
            min-height: 180px !important;
          }
        }
      `}</style>
    </section>
  );
}
