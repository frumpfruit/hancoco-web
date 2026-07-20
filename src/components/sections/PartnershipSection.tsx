"use client";

import { useTranslations } from "next-intl";
import { partnerVerticals, Partner } from "@/data/homepage";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const badgeStyle = { 
  fontSize: "15px", 
  padding: "12px 24px", 
  fontFamily: "var(--font-body)",
  textTransform: "capitalize" as const
};

export default function PartnershipSection() {
  const t = useTranslations("partnership");
  const [hoveredPartner, setHoveredPartner] = useState<Partner | null>(null);

  const defaultHeadline = t("headline");
  const defaultDesc = t("description");

  const displayHeadline = hoveredPartner ? hoveredPartner.name : defaultHeadline;
  const displayDesc = hoveredPartner ? hoveredPartner.description : defaultDesc;

  return (
    <section className="section" style={{ background: "var(--white)", borderTop: "1px solid var(--line)", position: "relative", overflow: "hidden" }}>
      
      {/* Background Image Layer with Gradient Mask */}
      <div style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "50%", // Covers the left text side
        height: "100%",
        zIndex: 0,
        opacity: 0.3, // Increased opacity as requested
        maskImage: "linear-gradient(to right, black 0%, transparent 100%)",
        WebkitMaskImage: "linear-gradient(to right, black 0%, transparent 100%)",
        pointerEvents: "none"
      }}>
        <AnimatePresence>
          {hoveredPartner?.image && (
            <motion.div
              key={hoveredPartner.name}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              style={{ position: "absolute", inset: 0 }}
            >
              <Image 
                src={hoveredPartner.image} 
                alt={hoveredPartner.name}
                fill
                sizes="50vw"
                style={{ objectFit: "cover" }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="wrap" style={{ position: "relative", zIndex: 1 }}>
        <div style={{ display: "grid", gridTemplateColumns: "0.9fr 1.1fr", gap: "72px", alignItems: "center" }}>

          {/* Left - Dynamic Content */}
          <div style={{ minHeight: "280px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <span className="eyebrow">{hoveredPartner ? "Target Industry" : t("eyebrow")}</span>
            
            <div style={{ position: "relative", marginBottom: "22px", minHeight: "110px" }}>
              <AnimatePresence mode="popLayout">
                <motion.h2 
                  key={displayHeadline}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  style={{ 
                    fontFamily: "var(--font-fraunces)", 
                    fontSize: "clamp(2rem, 3.2vw, 2.8rem)",
                    lineHeight: "1.1",
                    color: hoveredPartner ? "var(--forest)" : "var(--charcoal)"
                  }}
                >
                  {displayHeadline}
                </motion.h2>
              </AnimatePresence>
            </div>
            
            <div style={{ position: "relative", marginBottom: "36px", minHeight: "80px" }}>
              <AnimatePresence mode="popLayout">
                <motion.p 
                  key={displayDesc}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  style={{ color: "var(--charcoal-soft)", fontSize: "16px", lineHeight: "1.65" }}
                >
                  {displayDesc}
                </motion.p>
              </AnimatePresence>
            </div>

            <a href="#rfq" className="btn btn-primary" style={{ alignSelf: "flex-start" }}>
              {t("cta")}
            </a>
          </div>

          {/* Right — Tag cloud with varied sizes */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "14px", alignItems: "center" }}>
            {partnerVerticals.map((partner) => {
              const isHovered = hoveredPartner?.name === partner.name;
              const isAnyHovered = hoveredPartner !== null;
              
              return (
                <a
                  key={partner.name}
                  href={partner.href}
                  style={{
                    border: "1px solid",
                    borderColor: isHovered ? "var(--forest)" : "var(--line)",
                    borderRadius: "100px",
                    color: isHovered ? "var(--ivory)" : "var(--charcoal-soft)",
                    background: isHovered ? "var(--forest)" : "transparent",
                    fontWeight: partner.size === "lg" ? 600 : 500,
                    opacity: isAnyHovered && !isHovered ? 0.4 : 1, // Dim others
                    transition: "all 0.3s ease",
                    display: "inline-block",
                    transform: isHovered ? "translateY(-4px)" : "translateY(0)",
                    boxShadow: isHovered ? "0 10px 20px -10px rgba(18,40,31,0.3)" : "none",
                    ...badgeStyle,
                  }}
                  onMouseEnter={() => setHoveredPartner(partner)}
                  onMouseLeave={() => setHoveredPartner(null)}
                >
                  {partner.name}
                </a>
              );
            })}
          </div>
        </div>
      </div>
      
      <style>{`
        @media (max-width: 900px) {
          .wrap > div { grid-template-columns: 1fr !important; gap: 40px !important; }
        }
      `}</style>
    </section>
  );
}
