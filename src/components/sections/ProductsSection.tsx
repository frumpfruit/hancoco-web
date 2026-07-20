"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { useLocale } from "next-intl";
import { ArrowRight, Plus } from "lucide-react";
import { products } from "@/data/homepage";
import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import Image from "next/image";
import { useGSAP } from "@gsap/react";

const gradients = [
  "linear-gradient(135deg, #E8DFC8, #C9BC98)",
  "linear-gradient(135deg, #d4d0c8, #b8b4aa)",
  "linear-gradient(135deg, #c8c4be, #a8a49e)",
  "linear-gradient(135deg, #f5f0e0, #e8dfc8)",
];

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
  ScrollTrigger.config({ ignoreMobileResize: true }); // Prevent address bar resize from breaking GSAP pin layout
}

export default function ProductsSection() {
  const t = useTranslations("products");
  const locale = useLocale();
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!sectionRef.current || !containerRef.current) return;

    // 100% Dynamic DOM-based calculation.
    // This reads the EXACT rendered pixel width of the cards, completely immune to CSS changes, media queries, or max-width assumptions.
    const getScrollAmount = () => {
      const container = containerRef.current;
      if (!container || !container.parentElement) return 0;
      
      const wrap = container.parentElement;
      const wrapRect = wrap.getBoundingClientRect();
      const paddingLeft = parseFloat(window.getComputedStyle(wrap).paddingLeft) || 0;
      
      // L = The exact pixel distance from the left edge of the screen to the left edge of the container
      const L = wrapRect.left + paddingLeft;
      
      // C = The exact physical pixel width of the entire flex container (all cards + gaps)
      const C = container.scrollWidth;
      
      // S = The screen width
      const S = window.innerWidth;
      
      // We want the final right edge of the container to have exactly 'L' pixels of space from the right edge of the screen.
      // Math: L (start pos) + C (width) + translation = S - L (target right pos)
      // translation = S - 2L - C
      const translation = S - (2 * L) - C;
      
      // If the cards don't overflow the screen, don't scroll
      return Math.min(0, translation);
    };

    const tween = gsap.to(containerRef.current, {
      x: getScrollAmount,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        pin: true,
        scrub: 1,
        start: "top 73px",
        // Vertical scroll distance proportional to the exact horizontal distance
        end: () => `+=${Math.abs(getScrollAmount()) * 1.5}`,
        invalidateOnRefresh: true,
      }
    });

    return () => {
      tween.kill();
    };
  }, { scope: sectionRef });

  return (
    <section 
      ref={sectionRef} 
      className="section prod-section" 
      style={{ 
        background: "var(--white)", 
        borderTop: "1px solid var(--line)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        overflow: "hidden", // Hides the horizontal overflow
        padding: "0", 
        position: "relative"
      }}
    >
      {/* Background Texture with Gradient Fades */}
      <div style={{
        position: "absolute",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
        opacity: 0.1, // Subtle texture opacity
        maskImage: "linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)",
        WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)"
      }}>
        <Image
          src="/assets/images/peter-fogden-toB7tKXne7U-unsplash.webp"
          alt="Products Background"
          fill
          priority
          sizes="100vw"
          style={{ objectFit: "cover" }}
        />
      </div>

      <div className="wrap" style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", flex: "1 1 auto", justifyContent: "center", paddingTop: "clamp(24px, 4vh, 80px)", paddingBottom: "clamp(24px, 4vh, 80px)", minWidth: 0 }}>
        {/* Section header */}
        <div style={{ marginBottom: "clamp(20px, 4vh, 56px)", flexShrink: 0 }}>
          <span className="eyebrow">{t("eyebrow")}</span>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "12px" }}>
            <h2 style={{ fontFamily: "var(--font-fraunces)", fontSize: "clamp(1.8rem, 3vw, 2.8rem)", maxWidth: "500px", lineHeight: "1.1" }}>
              {t("headline")}
            </h2>
            <Link href={`/${locale}/store`} style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              fontSize: "14px", fontWeight: 600, color: "var(--forest)",
              borderBottom: "1.5px solid var(--forest)", paddingBottom: "2px",
            }}>
              {t("viewAll")} <ArrowRight size={14} />
            </Link>
          </div>
        </div>

        {/* HORIZONTAL SPOTLIGHT GALLERY */}
        <div 
          ref={containerRef}
          className="prod-container"
          style={{ 
            display: "flex", 
            gap: "clamp(12px, 2vw, 32px)",
            width: "max-content", // Forced inline so layout engines don't constrain it
            flex: "1 1 auto",
          }}
        >
          {products.map((product, i) => (
            <div 
              key={product.id}
              className="prod-card"
              style={{ 
                flexShrink: 0,
                display: "flex",
                flexDirection: "column",
                background: "var(--white)",
                borderRadius: "16px",
                border: "1px solid var(--line)",
                overflow: "hidden",
                boxShadow: "0 12px 24px -12px rgba(18,40,31,0.08)",
              }}
            >
              {/* Product Image */}
              {product.image && (
                <div style={{ position: "relative", width: "100%", flex: "0 1 240px", minHeight: "80px", background: "var(--ivory)" }}>
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    priority
                    sizes="(max-width: 900px) 100vw, 33vw"
                    style={{ objectFit: "cover" }}
                  />
                  {/* Export badge overlapping image */}
                  {product.exportReady && (
                    <div style={{
                      position: "absolute", top: "12px", right: "12px",
                      background: "var(--forest)", color: "var(--ivory)",
                      padding: "4px 10px", borderRadius: "100px",
                      fontFamily: "var(--font-mono)", fontSize: "9px",
                      fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
                    }}>
                      {t("exportReady")}
                    </div>
                  )}
                </div>
              )}
              
              {/* Body */}
              <div style={{ padding: "clamp(12px, 2vh, 24px)", flex: "1 1 auto", display: "flex", flexDirection: "column", overflow: "hidden" }}>
                <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", marginBottom: "8px" }}>
                  {product.applications.map((app) => (
                    <span key={app} style={{
                      fontFamily: "var(--font-mono)", fontSize: "9px",
                      color: "var(--charcoal-soft)", background: "var(--ivory-dim)",
                      padding: "3px 8px", borderRadius: "100px",
                    }}>{app}</span>
                  ))}
                </div>
                <h3 style={{ fontFamily: "var(--font-fraunces)", fontSize: "clamp(18px, 2.5vh, 24px)", marginBottom: "4px", color: "var(--forest-dark)", flexShrink: 0 }}>
                  {locale === "id" ? product.nameId : product.name}
                </h3>
                <p style={{ color: "var(--charcoal-soft)", fontSize: "clamp(12px, 1.6vh, 14px)", lineHeight: "1.5", marginBottom: "clamp(12px, 2vh, 24px)", flex: "0 1 auto", display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                  {locale === "id" ? product.shortDescriptionId : product.shortDescription}
                </p>
                <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginTop: "auto", flexShrink: 0 }}>
                  <Link href={`/${locale}/store/${product.slug}`} className="btn btn-primary" style={{ flex: 1, justifyContent: "center", fontSize: "12px", padding: "8px 10px" }}>
                    {t("viewDetails")}
                  </Link>
                  <button className="btn btn-secondary" style={{ flex: 1, justifyContent: "center", fontSize: "12px", padding: "8px 10px", display: "flex", alignItems: "center", gap: "6px" }}>
                    <Plus size={14} /> {t("addRfq")}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .prod-container {
          width: max-content !important;
        }
        @media (min-width: 901px) {
          .prod-section {
            /* Force exact viewport height so GSAP pin never bleeds off screen */
            height: calc(100vh - 73px) !important;
            min-height: 400px;
          }
          .prod-container {
            align-items: stretch;
            padding: 0;
          }
          .prod-card {
            width: min(420px, 40vw) !important;
          }
        }
        @media (max-width: 900px) {
          .prod-section {
            /* Standard pin height for mobile */
            height: calc(100vh - 73px) !important;
            min-height: 400px;
          }
          .prod-container {
            align-items: stretch;
          }
          .prod-card {
            width: min(85vw, 350px) !important;
          }
        }
      `}</style>
    </section>
  );
}
