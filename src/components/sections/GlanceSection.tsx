"use client";

import { useTranslations } from "next-intl";
import { useEffect, useRef } from "react";
import { metrics } from "@/data/homepage";

function AnimatedCounter({ target, duration = 1800 }: { target: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const observed = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const numericMatch = target.match(/^([\d.]+)(.*)$/);
    if (!numericMatch) {
      el.textContent = target;
      return;
    }

    const finalNum = parseFloat(numericMatch[1]);
    const suffix = numericMatch[2];

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || observed.current) return;
        observed.current = true;
        const start = performance.now();
        const animate = (now: number) => {
          const elapsed = now - start;
          const progress = Math.min(elapsed / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          const current = eased * finalNum;
          el.textContent = (Number.isInteger(finalNum) ? Math.floor(current) : current.toFixed(1)) + suffix;
          if (progress < 1) requestAnimationFrame(animate);
        };
        requestAnimationFrame(animate);
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration]);

  return <span ref={ref}>{target}</span>;
}

export default function GlanceSection() {
  const t = useTranslations("glance");

  return (
    <section className="section" style={{ background: "var(--white)", borderTop: "1px solid var(--line)" }}>
      <div className="wrap">
        {/* Section header */}
        <div style={{ marginBottom: "56px", maxWidth: "560px" }}>
          <span className="eyebrow">{t("eyebrow")}</span>
          <h2 style={{ fontFamily: "var(--font-fraunces)", fontSize: "clamp(2rem, 3.2vw, 2.8rem)", marginBottom: "16px" }}>
            {t("headline")}
          </h2>
          <p style={{ color: "var(--charcoal-soft)", fontSize: "16px", lineHeight: "1.65" }}>
            {t("description")}
          </p>
        </div>

        {/* BENTO GRID — no boring 3-card row */}
        <div className="glance-bento" style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gridTemplateRows: "auto auto",
          gap: "18px",
        }}>
          {/* Big tile — Founded (spans 2 cols × 2 rows) — Forest bg */}
          <div style={{
            gridColumn: "span 2", gridRow: "span 2",
            background: "var(--forest)",
            borderRadius: "20px", padding: "36px",
            display: "flex", flexDirection: "column", justifyContent: "space-between",
            minHeight: "280px",
          }}>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "11px", letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(232,223,200,0.7)" }}>
              {t("metrics.since")}
            </span>
            <div>
              <div style={{ fontFamily: "var(--font-fraunces)", fontSize: "clamp(4rem, 6vw, 5.5rem)", fontWeight: 600, color: "var(--ivory)", lineHeight: "1", marginBottom: "12px" }}>
                <AnimatedCounter target="2020" />
              </div>
              <p style={{ fontFamily: "var(--font-mono)", fontSize: "13px", color: "rgba(232,223,200,0.65)", letterSpacing: "0.05em", textTransform: "uppercase" }}>
                {t("metrics.founded")}
              </p>
            </div>
          </div>

          {/* Products tile */}
          <div style={{
            background: "var(--ivory-dim)", border: "1px solid var(--line)",
            borderRadius: "20px", padding: "28px",
            display: "flex", flexDirection: "column", justifyContent: "space-between",
            minHeight: "130px",
          }}>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "11px", letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--charcoal-soft)" }}>{t("metrics.coreProducts")}</span>
            <div style={{ fontFamily: "var(--font-fraunces)", fontSize: "3rem", fontWeight: 600, color: "var(--charcoal)", lineHeight: "1" }}>
              <AnimatedCounter target="4+" />
            </div>
          </div>

          {/* Markets tile */}
          <div style={{
            background: "var(--sand)", border: "1px solid transparent",
            borderRadius: "20px", padding: "28px",
            display: "flex", flexDirection: "column", justifyContent: "space-between",
            minHeight: "130px",
          }}>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "11px", letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--brown)" }}>{t("metrics.exportMarkets")}</span>
            <div style={{ fontFamily: "var(--font-fraunces)", fontSize: "3rem", fontWeight: 600, color: "var(--charcoal)", lineHeight: "1" }}>
              <AnimatedCounter target="15+" />
            </div>
          </div>

          {/* Capacity tile — wide */}
          <div style={{
            background: "var(--charcoal)", color: "var(--ivory)",
            borderRadius: "20px", padding: "28px",
            display: "flex", flexDirection: "column", justifyContent: "space-between",
            minHeight: "130px",
          }}>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "11px", letterSpacing: "0.08em", textTransform: "uppercase", color: "rgba(232,223,200,0.6)" }}>{t("metrics.monthlyCapacity")}</span>
            <div>
              <div style={{ fontFamily: "var(--font-fraunces)", fontSize: "2.4rem", fontWeight: 600, lineHeight: "1", color: "var(--ivory)" }}>
                500T
              </div>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "rgba(232,223,200,0.5)", marginTop: "4px" }}>{t("metrics.metricTons")}</div>
            </div>
          </div>

          {/* Partners tile */}
          <div style={{
            background: "var(--white)", border: "1px solid var(--line)",
            borderRadius: "20px", padding: "28px",
            display: "flex", flexDirection: "column", justifyContent: "space-between",
            minHeight: "130px",
          }}>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "11px", letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--charcoal-soft)" }}>{t("metrics.b2bPartners")}</span>
            <div style={{ fontFamily: "var(--font-fraunces)", fontSize: "3rem", fontWeight: 600, color: "var(--charcoal)", lineHeight: "1" }}>
              <AnimatedCounter target="30+" />
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .glance-bento { grid-template-columns: repeat(2, 1fr) !important; }
          .glance-bento > *:first-child { grid-column: span 2 !important; }
        }
      `}</style>
    </section>
  );
}
