"use client";

import { useTranslations, useLocale } from "next-intl";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { FileText, ArrowRight, CheckCircle2, Anchor } from "lucide-react";

export default function ShippingClient() {
  const t = useTranslations("shippingPage");
  const locale = useLocale();

  const steps = t.raw("process.steps") as { num: string; title: string; desc: string }[];
  const ports = t.raw("ports.items") as { port: string; code: string; routes: string }[];
  const containers = t.raw("ports.containers") as { type: string; capacity: string; note: string }[];
  const incoterms = t.raw("incoterms.items") as { term: string; full: string; desc: string }[];
  const docs = t.raw("documents.items") as { name: string; desc: string }[];
  const markets = t.raw("markets.list") as string[];
  const returnSteps = t.raw("return.steps") as { step: string; title: string; desc: string }[];

  const stepImages = [
    "/assets/images/exporting-1.webp",
    "/assets/images/export-document.webp",
    "/assets/images/pexels-nati-87264186-26699770.webp",
    "/assets/images/diana-nazarchuk-oIR-PrUuFas-unsplash.webp",
    "/assets/images/pexels-priyanka-paroyds-83085051-8914931.webp",
    "/assets/images/pre-shipment.webp",
    "/assets/images/exporting-2.webp",
    "/assets/images/exporting3.webp",
  ];

  return (
    <div style={{ background: "var(--ivory)", color: "var(--charcoal)", overflowX: "hidden" }}>

      {/* 1. HERO — Full bleed container port */}
      <section style={{ position: "relative", height: "80vh", minHeight: "600px", display: "flex", alignItems: "flex-end", overflow: "hidden" }}>
        <Image src="/assets/images/rusty-watson-W8P1WeOU1XI-unsplash.webp" alt="Export Shipping" fill priority sizes="100vw" style={{ objectFit: "cover", zIndex: 0 }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(15,26,21,0.98) 0%, rgba(15,26,21,0.5) 50%, rgba(15,26,21,0.2) 100%)", zIndex: 1 }} />

        {/* Animated scroll indicator */}
        <div style={{ position: "absolute", right: "48px", top: "50%", transform: "translateY(-50%)", zIndex: 2, display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2 }}
            style={{ width: "2px", height: "48px", background: "linear-gradient(to bottom, var(--sand), transparent)" }} />
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "10px", letterSpacing: "0.15em", color: "var(--sand)", textTransform: "uppercase", writingMode: "vertical-rl" }}>SCROLL</span>
        </div>

        <div className="wrap" style={{ position: "relative", zIndex: 2, paddingBottom: "80px" }}>
          <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "11px", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--sand)", display: "block", marginBottom: "20px" }}>{t("hero.eyebrow")}</span>
            <h1 style={{ fontFamily: "var(--font-fraunces)", fontSize: "clamp(3rem, 6vw, 6rem)", lineHeight: 1.0, color: "var(--ivory)", marginBottom: "24px", maxWidth: "700px" }}>
              {t("hero.headline")}
            </h1>
            <p style={{ fontSize: "18px", color: "rgba(251,250,246,0.72)", lineHeight: 1.65, maxWidth: "560px" }}>
              {t("hero.copy")}
            </p>
          </motion.div>
        </div>
      </section>

      {/* 2. EXPORT PROCESS — Alternating left/right with image */}
      <section style={{ padding: "120px 0", background: "var(--ivory)" }}>
        <div className="wrap">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "48px", alignItems: "end", paddingBottom: "72px" }}>
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "11px", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--forest)", display: "block", marginBottom: "16px" }}>EXPORT PROCESS</span>
              <h2 style={{ fontFamily: "var(--font-fraunces)", fontSize: "clamp(2.5rem, 4vw, 3.8rem)", color: "var(--forest-dark)", lineHeight: 1.1 }}>
                {t("process.headline")}
              </h2>
            </motion.div>
            <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
              style={{ fontSize: "17px", color: "var(--charcoal-soft)", lineHeight: 1.7 }}>
              {t("process.copy")}
            </motion.p>
          </div>

          {/* Steps: alternating image + content */}
          <div>
            {steps.map((step, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="shipping-timeline-grid"
                style={{
                  display: "grid",
                  gridTemplateColumns: i % 2 === 0 ? "1fr 1.4fr" : "1.4fr 1fr",
                  gap: "48px",
                  alignItems: "center",
                  paddingBottom: "64px",
                  marginBottom: "64px",
                  borderBottom: i < steps.length - 1 ? "1px solid var(--line)" : "none"
                }}>

                {/* Image side */}
                {i % 2 === 0 && (
                  <div style={{ position: "relative", height: "260px", borderRadius: "20px", overflow: "hidden" }}>
                    <Image src={stepImages[i]} alt={step.title} fill sizes="40vw" style={{ objectFit: "cover" }} />
                    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(15,26,21,0.6) 0%, transparent 60%)" }} />
                    <div style={{ position: "absolute", top: "20px", left: "20px", fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--sand)", letterSpacing: "0.1em" }}>STEP {step.num}</div>
                  </div>
                )}

                {/* Content side */}
                <div style={{ order: i % 2 === 0 ? 1 : 0 }}>
                  <div style={{ fontFamily: "var(--font-fraunces)", fontSize: "clamp(4rem, 6vw, 7rem)", color: "var(--forest)", opacity: 0.07, fontWeight: 700, lineHeight: 1, marginBottom: "-24px", userSelect: "none" }}>
                    {step.num}
                  </div>
                  <h3 style={{ fontFamily: "var(--font-fraunces)", fontSize: "clamp(1.5rem, 2.5vw, 2.2rem)", color: "var(--forest-dark)", lineHeight: 1.15, marginBottom: "16px" }}>{step.title}</h3>
                  <p style={{ fontSize: "16px", color: "var(--charcoal-soft)", lineHeight: 1.75 }}>{step.desc}</p>
                </div>

                {/* Image side (odd) */}
                {i % 2 !== 0 && (
                  <div style={{ position: "relative", height: "260px", borderRadius: "20px", overflow: "hidden" }}>
                    <Image src={stepImages[i]} alt={step.title} fill sizes="40vw" style={{ objectFit: "cover" }} />
                    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(15,26,21,0.6) 0%, transparent 60%)" }} />
                    <div style={{ position: "absolute", top: "20px", right: "20px", fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--sand)", letterSpacing: "0.1em" }}>STEP {step.num}</div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. INCOTERMS — Editorial dark cards with ghost acronym */}
      <section style={{ padding: "120px 0", background: "var(--forest-dark)", color: "var(--ivory)", overflow: "hidden" }}>
        <div className="wrap">
          <div style={{ textAlign: "center", marginBottom: "64px" }}>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "11px", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--sand)", display: "block", marginBottom: "16px" }}>TRADE TERMS</span>
            <h2 style={{ fontFamily: "var(--font-fraunces)", fontSize: "clamp(2.5rem, 4vw, 3.8rem)", color: "var(--ivory)", lineHeight: 1.1 }}>{t("incoterms.headline")}</h2>
          </div>
          <div className="shipping-inco-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "2px" }}>
            {incoterms.map((inc, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                style={{
                  position: "relative",
                  padding: "60px 48px",
                  background: i === 0 ? "rgba(255,255,255,0.04)" : i === 1 ? "rgba(255,255,255,0.07)" : "rgba(255,255,255,0.04)",
                  overflow: "hidden",
                  borderRadius: i === 0 ? "20px 0 0 20px" : i === 2 ? "0 20px 20px 0" : "0"
                }}>
                {/* Ghost acronym */}
                <div style={{ position: "absolute", top: "20px", right: "20px", fontFamily: "var(--font-fraunces)", fontSize: "120px", color: "rgba(255,255,255,0.04)", fontWeight: 700, userSelect: "none", lineHeight: "1" }}>
                  {inc.term}
                </div>
                <div style={{ position: "relative", zIndex: 1 }}>
                  <div style={{ fontFamily: "var(--font-fraunces)", fontSize: "48px", color: "var(--sand)", fontWeight: 700, lineHeight: 1, marginBottom: "8px" }}>{inc.term}</div>
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: "12px", color: "rgba(251,250,246,0.5)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "32px" }}>{inc.full}</div>
                  <p style={{ fontSize: "15px", color: "rgba(251,250,246,0.75)", lineHeight: 1.7 }}>{inc.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. PORT & CONTAINER CAPACITY */}
      <section style={{ padding: "120px 0", background: "var(--ivory)" }}>
        <div className="wrap">
          <div className="shipping-grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", alignItems: "start" }}>
            {/* Port image + info */}
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "11px", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--forest)", display: "block", marginBottom: "16px" }}>EXPORT PORTS</span>
              <h2 style={{ fontFamily: "var(--font-fraunces)", fontSize: "clamp(2rem, 3.5vw, 3rem)", color: "var(--forest-dark)", lineHeight: 1.1, marginBottom: "32px" }}>
                {t("ports.headline")}
              </h2>
              <div style={{ position: "relative", height: "280px", borderRadius: "20px", overflow: "hidden", marginBottom: "28px" }}>
                <Image src="/assets/images/teodor-kuduschiev-wWjlfmxXPoE-unsplash.webp" alt="Export Ports" fill sizes="45vw" style={{ objectFit: "cover" }} />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(15,26,21,0.75) 0%, transparent 50%)" }} />
                <div style={{ position: "absolute", bottom: "20px", left: "20px" }}>
                  <Anchor size={20} style={{ color: "var(--sand)" }} />
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {ports.map((port, i) => (
                  <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 20px", background: "rgba(18,40,31,0.04)", borderRadius: "12px", border: "1px solid var(--line)" }}>
                    <div>
                      <p style={{ fontSize: "16px", fontWeight: 600, color: "var(--forest-dark)", marginBottom: "4px" }}>{port.port}</p>
                      <p style={{ fontSize: "13px", color: "var(--charcoal-soft)", fontFamily: "var(--font-mono)" }}>{port.routes}</p>
                    </div>
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: "13px", color: "var(--forest)", fontWeight: 600, background: "rgba(18,40,31,0.08)", padding: "6px 12px", borderRadius: "6px" }}>{port.code}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Container specs */}
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.15 }}>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "11px", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--forest)", display: "block", marginBottom: "16px" }}>CONTAINER OPTIONS</span>
              <h3 style={{ fontFamily: "var(--font-fraunces)", fontSize: "clamp(1.5rem, 2.5vw, 2.2rem)", color: "var(--forest-dark)", lineHeight: 1.15, marginBottom: "32px" }}>
                {t("ports.copy")}
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                {containers.map((c, i) => (
                  <motion.div key={i}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 + i * 0.1 }}
                    style={{ display: "grid", gridTemplateColumns: "auto 1fr auto", alignItems: "center", gap: "20px", padding: "28px 32px", background: "var(--forest-dark)", borderRadius: "16px" }}>
                    <div style={{ fontFamily: "var(--font-fraunces)", fontSize: "clamp(2rem, 3vw, 2.8rem)", color: "var(--sand)", opacity: 0.6, fontWeight: 700, lineHeight: 1 }}>
                      {["20", "40", "40"][i]}
                    </div>
                    <div>
                      <p style={{ fontSize: "16px", fontWeight: 600, color: "var(--ivory)", marginBottom: "4px" }}>{c.type}</p>
                      <p style={{ fontSize: "13px", color: "rgba(251,250,246,0.5)" }}>{c.note}</p>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <p style={{ fontFamily: "var(--font-mono)", fontSize: "14px", color: "var(--sand)", fontWeight: 600, whiteSpace: "nowrap" }}>{c.capacity}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 5. SHIPPING DOCUMENTS — Accordion rows */}
      <section style={{ padding: "120px 0", background: "var(--ivory-dim)", borderTop: "1px solid var(--line)" }}>
        <div className="wrap">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", alignItems: "end", marginBottom: "56px" }}>
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "11px", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--forest)", display: "block", marginBottom: "16px" }}>DOCUMENTATION</span>
              <h2 style={{ fontFamily: "var(--font-fraunces)", fontSize: "clamp(2.2rem, 4vw, 3.5rem)", color: "var(--forest-dark)", lineHeight: 1.1 }}>{t("documents.headline")}</h2>
            </motion.div>
          </div>
          <div style={{ borderTop: "1px solid var(--line)" }}>
            {docs.map((doc, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="shipping-doc-grid"
                style={{ display: "grid", gridTemplateColumns: "56px 1fr 1fr", alignItems: "center", gap: "32px", padding: "24px 0", borderBottom: "1px solid var(--line)" }}>
                <div style={{ width: "40px", height: "40px", borderRadius: "10px", background: "var(--forest-dark)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <FileText size={18} style={{ color: "var(--sand)" }} />
                </div>
                <h4 style={{ fontFamily: "var(--font-fraunces)", fontSize: "18px", color: "var(--forest-dark)", fontWeight: 600 }}>{doc.name}</h4>
                <p style={{ fontSize: "14px", color: "var(--charcoal-soft)", lineHeight: 1.5 }}>{doc.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. GLOBAL MARKETS — Marquee */}
      <section style={{ background: "var(--forest)", overflow: "hidden" }}>
        <div style={{ padding: "16px 0", borderBottom: "1px solid rgba(251,250,246,0.1)", textAlign: "center" }}>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "11px", letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(251,250,246,0.5)" }}>{t("markets.headline")}</span>
        </div>
        <div style={{ overflow: "hidden", padding: "28px 0" }}>
          <motion.div animate={{ x: ["0%", "-50%"] }} transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
            style={{ display: "flex", width: "max-content" }}>
            {[...markets, ...markets].map((m, i) => (
              <span key={i} style={{ display: "inline-flex", alignItems: "center", gap: "20px", padding: "0 36px", fontFamily: "var(--font-fraunces)", fontSize: "clamp(1rem, 1.8vw, 1.3rem)", color: "var(--ivory)", whiteSpace: "nowrap" }}>
                {m} <span style={{ color: "var(--sand)" }}>✦</span>
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 7. RETURN & CLAIM — 3-step visual */}
      <section style={{ padding: "120px 0", background: "var(--ivory)" }}>
        <div className="wrap" style={{ maxWidth: "900px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "64px" }}>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "11px", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--forest)", display: "block", marginBottom: "16px" }}>RETURN POLICY</span>
            <h2 style={{ fontFamily: "var(--font-fraunces)", fontSize: "clamp(2.2rem, 4vw, 3.5rem)", color: "var(--forest-dark)", lineHeight: 1.1, marginBottom: "20px" }}>{t("return.headline")}</h2>
            <p style={{ fontSize: "17px", color: "var(--charcoal-soft)", lineHeight: 1.7, maxWidth: "600px", margin: "0 auto" }}>{t("return.copy")}</p>
          </div>
          {/* 3-step with connecting line */}
          <div className="shipping-grid-3" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "0", position: "relative" }}>
            <div className="shipping-connecting-line" style={{ position: "absolute", top: "32px", left: "16.67%", right: "16.67%", height: "2px", background: "var(--line)", zIndex: 0 }} />
            {returnSteps.map((rs, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                style={{ textAlign: "center", padding: "0 24px", position: "relative", zIndex: 1 }}>
                <div style={{ width: "64px", height: "64px", borderRadius: "50%", background: "var(--forest-dark)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px", position: "relative", zIndex: 1 }}>
                  <CheckCircle2 size={28} style={{ color: "var(--sand)" }} />
                </div>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "11px", letterSpacing: "0.1em", color: "var(--forest)", display: "block", marginBottom: "12px" }}>STEP {rs.step}</span>
                <h4 style={{ fontFamily: "var(--font-fraunces)", fontSize: "1.4rem", color: "var(--forest-dark)", marginBottom: "12px" }}>{rs.title}</h4>
                <p style={{ fontSize: "14px", color: "var(--charcoal-soft)", lineHeight: 1.65 }}>{rs.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. FINAL CTA */}
      <section style={{ padding: "120px 0", background: "var(--forest-dark)", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <Image src="/assets/images/exporting-1.webp" alt="" fill sizes="100vw" style={{ objectFit: "cover", opacity: 0.1, zIndex: 0 }} />
        <div className="wrap" style={{ position: "relative", zIndex: 1, maxWidth: "700px", margin: "0 auto" }}>
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 style={{ fontFamily: "var(--font-fraunces)", fontSize: "clamp(2.5rem, 5vw, 4rem)", color: "var(--ivory)", marginBottom: "24px", lineHeight: 1.1 }}>{t("final.headline")}</h2>
            <p style={{ fontSize: "18px", color: "rgba(251,250,246,0.7)", marginBottom: "40px", lineHeight: 1.6 }}>{t("final.copy")}</p>
            <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
              <Link href={`/${locale}/store`} style={{ display: "inline-flex", alignItems: "center", gap: "10px", padding: "16px 28px", borderRadius: "100px", background: "var(--sand)", color: "var(--forest-dark)", fontSize: "15px", fontWeight: 700, textDecoration: "none" }}>
                {t("final.cta1")} <ArrowRight size={16} />
              </Link>
              <Link href={`/${locale}/support/contact`} style={{ display: "inline-flex", alignItems: "center", gap: "10px", padding: "16px 28px", borderRadius: "100px", border: "1px solid rgba(251,250,246,0.25)", color: "var(--ivory)", fontSize: "15px", fontWeight: 600, textDecoration: "none" }}>
                {t("final.cta2")}
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <style dangerouslySetInnerHTML={{ __html: `
        @media (max-width: 900px) {
          .shipping-timeline-grid {
            grid-template-columns: 1fr !important;
            gap: 24px !important;
            padding-bottom: 40px !important;
            margin-bottom: 40px !important;
          }
          .shipping-timeline-grid > div {
            order: 0 !important;
          }
          .shipping-inco-grid {
            grid-template-columns: 1fr !important;
            gap: 16px !important;
          }
          .shipping-doc-grid {
            grid-template-columns: 56px 1fr !important;
            align-items: start !important;
          }
          .shipping-doc-grid > p {
            grid-column: 1 / -1;
            margin-top: -16px;
          }
          .shipping-grid-2 {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
          .shipping-grid-3 {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
          .shipping-connecting-line {
            display: none !important;
          }
        }
      `}} />
    </div>
  );
}
