"use client";

import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useLocale } from "next-intl";
import { ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function HeroSection() {
  const t = useTranslations("hero");
  const locale = useLocale();
  const lineRef = useRef<HTMLDivElement>(null);
  const rotatingWords = t.raw("rotatingWords") as string[];
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentWordIndex((prev) => (prev + 1) % rotatingWords.length);
    }, 2500);
    return () => clearInterval(timer);
  }, [rotatingWords.length]);

  return (
    <section className="hero-section" style={{ 
      minHeight: "calc(100vh - 73px)", 
      display: "flex", 
      flexDirection: "column",
      position: "relative",
      overflow: "hidden" 
    }}>
      
      {/* LAYER 1: Background Videotron / Image */}
      <div style={{
        position: "absolute",
        inset: 0,
        zIndex: 0,
      }}>
        <video 
          autoPlay 
          muted 
          loop 
          playsInline
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
        >
          <source src="/assets/images/herovid.webm" type="video/webm" />
        </video>
        {/* Dark overlay so headline is readable */}
        <div style={{ position: "absolute", inset: 0, background: "rgba(18,40,31,0.8)" }} />
      </div>

      {/* LAYER 2 removed as per user request */}

      {/* LAYER 3: Content (Text & Foreground Image) */}
      <div className="wrap hero-wrap" style={{ position: "relative", zIndex: 2, width: "100%", flex: 1, display: "flex" }}>
        
        {/* LEFT — Copy */}
        <div className="hero-content">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", staggerChildren: 0.1 }}
          >
            {/* Badges */}
            <div style={{ display: "flex", gap: "10px", marginBottom: "24px", flexWrap: "wrap" }}>
              <span style={{
                fontFamily: "var(--font-mono)", fontSize: "11.5px", letterSpacing: "0.06em",
                padding: "6px 14px", borderRadius: "100px",
                border: "1px solid var(--sand)", color: "var(--sand)",
                background: "rgba(201, 188, 152, 0.15)", textTransform: "uppercase",
              }}>
                {t("badge1")}
              </span>
              <span style={{
                fontFamily: "var(--font-mono)", fontSize: "11.5px", letterSpacing: "0.06em",
                padding: "6px 14px", borderRadius: "100px",
                border: "1px solid rgba(251,250,246,0.3)", color: "var(--ivory)",
                textTransform: "uppercase",
              }}>
                {t("badge2")}
              </span>
            </div>

            {/* Headline */}
            <h1 style={{
              fontFamily: "var(--font-fraunces)",
              fontSize: "clamp(2.5rem, 4.2vw, 4rem)", 
              fontWeight: 600, lineHeight: "1.04",
              letterSpacing: "-0.03em", color: "var(--ivory)",
            }}>
              {t("headline1")}<br />
              <AnimatePresence mode="popLayout">
                <motion.em
                  key={currentWordIndex}
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -30, opacity: 0 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  style={{ fontStyle: "normal", color: "var(--sand)", display: "inline-block" }}
                >
                  {rotatingWords[currentWordIndex]}
                </motion.em>
              </AnimatePresence>
            </h1>

            {/* Subheadline */}
            <p style={{
              fontSize: "16px", color: "rgba(251,250,246,0.8)",
              maxWidth: "480px", margin: "20px 0 32px",
              lineHeight: "1.6",
            }}>
              {t("sub")}
            </p>

            {/* CTAs */}
            <div style={{ display: "flex", gap: "14px", flexWrap: "wrap" }}>
              <Link href={`/${locale}/store`} className="btn btn-primary" style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "var(--sand)", color: "var(--forest-dark)", borderColor: "var(--sand)" }}>
                {t("cta1")} <ArrowRight size={16} />
              </Link>
              <Link href="#rfq" className="btn btn-secondary" style={{ color: "var(--ivory)", borderColor: "rgba(251,250,246,0.3)" }}>
                {t("cta2")}
              </Link>
            </div>

          </motion.div>
        </div>

      </div>

      <style>{`
        .hero-wrap {
          align-items: center;
          justify-content: flex-start;
        }
        .hero-content {
          max-width: 700px;
          padding: 80px 0;
        }

        @media (max-width: 980px) {
          .hero-wrap {
            flex-direction: column;
            justify-content: flex-start;
          }
          .hero-content {
            width: 100%;
            padding: 60px 0 40px;
          }
        }
      `}</style>
    </section>
  );
}
