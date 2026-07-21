"use client";

import { useTranslations, useLocale } from "next-intl";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Plus, X, ShoppingCart, ArrowRight, Factory, Shield, Ship, Leaf, Clock, Headphones, ChevronDown, Send } from "lucide-react";
import { RFQProvider, useRFQ } from "@/context/RFQContext";
import ComingSoonModal from "@/components/ComingSoonModal";

type Product = {
  id: string;
  name: string;
  category: string;
  slug: string;
  tagline: string;
  desc: string;
  applications: string[];
  badge: string;
  status: string;
  image: string;
  specs: Record<string, string>;
};

const WHY_ICONS: Record<string, React.ReactNode> = {
  factory: <Factory size={18} />,
  shield: <Shield size={18} />,
  ship: <Ship size={18} />,
  leaf: <Leaf size={18} />,
  clock: <Clock size={18} />,
  headset: <Headphones size={18} />,
};



export default function StoreClient() {
  const t = useTranslations("storePage");
  const locale = useLocale();
  const { addItem, items, setIsOpen, isOpen } = useRFQ();
  const [activeFilter, setActiveFilter] = useState(t("filter.all"));
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);
  const [showComingSoon, setShowComingSoon] = useState(false);

  const products = t.raw("products") as Product[];
  const filterCategories = t.raw("filter.categories") as string[];
  const whyItems = t.raw("why.items") as { icon: string; text: string }[];

  const allFilters = [t("filter.all"), ...filterCategories];

  const filteredProducts = activeFilter === t("filter.all")
    ? products
    : products.filter(p => p.category === activeFilter);

  return (
    <div style={{ background: "var(--ivory)", color: "var(--charcoal)" }}>

      {/* Floating RFQ button */}
      {items.length > 0 && (
        <motion.button
          initial={{ scale: 0 }} animate={{ scale: 1 }}
          onClick={() => setIsOpen(!isOpen)}
          style={{ position: "fixed", bottom: "32px", right: "32px", zIndex: 998, width: "64px", height: "64px", borderRadius: "50%", background: "var(--forest-dark)", border: "2px solid var(--sand)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 8px 32px rgba(0,0,0,0.3)" }}>
          <ShoppingCart size={24} style={{ color: "var(--sand)" }} />
          <div style={{ position: "absolute", top: "-6px", right: "-6px", width: "22px", height: "22px", borderRadius: "50%", background: "var(--sand)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "11px", fontWeight: 700, color: "var(--forest-dark)" }}>
            {items.reduce((s, i) => s + i.quantity, 0)}
          </div>
        </motion.button>
      )}

      {/* 1. HERO */}
      <section className="hero-section" style={{ position: "relative", minHeight: "80vh", display: "flex", flexDirection: "column", justifyContent: "flex-end", background: "var(--forest-dark)", overflow: "hidden" }}>
        <Image src="/assets/images/pexels-picasjoe-11402585.webp" alt="B2B Coconut Store" fill priority sizes="100vw" style={{ objectFit: "cover", opacity: 0.28, zIndex: 0 }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(15,26,21,1) 0%, rgba(15,26,21,0.7) 50%, rgba(15,26,21,0.2) 100%)", zIndex: 1 }} />

        <div className="wrap" style={{ position: "relative", zIndex: 2, paddingBottom: "80px", paddingTop: "160px" }}>
          <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "11px", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--sand)", display: "block", marginBottom: "20px" }}>{t("hero.eyebrow")}</span>
            <h1 style={{ fontFamily: "var(--font-fraunces)", fontSize: "clamp(3rem, 6vw, 6.5rem)", lineHeight: 1.0, color: "var(--ivory)", marginBottom: "24px", maxWidth: "720px" }}>
              {t("hero.headline")}
            </h1>
            <p style={{ fontSize: "18px", color: "rgba(251,250,246,0.72)", lineHeight: 1.65, maxWidth: "560px", marginBottom: "40px" }}>
              {t("hero.copy")}
            </p>
            <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
              <a href="#products" style={{ display: "inline-flex", alignItems: "center", gap: "10px", padding: "16px 28px", borderRadius: "100px", background: "var(--sand)", color: "var(--forest-dark)", fontSize: "15px", fontWeight: 700, textDecoration: "none" }}>
                {t("hero.cta1")} <ArrowRight size={16} />
              </a>
              <button onClick={() => setIsOpen(true)} style={{ display: "inline-flex", alignItems: "center", gap: "10px", padding: "16px 28px", borderRadius: "100px", border: "1px solid rgba(255,255,255,0.25)", color: "var(--ivory)", fontSize: "15px", fontWeight: 600, background: "none", cursor: "pointer" }}>
                <ShoppingCart size={16} /> {t("hero.cta2")}
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. FILTER BAR — Sticky */}
      <div id="products" style={{ position: "sticky", top: "0", zIndex: 100, background: "var(--ivory)", borderBottom: "1px solid var(--line)", boxShadow: "0 2px 16px rgba(0,0,0,0.04)" }}>
        <div className="wrap" style={{ display: "flex", gap: "8px", padding: "16px 0", overflowX: "auto", scrollbarWidth: "none" }}>
          <LayoutGroup>
            {allFilters.map((cat, i) => (
              <motion.button key={i} layout onClick={() => setActiveFilter(cat)}
                style={{ flexShrink: 0, position: "relative", padding: "10px 22px", borderRadius: "100px", border: "1px solid", borderColor: activeFilter === cat ? "var(--forest-dark)" : "var(--line)", background: "transparent", color: activeFilter === cat ? "var(--ivory)" : "var(--charcoal-soft)", fontSize: "14px", fontWeight: activeFilter === cat ? 700 : 500, cursor: "pointer", overflow: "hidden" }}>
                {activeFilter === cat && (
                  <motion.div layoutId="filter-bg" style={{ position: "absolute", inset: 0, background: "var(--forest-dark)", borderRadius: "100px", zIndex: 0 }} transition={{ type: "spring", bounce: 0.2, duration: 0.5 }} />
                )}
                <span style={{ position: "relative", zIndex: 1 }}>{cat}</span>
              </motion.button>
            ))}
          </LayoutGroup>
        </div>
      </div>

      {/* 3. PRODUCT GRID — Asymmetric masonry */}
      <section style={{ padding: "80px 0", background: "var(--ivory)" }}>
        <div className="wrap">
          <AnimatePresence mode="wait">
            <motion.div key={activeFilter}
              className="store-masonry-grid"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}
              style={{ display: "grid", gridTemplateColumns: "repeat(12, 1fr)", gap: "20px" }}>
              {filteredProducts.map((product, i) => {
                // First active product spans 7/12, rest span 5/12, then alternate
                const colSpan = i === 0 ? "span 7" : i === 1 ? "span 5" : i % 2 === 0 ? "span 5" : "span 7";
                const height = i === 0 ? "520px" : "420px";

                return (
                  <motion.div key={product.id}
                    layout
                    className="store-masonry-item"
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.08 }}
                    onMouseEnter={() => setHoveredProduct(product.id)}
                    onMouseLeave={() => setHoveredProduct(null)}
                    style={{ gridColumn: colSpan, position: "relative", height, borderRadius: "20px", overflow: "hidden", cursor: "pointer" }}>

                    {/* Product image */}
                    <div style={{ position: "absolute", inset: 0 }}>
                      <Image src={product.image} alt={product.name} fill sizes="60vw" style={{ objectFit: "cover", transition: "transform 0.6s ease", transform: hoveredProduct === product.id ? "scale(1.04)" : "scale(1)" }} />
                    </div>

                    {/* Gradient overlay */}
                    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(15,26,21,0.96) 0%, rgba(15,26,21,0.3) 55%, rgba(15,26,21,0.1) 100%)" }} />

                    {/* Coming Soon dim — clickable */}
                    {product.status === "coming_soon" && (
                      <button onClick={() => setShowComingSoon(true)}
                        style={{ position: "absolute", inset: 0, background: "rgba(15,26,21,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 2, border: "none", cursor: "pointer", width: "100%" }}>
                        <span style={{ fontFamily: "var(--font-mono)", fontSize: "14px", letterSpacing: "0.15em", color: "var(--sand)", background: "rgba(15,26,21,0.7)", padding: "10px 24px", borderRadius: "100px", border: "1px solid rgba(200,170,100,0.3)" }}>COMING SOON</span>
                      </button>
                    )}

                    {/* Badge */}
                    <div style={{ position: "absolute", top: "20px", left: "20px", zIndex: 3 }}>
                      <span style={{
                        fontFamily: "var(--font-mono)", fontSize: "10px", letterSpacing: "0.1em", padding: "5px 14px", borderRadius: "100px",
                        background: product.badge === "Export Ready" ? "rgba(18,210,100,0.15)" : "rgba(200,170,100,0.15)",
                        color: product.badge === "Export Ready" ? "#4ade80" : "var(--sand)",
                        border: `1px solid ${product.badge === "Export Ready" ? "rgba(18,210,100,0.3)" : "rgba(200,170,100,0.3)"}`,
                        textTransform: "uppercase"
                      }}>{product.badge}</span>
                    </div>

                    {/* Content */}
                    <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "32px", zIndex: 3 }}>
                      <p style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "rgba(251,250,246,0.5)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "8px" }}>{product.category}</p>
                      <h3 style={{ fontFamily: "var(--font-fraunces)", fontSize: "clamp(1.4rem, 2.5vw, 2rem)", color: "var(--ivory)", lineHeight: 1.1, marginBottom: "8px" }}>{product.name}</h3>
                      <p style={{ fontSize: "14px", color: "rgba(251,250,246,0.6)", marginBottom: "24px", lineHeight: 1.5, maxWidth: "360px" }}>{product.tagline}</p>

                      {/* App tags */}
                      <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "20px" }}>
                        {product.applications.slice(0, 3).map((app, ai) => (
                          <span key={ai} style={{ fontSize: "12px", color: "rgba(251,250,246,0.6)", background: "rgba(255,255,255,0.08)", padding: "4px 12px", borderRadius: "100px" }}>{app}</span>
                        ))}
                      </div>

                      {/* Actions */}
                      <div style={{ display: "flex", gap: "12px" }}>
                        <Link href={`/${locale}/store/${product.slug}`}
                          style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "11px 20px", borderRadius: "100px", border: "1px solid rgba(251,250,246,0.25)", color: "var(--ivory)", fontSize: "13px", fontWeight: 600, textDecoration: "none" }}>
                          View Details
                        </Link>
                        {product.status !== "coming_soon" && (
                          <button onClick={() => addItem({ id: product.id, name: product.name, image: product.image })}
                            style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "11px 20px", borderRadius: "100px", background: "var(--sand)", color: "var(--forest-dark)", fontSize: "13px", fontWeight: 700, border: "none", cursor: "pointer" }}>
                            <Plus size={14} /> Add to RFQ
                          </button>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* 4. WHY HANCOCO — Marquee strip */}
      <section style={{ background: "var(--forest)", overflow: "hidden", padding: "0" }}>
        <div style={{ overflow: "hidden", padding: "32px 0" }}>
          <motion.div animate={{ x: ["0%", "-50%"] }} transition={{ repeat: Infinity, duration: 18, ease: "linear" }}
            style={{ display: "flex", width: "max-content" }}>
            {[...whyItems, ...whyItems].map((item, i) => (
              <div key={i} style={{ display: "inline-flex", alignItems: "center", gap: "12px", padding: "0 36px", whiteSpace: "nowrap", borderRight: "1px solid rgba(251,250,246,0.1)" }}>
                <span style={{ color: "var(--sand)" }}>{WHY_ICONS[item.icon]}</span>
                <span style={{ fontFamily: "var(--font-fraunces)", fontSize: "16px", color: "var(--ivory)", fontWeight: 500 }}>{item.text}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 5. FINAL CTA */}
      <section style={{ padding: "120px 0", textAlign: "center", background: "var(--ivory)" }}>
        <div className="wrap" style={{ maxWidth: "700px", margin: "0 auto" }}>
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 style={{ fontFamily: "var(--font-fraunces)", fontSize: "clamp(2.5rem, 5vw, 4rem)", color: "var(--forest-dark)", marginBottom: "24px", lineHeight: 1.1 }}>
              Ready to Request a Quotation?
            </h2>
            <p style={{ fontSize: "18px", color: "var(--charcoal-soft)", marginBottom: "40px", lineHeight: 1.6 }}>
              Select the products above and submit your RFQ. Our export team responds within 1–3 business days.
            </p>
            <div style={{ display: "flex", gap: "16px", justifyContent: "center" }}>
              <button onClick={() => setIsOpen(true)} style={{ display: "inline-flex", alignItems: "center", gap: "10px", padding: "16px 28px", borderRadius: "100px", background: "var(--forest-dark)", color: "var(--ivory)", fontSize: "15px", fontWeight: 700, border: "none", cursor: "pointer" }}>
                <ShoppingCart size={16} /> View RFQ Cart
              </button>
              <Link href={`/${locale}/support/contact`} style={{ display: "inline-flex", alignItems: "center", gap: "10px", padding: "16px 28px", borderRadius: "100px", border: "1px solid var(--line)", color: "var(--charcoal)", fontSize: "15px", fontWeight: 600, textDecoration: "none" }}>
                Contact Sales <ArrowRight size={16} />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <ComingSoonModal open={showComingSoon} onClose={() => setShowComingSoon(false)} />

      <style dangerouslySetInnerHTML={{ __html: `
        @media (max-width: 900px) {
          .store-masonry-grid {
            display: flex !important;
            flex-direction: column !important;
          }
          .store-masonry-item {
            height: 420px !important;
          }
          .rfq-panel {
            width: 100vw !important;
          }
          .rfq-panel-header, .rfq-panel-body {
            padding: 24px 20px !important;
          }
        }
      `}} />
    </div>
  );
}


