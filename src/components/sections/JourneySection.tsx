"use client";

import { useTranslations, useLocale } from "next-intl";
import { journeyMilestones } from "@/data/homepage";
import { ArrowRight } from "lucide-react";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

const Card = ({ milestone, index, themes, scrollYProgress, totalCards }: any) => {
  const locale = useLocale();
  const theme = themes[index % themes.length];
  const targetScale = 1 - ((totalCards - index - 1) * 0.05);
  const range = [index / totalCards, 1];
  const scale = useTransform(scrollYProgress, range, [1, targetScale]);

  const parallaxY = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);

  return (
    <div className="journey-wrapper" style={{
      height: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      position: "sticky",
      top: 0
    }}>
      <motion.div className="journey-card" style={{
        scale,
        position: "relative",
        top: `calc(5vh + ${index * 15}px)`,
        height: `calc(100vh - 10vh - ${index * 15}px)`,
        width: "100%",
        minHeight: "500px",
        background: theme.bg,
        color: theme.color,
        border: theme.border,
        borderRadius: "32px",
        padding: "64px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        boxShadow: "0 -24px 48px -24px rgba(0,0,0,0.15)",
        overflow: "hidden",
        transformOrigin: "top center",
        "--card-index": index,
      } as any}>
        {(milestone.image || theme.bgImage) && (
          <motion.div style={{ position: "absolute", inset: "-15%", y: parallaxY, zIndex: 0 }}>
            <Image 
              src={milestone.image || theme.bgImage} 
              alt={milestone.title}
              fill 
              sizes="100vw"
              style={{ objectFit: "cover", zIndex: 0 }}
            />
            {/* Overlay to ensure text legibility based on theme text color */}
            <div style={{ 
              position: "absolute", 
              inset: 0, 
              background: theme.overlay || (theme.color === "var(--ivory)" ? "rgba(18,40,31,0.8)" : "rgba(242,238,229,0.85)"), 
              zIndex: 0 
            }} />
          </motion.div>
        )}
        <div className="journey-left" style={{ position: "relative", zIndex: 1, height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", flex: 1 }}>
          <div style={{ 
            fontFamily: "var(--font-mono)", 
            fontSize: "14px", 
            letterSpacing: "0.15em", 
            textTransform: "uppercase", 
            fontWeight: 600,
            opacity: 0.8
          }}>
            Milestone 0{index + 1}
          </div>
          
          <div className="journey-year" style={{
            position: "absolute", top: "50%", left: "0",
            transform: "translateY(-50%)",
            fontFamily: "var(--font-fraunces)",
            fontSize: "clamp(120px, 15vw, 220px)",
            lineHeight: "0.8",
            fontWeight: 700,
            letterSpacing: "-0.04em",
            color: theme.yearColor,
            marginLeft: "-10px"
          }}>
            {milestone.year}
          </div>
        </div>

        <div className="journey-content" style={{ position: "relative", zIndex: 1, maxWidth: "500px" }}>
          <h4 style={{
            fontFamily: "var(--font-fraunces)", 
            fontSize: "clamp(2rem, 3vw, 2.8rem)",
            fontWeight: 600, 
            marginBottom: "24px", 
            lineHeight: "1.1"
          }}>
            {locale === "id" ? milestone.titleId : milestone.title}
          </h4>
          <p style={{ 
            fontSize: "clamp(16px, 1.8vw, 18px)", 
            opacity: 0.85, 
            lineHeight: "1.7",
            marginBottom: "40px"
          }}>
            {locale === "id" ? milestone.descriptionId : milestone.description}
          </p>
          
          <div style={{ 
            display: "inline-flex", 
            alignItems: "center", 
            gap: "10px", 
            fontFamily: "var(--font-mono)", 
            fontSize: "13px", 
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            fontWeight: 600
          }}>
            {milestone.year === "Future" ? "Vision" : "Achieved"} <ArrowRight size={16} />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default function JourneySection() {
  const t = useTranslations("journey");
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const themes = [
    { bg: "var(--forest)", bgImage: "/assets/images/pexels-cottonbro-4631075.webp", overlay: "rgba(31,77,58,0.7)", color: "var(--ivory)", yearColor: "rgba(251,250,246,0.15)", border: "none" },
    { bg: "var(--sand)", bgImage: "/assets/images/pexels-cottonbro-5608055.webp", overlay: "rgba(232,223,200,0.8)", color: "var(--forest-dark)", yearColor: "rgba(18,40,31,0.1)", border: "none" },
    { bg: "var(--charcoal)", color: "var(--ivory)", yearColor: "rgba(251,250,246,0.1)", border: "none" },
    { bg: "var(--ivory)", color: "var(--charcoal)", yearColor: "rgba(18,40,31,0.05)", border: "1px solid var(--line)" },
  ];

  return (
    <section className="section" style={{ background: "var(--ivory-dim)", padding: "120px 0" }}>
      <div className="wrap">
        <div style={{ marginBottom: "80px", textAlign: "center", maxWidth: "700px", margin: "0 auto 80px" }}>
          <span className="eyebrow">{t("eyebrow")}</span>
          <h2 style={{ fontFamily: "var(--font-fraunces)", fontSize: "clamp(2.5rem, 4vw, 3.5rem)" }}>
            {t("headline")}
          </h2>
        </div>

        {/* STACKING CARDS TIMELINE */}
        <div ref={containerRef} style={{ position: "relative" }}>
          {journeyMilestones.map((milestone, index) => (
            <Card 
              key={index} 
              milestone={milestone} 
              index={index} 
              themes={themes} 
              scrollYProgress={scrollYProgress} 
              totalCards={journeyMilestones.length} 
            />
          ))}
        </div>

      </div>

      <style>{`
        @media (max-width: 900px) {
          .journey-wrapper {
            display: contents !important; /* Removes the 120vh wrapper from layout, allowing cards to be siblings */
          }
          .journey-card { 
            position: sticky !important;
            top: calc(90px + var(--card-index) * 12px) !important;
            height: auto !important; 
            min-height: 420px !important;
            margin-bottom: 40px !important; 
            flex-direction: column !important; 
            justify-content: center !important; 
            align-items: flex-start !important;
            padding: 40px 24px !important;
            gap: 16px !important;
            transform: none !important; /* Disable the desktop scale effect */
            box-shadow: 0 -12px 24px -12px rgba(0,0,0,0.2) !important; /* Add shadow so stacked cards pop */
          }
          .journey-left { 
            height: auto !important; 
            justify-content: flex-start !important;
            gap: 0 !important; 
            flex: none !important;
          }
          .journey-year {
            position: relative !important;
            top: 0 !important;
            left: 0 !important;
            transform: none !important;
            font-size: clamp(72px, 18vw, 100px) !important;
            line-height: 1 !important;
            margin-bottom: 12px !important;
            margin-left: 0 !important;
          }
          .journey-content h4 {
            font-size: 1.8rem !important;
          }
          .journey-content p {
            font-size: 15px !important;
            margin-bottom: 24px !important;
          }
        }
      `}</style>
    </section>
  );
}
