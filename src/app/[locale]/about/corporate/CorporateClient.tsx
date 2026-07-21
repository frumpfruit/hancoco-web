"use client";

import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Download, FileText, Search, FileBadge2, HelpCircle, ArrowRight, CheckCircle2 } from "lucide-react";
import { useState } from "react";

export default function CorporateClient() {
  const t = useTranslations("corporatePage");
  const locale = useLocale();
  const [searchQuery, setSearchQuery] = useState("");

  const featuredCards = t.raw("featured.cards") as { title: string; desc: string }[];
  const libraryDocs = t.raw("library.docs") as { title: string; desc: string; type: string; format: string }[];
  const certsList = t.raw("certs.list") as { name: string; status: string }[];
  const libraryCategories = t.raw("library.categories") as string[];

  const filteredDocs = libraryDocs.filter(doc =>
    doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    doc.desc.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const featuredImages = [
    "/assets/images/exporting-2.webp",
    "/assets/images/pexels-boris-lvrg-217419519-11865861.webp",
    "/assets/images/aleksey-kuprikov-c-AXdFRil_w-unsplash.webp",
  ];

  return (
    <div style={{ background: "var(--ivory)", color: "var(--charcoal)" }}>

      {/* 1. HERO — Full bleed cinematic */}
      <section className="hero-section" style={{ position: "relative", height: "80vh", minHeight: "680px", display: "flex", alignItems: "center", background: "var(--forest-dark)", color: "var(--ivory)", overflow: "hidden" }}>
        <Image src="/assets/images/exporting-1.webp" alt="Resources" fill priority sizes="100vw" style={{ objectFit: "cover", opacity: 0.35, zIndex: 0 }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(15,26,21,0.98) 0%, rgba(15,26,21,0.6) 60%, transparent 100%)", zIndex: 1 }} />

        <div className="wrap" style={{ position: "relative", zIndex: 2, paddingTop: "80px" }}>
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }} style={{ maxWidth: "680px" }}>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "11px", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--sand)", display: "block", marginBottom: "24px" }}>{t("hero.eyebrow")}</span>
            <h1 style={{ fontFamily: "var(--font-fraunces)", fontSize: "clamp(2.8rem, 5.5vw, 4.8rem)", lineHeight: 1.05, marginBottom: "28px", color: "var(--ivory)" }}>
              {t("hero.headline")}
            </h1>
            <p style={{ color: "rgba(251,250,246,0.75)", fontSize: "18px", lineHeight: 1.65, marginBottom: "44px", maxWidth: "520px" }}>
              {t("hero.copy")}
            </p>
            <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
              <a href="#library" className="btn btn-primary" style={{ background: "var(--sand)", color: "var(--forest-dark)", borderColor: "var(--sand)" }}>
                {t("hero.cta1")}
              </a>
              <Link href={`/${locale}/support/contact`} className="btn btn-secondary" style={{ borderColor: "rgba(255,255,255,0.3)", color: "var(--ivory)" }}>
                {t("hero.cta2")}
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. FEATURED DOWNLOADS — Signature: staggered image cards editorial */}
      <section style={{ padding: "120px 0", background: "var(--ivory)", overflow: "hidden" }}>
        <div className="wrap">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", paddingBottom: "56px", borderBottom: "1px solid var(--line)" }}>
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h2 style={{ fontFamily: "var(--font-fraunces)", fontSize: "clamp(2.2rem, 4vw, 3.5rem)", color: "var(--forest-dark)", lineHeight: 1.1 }}>
                {t("featured.headline")}
              </h2>
            </motion.div>
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "12px", color: "var(--charcoal-soft)", letterSpacing: "0.05em" }}>
                {featuredCards.length} DOCUMENTS
              </span>
            </motion.div>
          </div>

          {/* Featured docs as horizontal full-width rows with image thumbnails */}
          <div>
            {featuredCards.map((card, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.1 }}
                className="responsive-grid"
                style={{
                  display: "grid",
                  gridTemplateColumns: "280px 1fr auto",
                  gap: "40px",
                  alignItems: "center",
                  padding: "40px 0",
                  borderBottom: "1px solid var(--line)",
                  cursor: "default"
                }}
              >
                {/* Image thumbnail */}
                <div style={{ position: "relative", height: "180px", borderRadius: "16px", overflow: "hidden" }}>
                  <Image src={featuredImages[i % featuredImages.length]} alt={card.title} fill sizes="280px" style={{ objectFit: "cover" }} />
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(15,26,21,0.55) 0%, transparent 60%)" }} />
                  <div style={{ position: "absolute", bottom: "12px", left: "12px" }}>
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: "10px", letterSpacing: "0.1em", color: "var(--sand)", textTransform: "uppercase" }}>PDF</span>
                  </div>
                </div>

                {/* Text */}
                <div>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: "11px", letterSpacing: "0.12em", color: "var(--forest)", textTransform: "uppercase", display: "block", marginBottom: "12px" }}>
                    OFFICIAL DOCUMENT · 0{i + 1}
                  </span>
                  <h3 style={{ fontFamily: "var(--font-fraunces)", fontSize: "clamp(1.3rem, 2.2vw, 1.9rem)", color: "var(--forest-dark)", lineHeight: 1.15, marginBottom: "12px" }}>
                    {card.title}
                  </h3>
                  <p style={{ color: "var(--charcoal-soft)", fontSize: "15px", lineHeight: 1.65, maxWidth: "480px" }}>
                    {card.desc}
                  </p>
                </div>

                {/* Download CTA */}
                <div style={{ flexShrink: 0, display: "flex", flexDirection: "column", gap: "12px", alignItems: "flex-end" }}>
                  <button style={{
                    display: "inline-flex", alignItems: "center", gap: "10px",
                    padding: "14px 24px", borderRadius: "100px",
                    background: "var(--forest-dark)", color: "var(--ivory)",
                    border: "none", cursor: "pointer", fontSize: "14px", fontWeight: 600,
                    whiteSpace: "nowrap"
                  }}>
                    <Download size={15} /> Download
                  </button>
                  <span style={{ fontSize: "12px", color: "var(--charcoal-soft)" }}>EN | ID Available</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. DOWNLOAD LIBRARY — Clean table with search */}
      <section id="library" style={{ padding: "120px 0", background: "var(--forest-dark)", color: "var(--ivory)" }}>
        <div className="wrap">
          <div className="responsive-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "48px", alignItems: "end", paddingBottom: "56px" }}>
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "11px", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--sand)", display: "block", marginBottom: "16px" }}>DOCUMENT LIBRARY</span>
              <h2 style={{ fontFamily: "var(--font-fraunces)", fontSize: "clamp(2rem, 3.5vw, 3rem)", color: "var(--ivory)", lineHeight: 1.1 }}>
                {t("library.headline")}
              </h2>
            </motion.div>
            <div className="doc-library-header" style={{ display: "flex", flexDirection: "column", gap: "16px", alignItems: "flex-end" }}>
              {/* Search */}
              <div style={{ position: "relative", width: "100%", maxWidth: "320px" }}>
                <input
                  type="text"
                  placeholder="Search documents..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{
                    width: "100%", padding: "14px 24px", paddingLeft: "48px",
                    borderRadius: "100px", border: "1px solid rgba(251,250,246,0.2)",
                    background: "rgba(255,255,255,0.06)", fontSize: "15px",
                    outline: "none", color: "var(--ivory)", backdropFilter: "blur(8px)",
                    boxSizing: "border-box"
                  }}
                />
                <Search size={18} style={{ position: "absolute", left: "18px", top: "50%", transform: "translateY(-50%)", color: "rgba(251,250,246,0.4)" }} />
              </div>
              {/* Category pills */}
              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", justifyContent: "flex-end" }}>
                {libraryCategories.slice(0, 4).map((cat, i) => (
                  <span key={i} style={{ padding: "5px 14px", border: "1px solid rgba(251,250,246,0.15)", borderRadius: "100px", fontSize: "12px", color: "rgba(251,250,246,0.6)", fontFamily: "var(--font-mono)" }}>
                    {cat}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Doc rows */}
          <div style={{ borderTop: "1px solid rgba(251,250,246,0.12)" }}>
            {filteredDocs.length > 0 ? filteredDocs.map((doc, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="doc-row"
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr auto",
                  alignItems: "center",
                  gap: "32px",
                  padding: "24px 0",
                  borderBottom: "1px solid rgba(251,250,246,0.08)"
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
                  <div style={{ width: "40px", height: "40px", borderRadius: "10px", background: "rgba(255,255,255,0.07)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <FileText size={18} style={{ color: "var(--sand)" }} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: "16px", fontWeight: 600, color: "var(--ivory)", marginBottom: "4px" }}>{doc.title}</h4>
                    <p style={{ fontSize: "13px", color: "rgba(251,250,246,0.5)" }}>{doc.desc} · {doc.type} · {doc.format}</p>
                  </div>
                </div>
                <button style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "10px 20px", borderRadius: "100px", background: "transparent", border: "1px solid rgba(251,250,246,0.2)", color: "var(--ivory)", cursor: "pointer", fontSize: "13px", fontWeight: 500, whiteSpace: "nowrap", flexShrink: 0 }}>
                  <Download size={13} /> Download
                </button>
              </motion.div>
            )) : (
              <div style={{ padding: "64px", textAlign: "center", color: "rgba(251,250,246,0.4)" }}>
                No documents found matching &quot;{searchQuery}&quot;
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 4. CERTIFICATIONS — Full-bleed split with image */}
      <section style={{ padding: "120px 0", background: "var(--ivory)", overflow: "hidden" }}>
        <div className="wrap">
          <div className="responsive-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", alignItems: "start" }}>
            {/* Left: Headline + image */}
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "11px", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--forest)", display: "block", marginBottom: "16px" }}>COMPLIANCE & TRUST</span>
              <h2 style={{ fontFamily: "var(--font-fraunces)", fontSize: "clamp(2.2rem, 4vw, 3.5rem)", color: "var(--forest-dark)", lineHeight: 1.1, marginBottom: "32px" }}>
                {t("certs.headline")}
              </h2>
              <div style={{ position: "relative", height: "360px", borderRadius: "24px", overflow: "hidden" }}>
                <Image src="/assets/images/diana-nazarchuk-oIR-PrUuFas-unsplash.webp" alt="Quality Standards" fill sizes="45vw" style={{ objectFit: "cover" }} />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(15,26,21,0.5) 0%, transparent 50%)" }} />
              </div>
            </motion.div>

            {/* Right: Accordion-style certification list */}
            <div style={{ paddingTop: "4px" }}>
              <div style={{ borderTop: "1px solid var(--line)" }}>
                {certsList.map((cert, i) => (
                  <motion.div key={i}
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "28px 0",
                      borderBottom: "1px solid var(--line)",
                      gap: "24px"
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                      <div style={{ width: "36px", height: "36px", borderRadius: "50%", background: cert.status === "Available" ? "rgba(18,40,31,0.08)" : "rgba(200,170,100,0.1)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        {cert.status === "Available"
                          ? <CheckCircle2 size={18} style={{ color: "var(--forest)" }} />
                          : <FileBadge2 size={18} style={{ color: "var(--sand)" }} />
                        }
                      </div>
                      <span style={{ fontSize: "17px", fontWeight: 600, color: "var(--forest-dark)", fontFamily: "var(--font-fraunces)" }}>{cert.name}</span>
                    </div>
                    <span style={{
                      fontSize: "11px", padding: "5px 14px", borderRadius: "100px", fontWeight: 600,
                      fontFamily: "var(--font-mono)", letterSpacing: "0.05em", whiteSpace: "nowrap",
                      background: cert.status === "Available" ? "rgba(18,40,31,0.07)" : "rgba(200,170,100,0.15)",
                      color: cert.status === "Available" ? "var(--forest-dark)" : "#8B6914"
                    }}>
                      {cert.status}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. HELP — Dark full-bleed banner */}
      <section style={{ padding: "0", background: "var(--forest-dark)", overflow: "hidden", position: "relative" }}>
        <div style={{ position: "absolute", inset: 0, opacity: 0.08 }}>
          <Image src="/assets/images/feng-shan-15-dLesZL9Q-unsplash.webp" alt="" fill sizes="100vw" style={{ objectFit: "cover" }} />
        </div>
        <div className="wrap responsive-grid" style={{ position: "relative", zIndex: 1, padding: "96px 0", display: "grid", gridTemplateColumns: "1fr auto", alignItems: "center", gap: "48px" }}>
          <div>
            <h3 style={{ fontFamily: "var(--font-fraunces)", fontSize: "clamp(1.8rem, 3vw, 2.8rem)", color: "var(--ivory)", marginBottom: "16px", lineHeight: 1.2 }}>{t("help.headline")}</h3>
            <p style={{ fontSize: "17px", color: "rgba(251,250,246,0.7)", lineHeight: 1.65, maxWidth: "540px" }}>{t("help.copy")}</p>
          </div>
          <div style={{ display: "flex", gap: "16px", flexShrink: 0, flexWrap: "wrap", justifyContent: "flex-end" }}>
            <Link href={`/${locale}/support/contact`} style={{ display: "inline-flex", alignItems: "center", gap: "10px", padding: "16px 28px", borderRadius: "100px", background: "var(--sand)", color: "var(--forest-dark)", fontSize: "15px", fontWeight: 700, textDecoration: "none" }}>
              {t("help.cta1")} <ArrowRight size={16} />
            </Link>
            <Link href={`/${locale}/support/contact`} style={{ display: "inline-flex", alignItems: "center", gap: "10px", padding: "16px 28px", borderRadius: "100px", border: "1px solid rgba(251,250,246,0.25)", color: "var(--ivory)", fontSize: "15px", fontWeight: 600, textDecoration: "none" }}>
              {t("help.cta2")}
            </Link>
          </div>
        </div>
      </section>

      {/* 6. FINAL CTA */}
      <section style={{ padding: "160px 0", textAlign: "center", background: "var(--ivory)" }}>
        <div className="wrap" style={{ maxWidth: "800px", margin: "0 auto" }}>
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 style={{ fontFamily: "var(--font-fraunces)", fontSize: "clamp(3rem, 5vw, 4.5rem)", marginBottom: "32px", lineHeight: 1.1, color: "var(--forest-dark)" }}>
              {t("final.headline")}
            </h2>
            <p style={{ fontSize: "20px", color: "var(--charcoal-soft)", lineHeight: 1.6, marginBottom: "48px" }}>
              {t("final.copy")}
            </p>
            <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
              <button className="btn btn-primary" style={{ background: "var(--forest)", color: "var(--white)", borderColor: "var(--forest)" }}>
                {t("final.cta1")}
              </button>
              <Link href={`/${locale}/store`} className="btn btn-secondary">
                {t("final.cta2")}
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
