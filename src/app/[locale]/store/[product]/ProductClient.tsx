"use client";

import { useTranslations, useLocale } from "next-intl";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, Plus, ChevronDown, CheckCircle2, ArrowRight } from "lucide-react";
import { RFQProvider, useRFQ } from "@/context/RFQContext";
import { AnimatePresence } from "framer-motion";

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

// Each product gets a unique secondary image
const PRODUCT_SECONDARY_IMAGES: Record<string, string[]> = {
  "white-copra": [
    "/assets/images/pexels-cottonbro-4631075.webp",
    "/assets/images/pexels-cmrcn-29132448.webp",
    "/assets/images/pexels-salah-ozil-78566588-29415944.webp",
  ],
  "black-copra": [
    "/assets/images/irene-kredenets-E95Lpkg-bgc-unsplash.webp",
    "/assets/images/pexels-pixabay-48884.webp",
    "/assets/images/manufacturing-3.webp",
  ],
  "coconut-charcoal": [
    "/assets/images/manufacturing-4.webp",
    "/assets/images/pexels-alexeydemidov-11120914.webp",
    "/assets/images/manufacturing-5.webp",
  ],
  "coconut-oil": [
    "/assets/images/kateryna-ivanova-KQSedNnCFvk-unsplash.webp",
    "/assets/images/engin-akyurt-1g3fkv6t23M-unsplash.webp",
    "/assets/images/tijana-drndarski-BNZrKnocA3c-unsplash.webp",
  ],
  "cocopeat": [
    "/assets/images/pexels-ayomide-isaac-66354580-12392906.webp",
    "/assets/images/pexels-quang-nguyen-vinh-222549-8280856.webp",
    "/assets/images/shibi-zidhick-DES_XhqBU2E-unsplash.webp",
  ],
};

