"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { useLocale } from "next-intl";
import { ArrowRight, Recycle, Users, Sun, Globe, ArrowDown } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function SustainabilitySection() {
  const t = useTranslations("sustainability");
  const locale = useLocale();
  const pillars = t.raw("pillars") as { title: string; description: string }[];
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const icons = [
    <Recycle size={28} key="1" />,
    <Users size={28} key="2" />,
    <Sun size={28} key="3" />,
    <Globe size={28} key="4" />,
  ];

  // Auto-rotate
  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % 4);
    }, 5000);
    return () => clearInterval(timer);
  }, [isHovered]);

  return (
    <section className="section" style={{ background: "var(--forest-dark)", color: "var(--ivory)" }}>
      <div className="wrap">
        
        {/* Header */}
        <div style={{ textAlign: "center", maxWidth: "800px", margin: "0 auto 60px" }}>
          <span className="eyebrow on-dark" style={{ justifyContent: "center" }}>{t("eyebrow")}</span>
          <h2 style={{ 
            fontFamily: "var(--font-fraunces)", 
            fontSize: "clamp(2.5rem, 4vw, 4rem)", 
            marginBottom: "24px",
            lineHeight: "1.1"
          }}>
            {t("headline")}
          </h2>
          <p style={{ color: "rgba(251,250,246,0.7)", fontSize: "clamp(16px, 2vw, 18px)", lineHeight: "1.6" }}>
            {t("description")}
          </p>
        </div>

        {/* Interactive Showcase */}
        <div 
          className="sus-showcase"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          style={{ 
            display: "grid", 
            gridTemplateColumns: "1fr 1.3fr", 
            gap: "40px",
            background: "var(--forest)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: "32px",
            padding: "40px",
            minHeight: "500px"
          }}
        >
          {/* Left: Navigation Menu */}
          <div style={{ display: "flex", flexDirection: "column", gap: "12px", justifyContent: "center" }}>
            {pillars.map((pillar, i) => {
              const isActive = activeIndex === i;
              return (
                <button
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  onMouseEnter={() => setActiveIndex(i)}
                  style={{
                    display: "flex", alignItems: "center", gap: "20px",
                    padding: "24px",
                    borderRadius: "20px",
                    background: isActive ? "rgba(255,255,255,0.06)" : "transparent",
                    border: `1px solid ${isActive ? "rgba(255,255,255,0.12)" : "transparent"}`,
                    textAlign: "left",
                    transition: "all 0.3s ease",
                    cursor: "pointer",
                    position: "relative",
                    overflow: "hidden"
                  }}
                >
                  {/* Progress bar background for active item (Only runs when not hovered) */}
                  {isActive && !isHovered && (
                    <motion.div
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 5, ease: "linear" }}
                      style={{
                        position: "absolute", bottom: 0, left: 0, height: "2px",
                        background: "var(--sand)", zIndex: 0
                      }}
                    />
                  )}
                  
                  <div style={{ 
                    color: isActive ? "var(--sand)" : "rgba(251,250,246,0.4)",
                    transition: "color 0.3s",
                    position: "relative", zIndex: 1
                  }}>
                    {icons[i]}
                  </div>
                  <h3 style={{ 
                    fontFamily: "var(--font-fraunces)", 
                    fontSize: "20px", 
                    fontWeight: 500,
                    color: isActive ? "var(--ivory)" : "rgba(251,250,246,0.5)",
                    transition: "color 0.3s",
                    position: "relative", zIndex: 1
                  }}>
                    {pillar.title}
                  </h3>
                </button>
              );
            })}
          </div>

          {/* Right: Dynamic Display Area */}
          <div style={{ 
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
            borderRadius: "24px",
            minHeight: "100%",
            padding: "48px"
          }}>
            <AnimatePresence>
              <motion.div
                key={`bg-${activeIndex}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6 }}
                style={{ position: "absolute", inset: 0, zIndex: 0 }}
              >
                <Image
                  src={[
                    "/assets/images/cocopeat.webp", // Process/Resource
                    "/assets/images/manufacturing-4.webp", // Farmers
                    "/assets/images/manufacturing-3.webp", // Drying/Sun
                    "/assets/images/exporting-1.webp" // Generational
                  ][activeIndex]}
                  alt="Sustainability Background"
                  fill
                  sizes="50vw"
                  style={{ objectFit: "cover" }}
                />
                {/* Gradient overlay to make it look like a gradient rather than a hard card, increased opacity */}
                <div style={{ 
                  position: "absolute", inset: 0, 
                  background: "linear-gradient(135deg, rgba(18,40,31,0.85) 0%, rgba(18,40,31,0.65) 100%)",
                }} />
              </motion.div>
            </AnimatePresence>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, scale: 0.95, filter: "blur(4px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 1.05, filter: "blur(4px)" }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                style={{ width: "100%", position: "relative", zIndex: 1 }}
              >
                
                {activeIndex === 0 && (
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <div style={{ textAlign: "center", marginBottom: "40px" }}>
                      <h4 style={{ fontFamily: "var(--font-fraunces)", fontSize: "32px", color: "var(--sand)", marginBottom: "16px" }}>100% Resource Utilization</h4>
                      <p style={{ color: "rgba(251,250,246,0.7)", fontSize: "16px", maxWidth: "400px", margin: "0 auto" }}>
                        {pillars[0].description}
                      </p>
                    </div>
                    
                    {/* Visual Breakdown of Coconut */}
                    <div style={{ width: "100%", maxWidth: "480px", display: "flex", flexDirection: "column", gap: "16px" }}>
                      {[
                        { part: "Copra Meal", yield: "Animal Feed", color: "#C9BC98" },
                        { part: "Coconut Shell", yield: "Charcoal", color: "#A8A395" },
                        { part: "Coconut Husk", yield: "Coir Fiber", color: "#8E7C68" },
                        { part: "Coconut Water", yield: "Supplement", color: "#A3C2B5" }
                      ].map((item, idx) => (
                        <div key={idx} style={{ 
                          display: "flex", alignItems: "center", justifyContent: "space-between",
                          background: "rgba(255,255,255,0.05)",
                          padding: "16px 24px", borderRadius: "12px",
                          borderLeft: `4px solid ${item.color}`
                        }}>
                          <span style={{ fontSize: "18px", fontWeight: 600, color: "var(--ivory)" }}>{item.part}</span>
                          <ArrowRight size={18} style={{ color: "rgba(251,250,246,0.3)" }} />
                          <span style={{ fontSize: "16px", color: item.color, fontWeight: 500 }}>{item.yield}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeIndex === 1 && (
                  <div style={{ textAlign: "center" }}>
                    <Users size={64} style={{ color: "var(--sand)", margin: "0 auto 32px", opacity: 0.8 }} />
                    <h4 style={{ fontFamily: "var(--font-fraunces)", fontSize: "72px", lineHeight: "1", color: "var(--ivory)", marginBottom: "24px" }}>200+</h4>
                    <h5 style={{ fontSize: "24px", color: "var(--sand)", marginBottom: "24px", fontWeight: 500 }}>Farming Families Empowered</h5>
                    <p style={{ color: "rgba(251,250,246,0.7)", fontSize: "18px", maxWidth: "400px", margin: "0 auto", lineHeight: "1.6" }}>
                      {pillars[1].description}
                    </p>
                  </div>
                )}

                {activeIndex === 2 && (
                  <div style={{ textAlign: "center" }}>
                    <Sun size={64} style={{ color: "var(--sand)", margin: "0 auto 32px", opacity: 0.8 }} />
                    <h4 style={{ fontFamily: "var(--font-fraunces)", fontSize: "48px", lineHeight: "1.2", color: "var(--ivory)", marginBottom: "24px" }}>Solar-Assisted<br/>Drying</h4>
                    <p style={{ color: "rgba(251,250,246,0.7)", fontSize: "18px", maxWidth: "400px", margin: "0 auto", lineHeight: "1.6" }}>
                      {pillars[2].description}
                    </p>
                    <div style={{ marginTop: "40px", display: "inline-block", padding: "12px 24px", border: "1px solid var(--sand)", borderRadius: "100px", color: "var(--sand)", fontSize: "14px", letterSpacing: "0.05em", textTransform: "uppercase" }}>
                      Fossil Fuel Reduction
                    </div>
                  </div>
                )}

                {activeIndex === 3 && (
                  <div style={{ textAlign: "center" }}>
                    <Globe size={64} style={{ color: "var(--sand)", margin: "0 auto 32px", opacity: 0.8 }} />
                    <h4 style={{ fontFamily: "var(--font-fraunces)", fontSize: "40px", lineHeight: "1.2", color: "var(--ivory)", marginBottom: "24px" }}>Generational<br/>Sustainability</h4>
                    <p style={{ color: "rgba(251,250,246,0.7)", fontSize: "18px", maxWidth: "400px", margin: "0 auto", lineHeight: "1.6" }}>
                      {pillars[3].description}
                    </p>
                  </div>
                )}

              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* CTA */}
        <div style={{ textAlign: "center", marginTop: "60px" }}>
          <Link href={`/${locale}/about/sustainability`} className="btn btn-primary" style={{ 
            background: "var(--sand)", color: "var(--forest-dark)", borderColor: "var(--sand)",
            display: "inline-flex", alignItems: "center", gap: "8px" 
          }}>
            {t("cta")} <ArrowRight size={15} />
          </Link>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .sus-showcase { 
            grid-template-columns: 1fr !important; 
            padding: 24px !important; 
            border-radius: 24px !important;
          }
          .sus-showcase > div:last-child {
            padding: 32px 20px !important;
          }
        }
      `}</style>
    </section>
  );
}
