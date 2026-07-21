"use client";

import { useTranslations, useLocale } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState, useMemo } from "react";
import { Building, Package, Shield, Ship, ClipboardList, Handshake, ChevronDown, Search, ArrowRight } from "lucide-react";

const ICON_MAP: Record<string, React.ReactNode> = {
  building: <Building size={20} />,
  package: <Package size={20} />,
  shield: <Shield size={20} />,
  ship: <Ship size={20} />,
  clipboard: <ClipboardList size={20} />,
  handshake: <Handshake size={20} />,
};

export default function FAQClient() {
  const t = useTranslations("faqPage");
  const locale = useLocale();
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [openItem, setOpenItem] = useState<string | null>(null);

  const categories = t.raw("categories") as string[];
  const sections = t.raw("sections") as {
    category: string;
    icon: string;
    items: { q: string; a: string }[];
  }[];

  const filteredSections = useMemo(() => {
    return sections.filter(sec => {
      const catMatch = activeCategory === "All" || sec.category.includes(activeCategory);
      if (!catMatch) return false;
      if (!searchQuery) return true;
      return sec.items.some(
        item =>
          item.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.a.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }).map(sec => ({
      ...sec,
      items: searchQuery
        ? sec.items.filter(
            item =>
              item.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
              item.a.toLowerCase().includes(searchQuery.toLowerCase())
          )
        : sec.items,
    }));
  }, [sections, activeCategory, searchQuery]);

  return (
    <div style={{ background: "var(--ivory)", color: "var(--charcoal)" }}>

      {/* 1. HERO — Dark editorial with texture */}
      <section className="hero-section" style={{ position: "relative", minHeight: "55vh", display: "flex", flexDirection: "column", justifyContent: "center", background: "var(--forest-dark)", overflow: "hidden", paddingTop: "80px" }}>
        <Image src="/assets/images/pexels-boris-lvrg-217419519-11865882.webp" alt="FAQ Background" fill priority sizes="100vw" style={{ objectFit: "cover", opacity: 0.12, zIndex: 0 }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(15,26,21,0.95) 60%, rgba(15,26,21,0.4) 100%)", zIndex: 1 }} />

        <div className="wrap" style={{ position: "relative", zIndex: 2, textAlign: "center", paddingBottom: "60px" }}>
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }}>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "11px", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--sand)", display: "block", marginBottom: "20px" }}>{t("hero.eyebrow")}</span>
            <h1 style={{ fontFamily: "var(--font-fraunces)", fontSize: "clamp(3rem, 5.5vw, 5.5rem)", lineHeight: 1.0, color: "var(--ivory)", marginBottom: "24px" }}>
              {t("hero.headline")}
            </h1>
            <p style={{ fontSize: "18px", color: "rgba(251,250,246,0.65)", lineHeight: 1.65, maxWidth: "580px", margin: "0 auto 40px" }}>
              {t("hero.copy")}
            </p>

            {/* Search bar */}
            <div style={{ position: "relative", maxWidth: "560px", margin: "0 auto" }}>
              <Search size={20} style={{ position: "absolute", left: "20px", top: "50%", transform: "translateY(-50%)", color: "rgba(251,250,246,0.4)", zIndex: 1 }} />
              <input
                type="text"
                placeholder={t("search.placeholder")}
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                style={{
                  width: "100%",
                  padding: "18px 24px 18px 52px",
                  borderRadius: "100px",
                  border: "1px solid rgba(251,250,246,0.15)",
                  background: "rgba(255,255,255,0.07)",
                  backdropFilter: "blur(12px)",
                  fontSize: "16px",
                  color: "var(--ivory)",
                  outline: "none",
                  boxSizing: "border-box"
                }}
              />
            </div>
          </motion.div>
        </div>

        {/* Category pills — pinned to bottom of hero */}
        <div style={{ position: "relative", zIndex: 2, borderTop: "1px solid rgba(251,250,246,0.08)", background: "rgba(15,26,21,0.8)", backdropFilter: "blur(12px)" }}>
          <div className="wrap" style={{ display: "flex", gap: "8px", padding: "16px 0", overflowX: "auto", scrollbarWidth: "none" }}>
            {categories.map((cat, i) => (
              <button key={i} onClick={() => setActiveCategory(cat)}
                style={{
                  flexShrink: 0,
                  padding: "8px 20px",
                  borderRadius: "100px",
                  border: "1px solid",
                  borderColor: activeCategory === cat ? "var(--sand)" : "rgba(251,250,246,0.15)",
                  background: activeCategory === cat ? "var(--sand)" : "transparent",
                  color: activeCategory === cat ? "var(--forest-dark)" : "rgba(251,250,246,0.7)",
                  fontSize: "13px",
                  fontWeight: activeCategory === cat ? 700 : 500,
                  cursor: "pointer",
                  fontFamily: "var(--font-mono)",
                  letterSpacing: "0.05em",
                  transition: "all 0.2s"
                }}>
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 2. FAQ CONTENT — Full-width accordion sections */}
      <section style={{ padding: "80px 0 120px" }}>
        <div className="wrap">
          {filteredSections.length === 0 ? (
            <div style={{ textAlign: "center", padding: "80px", color: "var(--charcoal-soft)" }}>
              No questions found matching &quot;{searchQuery}&quot;
            </div>
          ) : (
            filteredSections.map((sec, si) => (
              <motion.div key={si}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: si * 0.07 }}
                style={{ marginBottom: "64px" }}>

                {/* Section header */}
                <div style={{ display: "flex", alignItems: "center", gap: "16px", paddingBottom: "24px", marginBottom: "8px", borderBottom: "2px solid var(--forest-dark)" }}>
                  <div style={{ width: "40px", height: "40px", borderRadius: "50%", background: "var(--forest-dark)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--sand)", flexShrink: 0 }}>
                    {ICON_MAP[sec.icon]}
                  </div>
                  <h2 style={{ fontFamily: "var(--font-fraunces)", fontSize: "clamp(1.5rem, 2.5vw, 2rem)", color: "var(--forest-dark)", fontWeight: 600 }}>{sec.category}</h2>
                  <span style={{ marginLeft: "auto", fontFamily: "var(--font-mono)", fontSize: "12px", color: "var(--charcoal-soft)" }}>{sec.items.length} questions</span>
                </div>

                {/* Q&A rows */}
                {sec.items.map((item, qi) => {
                  const key = `${si}-${qi}`;
                  return (
                    <div key={qi} style={{ borderBottom: "1px solid var(--line)" }}>
                      <button onClick={() => setOpenItem(openItem === key ? null : key)}
                        style={{ width: "100%", display: "grid", gridTemplateColumns: "48px 1fr 40px", alignItems: "center", gap: "20px", padding: "24px 0", background: "none", border: "none", cursor: "pointer", textAlign: "left" }}>
                        <span style={{ fontFamily: "var(--font-fraunces)", fontSize: "clamp(1.6rem, 2vw, 2rem)", color: "var(--forest)", opacity: 0.15, fontWeight: 700, lineHeight: 1 }}>
                          {String(qi + 1).padStart(2, "0")}
                        </span>
                        <span style={{ fontFamily: "var(--font-fraunces)", fontSize: "clamp(1rem, 1.8vw, 1.3rem)", color: "var(--forest-dark)", fontWeight: 500, lineHeight: 1.3 }}>{item.q}</span>
                        <motion.div animate={{ rotate: openItem === key ? 180 : 0 }} transition={{ duration: 0.3 }} style={{ display: "flex", justifyContent: "flex-end" }}>
                          <ChevronDown size={20} style={{ color: "var(--charcoal-soft)" }} />
                        </motion.div>
                      </button>
                      <AnimatePresence>
                        {openItem === key && (
                          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.35 }}
                            style={{ overflow: "hidden" }}>
                            <div style={{ paddingLeft: "68px", paddingBottom: "28px" }}>
                              <p style={{ fontSize: "16px", color: "var(--charcoal-soft)", lineHeight: 1.75 }}>{item.a}</p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </motion.div>
            ))
          )}
        </div>
      </section>

      {/* 3. STILL HAVE QUESTIONS — Dark split panel */}
      <section style={{ background: "var(--forest-dark)", position: "relative", overflow: "hidden" }}>
        <Image src="/assets/images/nisha-ramesh-IiiTDxnHDzg-unsplash.webp" alt="" fill sizes="100vw" style={{ objectFit: "cover", opacity: 0.08, zIndex: 0 }} />
        <div className="wrap faq-still-grid" style={{ position: "relative", zIndex: 1, display: "grid", gridTemplateColumns: "1fr auto", alignItems: "center", gap: "48px", padding: "96px 0" }}>
          <div>
            <h2 style={{ fontFamily: "var(--font-fraunces)", fontSize: "clamp(2rem, 4vw, 3.5rem)", color: "var(--ivory)", lineHeight: 1.1, marginBottom: "16px" }}>{t("still.headline")}</h2>
            <p style={{ fontSize: "17px", color: "rgba(251,250,246,0.7)", lineHeight: 1.65, maxWidth: "480px" }}>{t("still.copy")}</p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "16px", alignItems: "flex-end" }}>
            <Link href={`/${locale}/support/contact`} style={{ display: "inline-flex", alignItems: "center", gap: "10px", padding: "16px 28px", borderRadius: "100px", background: "var(--sand)", color: "var(--forest-dark)", fontSize: "15px", fontWeight: 700, textDecoration: "none", whiteSpace: "nowrap" }}>
              {t("still.cta1")} <ArrowRight size={16} />
            </Link>
            <a href="https://wa.me/62xxxxxxxx" target="_blank" rel="noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: "10px", padding: "16px 28px", borderRadius: "100px", border: "1px solid rgba(251,250,246,0.25)", color: "var(--ivory)", fontSize: "15px", fontWeight: 600, textDecoration: "none", whiteSpace: "nowrap" }}>
              {t("still.cta2")}
            </a>
          </div>
        </div>
      </section>

      <style dangerouslySetInnerHTML={{ __html: `
        @media (max-width: 900px) {
          .faq-still-grid {
            grid-template-columns: 1fr !important;
            text-align: center;
          }
          .faq-still-grid > div:last-child {
            align-items: center !important;
          }
          .faq-still-grid p {
            margin: 0 auto;
          }
        }
      `}} />
    </div>
  );
}
