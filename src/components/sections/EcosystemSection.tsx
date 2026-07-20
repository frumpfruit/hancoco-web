"use client";

import { useTranslations, useLocale } from "next-intl";
import { useRef } from "react";
import { ecoSteps } from "@/data/homepage";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import Image from "next/image";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
  ScrollTrigger.config({ ignoreMobileResize: true }); // Prevent address bar resize from breaking GSAP pin layout
}

export default function EcosystemSection() {
  const t = useTranslations("ecosystem");
  const locale = useLocale();
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollWrapperRef = useRef<HTMLDivElement>(null);
  const scrollContentRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!scrollWrapperRef.current || !scrollContentRef.current) return;

    const sections = gsap.utils.toArray(scrollContentRef.current!.children);
    
    // Calculate total scroll distance
    const getScrollAmount = () => {
      let wrapperWidth = scrollWrapperRef.current?.offsetWidth || 0;
      let contentWidth = scrollContentRef.current?.scrollWidth || 0;
      return -(contentWidth - wrapperWidth);
    };

    const tween = gsap.to(sections, {
      x: getScrollAmount,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        pin: true,
        scrub: 1,
        start: "top 73px", // Pin below the sticky header
        end: () => `+=${getScrollAmount() * -1}`,
        invalidateOnRefresh: true,
      }
    });

    // Animate progress bar
    gsap.to(progressRef.current, {
      scaleX: 1,
      ease: "none",
      transformOrigin: "left center",
      scrollTrigger: {
        trigger: containerRef.current,
        scrub: 1,
        start: "top 73px", // Match the pin trigger exactly!
        end: () => `+=${getScrollAmount() * -1}`,
      }
    });

    return () => {
      tween.kill();
    };
  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      className="eco-section"
      style={{ 
        background: "var(--forest-dark)", 
        color: "var(--ivory)", 
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "0",
        overflow: "hidden",
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
          src="/assets/images/towfiqu-barbhuiya-vuctv0AnlwY-unsplash.webp"
          alt="Ecosystem Background"
          fill
          sizes="100vw"
          style={{ objectFit: "cover" }}
        />
      </div>

      <div className="wrap" style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", height: "100%", justifyContent: "center", padding: "clamp(20px, 4vh, 60px) 24px", width: "100%", minWidth: 0 }}>
        {/* Header */}
        <div style={{ maxWidth: "560px", marginBottom: "clamp(24px, 5vh, 60px)", flexShrink: 0 }}>
          <span className="eyebrow on-dark">{t("eyebrow")}</span>
          <h2 style={{ fontFamily: "var(--font-fraunces)", fontSize: "clamp(1.8rem, 3vw, 2.8rem)", marginBottom: "clamp(12px, 2vh, 18px)", lineHeight: "1.1" }}>
            {t("headline")}
          </h2>
          <p style={{ color: "rgba(251,250,246,0.6)", fontSize: "clamp(14px, 2vh, 16px)", lineHeight: "1.6" }}>
            {t("description")}
          </p>
        </div>

        {/* Progress bar wrapper */}
        <div style={{ height: "2px", background: "rgba(251,250,246,0.12)", borderRadius: "2px", marginBottom: "clamp(24px, 5vh, 50px)", position: "relative", flexShrink: 0 }}>
          <div
            ref={progressRef}
            style={{
              position: "absolute", left: 0, top: 0,
              height: "100%", width: "100%",
              background: "var(--sand)", borderRadius: "2px",
              transform: "scaleX(0)",
            }}
          />
        </div>

        {/* Horizontal Scroll Window */}
        <div ref={scrollWrapperRef} className="eco-container" style={{ overflow: "hidden", flex: "1 1 auto", minHeight: 0, display: "flex", alignItems: "center" }}>
          <div 
            ref={scrollContentRef} 
            style={{
              display: "flex",
              gap: "clamp(16px, 2vw, 24px)",
              width: "max-content",
            }}
          >
            {ecoSteps.map((step) => (
              <div
                key={step.num}
                className="eco-card"
                style={{
                  width: "clamp(260px, 25vw, 300px)", // Responsive width
                  flexShrink: 0,
                  borderLeft: "1px solid rgba(251,250,246,0.1)",
                  paddingLeft: "24px"
                }}
              >
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "clamp(12px, 1.5vh, 14px)", color: "var(--sand)", marginBottom: "clamp(10px, 2vh, 16px)", display: "block", fontWeight: 600 }}>
                  {step.num}
                </span>
                <h4 style={{ fontFamily: "var(--font-fraunces)", fontSize: "clamp(20px, 2.5vh, 24px)", fontWeight: 600, marginBottom: "clamp(8px, 1.5vh, 12px)", lineHeight: "1.2" }}>
                  {locale === "id" ? step.titleId : step.title}
                </h4>
                <p style={{ fontSize: "clamp(13px, 1.8vh, 15px)", color: "rgba(251,250,246,0.7)", lineHeight: "1.6" }}>
                  {locale === "id" ? step.descriptionId : step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .eco-section {
          height: calc(100vh - 73px) !important;
        }
      `}</style>
    </section>
  );
}
