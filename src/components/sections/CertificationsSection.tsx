"use client";

import { useTranslations } from "next-intl";
import { certifications } from "@/data/homepage";
import { CheckCircle, Clock } from "lucide-react";
import { motion } from "framer-motion";

import Image from "next/image";

export default function CertificationsSection() {
  const t = useTranslations("certifications");

  const halal = certifications.find(c => c.id === "halal");
  const others = certifications.filter(c => c.id !== "halal");

  return (
    <section className="section" style={{ position: "relative", overflow: "hidden", background: "var(--ivory)" }}>
      {/* Background Texture with Gradient Fades */}
      <div style={{
        position: "absolute",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
        opacity: 0.08,
        maskImage: "linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)",
        WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)"
      }}>
        <Image
          src="/assets/images/diana-nazarchuk-oIR-PrUuFas-unsplash.webp"
          alt="Certifications Background"
          fill
          sizes="100vw"
          style={{ objectFit: "cover" }}
        />
      </div>

      <div className="wrap" style={{ position: "relative", zIndex: 1 }}>
        <div style={{ textAlign: "center", maxWidth: "600px", margin: "0 auto 64px" }}>
          <span className="eyebrow">{t("eyebrow")}</span>
          <h2 style={{ fontFamily: "var(--font-fraunces)", fontSize: "clamp(2rem, 3.2vw, 2.8rem)", marginBottom: "18px" }}>
            {t("headline")}
          </h2>
          <p style={{ color: "var(--charcoal-soft)", fontSize: "16px", lineHeight: "1.65" }}>
            {t("description")}
          </p>
        </div>

        {/* BORDERLESS GRID */}
        <div className="cert-bento" style={{
          display: "grid",
          gridTemplateColumns: "1fr 1.6fr",
          gap: "64px",
          alignItems: "start"
        }}>
          
          {/* HALAL (Primary Focus) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            style={{
              paddingTop: "20px",
              display: "flex", flexDirection: "column",
            }}
          >
            <div>
              <span style={{
                display: "inline-flex", alignItems: "center", gap: "6px",
                color: "var(--forest)",
                fontFamily: "var(--font-mono)", fontSize: "12px", fontWeight: 600,
                letterSpacing: "0.06em", textTransform: "uppercase",
                marginBottom: "20px",
              }}>
                <CheckCircle size={16} /> {t("available")}
              </span>
              <h3 style={{ fontFamily: "var(--font-fraunces)", fontSize: "42px", marginBottom: "16px", letterSpacing: "-0.02em", color: "var(--forest-dark)" }}>
                {halal?.name}
              </h3>
              <p style={{ color: "var(--charcoal-soft)", fontSize: "17px", lineHeight: "1.6" }}>
                {halal?.body}
              </p>
            </div>
          </motion.div>

          {/* OTHERS (Grid) */}
          <div style={{
            display: "grid", gridTemplateColumns: "1fr 1fr", gap: "40px",
            borderLeft: "1px solid rgba(0,0,0,0.06)", paddingLeft: "40px"
          }}>
            {others.map((cert, i) => (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: i * 0.1 }}
                style={{
                  display: "flex", flexDirection: "column", justifyContent: "space-between",
                  borderBottom: "1px solid rgba(0,0,0,0.06)",
                  paddingBottom: "24px"
                }}
              >
                <div>
                  <h4 style={{ fontFamily: "var(--font-mono)", fontSize: "18px", fontWeight: 600, color: "var(--charcoal)", marginBottom: "12px", letterSpacing: "0.02em" }}>
                    {cert.name}
                  </h4>
                  <p style={{ fontSize: "14px", color: "var(--charcoal-soft)", lineHeight: "1.5" }}>
                    {cert.body}
                  </p>
                </div>
                
                <div style={{ marginTop: "24px" }}>
                  <span style={{
                    display: "inline-flex", alignItems: "center", gap: "6px",
                    color: "rgba(31,77,58,0.5)",
                    fontFamily: "var(--font-mono)", fontSize: "12px", fontWeight: 500,
                    letterSpacing: "0.06em", textTransform: "uppercase",
                  }}>
                    <Clock size={14} /> {t("comingSoon")}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
      <style>{`
        @media (max-width: 980px) {
          .cert-bento {
            grid-template-columns: 1fr !important;
          }
          .cert-bento > div:nth-child(2) {
            grid-template-columns: 1fr 1fr !important;
          }
        }
        @media (max-width: 600px) {
          .cert-bento > div:nth-child(2) {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
