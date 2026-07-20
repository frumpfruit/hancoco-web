"use client";

import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";

function Counter({ target, label }: { target: string; label: string }) {
  const [count, setCount] = useState(0);
  const numericTarget = parseInt(target.replace(/\D/g, ""));
  const suffix = target.replace(/\d/g, "");

  useEffect(() => {
    let current = 0;
    const increment = Math.ceil(numericTarget / 50);
    const timer = setInterval(() => {
      current += increment;
      if (current >= numericTarget) {
        setCount(numericTarget);
        clearInterval(timer);
      } else {
        setCount(current);
      }
    }, 40);
    return () => clearInterval(timer);
  }, [numericTarget]);

  return (
    <div style={{ textAlign: "center" }}>
      <div style={{ fontFamily: "var(--font-fraunces)", fontSize: "3rem", color: "var(--sand)", marginBottom: "8px" }}>
        {count}{suffix}
      </div>
      <div style={{ fontSize: "16px", color: "rgba(251,250,246,0.8)", fontWeight: 500 }}>
        {label}
      </div>
    </div>
  );
}

export default function ManufacturingClient() {
  const t = useTranslations("manufacturingPage");
  const locale = useLocale();

  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  const philCards = t.raw("philosophy.cards") as { title: string; desc: string }[];
  const flowSteps = t.raw("flow.steps") as string[];
  const equipCards = t.raw("equipment.cards") as { title: string; desc: string }[];
  const qcSteps = t.raw("qc.steps") as string[];
  const safetyCards = t.raw("safety.cards") as string[];
  const futureList = t.raw("future.list") as string[];
  const stats = t.raw("stats.items") as { val: string; label: string }[];

  return (
    <div style={{ background: "var(--ivory)", color: "var(--charcoal)" }}>
      
      {/* 1. HERO SECTION */}
      <section style={{ position: "relative", height: "100vh", minHeight: "700px", display: "flex", alignItems: "center", overflow: "hidden", background: "var(--forest-dark)" }}>
        <div style={{ position: "absolute", top: 0, right: 0, bottom: 0, width: "55%" }}>
          <Image src="/assets/images/manufacturing-3.webp" alt="Manufacturing Facility" fill priority sizes="55vw" style={{ objectFit: "cover", zIndex: 0 }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, var(--forest-dark) 0%, transparent 100%)", zIndex: 1 }} />
        </div>
        
        <div className="wrap" style={{ position: "relative", zIndex: 2, paddingTop: "80px", width: "100%" }}>
          <motion.div initial="hidden" animate="visible" variants={fadeInUp} style={{ maxWidth: "600px" }}>
            <span className="eyebrow on-dark">{t("hero.eyebrow")}</span>
            <h1 style={{ fontFamily: "var(--font-fraunces)", fontSize: "clamp(3rem, 5vw, 4.5rem)", color: "var(--ivory)", lineHeight: 1.1, marginBottom: "24px" }}>
              {t("hero.headline")}
            </h1>
            <p style={{ color: "rgba(251,250,246,0.8)", fontSize: "18px", lineHeight: 1.6, marginBottom: "40px" }}>
              {t("hero.copy")}
            </p>
            <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
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

      {/* 2. PHILOSOPHY — Editorial Split: Large Text Left + Mosaic Right + Principle Rows Below */}
      <section style={{ padding: "120px 0", background: "var(--ivory)", overflow: "hidden" }}>
        {/* Top: Split headline + image mosaic */}
        <div className="wrap">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "64px", alignItems: "center", paddingBottom: "80px" }}>
            <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "11px", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--forest)", display: "block", marginBottom: "20px" }}>MANUFACTURING PHILOSOPHY</span>
              <h2 style={{ fontFamily: "var(--font-fraunces)", fontSize: "clamp(2.5rem, 4vw, 3.8rem)", lineHeight: 1.1, color: "var(--forest-dark)", marginBottom: "28px" }}>
                {t("philosophy.headline")}
              </h2>
              <p style={{ fontSize: "18px", color: "var(--charcoal-soft)", lineHeight: 1.7, whiteSpace: "pre-line" }}>
                {t("philosophy.copy")}
              </p>
            </motion.div>

            {/* Asymmetric 2×2 mosaic with one tall cell */}
            <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.15 }}
              style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gridTemplateRows: "240px 200px", gap: "12px" }}>
              <div style={{ gridRow: "1 / 3", position: "relative", borderRadius: "20px", overflow: "hidden" }}>
                <Image src="/assets/images/pexels-cottonbro-5608055.webp" alt="Responsible Sourcing" fill sizes="25vw" style={{ objectFit: "cover" }} />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(15,26,21,0.6) 0%, transparent 60%)" }} />
                <div style={{ position: "absolute", bottom: "20px", left: "20px" }}>
                  <p style={{ fontFamily: "var(--font-fraunces)", fontSize: "16px", color: "var(--ivory)", fontWeight: 500 }}>{philCards[0]?.title}</p>
                </div>
              </div>
              <div style={{ position: "relative", borderRadius: "20px", overflow: "hidden" }}>
                <Image src="/assets/images/kateryna-ivanova-KQSedNnCFvk-unsplash.webp" alt="Precision Processing" fill sizes="15vw" style={{ objectFit: "cover" }} />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(15,26,21,0.6) 0%, transparent 60%)" }} />
              </div>
              <div style={{ position: "relative", borderRadius: "20px", overflow: "hidden" }}>
                <Image src="/assets/images/pre-shipment.webp" alt="Export Readiness" fill sizes="15vw" style={{ objectFit: "cover" }} />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(15,26,21,0.5) 0%, transparent 60%)" }} />
              </div>
            </motion.div>
          </div>

          {/* Bottom: Principle accordion rows */}
          <div style={{ borderTop: "1px solid var(--line)" }}>
            {philCards.map((card, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                style={{
                  display: "grid",
                  gridTemplateColumns: "56px 1fr 1fr",
                  alignItems: "center",
                  gap: "32px",
                  padding: "28px 0",
                  borderBottom: "1px solid var(--line)"
                }}
              >
                <span style={{ fontFamily: "var(--font-fraunces)", fontSize: "clamp(1.8rem, 2.5vw, 2.4rem)", color: "var(--forest)", opacity: 0.15, fontWeight: 700, lineHeight: 1 }}>
                  0{i + 1}
                </span>
                <h4 style={{ fontFamily: "var(--font-fraunces)", fontSize: "clamp(1.1rem, 2vw, 1.5rem)", color: "var(--forest-dark)", fontWeight: 500, lineHeight: 1.2 }}>
                  {card.title}
                </h4>
                <p style={{ fontSize: "15px", color: "var(--charcoal-soft)", lineHeight: 1.6 }}>
                  {card.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. PRODUCTION FLOW — Asymmetric Bento + Big Step Numbers */}
      <section style={{ padding: "120px 0", background: "var(--forest-dark)", color: "var(--ivory)" }}>
        <div className="wrap">
          <div style={{ paddingBottom: "80px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "48px", alignItems: "end" }}>
              <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <h2 style={{ fontFamily: "var(--font-fraunces)", fontSize: "clamp(2.5rem, 4vw, 4rem)", lineHeight: 1.1 }}>
                  {t("flow.headline")}
                </h2>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.15 }}>
                <p style={{ fontSize: "18px", color: "rgba(251,250,246,0.6)", lineHeight: 1.7 }}>{t("flow.copy")}</p>
              </motion.div>
            </div>
          </div>

          {/* Signature Move: staggered-size bento */}
          {(() => {
            const flowImages = [
              "/assets/images/nisha-ramesh-IiiTDxnHDzg-unsplash.webp",
              "/assets/images/pexels-cottonbro-5608056.webp",
              "/assets/images/sri-lanka-0nH_OVirQSg-unsplash.webp",
              "/assets/images/manufacturing-4.webp",
              "/assets/images/pexels-bogdankrupin-3986706.webp",
              "/assets/images/exporting-1.webp",
              "/assets/images/pexels-cottonbro-5608057.webp",
              "/assets/images/towfiqu-barbhuiya-o3Dunr7Vl-o-unsplash.webp"
            ];
            return (
              <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gridTemplateRows: "400px 280px", gap: "12px" }}>
                {/* Step 01 — dominant */}
                <motion.div initial={{ opacity: 0, scale: 0.96 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
                  style={{ gridRow: "1 / 3", position: "relative", borderRadius: "20px", overflow: "hidden" }}>
                  <Image src={flowImages[0]} alt={flowSteps[0]} fill sizes="40vw" style={{ objectFit: "cover" }} />
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(15,26,21,0.95) 0%, rgba(15,26,21,0.1) 50%, transparent 100%)" }} />
                  <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "40px" }}>
                    <div style={{ fontSize: "120px", fontFamily: "var(--font-fraunces)", color: "var(--sand)", opacity: 0.12, lineHeight: 1, marginBottom: "-40px" }}>01</div>
                    <h3 style={{ fontFamily: "var(--font-fraunces)", fontSize: "clamp(1.8rem, 3vw, 2.5rem)", color: "var(--ivory)", lineHeight: 1.1 }}>{flowSteps[0]}</h3>
                  </div>
                </motion.div>

                {/* Steps 02–05 in 2-column right side */}
                {[1, 2, 3, 4].map((idx) => (
                  <motion.div key={idx} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }}
                    style={{ position: "relative", borderRadius: "20px", overflow: "hidden", gridColumn: idx <= 2 ? "auto" : "auto" }}>
                    {flowImages[idx] && (
                      <Image src={flowImages[idx]} alt={flowSteps[idx] || ""} fill sizes="20vw" style={{ objectFit: "cover" }} />
                    )}
                    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(15,26,21,0.92) 0%, rgba(15,26,21,0.2) 60%, transparent 100%)" }} />
                    <div style={{ position: "absolute", bottom: "20px", left: "20px", right: "20px" }}>
                      <div style={{ fontSize: "36px", fontFamily: "var(--font-fraunces)", color: "var(--sand)", opacity: 0.5, lineHeight: 1 }}>0{idx + 1}</div>
                      <h5 style={{ fontFamily: "var(--font-fraunces)", fontSize: "16px", color: "var(--ivory)", lineHeight: 1.2, marginTop: "4px" }}>{flowSteps[idx]}</h5>
                    </div>
                  </motion.div>
                ))}
              </div>
            );
          })()}

          {/* Remaining steps as numbered list */}
          {flowSteps.length > 5 && (
            <div style={{ marginTop: "32px", display: "flex", flexWrap: "wrap", gap: "12px" }}>
              {flowSteps.slice(5).map((step, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  style={{ display: "inline-flex", alignItems: "center", gap: "12px", padding: "14px 24px", border: "1px solid rgba(251,250,246,0.15)", borderRadius: "100px" }}>
                  <span style={{ fontFamily: "var(--font-fraunces)", fontSize: "18px", color: "var(--sand)", opacity: 0.7 }}>0{i + 6}</span>
                  <span style={{ fontSize: "15px", color: "var(--ivory)", fontWeight: 500 }}>{step}</span>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 4. FACILITY & GALLERY */}
      <section className="section" style={{ padding: "120px 0" }}>
        <div className="wrap">
          <div style={{ textAlign: "center", maxWidth: "800px", margin: "0 auto 60px" }}>
            <h2 style={{ fontFamily: "var(--font-fraunces)", fontSize: "clamp(2.5rem, 4vw, 4rem)", marginBottom: "24px", color: "var(--forest-dark)" }}>
              {t("facility.headline")}
            </h2>
            <p style={{ fontSize: "18px", color: "var(--charcoal-soft)", whiteSpace: "pre-line" }}>{t("facility.copy")}</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" }}>
            {[
              "/assets/images/manufacturing-4.webp",
              "/assets/images/manufacturing-5.webp",
              "/assets/images/exporting-2.webp"
            ].map((src, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} style={{ position: "relative", height: "300px", borderRadius: "16px", overflow: "hidden" }}>
                <Image src={src} alt="Facility" fill sizes="33vw" style={{ objectFit: "cover" }} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. MACHINERY & EQUIPMENT — Full-bleed staggered image+text rows */}
      <section className="section" style={{ padding: "120px 0", background: "var(--forest-dark)", color: "var(--ivory)", overflow: "hidden" }}>
        <div className="wrap" style={{ marginBottom: "64px" }}>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} style={{ maxWidth: "700px" }}>
            <span className="eyebrow on-dark">{t("equipment.headline")}</span>
            <p style={{ fontSize: "18px", color: "rgba(251,250,246,0.7)", lineHeight: 1.7, marginTop: "16px" }}>{t("equipment.copy")}</p>
          </motion.div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
          {equipCards.map((card, i) => {
            const equipImages = [
              "/assets/images/manufacturing-3.webp",
              "/assets/images/manufacturing-4.webp",
              "/assets/images/manufacturing-5.webp",
              "/assets/images/pexels-cottonbro-4631075.webp",
              "/assets/images/exporting-2.webp",
              "/assets/images/pre-shipment.webp"
            ];
            return (
              <motion.div key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.08 }}
                style={{
                  display: "grid",
                  gridTemplateColumns: i % 2 === 0 ? "1fr 1.8fr" : "1.8fr 1fr",
                  minHeight: "260px",
                  overflow: "hidden"
                }}
              >
                {i % 2 === 0 ? (
                  <>
                    <div style={{ position: "relative", minHeight: "260px" }}>
                      <Image src={equipImages[i % equipImages.length]} alt={card.title} fill sizes="40vw" style={{ objectFit: "cover" }} />
                      <div style={{ position: "absolute", inset: 0, background: "rgba(15,26,21,0.35)" }} />
                    </div>
                    <div style={{ display: "flex", alignItems: "center", padding: "48px 56px", background: i % 4 === 0 ? "rgba(255,255,255,0.03)" : "rgba(255,255,255,0.06)" }}>
                      <div>
                        <div style={{ fontSize: "72px", fontFamily: "var(--font-fraunces)", color: "var(--sand)", opacity: 0.15, fontWeight: 700, lineHeight: 1, marginBottom: "-20px" }}>0{i+1}</div>
                        <h3 style={{ fontFamily: "var(--font-fraunces)", fontSize: "clamp(1.5rem, 2.5vw, 2.2rem)", color: "var(--ivory)", marginBottom: "16px", lineHeight: 1.2 }}>{card.title}</h3>
                        <p style={{ fontSize: "16px", color: "rgba(251,250,246,0.65)", lineHeight: 1.7, maxWidth: "500px" }}>{card.desc}</p>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div style={{ display: "flex", alignItems: "center", padding: "48px 56px", background: i % 4 === 1 ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.07)" }}>
                      <div>
                        <div style={{ fontSize: "72px", fontFamily: "var(--font-fraunces)", color: "var(--sand)", opacity: 0.15, fontWeight: 700, lineHeight: 1, marginBottom: "-20px" }}>0{i+1}</div>
                        <h3 style={{ fontFamily: "var(--font-fraunces)", fontSize: "clamp(1.5rem, 2.5vw, 2.2rem)", color: "var(--ivory)", marginBottom: "16px", lineHeight: 1.2 }}>{card.title}</h3>
                        <p style={{ fontSize: "16px", color: "rgba(251,250,246,0.65)", lineHeight: 1.7, maxWidth: "500px" }}>{card.desc}</p>
                      </div>
                    </div>
                    <div style={{ position: "relative", minHeight: "260px" }}>
                      <Image src={equipImages[i % equipImages.length]} alt={card.title} fill sizes="40vw" style={{ objectFit: "cover" }} />
                      <div style={{ position: "absolute", inset: 0, background: "rgba(15,26,21,0.35)" }} />
                    </div>
                  </>
                )}
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* 6. QUALITY CONTROL — Dramatic Stacked Accordion Rows */}
      <section style={{ padding: "120px 0", background: "var(--ivory)" }}>
        <div className="wrap" style={{ marginBottom: "64px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "48px", alignItems: "end" }}>
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h2 style={{ fontFamily: "var(--font-fraunces)", fontSize: "clamp(2.5rem, 4vw, 4rem)", color: "var(--forest-dark)", lineHeight: 1.1 }}>
                {t("qc.headline")}
              </h2>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.15 }}>
              <p style={{ fontSize: "18px", color: "var(--charcoal-soft)", lineHeight: 1.7 }}>{t("qc.copy")}</p>
            </motion.div>
          </div>
        </div>

        {/* Signature: Full-width accordion rows with expanding hover */}
        <div style={{ borderTop: "1px solid var(--line)" }}>
          {qcSteps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              style={{
                borderBottom: "1px solid var(--line)",
                display: "grid",
                gridTemplateColumns: "80px 1fr auto",
                alignItems: "center",
                padding: "32px 0",
                gap: "40px",
                cursor: "default"
              }}
              whileHover={{ backgroundColor: "rgba(18,40,31,0.03)" }}
            >
              <div style={{ fontFamily: "var(--font-fraunces)", fontSize: "clamp(2rem, 3vw, 2.8rem)", color: "var(--forest)", opacity: 0.18, fontWeight: 700, lineHeight: 1, paddingLeft: "24px" }}>
                {String(i + 1).padStart(2, "0")}
              </div>
              <h3 style={{ fontFamily: "var(--font-fraunces)", fontSize: "clamp(1.3rem, 2.5vw, 2rem)", color: "var(--forest-dark)", lineHeight: 1.1, fontWeight: 500 }}>
                {step}
              </h3>
              <div style={{ width: "48px", height: "48px", borderRadius: "50%", background: "var(--forest)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginRight: "24px" }}>
                <CheckCircle2 size={22} style={{ color: "var(--sand)" }} />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 7. WAREHOUSE & SAFETY — Full bleed cinematic panels */}
      <section style={{ position: "relative", overflow: "hidden" }}>
        {/* Warehouse — full bleed image with overlay text */}
        <div style={{ position: "relative", minHeight: "600px", display: "flex", alignItems: "center" }}>
          <Image src="/assets/images/exporting3.webp" alt="Warehouse" fill sizes="100vw" style={{ objectFit: "cover" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(15,26,21,0.97) 0%, rgba(15,26,21,0.7) 55%, transparent 100%)" }} />
          <div className="wrap" style={{ position: "relative", zIndex: 1 }}>
            <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} style={{ maxWidth: "600px" }}>
              <span style={{ display: "inline-block", fontFamily: "var(--font-mono)", fontSize: "11px", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--sand)", marginBottom: "20px" }}>WAREHOUSE & DISTRIBUTION</span>
              <h2 style={{ fontFamily: "var(--font-fraunces)", fontSize: "clamp(2.2rem, 4vw, 3.5rem)", color: "var(--ivory)", lineHeight: 1.1, marginBottom: "24px" }}>{t("warehouse.headline")}</h2>
              <p style={{ fontSize: "18px", color: "rgba(251,250,246,0.75)", lineHeight: 1.7 }}>{t("warehouse.copy")}</p>
            </motion.div>
          </div>
        </div>

        {/* Safety — dark bg, animated tag cloud */}
        <div style={{ background: "var(--forest-dark)", padding: "120px 0" }}>
          <div className="wrap">
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", alignItems: "center" }}>
              <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
                <span style={{ display: "inline-block", fontFamily: "var(--font-mono)", fontSize: "11px", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--sand)", marginBottom: "20px" }}>RESPONSIBLE MANUFACTURING</span>
                <h2 style={{ fontFamily: "var(--font-fraunces)", fontSize: "clamp(2.2rem, 4vw, 3.5rem)", color: "var(--ivory)", lineHeight: 1.1, marginBottom: "24px" }}>{t("safety.headline")}</h2>
                <p style={{ fontSize: "18px", color: "rgba(251,250,246,0.7)", lineHeight: 1.7 }}>{t("safety.copy")}</p>
              </motion.div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
                {safetyCards.map((card, i) => (
                  <motion.div key={i}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    style={{
                      padding: "18px 28px",
                      border: "1px solid rgba(251,250,246,0.15)",
                      borderRadius: "100px",
                      color: "var(--ivory)",
                      fontSize: "15px",
                      fontWeight: 500,
                      backdropFilter: "blur(8px)",
                      background: "rgba(255,255,255,0.04)"
                    }}
                  >
                    <span style={{ color: "var(--sand)", marginRight: "8px" }}>✦</span>{card}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. FUTURE EXPANSION — Big typographic marquee + image mosaic */}
      <section style={{ padding: "120px 0", background: "var(--ivory)", overflow: "hidden" }}>
        <div className="wrap" style={{ marginBottom: "72px", textAlign: "center" }}>
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 style={{ fontFamily: "var(--font-fraunces)", fontSize: "clamp(2.5rem, 5vw, 4.5rem)", color: "var(--forest-dark)", marginBottom: "20px", lineHeight: 1.1 }}>{t("future.headline")}</h2>
            <p style={{ fontSize: "18px", color: "var(--charcoal-soft)", maxWidth: "700px", margin: "0 auto" }}>{t("future.copy")}</p>
          </motion.div>
        </div>

        {/* Scrolling marquee of pipeline items */}
        <div style={{ overflow: "hidden", borderTop: "1px solid var(--line)", borderBottom: "1px solid var(--line)", padding: "28px 0", marginBottom: "72px" }}>
          <motion.div
            animate={{ x: ["-0%", "-50%"] }}
            transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
            style={{ display: "flex", gap: "0", whiteSpace: "nowrap", width: "max-content" }}
          >
            {[...futureList, ...futureList].map((item, i) => (
              <span key={i} style={{ display: "inline-flex", alignItems: "center", gap: "24px", padding: "0 40px", fontSize: "clamp(1rem, 1.8vw, 1.3rem)", fontFamily: "var(--font-fraunces)", color: "var(--forest-dark)", fontWeight: 500 }}>
                {item}
                <span style={{ color: "var(--sand)", fontSize: "20px" }}>✦</span>
              </span>
            ))}
          </motion.div>
        </div>

        {/* Mosaic grid of images */}
        <div className="wrap">
          <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr 1fr", gridTemplateRows: "280px 280px", gap: "16px" }}>
            <div style={{ gridRow: "1 / 3", position: "relative", borderRadius: "24px", overflow: "hidden" }}>
              <Image src="/assets/images/dipesh-ray-kngFBByxsvw-unsplash.webp" alt="Future" fill sizes="40vw" style={{ objectFit: "cover" }} />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(15,26,21,0.8) 0%, transparent 50%)" }} />
              <div style={{ position: "absolute", bottom: "32px", left: "32px" }}>
                <p style={{ fontFamily: "var(--font-fraunces)", fontSize: "24px", color: "var(--ivory)", lineHeight: 1.2 }}>10+ Products<br/>in Development</p>
              </div>
            </div>
            <div style={{ position: "relative", borderRadius: "24px", overflow: "hidden" }}>
              <Image src="/assets/images/oil.webp" alt="Coconut Oil" fill sizes="25vw" style={{ objectFit: "cover" }} />
            </div>
            <div style={{ position: "relative", borderRadius: "24px", overflow: "hidden" }}>
              <Image src="/assets/images/cocopeat.webp" alt="Cocopeat" fill sizes="25vw" style={{ objectFit: "cover" }} />
            </div>
            <div style={{ position: "relative", borderRadius: "24px", overflow: "hidden", background: "var(--forest-dark)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <p style={{ fontFamily: "var(--font-fraunces)", fontSize: "28px", color: "var(--sand)", textAlign: "center", lineHeight: 1.3, padding: "24px" }}>Innovation<br/>Starts<br/>Here.</p>
            </div>
            <div style={{ position: "relative", borderRadius: "24px", overflow: "hidden" }}>
              <Image src="/assets/images/pexels-nati-87264186-26699770.webp" alt="Future Expansion" fill sizes="25vw" style={{ objectFit: "cover" }} />
            </div>
          </div>
        </div>
      </section>

      {/* 10. STATISTICS */}
      <section className="section" style={{ padding: "100px 0", background: "var(--forest)", color: "var(--ivory)" }}>
        <div className="wrap" style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "40px" }}>
          {stats.map((stat, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
              <Counter target={stat.val} label={stat.label} />
            </motion.div>
          ))}
        </div>
      </section>

      {/* 11. FINAL CTA */}
      <section className="section" style={{ padding: "160px 0", textAlign: "center" }}>
        <div className="wrap" style={{ maxWidth: "800px", margin: "0 auto" }}>
          <h2 style={{ fontFamily: "var(--font-fraunces)", fontSize: "clamp(3rem, 5vw, 4.5rem)", marginBottom: "32px", lineHeight: 1.1, color: "var(--forest-dark)" }}>
            {t("final.headline")}
          </h2>
          <p style={{ fontSize: "20px", color: "var(--charcoal-soft)", lineHeight: 1.6, marginBottom: "48px" }}>
            {t("final.copy")}
          </p>
          <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap", marginBottom: "64px" }}>
            <Link href={`/${locale}/store`} className="btn btn-primary" style={{ background: "var(--forest)", color: "var(--white)", borderColor: "var(--forest)" }}>
              {t("final.cta1")}
            </Link>
            <Link href={`/${locale}/support/contact`} className="btn btn-secondary">
              {t("final.cta2")}
            </Link>
          </div>
          <p style={{ fontSize: "14px", fontStyle: "italic", color: "rgba(18,40,31,0.5)", maxWidth: "600px", margin: "0 auto" }}>
            {t("final.note")}
          </p>
        </div>
      </section>

    </div>
  );
}
