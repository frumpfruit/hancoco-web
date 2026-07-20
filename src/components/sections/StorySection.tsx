"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { useLocale } from "next-intl";
import { ArrowRight } from "lucide-react";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

export default function StorySection() {
  const t = useTranslations("story");
  const locale = useLocale();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);

  return (
    <section ref={ref} className="section" style={{ position: "relative", overflow: "hidden" }}>
      {/* Background Texture with Gradient Fades */}
      <div style={{
        position: "absolute",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
        opacity: 0.1, // Subtle texture opacity
        maskImage: "linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)",
        WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)",
        overflow: "hidden"
      }}>
        <motion.div style={{ position: "absolute", inset: "-30%", y }}>
          <Image
            src="/assets/images/pexels-cottonbro-5608055.webp"
            alt="Story Background"
            fill
            sizes="100vw"
            style={{ objectFit: "cover" }}
          />
        </motion.div>
      </div>

      <div className="wrap" style={{ position: "relative", zIndex: 1 }}>
        <div className="story-inner" style={{
          display: "grid",
          gridTemplateColumns: "1.15fr 0.85fr",
          gap: "72px", alignItems: "center",
        }}>
          {/* LEFT — Text (editorial layout) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <span className="eyebrow">{t("eyebrow")}</span>
            <h2 style={{
              fontFamily: "var(--font-fraunces)",
              fontSize: "clamp(2.2rem, 3.5vw, 3.2rem)",
              marginBottom: "32px", lineHeight: "1.08",
            }}>
              {t("headline")}
            </h2>

            {/* Double-column editorial text */}
            <div style={{
              display: "grid", gridTemplateColumns: "1fr 1fr",
              gap: "28px", marginBottom: "40px",
            }}>
              <p style={{ color: "var(--charcoal-soft)", fontSize: "15.5px", lineHeight: "1.7" }}>
                {t("p1")}
              </p>
              <p style={{ color: "var(--charcoal-soft)", fontSize: "15.5px", lineHeight: "1.7" }}>
                {t("p2")}
              </p>
            </div>

            <Link href={`/${locale}/about/our-story`} style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              fontSize: "14.5px", fontWeight: 600, color: "var(--forest)",
              borderBottom: "1.5px solid var(--forest)",
              paddingBottom: "2px",
            }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.opacity = "0.7")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.opacity = "1")}
            >
              {t("cta")} <ArrowRight size={15} />
            </Link>
          </motion.div>

          {/* RIGHT — Visual stacked frames */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            style={{ position: "relative" }}
          >
            {/* Back frame */}
            <div style={{
              position: "absolute",
              top: "-20px", right: "-20px",
              width: "72%", aspectRatio: "1/1",
              borderRadius: "20px",
              background: "var(--forest-dark)",
              zIndex: 0,
              overflow: "hidden"
            }}>
              <Image
                src="/assets/images/pexels-cottonbro-5608056.webp"
                alt="Story Background 2"
                fill
                sizes="(max-width: 900px) 50vw, 30vw"
                style={{ objectFit: "cover", zIndex: 0 }}
              />
              <div style={{ position: "absolute", inset: 0, background: "rgba(18,40,31,0.7)", zIndex: 0 }} />
            </div>
            
            {/* Main frame */}
            <div style={{
              position: "relative", zIndex: 1,
              aspectRatio: "1/1", borderRadius: "20px",
              background: "var(--sand)",
              overflow: "hidden",
              boxShadow: "0 24px 48px -20px rgba(18,40,31,0.3)"
            }}>
              <Image
                src="/assets/images/pexels-priyanka-paroyds-83085051-8914931.webp"
                alt="Story Background 1"
                fill
                sizes="(max-width: 900px) 100vw, 50vw"
                style={{ objectFit: "cover", zIndex: 0 }}
              />
              <div style={{ position: "absolute", inset: 0, background: "rgba(232,223,200,0.85)", zIndex: 0 }} />

              {/* Coconut abstract pattern */}
              <div style={{
                position: "absolute", bottom: "-20px", right: "-20px",
                width: "180px", height: "180px", borderRadius: "50%",
                border: "40px solid rgba(31,77,58,0.12)",
                zIndex: 1
              }} />
              <div style={{
                position: "absolute", top: "30px", left: "30px",
                fontFamily: "var(--font-fraunces)", fontSize: "64px",
                fontWeight: 600, color: "rgba(31,77,58,0.12)", lineHeight: "1",
              }}>
                2020
              </div>
              {/* Label overlay */}
              <div style={{
                position: "absolute", bottom: "28px", left: "24px",
                background: "var(--forest)", color: "var(--ivory)",
                padding: "10px 16px", borderRadius: "8px",
                fontFamily: "var(--font-mono)", fontSize: "12px",
                letterSpacing: "0.06em",
              }}>
                EST. 2020 · INDONESIA
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      <style>{`
        @media (max-width: 900px) {
          .story-inner { grid-template-columns: 1fr !important; gap: 40px !important; }
          .story-inner > div:first-child > div { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
