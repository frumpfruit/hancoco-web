"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Mail, MessageCircle, ChevronDown, Send } from "lucide-react";
import Image from "next/image";

export default function RFQSection() {
  const t = useTranslations("rfq");
  const locale = useLocale();
  const products: string[] = t.raw("products");

  const [formData, setFormData] = useState({
    company: "", country: "", product: "", quantity: "", port: "", message: "",
  });

  const handle = (k: string, v: string) => setFormData((prev) => ({ ...prev, [k]: v }));

  return (
    <section id="rfq" className="section" style={{ position: "relative", overflow: "hidden", background: "var(--ivory)", padding: "120px 0" }}>
      {/* Background Texture with Gradient Fades */}
      <div style={{
        position: "absolute",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
        opacity: 0.1,
        maskImage: "linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)",
        WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)"
      }}>
        <Image
          src="/assets/images/exporting-1.webp"
          alt="Export Ready Shipment"
          fill
          sizes="100vw"
          style={{ objectFit: "cover" }}
        />
      </div>

      <div className="wrap" style={{ position: "relative", zIndex: 1 }}>
        {/* Split panel (No outer box) */}
        <div style={{
          display: "grid", gridTemplateColumns: "1.1fr 0.9fr",
          gap: "80px", alignItems: "start"
        }}>

          {/* Left — Form */}
          <div className="form-panel" style={{ background: "var(--white)", padding: "56px 52px" }}>
            <span className="eyebrow">{t("eyebrow")}</span>
            <h2 style={{ fontFamily: "var(--font-fraunces)", fontSize: "clamp(1.8rem, 2.8vw, 2.4rem)", marginBottom: "36px" }}>
              {t("headline")}
            </h2>

            <form onSubmit={(e) => e.preventDefault()}>
              {/* Row 1 */}
              <div className="form-row" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" }}>
                {[
                  { key: "company", label: t("form.company"), type: "text" },
                  { key: "country", label: t("form.country"), type: "text" },
                ].map((field) => (
                  <div key={field.key} style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                    <label style={{ fontFamily: "var(--font-mono)", fontSize: "11.5px", letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--charcoal-soft)" }}>
                      {field.label}
                    </label>
                    <input
                      type={field.type}
                      value={formData[field.key as keyof typeof formData]}
                      onChange={(e) => handle(field.key, e.target.value)}
                      required
                      style={{
                        padding: "12px 14px", border: "1.5px solid var(--line)",
                        borderRadius: "8px", fontSize: "14px", outline: "none",
                        background: "var(--ivory)", fontFamily: "var(--font-body)",
                        transition: "border-color 0.2s",
                        color: "var(--charcoal)",
                      }}
                      onFocus={(e) => ((e.target as HTMLInputElement).style.borderColor = "var(--forest)")}
                      onBlur={(e) => ((e.target as HTMLInputElement).style.borderColor = "var(--line)")}
                    />
                  </div>
                ))}
              </div>

              {/* Product select */}
              <div style={{ display: "flex", flexDirection: "column", gap: "6px", marginBottom: "16px" }}>
                <label style={{ fontFamily: "var(--font-mono)", fontSize: "11.5px", letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--charcoal-soft)" }}>
                  {t("form.product")}
                </label>
                <div style={{ position: "relative" }}>
                  <select
                    value={formData.product}
                    onChange={(e) => handle("product", e.target.value)}
                    required
                    style={{
                      width: "100%", padding: "12px 40px 12px 14px",
                      border: "1.5px solid var(--line)", borderRadius: "8px",
                      fontSize: "14px", outline: "none", appearance: "none",
                      background: "var(--ivory)", fontFamily: "var(--font-body)",
                      color: "var(--charcoal)", cursor: "pointer",
                    }}
                    onFocus={(e) => ((e.target as HTMLSelectElement).style.borderColor = "var(--forest)")}
                    onBlur={(e) => ((e.target as HTMLSelectElement).style.borderColor = "var(--line)")}
                  >
                    <option value="">— Select —</option>
                    {products.map((p) => <option key={p} value={p}>{p}</option>)}
                  </select>
                  <ChevronDown size={14} style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", color: "var(--charcoal-soft)", pointerEvents: "none" }} />
                </div>
              </div>

              {/* Row 2 */}
              <div className="form-row" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" }}>
                {[
                  { key: "quantity", label: t("form.quantity") },
                  { key: "port", label: t("form.port") },
                ].map((field) => (
                  <div key={field.key} style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                    <label style={{ fontFamily: "var(--font-mono)", fontSize: "11.5px", letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--charcoal-soft)" }}>
                      {field.label}
                    </label>
                    <input
                      type="text"
                      value={formData[field.key as keyof typeof formData]}
                      onChange={(e) => handle(field.key, e.target.value)}
                      style={{
                        padding: "12px 14px", border: "1.5px solid var(--line)",
                        borderRadius: "8px", fontSize: "14px", outline: "none",
                        background: "var(--ivory)", fontFamily: "var(--font-body)",
                        color: "var(--charcoal)",
                      }}
                      onFocus={(e) => ((e.target as HTMLInputElement).style.borderColor = "var(--forest)")}
                      onBlur={(e) => ((e.target as HTMLInputElement).style.borderColor = "var(--line)")}
                    />
                  </div>
                ))}
              </div>

              {/* Message */}
              <div style={{ display: "flex", flexDirection: "column", gap: "6px", marginBottom: "28px" }}>
                <label style={{ fontFamily: "var(--font-mono)", fontSize: "11.5px", letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--charcoal-soft)" }}>
                  {t("form.message")}
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) => handle("message", e.target.value)}
                  placeholder={t("form.messagePlaceholder")}
                  rows={4}
                  style={{
                    padding: "12px 14px", border: "1.5px solid var(--line)",
                    borderRadius: "8px", fontSize: "14px", outline: "none",
                    resize: "vertical", background: "var(--ivory)",
                    fontFamily: "var(--font-body)", color: "var(--charcoal)", lineHeight: "1.55",
                  }}
                  onFocus={(e) => ((e.target as HTMLTextAreaElement).style.borderColor = "var(--forest)")}
                  onBlur={(e) => ((e.target as HTMLTextAreaElement).style.borderColor = "var(--line)")}
                />
              </div>

              <button type="submit" className="btn btn-primary" style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
                <Send size={16} /> {t("form.submit")}
              </button>
            </form>
          </div>

          {/* Right — Info panel */}
          <div className="info-panel" style={{ background: "var(--forest-dark)", color: "var(--ivory)", padding: "56px 44px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <div>
              <p style={{ fontFamily: "var(--font-mono)", fontSize: "12px", color: "var(--sand)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "28px" }}>
                {t("description")}
              </p>

              {/* Key details */}
              {[
                { label: "Response Time", value: "≤ 24 business hours" },
                { label: "Languages", value: "English · Bahasa Indonesia" },
                { label: "MOQ", value: "1x 20ft Container" },
                { label: "Incoterms", value: "FOB · CIF · CFR" },
                { label: "Payment", value: "T/T · L/C" },
              ].map(({ label, value }) => (
                <div key={label} style={{
                  display: "flex", justifyContent: "space-between",
                  padding: "14px 0", borderBottom: "1px solid rgba(255,255,255,0.08)",
                  gap: "20px",
                }}>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: "11.5px", color: "rgba(232,223,200,0.6)", letterSpacing: "0.04em" }}>{label}</span>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: "12px", color: "var(--ivory)", fontWeight: 500, textAlign: "right" }}>{value}</span>
                </div>
              ))}
            </div>

            {/* Direct contact */}
            <div style={{ marginTop: "40px" }}>
              <p style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "rgba(232,223,200,0.5)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "16px" }}>
                {t("form.or")}
              </p>
              <div style={{ display: "flex", gap: "12px" }}>
                <a href="https://wa.me/628000000000" className="btn btn-on-dark" style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13.5px", flex: 1, justifyContent: "center" }}>
                  <MessageCircle size={15} /> {t("form.whatsapp")}
                </a>
                <a href="mailto:sales@hancoco.com" className="btn btn-on-dark" style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13.5px", flex: 1, justifyContent: "center" }}>
                  <Mail size={15} /> {t("form.email")}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          #rfq > .wrap > div { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 640px) {
          #rfq .form-row { grid-template-columns: 1fr !important; }
          #rfq .form-panel { padding: 40px 24px !important; }
          #rfq .info-panel { padding: 40px 24px !important; }
        }
      `}</style>
    </section>
  );
}
