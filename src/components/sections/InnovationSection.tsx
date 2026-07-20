"use client";

import { useTranslations } from "next-intl";
import { innovationPipeline } from "@/data/homepage";
import { motion } from "framer-motion";
import { CheckCircle, Clock, Zap } from "lucide-react";

export default function InnovationSection() {
  const t = useTranslations("innovation");

  const phases = [
    {
      id: "now",
      title: t("now"),
      icon: <Zap size={16} />,
      bg: "var(--forest)",
      color: "var(--ivory)",
      items: innovationPipeline.filter((i) => i.status === "now"),
    },
    {
      id: "near",
      title: t("near"),
      icon: <Clock size={16} />,
      bg: "var(--sand)",
      color: "var(--forest-dark)",
      items: innovationPipeline.filter((i) => i.status === "near"),
    },
    {
      id: "future",
      title: t("future"),
      icon: <CheckCircle size={16} />,
      bg: "var(--white)",
      color: "var(--charcoal-soft)",
      border: "1px dashed var(--line)",
      items: innovationPipeline.filter((i) => i.status === "future"),
    },
  ];

  return (
    <section className="section" style={{ background: "var(--ivory-dim)", borderTop: "1px solid var(--line)" }}>
      <div className="wrap">
        <div className="innov-inner" style={{ display: "grid", gridTemplateColumns: "1fr 1.5fr", gap: "64px", alignItems: "start" }}>
          {/* Left — Sticky header */}
          <div style={{ position: "sticky", top: "120px" }}>
            <span className="eyebrow">{t("eyebrow")}</span>
            <h2 style={{ fontFamily: "var(--font-fraunces)", fontSize: "clamp(2rem, 3.2vw, 2.8rem)", marginBottom: "18px" }}>
              {t("headline")}
            </h2>
            <p style={{ color: "var(--charcoal-soft)", fontSize: "16px", lineHeight: "1.65", marginBottom: "28px" }}>
              {t("description")}
            </p>
            <p style={{ color: "var(--charcoal-soft)", fontSize: "15px", lineHeight: "1.65" }}>
              We continuously invest in new processing technologies and sustainable methods to maximize the value of every coconut harvested, answering the evolving needs of global industries.
            </p>
          </div>

          {/* Right — Structured Roadmap */}
          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            {phases.map((phase, index) => (
              <motion.div
                key={phase.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: index * 0.1 }}
                style={{
                  background: phase.bg,
                  color: phase.color,
                  border: phase.border || "none",
                  borderRadius: "24px",
                  padding: "32px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "24px"
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "10px", fontFamily: "var(--font-mono)", fontSize: "13px", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase" }}>
                  {phase.icon} {phase.title}
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
                  {phase.items.map((item, i) => (
                    <div
                      key={i}
                      style={{
                        background: phase.id === "now" ? "rgba(251,250,246,0.15)" : (phase.id === "near" ? "var(--white)" : "var(--ivory)"),
                        padding: "12px 18px",
                        borderRadius: "100px",
                        fontFamily: "var(--font-mono)",
                        fontSize: "13px",
                        fontWeight: 500,
                        border: phase.id === "future" ? "1px solid var(--line)" : "none",
                        color: phase.id === "now" ? "var(--ivory)" : "var(--charcoal)",
                        boxShadow: phase.id === "near" ? "0 4px 12px rgba(0,0,0,0.05)" : "none"
                      }}
                    >
                      {item.label}
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .innov-inner { grid-template-columns: 1fr !important; }
          .innov-inner > div:first-child { position: static !important; }
        }
      `}</style>
    </section>
  );
}
