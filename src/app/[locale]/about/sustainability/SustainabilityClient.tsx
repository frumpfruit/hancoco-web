"use client";

import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowDown, CheckCircle2, ArrowRight, Leaf, Recycle, Factory, Users } from "lucide-react";
import { useRef, useState } from "react";

export default function SustainabilityClient() {
  const t = useTranslations("sustainabilityPage");
  const locale = useLocale();

  const containerRef = useRef(null);
  
  // Parallax for Philosophy
  const philRef = useRef(null);
  const { scrollYProgress: philProgress } = useScroll({ target: philRef, offset: ["start end", "end start"] });
  const y1 = useTransform(philProgress, [0, 1], [150, -150]);
  const y2 = useTransform(philProgress, [0, 1], [50, -50]);
  const y3 = useTransform(philProgress, [0, 1], [250, -250]);

  // Sticky for Circular Economy
  const circRef = useRef(null);
  const { scrollYProgress: circProgress } = useScroll({ target: circRef, offset: ["start end", "end start"] });
  const rotateValue = useTransform(circProgress, [0, 1], [0, 360]);

  const [activeEnv, setActiveEnv] = useState(0);

  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  const philCards = t.raw("philosophy.cards") as { title: string; desc: string }[];
  const circChain = t.raw("circular.chain") as string[];
  const circHighlights = t.raw("circular.highlights") as { title: string; desc: string }[];
  const mfgCards = t.raw("manufacturing.cards") as string[];
  const envCards = t.raw("environmental.cards") as { title: string; desc: string }[];
  const socialCards = t.raw("social.cards") as string[];
  const aheadRoadmap = t.raw("ahead.roadmap") as string[];
  const statsItems = t.raw("stats.items") as string[];

  return (
    <div style={{ background: "var(--ivory)", color: "var(--charcoal)", overflow: "hidden" }} ref={containerRef}>
      
      {/* 1. HERO SECTION (Signature: Cinematic Parallax Image Mask) */}
      <section style={{ position: "relative", height: "100vh", minHeight: "700px", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", textAlign: "center" }}>
        <motion.div style={{ position: "absolute", inset: "-5%", zIndex: 0 }} initial={{ scale: 1.1 }} animate={{ scale: 1 }} transition={{ duration: 2, ease: "easeOut" }}>
          <Image src="/assets/images/coconut tree hero.webp" alt="Sustainability" fill priority loading="eager" sizes="100vw" style={{ objectFit: "cover" }} />
        </motion.div>
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(18,40,31,0.3) 0%, rgba(18,40,31,0.8) 100%)", zIndex: 1 }} />
        
        <div className="wrap" style={{ position: "relative", zIndex: 2, paddingTop: "80px", maxWidth: "1000px" }}>
          <motion.div initial="hidden" animate="visible" variants={fadeInUp}>
            <span className="eyebrow on-dark" style={{ justifyContent: "center" }}>{t("hero.eyebrow")}</span>
            <h1 style={{ fontFamily: "var(--font-fraunces)", fontSize: "clamp(3.5rem, 7vw, 6rem)", color: "var(--ivory)", lineHeight: 1.05, marginBottom: "24px" }}>
              {t("hero.headline")}
            </h1>
            <p style={{ color: "rgba(251,250,246,0.9)", fontSize: "clamp(18px, 2vw, 22px)", lineHeight: 1.6, maxWidth: "700px", margin: "0 auto 40px" }}>
              {t("hero.copy")}
            </p>
            <Link href="#circular" className="btn btn-primary" style={{ background: "var(--sand)", color: "var(--forest-dark)", borderColor: "var(--sand)", display: "inline-flex", alignItems: "center", gap: "8px" }}>
              {t("hero.cta")} <ArrowDown size={18} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* 2. PHILOSOPHY (Signature Move: Staggered Parallax Floating Cards) */}
      <section className="section" style={{ padding: "160px 0", position: "relative" }} ref={philRef}>
        <div className="wrap">
          <div style={{ textAlign: "center", maxWidth: "800px", margin: "0 auto 120px" }}>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeInUp}>
              <h2 style={{ fontFamily: "var(--font-fraunces)", fontSize: "clamp(3rem, 5vw, 4rem)", marginBottom: "24px", lineHeight: 1.1, color: "var(--forest-dark)" }}>
                {t("philosophy.headline")}
              </h2>
              <p style={{ fontSize: "20px", color: "var(--charcoal-soft)", lineHeight: 1.7, whiteSpace: "pre-line" }}>
                {t("philosophy.copy")}
              </p>
            </motion.div>
          </div>
          
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "32px", position: "relative", minHeight: "500px" }} className="parallax-grid">
             {philCards.map((card, i) => {
               const yVals = [y1, y2, y3];
               const images = [
                 "/assets/images/pexels-sarah-claude-levesque-st-louis-156920272-13525909.webp",
                 "/assets/images/nipanan-lifestyle-pV2xU2rP580-unsplash.webp",
                 "/assets/images/pexels-cottonbro-4631075.webp"
               ];
               return (
                <motion.div key={i} style={{ y: yVals[i % 3] }} className="parallax-card">
                  <div style={{ background: "var(--white)", borderRadius: "32px", boxShadow: "0 20px 40px rgba(18,40,31,0.05)", height: "100%", display: "flex", flexDirection: "column", border: "1px solid rgba(18,40,31,0.05)", overflow: "hidden" }}>
                    <div style={{ position: "relative", height: "200px", width: "100%" }}>
                       <Image src={images[i % 3]} alt={card.title} fill sizes="(max-width: 900px) 100vw, 33vw" style={{ objectFit: "cover" }} />
                    </div>
                    <div style={{ padding: "40px", flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
                      <h4 style={{ fontFamily: "var(--font-fraunces)", fontSize: "2rem", color: "var(--forest-dark)", marginBottom: "16px", lineHeight: 1.1 }}>{card.title}</h4>
                      <p style={{ fontSize: "17px", color: "var(--charcoal-soft)", lineHeight: 1.7 }}>{card.desc}</p>
                    </div>
                  </div>
                </motion.div>
               )
             })}
          </div>
        </div>
      </section>

      {/* 3. CIRCULAR ECONOMY (Signature Move: Marquee Chain + Bento Grid) */}
      <section id="circular" style={{ position: "relative", background: "var(--forest-dark)", color: "var(--ivory)", padding: "160px 0", overflow: "hidden" }} ref={circRef}>
        <div className="wrap">
          <div style={{ textAlign: "center", maxWidth: "800px", margin: "0 auto 80px" }}>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
              <span className="eyebrow on-dark" style={{ justifyContent: "center", marginBottom: "24px" }}>Circular Economy</span>
              <h2 style={{ fontFamily: "var(--font-fraunces)", fontSize: "clamp(2.5rem, 4vw, 3.5rem)", marginBottom: "24px", lineHeight: 1.1 }}>
                {t("circular.headline")}
              </h2>
              <p style={{ fontSize: "18px", color: "rgba(251,250,246,0.8)", lineHeight: 1.7 }}>
                {t("circular.copy")}
              </p>
            </motion.div>
          </div>
        </div>

        {/* Marquee Chain Divider */}
        <div style={{ padding: "40px 0", borderTop: "1px solid rgba(255,255,255,0.1)", borderBottom: "1px solid rgba(255,255,255,0.1)", marginBottom: "80px", background: "rgba(0,0,0,0.2)", overflow: "hidden" }}>
           <motion.div animate={{ x: ["0%", "-50%"] }} transition={{ duration: 40, repeat: Infinity, ease: "linear" }} style={{ display: "flex", gap: "60px", whiteSpace: "nowrap" }}>
              {[...circChain, ...circChain, ...circChain].map((step, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: "60px" }}>
                   <span style={{ fontSize: "20px", fontFamily: "var(--font-fraunces)", color: "var(--sand)", letterSpacing: "1px" }}>{step}</span>
                   <ArrowRight size={20} style={{ color: "rgba(255,255,255,0.3)" }} />
                </div>
              ))}
           </motion.div>
        </div>

        <div className="wrap">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))", gap: "24px" }} className="bento-grid">
             {circHighlights.map((hl, i) => {
               const images = [
                 "/assets/images/pexels-bogdankrupin-3986706.webp",
                 "/assets/images/manufacturing-3.webp",
                 "/assets/images/pexels-quang-nguyen-vinh-222549-8280856.webp",
                 "/assets/images/exporting-2.webp"
               ];
               
               // Create varying heights for the bento look
               const isTall = i === 1 || i === 2;
               
               return (
                 <motion.div 
                   key={i} 
                   initial={{ opacity: 0, y: 40 }} 
                   whileInView={{ opacity: 1, y: 0 }} 
                   viewport={{ once: true, margin: "-100px" }} 
                   transition={{ delay: i * 0.1 }}
                   style={{ 
                     position: "relative", 
                     height: isTall ? "500px" : "400px", 
                     borderRadius: "32px", 
                     overflow: "hidden",
                     background: "var(--charcoal)"
                   }}
                   className="bento-card"
                 >
                   <Image src={images[i]} alt={hl.title} fill sizes="(max-width: 900px) 100vw, 50vw" style={{ objectFit: "cover", opacity: 0.5, transition: "transform 0.8s ease, opacity 0.8s ease" }} className="bento-image" />
                   <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(18,40,31,0.95) 0%, rgba(18,40,31,0.2) 100%)" }} />
                   
                   <div style={{ position: "absolute", inset: 0, padding: "48px", display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
                      <div style={{ width: "48px", height: "48px", borderRadius: "50%", background: "var(--sand)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "24px" }}>
                         <Recycle size={24} style={{ color: "var(--forest-dark)" }} />
                      </div>
                      <h4 style={{ fontFamily: "var(--font-fraunces)", fontSize: "2rem", color: "var(--white)", marginBottom: "16px", lineHeight: 1.1 }}>{hl.title}</h4>
                      <p style={{ fontSize: "17px", color: "rgba(251,250,246,0.8)", lineHeight: 1.6, maxWidth: "400px" }}>{hl.desc}</p>
                   </div>
                 </motion.div>
               )
             })}
          </div>
        </div>
      </section>

      {/* 4. FARMING COMMUNITIES & 5. RESPONSIBLE MFG (Signature Move: Cinematic Image Mask Reveal) */}
      <section className="section" style={{ padding: "160px 0" }}>
        <div className="wrap">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", marginBottom: "160px", alignItems: "center" }}>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeInUp}>
              <h2 style={{ fontFamily: "var(--font-fraunces)", fontSize: "3.5rem", marginBottom: "24px", lineHeight: 1.1, color: "var(--forest-dark)" }}>
                {t("farming.headline")}
              </h2>
              <p style={{ fontSize: "18px", color: "var(--charcoal-soft)", lineHeight: 1.7, whiteSpace: "pre-line" }}>
                {t("farming.copy")}
              </p>
            </motion.div>
            <motion.div initial={{ clipPath: "inset(20% 20% 20% 20% round 24px)" }} whileInView={{ clipPath: "inset(0% 0% 0% 0% round 24px)" }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }} style={{ position: "relative", height: "600px", overflow: "hidden" }}>
               <motion.div initial={{ scale: 1.2 }} whileInView={{ scale: 1 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }} style={{ width: "100%", height: "100%" }}>
                 <Image src="/assets/images/pexels-quang-nguyen-vinh-222549-8280856.webp" alt="Farming Communities" fill sizes="(max-width: 900px) 100vw, 50vw" style={{ objectFit: "cover" }} />
               </motion.div>
            </motion.div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", alignItems: "center" }}>
            <motion.div initial={{ clipPath: "inset(20% 20% 20% 20% round 24px)" }} whileInView={{ clipPath: "inset(0% 0% 0% 0% round 24px)" }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }} style={{ position: "relative", height: "600px", overflow: "hidden", order: -1 }} className="mfg-image">
               <motion.div initial={{ scale: 1.2 }} whileInView={{ scale: 1 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }} style={{ width: "100%", height: "100%" }}>
                 <Image src="/assets/images/pexels-cottonbro-5608055.webp" alt="Responsible Manufacturing" fill sizes="(max-width: 900px) 100vw, 50vw" style={{ objectFit: "cover" }} />
               </motion.div>
            </motion.div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeInUp}>
              <h2 style={{ fontFamily: "var(--font-fraunces)", fontSize: "3.5rem", marginBottom: "24px", lineHeight: 1.1, color: "var(--forest-dark)" }}>
                {t("manufacturing.headline")}
              </h2>
              <p style={{ fontSize: "18px", color: "var(--charcoal-soft)", lineHeight: 1.7, whiteSpace: "pre-line", marginBottom: "40px" }}>
                {t("manufacturing.copy")}
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                {mfgCards.map((card, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: "16px", fontSize: "18px", fontWeight: 500, color: "var(--forest-dark)", padding: "16px 24px", background: "var(--ivory-dim)", borderRadius: "100px", border: "1px solid var(--line)" }}>
                    <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "var(--forest)" }} />
                    {card}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 6. ENVIRONMENTAL COMMITMENT (Signature Move: Interactive Hover Accordion) */}
      <section className="section" style={{ padding: "160px 0", background: "var(--charcoal)", color: "var(--ivory)" }}>
        <div className="wrap">
          <div style={{ textAlign: "center", maxWidth: "800px", margin: "0 auto 80px" }}>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
              <h2 style={{ fontFamily: "var(--font-fraunces)", fontSize: "3.5rem", marginBottom: "24px", lineHeight: 1.1, color: "var(--ivory)" }}>
                {t("environmental.headline")}
              </h2>
              <p style={{ fontSize: "18px", color: "var(--ivory)", opacity: 0.9, lineHeight: 1.7 }}>
                {t("environmental.copy")}
              </p>
            </motion.div>
          </div>
          
          <div style={{ display: "flex", height: "500px", gap: "16px" }} className="hover-accordion">
            {envCards.map((card, i) => {
              const isActive = activeEnv === i;
              const images = [
                "/assets/images/pexels-nati-87264186-26699770.webp",
                "/assets/images/pexels-ayomide-isaac-66354580-12392906.webp", 
                "/assets/images/pexels-cmrcn-29132448.webp", 
                "/assets/images/pexels-bogdankrupin-3986706.webp"
              ];
              return (
                <motion.div 
                  key={i} 
                  onHoverStart={() => setActiveEnv(i)}
                  animate={{ flex: isActive ? 3 : 1 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  style={{ position: "relative", borderRadius: "24px", overflow: "hidden", cursor: "pointer" }}
                >
                  <Image src={images[i % images.length]} alt={card.title} fill sizes="(max-width: 900px) 100vw, 25vw" style={{ objectFit: "cover", opacity: isActive ? 1 : 0.4, transition: "opacity 0.5s" }} />
                  <div style={{ position: "absolute", inset: 0, background: isActive ? "linear-gradient(to top, rgba(18,40,31,0.95) 0%, rgba(18,40,31,0) 100%)" : "rgba(18,40,31,0.6)", transition: "background 0.5s" }} />
                  
                  <div style={{ position: "absolute", bottom: "0", left: "0", right: "0", padding: "40px 32px", display: "flex", flexDirection: "column", justifyContent: "flex-end", height: "100%" }}>
                     <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: isActive ? "16px" : "0", transition: "margin 0.5s" }}>
                        <div style={{ width: "40px", height: "40px", borderRadius: "50%", background: isActive ? "var(--sand)" : "rgba(255,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "background 0.3s" }}>
                           <Leaf size={20} style={{ color: isActive ? "var(--forest-dark)" : "var(--sand)" }} />
                        </div>
                        <h4 style={{ fontFamily: "var(--font-fraunces)", fontSize: isActive ? "2rem" : "1.25rem", fontWeight: isActive ? 800 : 500, color: "var(--white)", whiteSpace: "nowrap", transition: "all 0.5s", textShadow: isActive ? "0 4px 20px rgba(0,0,0,0.5)" : "none" }}>{card.title}</h4>
                     </div>
                     
                     <AnimatePresence>
                       {isActive && (
                         <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.4 }} style={{ fontSize: "17px", color: "rgba(251,250,246,1)", lineHeight: 1.6, margin: 0, textShadow: "0 2px 10px rgba(0,0,0,0.5)" }}>
                           {card.desc}
                         </motion.p>
                       )}
                     </AnimatePresence>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* 7. SOCIAL IMPACT (Signature Move: Infinite Marquee / Large Typography) */}
      <section className="section" style={{ padding: "160px 0", background: "var(--forest)", color: "var(--ivory)", overflow: "hidden" }}>
        <div style={{ whiteSpace: "nowrap", display: "flex", gap: "40px", marginBottom: "80px" }}>
          <motion.div animate={{ x: ["0%", "-50%"] }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} style={{ display: "flex", gap: "40px" }}>
             {[...socialCards, ...socialCards, ...socialCards].map((card, i) => (
               <div key={i} style={{ fontSize: "clamp(4rem, 8vw, 8rem)", fontFamily: "var(--font-fraunces)", color: "rgba(255,255,255,0.05)", fontWeight: 800, textTransform: "uppercase" }}>
                 {card}
               </div>
             ))}
          </motion.div>
        </div>
        
        <div className="wrap" style={{ position: "relative", zIndex: 1 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", alignItems: "center" }}>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
              <h2 style={{ fontFamily: "var(--font-fraunces)", fontSize: "3.5rem", marginBottom: "24px", lineHeight: 1.1 }}>
                {t("social.headline")}
              </h2>
              <p style={{ fontSize: "20px", color: "rgba(251,250,246,0.8)", lineHeight: 1.7 }}>
                {t("social.copy")}
              </p>
            </motion.div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
              {socialCards.map((card, i) => (
                <motion.div key={i} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} style={{ padding: "20px 32px", background: "rgba(255,255,255,0.1)", borderRadius: "100px", border: "1px solid rgba(255,255,255,0.2)", fontSize: "16px", fontWeight: 500, backdropFilter: "blur(10px)" }}>
                  {card}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 8. LOOKING AHEAD & 9. HIGHLIGHTS STATS */}
      <section className="section" style={{ padding: "160px 0", background: "var(--white)" }}>
        <div className="wrap">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1.5fr", gap: "80px", marginBottom: "120px" }}>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
              <h2 style={{ fontFamily: "var(--font-fraunces)", fontSize: "3.5rem", marginBottom: "24px", lineHeight: 1.1, color: "var(--forest-dark)" }}>
                {t("ahead.headline")}
              </h2>
              <p style={{ fontSize: "18px", color: "var(--charcoal-soft)", lineHeight: 1.7, whiteSpace: "pre-line" }}>
                {t("ahead.copy")}
              </p>
            </motion.div>
            <div>
              <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                {aheadRoadmap.map((pt, i) => (
                  <motion.div key={i} initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, type: "spring", stiffness: 100 }} style={{ display: "flex", gap: "24px", fontSize: "20px", color: "var(--forest-dark)", alignItems: "center", padding: "32px 40px", background: "var(--ivory-dim)", borderRadius: "24px", border: "1px solid var(--line)", transform: `translateX(${i * 20}px)` }} className="roadmap-item">
                    <CheckCircle2 size={32} style={{ color: "var(--forest)", flexShrink: 0 }} />
                    <span style={{ fontWeight: 500 }}>{pt}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
          
          <div style={{ borderTop: "1px solid var(--line)", paddingTop: "80px" }}>
             <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "24px" }}>
                {statsItems.map((stat, i) => (
                  <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} style={{ padding: "16px 32px", background: "var(--ivory)", borderRadius: "100px", border: "1px solid var(--forest)", color: "var(--forest-dark)", fontWeight: 500, fontSize: "16px" }}>
                    {stat}
                  </motion.div>
                ))}
              </div>
          </div>
        </div>
      </section>

      {/* 10. FINAL CTA */}
      <section className="section" style={{ padding: "160px 0", textAlign: "center", background: "var(--charcoal)", color: "var(--ivory)", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, zIndex: 0, opacity: 0.1 }}>
          <Image src="/assets/images/pexels-cottonbro-5608056.webp" alt="Background" fill sizes="100vw" style={{ objectFit: "cover" }} />
        </div>
        <div className="wrap" style={{ position: "relative", zIndex: 1, maxWidth: "800px", margin: "0 auto" }}>
          <h2 style={{ fontFamily: "var(--font-fraunces)", fontSize: "clamp(3rem, 5vw, 4.5rem)", marginBottom: "32px", lineHeight: 1.1, color: "var(--sand)" }}>
            {t("final.headline")}
          </h2>
          <p style={{ fontSize: "20px", color: "rgba(251,250,246,0.8)", lineHeight: 1.6, marginBottom: "48px" }}>
            {t("final.copy")}
          </p>
          <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap", marginBottom: "64px" }}>
            <Link href={`/${locale}/support/contact`} className="btn btn-primary" style={{ background: "var(--sand)", color: "var(--forest-dark)", borderColor: "var(--sand)" }}>
              {t("final.cta1")}
            </Link>
            <Link href={`/${locale}/support/contact`} className="btn btn-secondary" style={{ borderColor: "rgba(255,255,255,0.3)", color: "var(--ivory)" }}>
              {t("final.cta2")}
            </Link>
          </div>
          <p style={{ fontSize: "16px", fontStyle: "italic", color: "rgba(251,250,246,0.5)", maxWidth: "600px", margin: "0 auto" }}>
            {t("final.note")}
          </p>
        </div>
      </section>

      <style>{`
        @media(max-width:900px) {
          .section > .wrap > div:not(.bento-grid) { grid-template-columns: 1fr !important; }
          .bento-grid { grid-template-columns: 1fr !important; }
          .parallax-card { transform: none !important; }
          .hover-accordion { flex-direction: column !important; height: 800px !important; }
          .roadmap-item { transform: none !important; }
          .mfg-image { order: 1 !important; }
        }
        
        .bento-card:hover .bento-image {
          transform: scale(1.05);
          opacity: 0.7 !important;
        }
      `}</style>
    </div>
  );
}
