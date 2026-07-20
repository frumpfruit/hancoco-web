"use client";

import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock, Calendar, Mail } from "lucide-react";
import { useState } from "react";

export default function InsightClient() {
  const t = useTranslations("insightPage");
  const locale = useLocale();

  const [activeCategory, setActiveCategory] = useState("All");

  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  const categories = t.raw("categories.list") as string[];
  const articles = t.raw("latest.articles") as { category: string; title: string; desc: string; readTime: string; date: string }[];

  const filteredArticles = activeCategory === "All" ? articles : articles.filter(a => a.category === activeCategory);

  return (
    <div style={{ background: "var(--ivory)", color: "var(--charcoal)" }}>
      
      {/* 1. HERO SECTION */}
      <section style={{ padding: "160px 0 80px", background: "var(--ivory-dim)" }}>
        <div className="wrap">
          <motion.div initial="hidden" animate="visible" variants={fadeInUp} style={{ maxWidth: "800px", margin: "0 auto", textAlign: "center" }}>
            <span className="eyebrow" style={{ justifyContent: "center" }}>{t("hero.eyebrow")}</span>
            <h1 style={{ fontFamily: "var(--font-fraunces)", fontSize: "clamp(2.5rem, 5vw, 4.5rem)", lineHeight: 1.1, marginBottom: "24px", color: "var(--forest-dark)" }}>
              {t("hero.headline")}
            </h1>
            <p style={{ color: "var(--charcoal-soft)", fontSize: "18px", lineHeight: 1.6, marginBottom: "40px" }}>
              {t("hero.copy")}
            </p>
            <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
              <a href="#featured" className="btn btn-primary" style={{ background: "var(--forest)", color: "var(--white)", borderColor: "var(--forest)" }}>
                {t("hero.cta1")}
              </a>
              <a href="#newsletter" className="btn btn-secondary">
                {t("hero.cta2")}
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. FEATURED STORY (70/30 SPLIT) */}
      <section id="featured" className="section" style={{ padding: "80px 0" }}>
        <div className="wrap">
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: "40px", background: "var(--white)", border: "1px solid var(--line)", borderRadius: "24px", overflow: "hidden" }}>
            <div style={{ position: "relative", minHeight: "400px" }}>
              <Image src="/assets/images/exporting-2.webp" alt="Featured Story" fill sizes="60vw" style={{ objectFit: "cover" }} />
            </div>
            <div style={{ padding: "48px 40px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <span style={{ fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 600, color: "var(--forest)", marginBottom: "16px", display: "block" }}>
                {t("featured.category")}
              </span>
              <h2 style={{ fontFamily: "var(--font-fraunces)", fontSize: "2.5rem", marginBottom: "16px", color: "var(--forest-dark)", lineHeight: 1.1 }}>
                {t("featured.title")}
              </h2>
              <p style={{ fontSize: "16px", color: "var(--charcoal-soft)", lineHeight: 1.6, marginBottom: "32px" }}>
                {t("featured.desc")}
              </p>
              
              <div style={{ display: "flex", alignItems: "center", gap: "16px", fontSize: "13px", color: "rgba(18,40,31,0.5)", marginBottom: "32px", borderTop: "1px solid var(--line)", paddingTop: "24px" }}>
                <span style={{ fontWeight: 600, color: "var(--forest-dark)" }}>{t("featured.author")}</span>
                <span>•</span>
                <span style={{ display: "flex", alignItems: "center", gap: "4px" }}><Clock size={14} /> {t("featured.readTime")}</span>
                <span>•</span>
                <span style={{ display: "flex", alignItems: "center", gap: "4px" }}><Calendar size={14} /> {t("featured.date")}</span>
              </div>
              
              <button className="btn btn-secondary" style={{ alignSelf: "flex-start", display: "flex", alignItems: "center", gap: "8px" }}>
                {t("featured.cta")} <ArrowRight size={16} />
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 3. CATEGORIES & 4. LATEST INSIGHTS */}
      <section className="section" style={{ padding: "80px 0" }}>
        <div className="wrap">
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", marginBottom: "40px", gap: "24px" }}>
            <h2 style={{ fontFamily: "var(--font-fraunces)", fontSize: "2.5rem", color: "var(--forest-dark)" }}>{t("latest.headline")}</h2>
            
            {/* Category Tabs */}
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              <button 
                onClick={() => setActiveCategory("All")}
                style={{ padding: "8px 16px", borderRadius: "100px", fontSize: "14px", fontWeight: 500, cursor: "pointer", transition: "all 0.2s", background: activeCategory === "All" ? "var(--forest)" : "transparent", color: activeCategory === "All" ? "var(--white)" : "var(--charcoal-soft)", border: `1px solid ${activeCategory === "All" ? "var(--forest)" : "var(--line)"}` }}
              >
                All
              </button>
              {categories.map((cat, i) => (
                <button 
                  key={i}
                  onClick={() => setActiveCategory(cat)}
                  style={{ padding: "8px 16px", borderRadius: "100px", fontSize: "14px", fontWeight: 500, cursor: "pointer", transition: "all 0.2s", background: activeCategory === cat ? "var(--forest)" : "transparent", color: activeCategory === cat ? "var(--white)" : "var(--charcoal-soft)", border: `1px solid ${activeCategory === cat ? "var(--forest)" : "var(--line)"}` }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "32px" }}>
            {filteredArticles.map((article, i) => {
              const articleImages = [
                "/assets/images/pexels-alexeydemidov-11120914.webp",
                "/assets/images/pexels-ayomide-isaac-66354580-12392906.webp",
                "/assets/images/pexels-cmrcn-29132448.webp",
                "/assets/images/shibi-zidhick-DES_XhqBU2E-unsplash.webp",
                "/assets/images/towfiqu-barbhuiya-vuctv0AnlwY-unsplash.webp",
                "/assets/images/hector-john-periquin-zWn9bXRq2-U-unsplash.webp",
                "/assets/images/tijana-drndarski-BNZrKnocA3c-unsplash.webp"
              ];
              return (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} style={{ display: "flex", flexDirection: "column" }}>
                <div style={{ position: "relative", height: "220px", borderRadius: "16px", overflow: "hidden", marginBottom: "20px", background: "var(--ivory-dim)" }}>
                  <Image src={articleImages[i % articleImages.length]} alt={article.title} fill sizes="(max-width: 900px) 100vw, 33vw" style={{ objectFit: "cover", transition: "transform 0.5s ease" }} />
                </div>
                <span style={{ fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 600, color: "var(--forest)", marginBottom: "12px", display: "block" }}>
                  {article.category}
                </span>
                <h3 style={{ fontFamily: "var(--font-fraunces)", fontSize: "22px", color: "var(--forest-dark)", marginBottom: "12px", lineHeight: 1.2 }}>
                  {article.title}
                </h3>
                <p style={{ fontSize: "15px", color: "var(--charcoal-soft)", lineHeight: 1.6, marginBottom: "24px", flexGrow: 1 }}>
                  {article.desc}
                </p>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderTop: "1px solid var(--line)", paddingTop: "16px" }}>
                   <div style={{ display: "flex", alignItems: "center", gap: "12px", fontSize: "12px", color: "rgba(18,40,31,0.5)" }}>
                    <span style={{ display: "flex", alignItems: "center", gap: "4px" }}><Clock size={14} /> {article.readTime}</span>
                    <span style={{ display: "flex", alignItems: "center", gap: "4px" }}><Calendar size={14} /> {article.date}</span>
                   </div>
                   <button style={{ background: "none", border: "none", color: "var(--forest)", cursor: "pointer", display: "flex", alignItems: "center" }}>
                     <ArrowRight size={18} />
                   </button>
                </div>
              </motion.div>
              );
            })}
            {filteredArticles.length === 0 && (
              <div style={{ gridColumn: "1 / -1", padding: "80px", textAlign: "center", color: "var(--charcoal-soft)", background: "var(--ivory-dim)", borderRadius: "16px" }}>
                No articles found for this category.
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 5. NEWSLETTER */}
      <section id="newsletter" className="section" style={{ padding: "120px 0", background: "var(--forest-dark)", color: "var(--ivory)" }}>
        <div className="wrap" style={{ maxWidth: "800px", margin: "0 auto", textAlign: "center" }}>
          <div style={{ width: "64px", height: "64px", borderRadius: "50%", background: "rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 32px", color: "var(--sand)" }}>
            <Mail size={32} />
          </div>
          <h2 style={{ fontFamily: "var(--font-fraunces)", fontSize: "clamp(2.5rem, 4vw, 3.5rem)", marginBottom: "24px", lineHeight: 1.1 }}>
            {t("newsletter.headline")}
          </h2>
          <p style={{ fontSize: "18px", color: "rgba(251,250,246,0.8)", lineHeight: 1.6, marginBottom: "48px" }}>
            {t("newsletter.copy")}
          </p>
          <form style={{ display: "flex", gap: "16px", maxWidth: "600px", margin: "0 auto 16px", flexDirection: "row" }} onSubmit={(e) => e.preventDefault()}>
            <input 
              type="email" 
              placeholder={t("newsletter.placeholder")} 
              required
              style={{ flexGrow: 1, padding: "16px 24px", borderRadius: "100px", border: "1px solid rgba(255,255,255,0.2)", background: "rgba(255,255,255,0.05)", color: "var(--white)", fontSize: "16px", outline: "none" }}
            />
            <button type="submit" className="btn btn-primary" style={{ background: "var(--sand)", color: "var(--forest-dark)", borderColor: "var(--sand)" }}>
              {t("newsletter.cta")}
            </button>
          </form>
          <p style={{ fontSize: "13px", color: "rgba(251,250,246,0.5)" }}>{t("newsletter.privacy")}</p>
        </div>
      </section>

      {/* 6. FINAL CTA */}
      <section className="section" style={{ padding: "160px 0", textAlign: "center" }}>
        <div className="wrap" style={{ maxWidth: "800px", margin: "0 auto" }}>
          <h2 style={{ fontFamily: "var(--font-fraunces)", fontSize: "clamp(3rem, 5vw, 4.5rem)", marginBottom: "32px", lineHeight: 1.1, color: "var(--forest-dark)" }}>
            {t("final.headline")}
          </h2>
          <p style={{ fontSize: "20px", color: "var(--charcoal-soft)", lineHeight: 1.6, marginBottom: "48px" }}>
            {t("final.copy")}
          </p>
          <div style={{ display: "flex", gap: "16px", justifyContent: "center" }}>
            <Link href={`/${locale}/support/contact`} className="btn btn-primary" style={{ background: "var(--forest)", color: "var(--white)", borderColor: "var(--forest)" }}>
              {t("final.cta")}
            </Link>
          </div>
        </div>
      </section>

      <style>{`
        @media(max-width:900px) {
          #featured > .wrap > div { grid-template-columns: 1fr !important; }
          form { flex-direction: column !important; }
        }
      `}</style>
    </div>
  );
}
