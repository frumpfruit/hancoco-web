"use client";

import { useTranslations, useLocale } from "next-intl";
import { useRef } from "react";
import { qaSteps } from "@/data/homepage";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ShieldCheck } from "lucide-react";
import Image from "next/image";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export default function QASection() {
  const t = useTranslations("qa");
  const locale = useLocale();
  const sectionRef = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const numRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

  const imagesRef = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(() => {
    if (!sectionRef.current || !listRef.current) return;

    const steps = gsap.utils.toArray<HTMLElement>(listRef.current.children);
    
    // Set initial state
    gsap.set(steps, { opacity: 0.3 });
    if (numRef.current && titleRef.current) {
      numRef.current.innerText = qaSteps[0].num;
      titleRef.current.innerText = locale === "id" ? qaSteps[0].titleId : qaSteps[0].title;
    }
    gsap.set(steps[0], { opacity: 1 });
    gsap.set(imagesRef.current[0], { opacity: 1 });
    gsap.set(imagesRef.current.slice(1), { opacity: 0 });

    steps.forEach((step, i) => {
      ScrollTrigger.create({
        trigger: step,
        start: "top 60%", // Triggers when the step reaches 60% of viewport height
        end: "bottom 60%",
        onToggle: (self) => {
          if (self.isActive) {
            // Highlight active step
            gsap.to(step, { opacity: 1, duration: 0.4, ease: "power2.out", overwrite: true });
            
            // Fade in the corresponding image, fade out others
            imagesRef.current.forEach((img, idx) => {
              if (!img) return;
              if (idx === i) {
                gsap.to(img, { opacity: 1, duration: 0.6, ease: "power2.inOut", overwrite: true });
              } else {
                gsap.to(img, { opacity: 0, duration: 0.6, ease: "power2.inOut", overwrite: true });
              }
            });
            
            // Update left sticky content
            if (numRef.current && titleRef.current) {
              numRef.current.innerText = qaSteps[i].num;
              titleRef.current.innerText = locale === "id" ? qaSteps[i].titleId : qaSteps[i].title;
              gsap.fromTo([numRef.current, titleRef.current], 
                { y: 20, opacity: 0 }, 
                { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: "power2.out", overwrite: true }
              );
            }
          } else {
            // Fade out inactive step
            gsap.to(step, { opacity: 0.3, duration: 0.4, overwrite: true });
          }
        }
      });
    });
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="section" style={{ background: "var(--ivory)", borderTop: "1px solid var(--line)", padding: "120px 0" }}>
      <div className="wrap">
        <div style={{ textAlign: "center", maxWidth: "600px", margin: "0 auto 80px" }}>
          <span className="eyebrow">{t("eyebrow")}</span>
          <h2 style={{ fontFamily: "var(--font-fraunces)", fontSize: "clamp(2.2rem, 3.5vw, 3.2rem)", marginBottom: "18px" }}>
            {t("headline")}
          </h2>
          <p style={{ color: "var(--charcoal-soft)", fontSize: "16px", lineHeight: "1.65" }}>
            {t("description")}
          </p>
        </div>

        {/* PINNED SCROLL LAYOUT */}
        <div className="qa-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "64px", alignItems: "start" }}>
          
          {/* LEFT: STICKY VISUAL */}
          <div style={{
            position: "sticky",
            top: "120px",
            height: "calc(100vh - 160px)",
            minHeight: "400px",
            maxHeight: "600px",
            background: "var(--forest-dark)",
            borderRadius: "24px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "40px",
            color: "var(--ivory)",
            overflow: "hidden",
            boxShadow: "0 20px 40px -15px rgba(18,40,31,0.3)"
          }}>
            <div style={{ position: "absolute", inset: 0, zIndex: 0, background: "var(--forest-dark)" }}>
              {qaSteps.map((step, idx) => (
                <div 
                  key={step.num} 
                  ref={el => { imagesRef.current[idx] = el; }} 
                  style={{ position: "absolute", inset: 0, opacity: 0, pointerEvents: "none" }}
                >
                  <Image
                    src={step.image || "/assets/images/pexels-quang-nguyen-vinh-222549-8280856.webp"}
                    alt={locale === "id" ? step.titleId : step.title}
                    fill
                    sizes="(max-width: 900px) 100vw, 50vw"
                    style={{ objectFit: "cover" }}
                  />
                </div>
              ))}
              <div style={{ position: "absolute", inset: 0, background: "rgba(18,40,31,0.7)", zIndex: 1 }} />
            </div>
            
            <div style={{ position: "absolute", top: "-20%", right: "-20%", width: "70%", aspectRatio: "1", borderRadius: "50%", border: "2px dashed rgba(251,250,246,0.15)", zIndex: 0 }} />
            
            <ShieldCheck size={32} style={{ color: "var(--sand)", marginBottom: "32px", position: "relative", zIndex: 1 }} />
            
            <div style={{ textAlign: "center", position: "relative", zIndex: 1 }}>
              <div ref={numRef} style={{
                fontFamily: "var(--font-fraunces)", 
                fontSize: "140px", 
                lineHeight: "1", 
                fontWeight: 600,
                letterSpacing: "-0.04em",
                color: "var(--ivory)",
                marginBottom: "16px"
              }}>
                01
              </div>
              <div ref={titleRef} style={{
                fontFamily: "var(--font-mono)",
                fontSize: "14px",
                fontWeight: 600,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "var(--sand)",
                maxWidth: "280px",
                margin: "0 auto"
              }}>
                Loading...
              </div>
            </div>
          </div>

          {/* RIGHT: SCROLLING LIST */}
          <div style={{ padding: "10vh 0 20vh" }}>
            <div ref={listRef} style={{ display: "flex", flexDirection: "column", gap: "60px" }}>
              {qaSteps.map((step) => (
                <div key={step.num} style={{ borderBottom: "1px solid var(--line)", paddingBottom: "40px" }}>
                  <div style={{ 
                    fontFamily: "var(--font-mono)", fontSize: "12px", letterSpacing: "0.1em", color: "var(--forest)", marginBottom: "12px", fontWeight: 600
                  }}>
                    STAGE {step.num}
                  </div>
                  <h4 style={{
                    fontFamily: "var(--font-fraunces)", fontSize: "clamp(1.5rem, 2.5vw, 2rem)",
                    fontWeight: 600, marginBottom: "16px", color: "var(--charcoal)",
                  }}>
                    {locale === "id" ? step.titleId : step.title}
                  </h4>
                  <p style={{ fontSize: "16px", color: "var(--charcoal-soft)", lineHeight: "1.7" }}>
                    {locale === "id" ? step.descriptionId : step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
      <style>{`
        @media (max-width: 900px) {
          .qa-grid { grid-template-columns: 1fr !important; }
          .qa-grid > div:first-child { 
            position: static !important; 
            height: 300px !important; 
            min-height: 300px !important;
          }
          .qa-grid > div:last-child { padding: 40px 0 0 !important; }
        }
      `}</style>
    </section>
  );
}
