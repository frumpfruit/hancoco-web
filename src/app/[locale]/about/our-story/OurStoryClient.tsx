"use client";

import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

export default function OurStoryClient() {
  const t = useTranslations("ourStoryPage");
  const locale = useLocale();
  
  const containerRef = useRef(null);
  const timelineRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  // Specific scroll tracker for the timeline section
  const { scrollYProgress: timelineProgress } = useScroll({
    target: timelineRef,
    offset: ["start center", "end center"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 100]);

  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" as const } }
  };

  const timelineItems = t.raw("journey.timeline") as { year: string; title: string; desc: string }[];
  const missionPoints = t.raw("mission.points") as string[];
  const valuePoints = t.raw("values.points") as { title: string; desc: string }[];

  return (
    <div style={{ background: "var(--ivory)", color: "var(--charcoal)" }} ref={containerRef}>
      
      {/* 1. HERO SECTION */}
      <section className="hero-section" style={{ position: "relative", height: "90vh", minHeight: "600px", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
        <Image
          src="/assets/images/pexels-cottonbro-5608055.webp"
          alt="Coconut Plantation"
          fill
          priority
          loading="eager"
          sizes="100vw"
          style={{ objectFit: "cover", zIndex: 0 }}
        />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(18,40,31,0.4) 0%, rgba(18,40,31,0.8) 100%)", zIndex: 1 }} />
        
        <div className="wrap" style={{ position: "relative", zIndex: 2, textAlign: "center", paddingTop: "80px" }}>
          <motion.div initial="hidden" animate="visible" variants={fadeInUp}>
            <h1 style={{ fontFamily: "var(--font-fraunces)", fontSize: "clamp(3rem, 6vw, 5rem)", color: "var(--ivory)", lineHeight: 1.1, marginBottom: "24px", maxWidth: "1000px", margin: "0 auto 24px" }}>
              {t("hero.headline")}
            </h1>
            <p style={{ color: "rgba(251,250,246,0.8)", fontSize: "clamp(16px, 2vw, 20px)", lineHeight: 1.6, maxWidth: "800px", margin: "0 auto 40px" }}>
              {t("hero.subheadline")}
            </p>
            <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
              <Link href={`/${locale}/store`} className="btn btn-primary" style={{ background: "var(--sand)", color: "var(--forest-dark)", borderColor: "var(--sand)" }}>
                {t("hero.cta1")}
              </Link>
              <Link href={`/${locale}/support/contact`} className="btn btn-secondary" style={{ borderColor: "rgba(255,255,255,0.3)", color: "var(--ivory)" }}>
                {t("hero.cta2")}
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. WHY WE EXIST & WHY INDONESIA (EDITORIAL SPLIT) */}
      <section className="section" style={{ padding: "120px 0" }}>
        <div className="wrap">
          <div className="responsive-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", alignItems: "center" }}>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeInUp}>
              <span className="eyebrow">{t("whyWeExist.eyebrow")}</span>
              <h2 style={{ fontFamily: "var(--font-fraunces)", fontSize: "clamp(2rem, 4vw, 3.5rem)", marginBottom: "24px", lineHeight: 1.1 }}>
                {t("whyWeExist.headline")}
              </h2>
              <p style={{ fontSize: "18px", color: "var(--charcoal-soft)", lineHeight: 1.7, whiteSpace: "pre-line" }}>
                {t("whyWeExist.copy")}
              </p>
            </motion.div>
            <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8 }} style={{ position: "relative", height: "600px", borderRadius: "24px", overflow: "hidden" }}>
               <Image src="/assets/images/pexels-cottonbro-5608056.webp" alt="Why We Exist" fill sizes="50vw" style={{ objectFit: "cover" }} />
            </motion.div>
          </div>
        </div>
      </section>

      <section className="section" style={{ background: "var(--sand)", padding: "120px 0" }}>
        <div className="wrap">
          <div className="responsive-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", alignItems: "center" }}>
            <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8 }} style={{ position: "relative", height: "600px", borderRadius: "24px", overflow: "hidden", order: -1 }}>
               <Image src="/assets/images/pexels-priyanka-paroyds-83085051-8914931.webp" alt="Indonesia Natural Strength" fill sizes="50vw" style={{ objectFit: "cover" }} />
            </motion.div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeInUp}>
              <span className="eyebrow">{t("whyIndonesia.eyebrow")}</span>
              <h2 style={{ fontFamily: "var(--font-fraunces)", fontSize: "clamp(2rem, 4vw, 3.5rem)", marginBottom: "24px", lineHeight: 1.1, color: "var(--forest-dark)" }}>
                {t("whyIndonesia.headline")}
              </h2>
              <p style={{ fontSize: "18px", color: "var(--charcoal-soft)", lineHeight: 1.7 }}>
                {t("whyIndonesia.copy")}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. WHY COCONUT & CIRCULAR ECONOMY (EDITORIAL ASYMMETRY) */}
      <section className="section" style={{ padding: "160px 0", overflow: "hidden" }}>
        <div className="wrap">
          <div className="responsive-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: "60px", alignItems: "center", marginBottom: "160px" }}>
            <motion.div style={{ y: y1 }} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeInUp}>
              <div style={{ padding: "40px", background: "var(--ivory-dim)", borderLeft: "4px solid var(--forest)", borderRadius: "0 24px 24px 0" }}>
                <span className="eyebrow">{t("whyCoconut.eyebrow")}</span>
                <h2 style={{ fontFamily: "var(--font-fraunces)", fontSize: "clamp(2rem, 5vw, 3rem)", marginBottom: "24px", lineHeight: 1.1, color: "var(--forest-dark)" }}>
                  {t("whyCoconut.headline")}
                </h2>
                <p style={{ fontSize: "18px", color: "var(--charcoal-soft)", lineHeight: 1.7 }}>
                  {t("whyCoconut.copy")}
                </p>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8 }} style={{ position: "relative", height: "700px", borderRadius: "24px", overflow: "hidden" }}>
               <Image src="/assets/images/coconut tree hero.webp" alt="Why Coconut" fill sizes="50vw" style={{ objectFit: "cover" }} />
            </motion.div>
          </div>

          <div className="circular-grid responsive-grid" style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: "60px", alignItems: "center" }}>
            <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8 }} className="circular-image" style={{ position: "relative", height: "700px", borderRadius: "24px", overflow: "hidden", order: -1 }}>
               <Image src="/assets/images/manufacturing-3.webp" alt="Circular Economy" fill sizes="50vw" style={{ objectFit: "cover" }} />
               <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(18,40,31,0.9) 0%, transparent 100%)" }} />
            </motion.div>
            <motion.div className="circular-card-wrap" style={{ y: y2 }} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeInUp}>
              <div className="circular-card" style={{ padding: "64px 40px", background: "var(--forest-dark)", color: "var(--ivory)", borderRadius: "24px", boxShadow: "0 30px 60px rgba(18,40,31,0.15)", transform: "translateX(-100px)", position: "relative", zIndex: 10 }}>
                <span className="eyebrow on-dark">{t("circularEconomy.eyebrow")}</span>
                <h2 style={{ fontFamily: "var(--font-fraunces)", fontSize: "clamp(2rem, 5vw, 3rem)", marginBottom: "24px", lineHeight: 1.1 }}>
                  {t("circularEconomy.headline")}
                </h2>
                <p style={{ fontSize: "18px", color: "rgba(251,250,246,0.8)", lineHeight: 1.7 }}>
                  {t("circularEconomy.copy")}
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 4. OUR JOURNEY (REDESIGNED: LIGHT TYPOGRAPHY, SCROLL LINE, & IMAGES) */}
      <section className="section" style={{ background: "var(--ivory)", padding: "160px 0", color: "var(--charcoal)", overflow: "hidden", position: "relative" }} ref={timelineRef}>
        <div className="wrap">
          <div style={{ textAlign: "center", marginBottom: "120px", position: "relative", zIndex: 2 }}>
            <span className="eyebrow" style={{ justifyContent: "center" }}>{t("journey.eyebrow")}</span>
            <h2 style={{ fontFamily: "var(--font-fraunces)", fontSize: "clamp(3rem, 5vw, 5rem)", color: "var(--forest-dark)" }}>
              {t("journey.headline")}
            </h2>
          </div>
          
          <div style={{ display: "flex", flexDirection: "column", gap: "100px", maxWidth: "1000px", margin: "0 auto", position: "relative" }}>
            
            {/* Accurate Scroll Indicator Line */}
            <div style={{ position: "absolute", top: 0, bottom: 0, left: "50%", transform: "translateX(-50%)", width: "2px", background: "var(--line)", zIndex: 0 }} className="timeline-line" />
            <motion.div 
              style={{ position: "absolute", top: 0, bottom: 0, left: "50%", transform: "translateX(-50%)", width: "2px", background: "var(--forest)", transformOrigin: "top", scaleY: timelineProgress, zIndex: 1 }} 
              className="timeline-line"
            />

            {timelineItems.map((item, i) => {
              const images = [
                "/assets/images/sri-lanka-0nH_OVirQSg-unsplash.webp",
                "/assets/images/manufacturing-4.webp",
                "/assets/images/manufacturing-3.webp",
                "/assets/images/exporting-1.webp",
                "/assets/images/exporting-2.webp",
                "/assets/images/manufacturing-3.webp"
              ];
              const imgSrc = images[i % images.length];
              const isEven = i % 2 === 0;

              return (
                <motion.div key={i} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8 }} style={{ position: "relative", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "60px", alignItems: "center", zIndex: 2 }} className="timeline-item responsive-grid">
                  
                  {/* Central Node */}
                  <div style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%, -50%)", width: "16px", height: "16px", borderRadius: "50%", background: "var(--forest)", border: "4px solid var(--ivory)", zIndex: 3 }} className="timeline-node" />

                  {/* Text Content */}
                  <div style={{ order: isEven ? 1 : 2, textAlign: isEven ? "right" : "left", padding: isEven ? "0 40px 0 0" : "0 0 0 40px" }} className="timeline-text">
                    <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", fontSize: "clamp(6rem, 12vw, 15rem)", fontFamily: "var(--font-fraunces)", color: "rgba(18,40,31,0.03)", fontWeight: 800, whiteSpace: "nowrap", pointerEvents: "none", zIndex: -1 }}>
                      {item.year}
                    </div>
                    <div style={{ fontSize: "32px", fontFamily: "var(--font-fraunces)", color: "var(--forest-dark)", marginBottom: "16px" }}>{item.year}</div>
                    <h3 style={{ fontSize: "22px", fontFamily: "var(--font-fraunces)", color: "var(--forest)", marginBottom: "16px" }}>{item.title}</h3>
                    <p style={{ fontSize: "16px", lineHeight: 1.7, color: "var(--charcoal-soft)" }}>{item.desc}</p>
                  </div>

                  {/* Image Content */}
                  <div style={{ order: isEven ? 2 : 1, position: "relative", height: "340px", borderRadius: "24px", overflow: "hidden", boxShadow: "0 20px 40px rgba(18,40,31,0.08)" }} className="timeline-image">
                    <Image src={imgSrc} alt={item.year} fill sizes="40vw" style={{ objectFit: "cover" }} />
                  </div>

                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. VISION & MISSION */}
      <section className="section" style={{ padding: "160px 0", background: "var(--forest-dark)", color: "var(--ivory)", borderTop: "1px solid rgba(255,255,255,0.1)" }}>
        <div className="wrap">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1.5fr", gap: "80px" }} className="vision-grid responsive-grid">
            <div>
              <span className="eyebrow on-dark">{t("vision.eyebrow")}</span>
              <h2 style={{ fontFamily: "var(--font-fraunces)", fontSize: "clamp(2rem, 5vw, 3rem)", marginBottom: "24px", lineHeight: 1.1 }}>
                {t("vision.headline")}
              </h2>
              <p style={{ fontSize: "18px", color: "rgba(251,250,246,0.7)", lineHeight: 1.7 }}>
                {t("vision.copy")}
              </p>
            </div>
            <div>
              <span className="eyebrow on-dark">{t("mission.eyebrow")}</span>
              <h2 style={{ fontFamily: "var(--font-fraunces)", fontSize: "clamp(2rem, 5vw, 3rem)", marginBottom: "32px", lineHeight: 1.1 }}>
                {t("mission.headline")}
              </h2>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: "20px" }}>
                {missionPoints.map((pt, i) => (
                  <motion.li key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} style={{ display: "flex", gap: "16px", fontSize: "18px", color: "rgba(251,250,246,0.9)", alignItems: "flex-start" }}>
                    <div style={{ width: "24px", height: "24px", borderRadius: "50%", background: "rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: "2px" }}>
                      <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "var(--sand)" }} />
                    </div>
                    {pt}
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 6. CORE VALUES (REDESIGNED: STICKY EDITORIAL) */}
      <section className="section" style={{ padding: "160px 0", background: "var(--ivory-dim)" }}>
        <div className="wrap">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1.5fr", gap: "80px", position: "relative", alignItems: "flex-start" }} className="values-grid responsive-grid">
            
            {/* Sticky Left */}
            <div style={{ position: "sticky", top: "120px" }} className="values-sticky">
              <span className="eyebrow">{t("values.eyebrow")}</span>
              <h2 style={{ fontFamily: "var(--font-fraunces)", fontSize: "clamp(3rem, 5vw, 4.5rem)", color: "var(--forest-dark)", lineHeight: 1.1, marginBottom: "24px" }}>
                {t("values.headline")}
              </h2>
            </div>
            
            {/* Scrolling Right */}
            <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
              {valuePoints.map((val, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.5 }} className="core-value-card">
                  <div style={{ fontSize: "2.5rem", fontFamily: "var(--font-fraunces)", color: "var(--forest)", opacity: 0.3, lineHeight: 1, marginTop: "4px" }} className="cv-number">
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <div>
                    <h3 style={{ fontSize: "2rem", fontFamily: "var(--font-fraunces)", color: "var(--forest-dark)", marginBottom: "16px", lineHeight: 1.2 }}>
                      {val.title}
                    </h3>
                    <p style={{ fontSize: "17px", color: "var(--charcoal-soft)", lineHeight: 1.7 }}>
                      {val.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 7. LEADERSHIP & LOOKING AHEAD */}
      <section className="section" style={{ padding: "120px 0", background: "var(--white)" }}>
        <div className="wrap">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "60px" }} className="leadership-grid responsive-grid">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
              <span className="eyebrow">{t("leadership.eyebrow")}</span>
              <h2 style={{ fontFamily: "var(--font-fraunces)", fontSize: "2.5rem", marginBottom: "24px", lineHeight: 1.1, color: "var(--forest-dark)" }}>
                {t("leadership.headline")}
              </h2>
              <p style={{ fontSize: "16px", color: "var(--charcoal-soft)", lineHeight: 1.7 }}>{t("leadership.copy")}</p>
            </motion.div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} transition={{ delay: 0.2 }}>
              <span className="eyebrow">{t("lookingAhead.eyebrow")}</span>
              <h2 style={{ fontFamily: "var(--font-fraunces)", fontSize: "2.5rem", marginBottom: "24px", lineHeight: 1.1, color: "var(--forest-dark)" }}>
                {t("lookingAhead.headline")}
              </h2>
              <p style={{ fontSize: "16px", color: "var(--charcoal-soft)", lineHeight: 1.7 }}>{t("lookingAhead.copy")}</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 8. FINAL MANIFESTO */}
      <section className="section final-manifesto" style={{ padding: "160px 0", textAlign: "center", background: "var(--forest)", color: "var(--ivory)", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, zIndex: 0, opacity: 0.1 }}>
          <Image src="/assets/images/coconut tree hero.webp" alt="Background" fill style={{ objectFit: "cover" }} />
        </div>
        <div className="wrap" style={{ position: "relative", zIndex: 1, maxWidth: "800px", margin: "0 auto" }}>
          <h2 style={{ fontFamily: "var(--font-fraunces)", fontSize: "clamp(3rem, 5vw, 5rem)", marginBottom: "32px", lineHeight: 1.1, color: "var(--sand)" }}>
            {t("final.headline")}
          </h2>
          <p style={{ fontSize: "20px", color: "rgba(251,250,246,0.8)", lineHeight: 1.6, marginBottom: "48px" }}>
            {t("final.copy")}
          </p>
          <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href={`/${locale}/store`} className="btn btn-primary" style={{ background: "var(--sand)", color: "var(--forest-dark)", borderColor: "var(--sand)" }}>
              {t("final.cta1")}
            </Link>
            <Link href={`/${locale}/support/contact`} className="btn btn-secondary" style={{ borderColor: "rgba(255,255,255,0.3)", color: "var(--ivory)" }}>
              {t("final.cta2")}
            </Link>
          </div>
        </div>
      </section>
      
      <style>{`
        @media(max-width:900px) {
          .section > .wrap > div:not(.leadership-grid):not(.vision-grid):not(.values-grid) { grid-template-columns: 1fr !important; }
          .vision-grid, .leadership-grid, .values-grid { grid-template-columns: 1fr !important; }
          
          .timeline-item { grid-template-columns: 1fr !important; gap: 32px !important; }
          .timeline-line, .timeline-node { display: none !important; }
          .timeline-text { padding: 0 !important; text-align: left !important; order: 2 !important; }
          .timeline-image { order: 1 !important; height: 240px !important; }
          
          .values-sticky { position: static !important; margin-bottom: 40px; }
          .core-value-card { padding: 32px 24px !important; flex-direction: column; gap: 16px !important; }
        }
        
        @media(max-width:640px) {
          .final-manifesto { padding: 100px 0 80px !important; }
          .circular-grid { display: flex !important; flex-direction: column !important; gap: 0 !important; }
          .circular-image { height: 280px !important; border-radius: 24px 24px 0 0 !important; order: 1 !important; }
          .circular-card-wrap { order: 2 !important; margin: -40px 16px 0 !important; }
          .circular-card { padding: 40px 28px !important; transform: none !important; border-radius: 24px !important; }
        }
        @media(max-width:480px) {
          .final-manifesto { padding: 80px 0 60px !important; }
          .circular-image { height: 220px !important; }
          .circular-card { padding: 32px 20px !important; }
        }
        
        .core-value-card {
          padding: 48px 40px;
          background: var(--white);
          border-radius: 24px;
          border: 1px solid var(--line);
          display: flex;
          gap: 32px;
          align-items: flex-start;
          transition: all 0.4s ease;
        }
        
        .core-value-card:hover {
          border-color: var(--forest);
          transform: translateY(-4px);
          box-shadow: 0 20px 40px rgba(18,40,31,0.06);
        }
        
        .core-value-card:hover .cv-number {
          opacity: 1 !important;
        }
      `}</style>
    </div>
  );
}
