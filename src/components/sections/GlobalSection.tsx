"use client";

import { useTranslations } from "next-intl";
import { ArrowUpRight, Globe } from "lucide-react";

export default function GlobalSection() {
  const t = useTranslations("global");

  const regions = [
    {
      region: "Asia Pacific",
      markets: [
        { name: "Malaysia", detail: "Palm oil & food mfg" },
        { name: "China", detail: "Charcoal & industrial" },
        { name: "Japan", detail: "Food-grade coconut oil" },
        { name: "India", detail: "Copra importers" },
        { name: "Australia", detail: "Natural food ingredients" },
      ]
    },
    {
      region: "Middle East",
      markets: [
        { name: "UAE", detail: "Hookah charcoal hub" },
        { name: "Saudi Arabia", detail: "Food & shisha charcoal" },
      ]
    },
    {
      region: "Europe & Americas",
      markets: [
        { name: "Germany", detail: "Organic oil & food" },
        { name: "Netherlands", detail: "EU import hub" },
        { name: "USA", detail: "BBQ & Natural products" },
      ]
    }
  ];

  return (
    <section className="section" style={{ background: "var(--white)", borderTop: "1px solid var(--line)", padding: "120px 0" }}>
      <div className="wrap">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: "80px", alignItems: "start" }}>
          
          {/* Left Column - Content */}
          <div style={{ position: "sticky", top: "120px" }}>
            <span className="eyebrow">{t("eyebrow")}</span>
            <h2 style={{ fontFamily: "var(--font-fraunces)", fontSize: "clamp(2.5rem, 4vw, 3.5rem)", marginBottom: "24px" }}>
              {t("headline")}
            </h2>
            <p style={{ color: "var(--charcoal-soft)", fontSize: "18px", lineHeight: "1.7", marginBottom: "40px" }}>
              {t("description")}
            </p>

            {/* Origin Card */}
            <div style={{
              background: "var(--ivory-dim)",
              border: "1px solid var(--line)",
              borderRadius: "24px",
              padding: "32px",
              display: "flex",
              alignItems: "flex-start",
              gap: "20px"
            }}>
              <div style={{
                width: "48px", height: "48px", borderRadius: "50%",
                background: "var(--forest)", color: "var(--white)",
                display: "flex", alignItems: "center", justifyContent: "center",
                flexShrink: 0
              }}>
                <Globe size={24} strokeWidth={1.5} />
              </div>
              <div>
                <h4 style={{ fontFamily: "var(--font-mono)", fontSize: "12px", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--forest)", marginBottom: "8px", fontWeight: 600 }}>
                  Origin Hub
                </h4>
                <h3 style={{ fontFamily: "var(--font-fraunces)", fontSize: "24px", marginBottom: "8px" }}>Indonesia</h3>
                <p style={{ fontSize: "15px", color: "var(--charcoal-soft)", lineHeight: "1.6" }}>
                  Sourcing raw materials and processing 4 active product lines with logistics capabilities via Belawan, Tanjung Priok, and Makassar ports.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column - Regions List */}
          <div>
            {regions.map((region, index) => (
              <div key={index} style={{
                borderBottom: "1px solid var(--line)",
                paddingBottom: "48px",
                marginBottom: "48px"
              }}>
                <h3 style={{
                  fontFamily: "var(--font-fraunces)",
                  fontSize: "32px",
                  color: "var(--charcoal)",
                  marginBottom: "32px"
                }}>
                  {region.region}
                </h3>
                
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
                  {region.markets.map((market, mIdx) => (
                    <div key={mIdx} className="market-card" style={{
                      padding: "24px",
                      borderRadius: "16px",
                      border: "1px solid var(--line)",
                      background: "var(--white)",
                      transition: "all 0.3s ease",
                      cursor: "default"
                    }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px" }}>
                        <h4 style={{ fontFamily: "var(--font-fraunces)", fontSize: "20px", fontWeight: 600, color: "var(--charcoal)" }}>{market.name}</h4>
                        <ArrowUpRight size={18} style={{ color: "var(--forest)", opacity: 0.5 }} />
                      </div>
                      <p style={{ fontSize: "14px", color: "var(--charcoal-soft)", lineHeight: "1.5" }}>
                        {market.detail}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
      <style>{`
        .market-card:hover {
          background: var(--ivory-dim) !important;
          border-color: rgba(31, 77, 58, 0.2) !important;
          transform: translateY(-4px);
          box-shadow: 0 12px 24px -10px rgba(0,0,0,0.05);
        }
        @media (max-width: 900px) {
          .wrap > div { grid-template-columns: 1fr !important; gap: 48px !important; }
          .wrap > div > div:first-child { position: relative !important; top: 0 !important; }
        }
        @media (max-width: 600px) {
          .market-card { grid-column: span 2; }
          .wrap > div > div:last-child > div > div { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