export default function ProductClient({ slug }: { slug: string }) {
  const t = useTranslations("storePage");
  const locale = useLocale();
  const { addItem } = useRFQ();
  const [activeImage, setActiveImage] = useState(0);
  const [openSpec, setOpenSpec] = useState(true);

  const products = t.raw("products") as Product[];
  const product = products.find(p => p.slug === slug);
  const otherProducts = products.filter(p => p.slug !== slug && p.status !== "coming_soon").slice(0, 3);

  if (!product) {
    return (
      <div style={{ padding: "200px 0", textAlign: "center" }}>
        <p style={{ color: "var(--charcoal-soft)", fontSize: "18px" }}>Product not found.</p>
        <Link href={`/${locale}/store`} style={{ color: "var(--forest)", marginTop: "16px", display: "inline-block" }}>← Back to Store</Link>
      </div>
    );
  }

  const gallery = [product.image, ...(PRODUCT_SECONDARY_IMAGES[product.slug] ?? [])];
  const specEntries = Object.entries(product.specs);

  return (
    <div style={{ background: "var(--ivory)", color: "var(--charcoal)" }}>

      {/* Breadcrumb */}
      <div style={{ background: "var(--ivory-dim)", borderBottom: "1px solid var(--line)", padding: "16px 0" }}>
        <div className="wrap" style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <Link href={`/${locale}/store`} style={{ display: "inline-flex", alignItems: "center", gap: "8px", color: "var(--charcoal-soft)", fontSize: "14px", textDecoration: "none" }}>
            <ArrowLeft size={14} /> Store
          </Link>
          <span style={{ color: "var(--line)", fontSize: "14px" }}>/</span>
          <span style={{ fontSize: "14px", color: "var(--forest-dark)", fontWeight: 600 }}>{product.name}</span>
        </div>
      </div>

      {/* 1. PRODUCT HERO — 60/40 split */}
      <section style={{ padding: "80px 0", background: "var(--ivory)" }}>
        <div className="wrap">
          <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: "72px", alignItems: "start" }}>

            {/* Left: Gallery */}
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
              {/* Main image */}
              <div style={{ position: "relative", height: "500px", borderRadius: "24px", overflow: "hidden", marginBottom: "16px" }}>
                <Image src={gallery[activeImage]} alt={product.name} fill sizes="55vw" style={{ objectFit: "cover" }} priority />
                {/* Badge */}
                <div style={{ position: "absolute", top: "20px", left: "20px" }}>
                  <span style={{
                    fontFamily: "var(--font-mono)", fontSize: "10px", letterSpacing: "0.12em", padding: "6px 16px", borderRadius: "100px", textTransform: "uppercase",
                    background: product.badge === "Export Ready" ? "rgba(18,210,100,0.15)" : "rgba(200,170,100,0.15)",
                    color: product.badge === "Export Ready" ? "#4ade80" : "var(--sand)",
                    border: `1px solid ${product.badge === "Export Ready" ? "rgba(18,210,100,0.3)" : "rgba(200,170,100,0.3)"}`
                  }}>{product.badge}</span>
                </div>
              </div>

              {/* Thumbnails */}
              <div style={{ display: "grid", gridTemplateColumns: `repeat(${Math.min(gallery.length, 4)}, 1fr)`, gap: "12px" }}>
                {gallery.slice(0, 4).map((img, i) => (
                  <button key={i} onClick={() => setActiveImage(i)}
                    style={{ position: "relative", height: "100px", borderRadius: "12px", overflow: "hidden", border: `2px solid ${activeImage === i ? "var(--forest-dark)" : "transparent"}`, cursor: "pointer", background: "none", padding: 0 }}>
                    <Image src={img} alt={`Gallery ${i + 1}`} fill sizes="15vw" style={{ objectFit: "cover" }} />
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Right: Product Info — Sticky */}
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
              style={{ position: "sticky", top: "80px" }}>

              <span style={{ fontFamily: "var(--font-mono)", fontSize: "11px", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--forest)", display: "block", marginBottom: "12px" }}>{product.category}</span>
              <h1 style={{ fontFamily: "var(--font-fraunces)", fontSize: "clamp(2.5rem, 4vw, 3.5rem)", color: "var(--forest-dark)", lineHeight: 1.1, marginBottom: "16px" }}>{product.name}</h1>
              <p style={{ fontSize: "18px", color: "var(--charcoal-soft)", lineHeight: 1.7, marginBottom: "32px" }}>{product.desc}</p>

              {/* Applications pill cloud */}
              <div style={{ marginBottom: "32px" }}>
                <p style={{ fontSize: "12px", fontFamily: "var(--font-mono)", color: "var(--charcoal-soft)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "12px" }}>Applications</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                  {product.applications.map((app, i) => (
                    <span key={i} style={{ fontSize: "13px", color: "var(--forest-dark)", background: "rgba(18,40,31,0.07)", padding: "6px 16px", borderRadius: "100px", border: "1px solid rgba(18,40,31,0.1)" }}>{app}</span>
                  ))}
                </div>
              </div>

              {/* Key specs */}
              {specEntries.length > 0 && (
                <div style={{ marginBottom: "36px" }}>
                  <button onClick={() => setOpenSpec(!openSpec)}
                    style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 0", background: "none", border: "none", borderTop: "1px solid var(--line)", borderBottom: "1px solid var(--line)", cursor: "pointer" }}>
                    <span style={{ fontSize: "14px", fontFamily: "var(--font-mono)", color: "var(--forest-dark)", letterSpacing: "0.08em", textTransform: "uppercase" }}>Key Specifications</span>
                    <motion.div animate={{ rotate: openSpec ? 180 : 0 }}><ChevronDown size={16} style={{ color: "var(--charcoal-soft)" }} /></motion.div>
                  </button>
                  <AnimatePresence>
                    {openSpec && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} style={{ overflow: "hidden" }}>
                        <div style={{ paddingTop: "12px" }}>
                          {specEntries.map(([key, val], i) => (
                            <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px solid rgba(0,0,0,0.05)" }}>
                              <span style={{ fontSize: "14px", color: "var(--charcoal-soft)", textTransform: "capitalize" }}>{key.replace(/([A-Z])/g, " $1")}</span>
                              <span style={{ fontSize: "14px", fontWeight: 600, color: "var(--forest-dark)" }}>{val}</span>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}

              {/* MOQ note */}
              <div style={{ display: "flex", alignItems: "center", gap: "10px", padding: "14px 18px", background: "rgba(18,40,31,0.05)", borderRadius: "12px", marginBottom: "24px" }}>
                <CheckCircle2 size={16} style={{ color: "var(--forest)", flexShrink: 0 }} />
                <span style={{ fontSize: "13px", color: "var(--charcoal-soft)" }}>MOQ: 1 × 20ft container — pricing provided upon RFQ</span>
              </div>

              {/* CTA */}
              {product.status !== "coming_soon" ? (
                <button onClick={() => addItem({ id: product.id, name: product.name, image: product.image })}
                  style={{ width: "100%", padding: "18px", borderRadius: "100px", background: "var(--forest-dark)", color: "var(--ivory)", fontSize: "16px", fontWeight: 700, border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "10px" }}>
                  <Plus size={16} /> Add to RFQ Cart
                </button>
              ) : (
                <button style={{ width: "100%", padding: "18px", borderRadius: "100px", background: "rgba(0,0,0,0.1)", color: "var(--charcoal-soft)", fontSize: "16px", fontWeight: 700, border: "none", cursor: "not-allowed" }}>
                  Coming Soon
                </button>
              )}
              <Link href={`/${locale}/support/contact`} style={{ display: "block", textAlign: "center", marginTop: "16px", fontSize: "14px", color: "var(--forest)", textDecoration: "none", fontWeight: 600 }}>
                Contact Sales Team →
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. RELATED PRODUCTS */}
      {otherProducts.length > 0 && (
        <section style={{ padding: "80px 0", background: "var(--ivory-dim)", borderTop: "1px solid var(--line)" }}>
          <div className="wrap">
            <h2 style={{ fontFamily: "var(--font-fraunces)", fontSize: "clamp(2rem, 3.5vw, 3rem)", color: "var(--forest-dark)", marginBottom: "48px" }}>Related Products</h2>
            <div className="related-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "24px" }}>
              {otherProducts.map((p, i) => (
                <Link href={`/${locale}/store/${p.slug}`} key={p.id} style={{ textDecoration: "none" }} className="related-card">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    style={{ display: "flex", flexDirection: "column", gap: "16px", cursor: "pointer" }}>
                    
                    <div style={{ position: "relative", aspectRatio: "4/3", borderRadius: "16px", overflow: "hidden", background: "var(--ivory)", border: "1px solid var(--line)" }}>
                      <Image src={p.image} alt={p.name} fill sizes="30vw" style={{ objectFit: "cover", transition: "transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)" }} className="related-img" />
                    </div>

                    <div>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "8px", gap: "12px" }}>
                        <h4 style={{ fontFamily: "var(--font-fraunces)", fontSize: "1.25rem", color: "var(--forest-dark)", fontWeight: 600, lineHeight: 1.2 }}>{p.name}</h4>
                        <span style={{ fontSize: "11px", color: "var(--forest)", background: "rgba(18,40,31,0.06)", padding: "4px 8px", borderRadius: "6px", fontFamily: "var(--font-mono)", fontWeight: 600, letterSpacing: "0.05em", whiteSpace: "nowrap" }}>
                          {p.category.toUpperCase()}
                        </span>
                      </div>
                      <span className="related-cta" style={{ fontSize: "14px", color: "var(--charcoal-soft)", fontWeight: 600, display: "inline-flex", alignItems: "center", gap: "6px", transition: "color 0.2s" }}>
                        View Product <ArrowRight size={14} />
                      </span>
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}


      <style dangerouslySetInnerHTML={{ __html: `
        .related-card:hover .related-img {
          transform: scale(1.05);
        }
        .related-card:hover .related-cta {
          color: var(--forest) !important;
        }
        @media (max-width: 900px) {
          .related-grid {
            grid-template-columns: 1fr !important;
            gap: 32px !important;
          }
        }
      `}} />
    </div>
  );
}
