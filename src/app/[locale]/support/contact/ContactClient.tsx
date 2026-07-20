"use client";

import { useTranslations, useLocale } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Package, Ship, Handshake, Info, MapPin, Mail, Phone, Clock, ChevronDown, ArrowRight, ExternalLink } from "lucide-react";

const ICON_MAP: Record<string, React.ReactNode> = {
  package: <Package size={24} />,
  ship: <Ship size={24} />,
  handshake: <Handshake size={24} />,
  info: <Info size={24} />,
};

const OPTION_IMAGES = [
  "/assets/images/pexels-picasjoe-11402585.webp",
  "/assets/images/rusty-watson-W8P1WeOU1XI-unsplash.webp",
  "/assets/images/nisha-ramesh-IiiTDxnHDzg-unsplash.webp",
  "/assets/images/pexels-cottonbro-4631075.webp",
];

export default function ContactClient() {
  const t = useTranslations("contactPage");
  const locale = useLocale();
  const [activeOption, setActiveOption] = useState<number | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [formData, setFormData] = useState({ inquiryType: "", product: "", company: "", contact: "", email: "", country: "", whatsapp: "", message: "" });

  const options = t.raw("options.items") as { icon: string; title: string; desc: string; cta: string }[];
  const inquiryOptions = t.raw("form.inquiryOptions") as string[];
  const productOptions = t.raw("form.productOptions") as string[];
  const markets = t.raw("global.markets") as string[];
  const faqItems = t.raw("faq.items") as { q: string; a: string }[];

  const optionColors = ["#12281F", "#1A3A2A", "#0F2219", "#1D3D2B"];

  return (
    <div style={{ background: "var(--ivory)", color: "var(--charcoal)" }}>

      {/* 1. HERO — Cinematic split with form anchor */}
      <section style={{ position: "relative", minHeight: "90vh", display: "flex", alignItems: "center", background: "var(--forest-dark)", overflow: "hidden" }}>
        <Image src="/assets/images/aleksey-kuprikov-c-AXdFRil_w-unsplash.webp" alt="Business Development" fill priority sizes="100vw" style={{ objectFit: "cover", opacity: 0.22, zIndex: 0 }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(15,26,21,0.99) 45%, rgba(15,26,21,0.6) 75%, transparent 100%)", zIndex: 1 }} />

        <div className="wrap" style={{ position: "relative", zIndex: 2, display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", alignItems: "center", paddingTop: "100px", paddingBottom: "80px" }}>
          {/* Left: Headline */}
          <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.9 }}>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "11px", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--sand)", display: "block", marginBottom: "24px" }}>{t("hero.eyebrow")}</span>
            <h1 style={{ fontFamily: "var(--font-fraunces)", fontSize: "clamp(3rem, 5.5vw, 5.5rem)", lineHeight: 1.0, color: "var(--ivory)", marginBottom: "28px" }}>
              {t("hero.headline")}
            </h1>
            <p style={{ fontSize: "18px", color: "rgba(251,250,246,0.72)", lineHeight: 1.65, marginBottom: "48px", maxWidth: "480px" }}>
              {t("hero.copy")}
            </p>
            <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
              <a href="#form" style={{ display: "inline-flex", alignItems: "center", gap: "10px", padding: "16px 28px", borderRadius: "100px", background: "var(--sand)", color: "var(--forest-dark)", fontSize: "15px", fontWeight: 700, textDecoration: "none" }}>
                {t("hero.cta1")} <ArrowRight size={16} />
              </a>
              <a href="https://wa.me/62xxxxxxxx" target="_blank" rel="noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: "10px", padding: "16px 28px", borderRadius: "100px", border: "1px solid rgba(251,250,246,0.25)", color: "var(--ivory)", fontSize: "15px", fontWeight: 600, textDecoration: "none" }}>
                {t("hero.cta2")} <ExternalLink size={14} />
              </a>
            </div>
          </motion.div>

          {/* Right: Contact Info Floater */}
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.3 }}
            style={{ background: "rgba(255,255,255,0.04)", backdropFilter: "blur(16px)", border: "1px solid rgba(251,250,246,0.1)", borderRadius: "24px", padding: "40px" }}>
            <p style={{ fontFamily: "var(--font-mono)", fontSize: "11px", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--sand)", marginBottom: "28px" }}>CONTACT INFORMATION</p>
            {[
              { icon: <Mail size={18} />, label: "Email", value: t("office.email") },
              { icon: <Phone size={18} />, label: "WhatsApp", value: t("office.whatsapp") },
              { icon: <MapPin size={18} />, label: "Location", value: t("office.address") },
              { icon: <Clock size={18} />, label: "Office Hours", value: t("office.hours") },
            ].map((item, i) => (
              <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "16px", paddingBottom: "20px", marginBottom: "20px", borderBottom: i < 3 ? "1px solid rgba(251,250,246,0.08)" : "none" }}>
                <div style={{ color: "var(--sand)", marginTop: "2px", flexShrink: 0 }}>{item.icon}</div>
                <div>
                  <p style={{ fontSize: "11px", fontFamily: "var(--font-mono)", color: "rgba(251,250,246,0.4)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "4px" }}>{item.label}</p>
                  <p style={{ fontSize: "15px", color: "var(--ivory)", fontWeight: 500 }}>{item.value}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 2. CONTACT OPTIONS — 4 expanding vertical strips */}
      <section style={{ padding: "0", background: "var(--forest-dark)", overflow: "hidden" }}>
        <div className="contact-options-container" style={{ display: "flex", height: "500px" }}>
          {options.map((opt, i) => (
            <motion.div key={i}
              className="contact-option"
              animate={{ flex: activeOption === i ? 3 : 1 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              onMouseEnter={() => setActiveOption(i)}
              onMouseLeave={() => setActiveOption(null)}
              style={{ position: "relative", overflow: "hidden", cursor: "pointer", background: optionColors[i], display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "40px" }}
            >
              {/* Background Image */}
              <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
                <Image src={OPTION_IMAGES[i]} alt={opt.title} fill sizes="(max-width: 900px) 100vw, 25vw" style={{ objectFit: "cover", opacity: activeOption === i ? 0.6 : 0.25, transition: "opacity 0.6s ease" }} />
              </div>
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(15,26,21,1) 0%, rgba(15,26,21,0.4) 50%, transparent 100%)", zIndex: 0 }} />

              {/* Step number */}
              <div style={{ position: "absolute", top: "32px", left: "32px", fontFamily: "var(--font-fraunces)", fontSize: "80px", color: "rgba(255,255,255,0.04)", fontWeight: 700, lineHeight: 1, userSelect: "none" }}>
                0{i + 1}
              </div>

              <div style={{ position: "relative", zIndex: 1 }}>
                <div style={{ color: "var(--sand)", marginBottom: "16px" }}>{ICON_MAP[opt.icon]}</div>
                <h3 style={{ fontFamily: "var(--font-fraunces)", fontSize: "clamp(1.3rem, 2vw, 1.8rem)", color: "var(--ivory)", lineHeight: 1.1, marginBottom: "12px" }}>{opt.title}</h3>
                <AnimatePresence>
                  {activeOption === i && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.3 }}>
                      <p style={{ fontSize: "15px", color: "rgba(251,250,246,0.7)", lineHeight: 1.6, marginBottom: "24px", maxWidth: "320px" }}>{opt.desc}</p>
                      <a href="#form" style={{ display: "inline-flex", alignItems: "center", gap: "8px", color: "var(--sand)", fontSize: "14px", fontWeight: 600, textDecoration: "none" }}>
                        {opt.cta} <ArrowRight size={14} />
                      </a>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 3. SMART INQUIRY FORM */}
      <section id="form" style={{ padding: "120px 0", background: "var(--ivory)" }}>
        <div className="wrap">
          <div className="contact-form-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: "80px", alignItems: "start" }}>
            {/* Left: Copy */}
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "11px", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--forest)", display: "block", marginBottom: "16px" }}>INQUIRY FORM</span>
              <h2 style={{ fontFamily: "var(--font-fraunces)", fontSize: "clamp(2.5rem, 4vw, 3.8rem)", color: "var(--forest-dark)", lineHeight: 1.1, marginBottom: "24px" }}>
                {t("form.headline")}
              </h2>
              <p style={{ fontSize: "17px", color: "var(--charcoal-soft)", lineHeight: 1.7, marginBottom: "48px" }}>{t("form.copy")}</p>

              {/* Large image */}
              <div style={{ position: "relative", height: "320px", borderRadius: "20px", overflow: "hidden" }}>
                <Image src="/assets/images/pexels-picasjoe-11402585.webp" alt="Business Partnership" fill sizes="40vw" style={{ objectFit: "cover" }} />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(15,26,21,0.7) 0%, transparent 50%)" }} />
                <div style={{ position: "absolute", bottom: "28px", left: "28px" }}>
                  <p style={{ fontFamily: "var(--font-fraunces)", fontSize: "20px", color: "var(--ivory)", lineHeight: 1.2 }}>Your trusted coconut<br />commodity partner.</p>
                </div>
              </div>
            </motion.div>

            {/* Right: Form */}
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }}
              style={{ background: "var(--forest-dark)", borderRadius: "24px", padding: "48px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>

                {/* Inquiry Type - full width */}
                <div style={{ gridColumn: "1 / -1" }}>
                  <label style={{ display: "block", fontSize: "12px", fontFamily: "var(--font-mono)", color: "rgba(251,250,246,0.5)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "8px" }}>{t("form.inquiryType")}</label>
                  <select value={formData.inquiryType} onChange={e => setFormData(p => ({ ...p, inquiryType: e.target.value }))}
                    style={{ width: "100%", padding: "14px 18px", borderRadius: "12px", border: "1px solid rgba(251,250,246,0.15)", background: "rgba(255,255,255,0.06)", color: "var(--ivory)", fontSize: "15px", outline: "none" }}>
                    <option value="" style={{ background: "#12281F" }}>Select inquiry type...</option>
                    {inquiryOptions.map((o, i) => <option key={i} value={o} style={{ background: "#12281F" }}>{o}</option>)}
                  </select>
                </div>

                {/* Product Interest - full width */}
                <div style={{ gridColumn: "1 / -1" }}>
                  <label style={{ display: "block", fontSize: "12px", fontFamily: "var(--font-mono)", color: "rgba(251,250,246,0.5)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "8px" }}>{t("form.product")}</label>
                  <select value={formData.product} onChange={e => setFormData(p => ({ ...p, product: e.target.value }))}
                    style={{ width: "100%", padding: "14px 18px", borderRadius: "12px", border: "1px solid rgba(251,250,246,0.15)", background: "rgba(255,255,255,0.06)", color: "var(--ivory)", fontSize: "15px", outline: "none" }}>
                    <option value="" style={{ background: "#12281F" }}>Select product...</option>
                    {productOptions.map((o, i) => <option key={i} value={o} style={{ background: "#12281F" }}>{o}</option>)}
                  </select>
                </div>

                {/* Other fields */}
                {[
                  { key: "company", label: t("form.company"), col: "1 / -1" },
                  { key: "contact", label: t("form.contact"), col: "auto" },
                  { key: "email", label: t("form.email"), col: "auto" },
                  { key: "country", label: t("form.country"), col: "auto" },
                  { key: "whatsapp", label: t("form.whatsapp"), col: "auto" },
                ].map(field => (
                  <div key={field.key} style={{ gridColumn: field.col }}>
                    <label style={{ display: "block", fontSize: "12px", fontFamily: "var(--font-mono)", color: "rgba(251,250,246,0.5)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "8px" }}>{field.label}</label>
                    <input type="text" value={formData[field.key as keyof typeof formData]} onChange={e => setFormData(p => ({ ...p, [field.key]: e.target.value }))}
                      style={{ width: "100%", padding: "14px 18px", borderRadius: "12px", border: "1px solid rgba(251,250,246,0.15)", background: "rgba(255,255,255,0.06)", color: "var(--ivory)", fontSize: "15px", outline: "none", boxSizing: "border-box" }} />
                  </div>
                ))}

                {/* Message - full width */}
                <div style={{ gridColumn: "1 / -1" }}>
                  <label style={{ display: "block", fontSize: "12px", fontFamily: "var(--font-mono)", color: "rgba(251,250,246,0.5)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "8px" }}>{t("form.message")}</label>
                  <textarea rows={4} placeholder={t("form.messagePlaceholder")} value={formData.message} onChange={e => setFormData(p => ({ ...p, message: e.target.value }))}
                    style={{ width: "100%", padding: "14px 18px", borderRadius: "12px", border: "1px solid rgba(251,250,246,0.15)", background: "rgba(255,255,255,0.06)", color: "var(--ivory)", fontSize: "15px", outline: "none", resize: "vertical", boxSizing: "border-box" }} />
                </div>

                {/* Submit */}
                <div style={{ gridColumn: "1 / -1" }}>
                  <button type="submit" style={{ width: "100%", padding: "18px", borderRadius: "100px", background: "var(--sand)", color: "var(--forest-dark)", fontSize: "16px", fontWeight: 700, border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "10px" }}>
                    {t("form.submit")} <ArrowRight size={16} />
                  </button>
                  <p style={{ fontSize: "12px", color: "rgba(251,250,246,0.4)", textAlign: "center", marginTop: "16px", lineHeight: 1.5 }}>{t("form.note")}</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 4. GLOBAL MARKETS — Infinite marquee */}
      <section style={{ padding: "0", background: "var(--forest)", overflow: "hidden" }}>
        <div style={{ padding: "20px 0", borderBottom: "1px solid rgba(251,250,246,0.1)" }}>
          <p style={{ fontFamily: "var(--font-mono)", fontSize: "11px", letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(251,250,246,0.5)", textAlign: "center", marginBottom: "0" }}>{t("global.headline")}</p>
        </div>
        <div style={{ overflow: "hidden", padding: "28px 0" }}>
          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
            style={{ display: "flex", width: "max-content", gap: 0 }}
          >
            {[...markets, ...markets].map((m, i) => (
              <span key={i} style={{ display: "inline-flex", alignItems: "center", gap: "20px", padding: "0 36px", fontFamily: "var(--font-fraunces)", fontSize: "clamp(1rem, 1.8vw, 1.3rem)", color: "var(--ivory)", fontWeight: 500, whiteSpace: "nowrap" }}>
                {m} <span style={{ color: "var(--sand)", fontSize: "18px" }}>✦</span>
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 5. QUICK FAQ */}
      <section style={{ padding: "100px 0", background: "var(--ivory-dim)" }}>
        <div className="wrap" style={{ maxWidth: "800px", margin: "0 auto" }}>
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ marginBottom: "48px", textAlign: "center" }}>
            <h2 style={{ fontFamily: "var(--font-fraunces)", fontSize: "clamp(2rem, 3.5vw, 3rem)", color: "var(--forest-dark)", lineHeight: 1.1 }}>{t("faq.headline")}</h2>
          </motion.div>
          <div style={{ borderTop: "1px solid var(--line)" }}>
            {faqItems.map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "24px 0", background: "none", border: "none", borderBottom: "1px solid var(--line)", cursor: "pointer", textAlign: "left", gap: "24px" }}>
                  <span style={{ fontFamily: "var(--font-fraunces)", fontSize: "18px", color: "var(--forest-dark)", fontWeight: 500 }}>{item.q}</span>
                  <motion.div animate={{ rotate: openFaq === i ? 180 : 0 }} transition={{ duration: 0.3 }}>
                    <ChevronDown size={20} style={{ color: "var(--charcoal-soft)", flexShrink: 0 }} />
                  </motion.div>
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }}
                      style={{ overflow: "hidden" }}>
                      <p style={{ fontSize: "15px", color: "var(--charcoal-soft)", lineHeight: 1.7, padding: "16px 0 24px" }}>{item.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: "48px" }}>
            <Link href={`/${locale}/support/faq`} style={{ fontFamily: "var(--font-fraunces)", fontSize: "16px", color: "var(--forest)", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "8px" }}>
              View All FAQs <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* 6. FINAL CTA */}
      <section style={{ padding: "120px 0", background: "var(--forest-dark)", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, opacity: 0.06 }}>
          <Image src="/assets/images/hector-john-periquin-zWn9bXRq2-U-unsplash.webp" alt="" fill sizes="100vw" style={{ objectFit: "cover" }} />
        </div>
        <div className="wrap" style={{ position: "relative", zIndex: 1, maxWidth: "700px", margin: "0 auto" }}>
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 style={{ fontFamily: "var(--font-fraunces)", fontSize: "clamp(2.5rem, 5vw, 4rem)", color: "var(--ivory)", marginBottom: "40px", lineHeight: 1.1 }}>{t("final.headline")}</h2>
            <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
              <a href="#form" style={{ display: "inline-flex", alignItems: "center", gap: "10px", padding: "16px 28px", borderRadius: "100px", background: "var(--sand)", color: "var(--forest-dark)", fontSize: "15px", fontWeight: 700, textDecoration: "none" }}>
                {t("final.cta1")} <ArrowRight size={16} />
              </a>
              <Link href={`/${locale}/store`} style={{ display: "inline-flex", alignItems: "center", gap: "10px", padding: "16px 28px", borderRadius: "100px", border: "1px solid rgba(251,250,246,0.25)", color: "var(--ivory)", fontSize: "15px", fontWeight: 600, textDecoration: "none" }}>
                {t("final.cta2")}
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <style dangerouslySetInnerHTML={{ __html: `
        @media (max-width: 900px) {
          .contact-options-container {
            flex-direction: column !important;
            height: auto !important;
          }
          .contact-option {
            min-height: 180px !important;
            flex: none !important;
          }
          .contact-form-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
        }
      `}} />
    </div>
  );
}
