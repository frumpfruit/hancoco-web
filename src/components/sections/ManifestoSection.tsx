"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { useLocale } from "next-intl";
import { FileText, Phone } from "lucide-react";
import Image from "next/image";

export default function ManifestoSection() {
  const t = useTranslations("manifesto");
  const locale = useLocale();

  return (
    <section className="manifesto-section" style={{
      background: "var(--charcoal)", color: "var(--ivory)",
      padding: "120px 0",
      position: "relative", overflow: "hidden",
    }}>
      {/* Background Texture with Gradient Fades */}
      <div style={{
        position: "absolute",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
        opacity: 0.25,
        maskImage: "linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)",
        WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)"
      }}>
        <Image
          src="/assets/images/nisha-ramesh-IiiTDxnHDzg-unsplash.webp"
          alt="Manifesto Background"
          fill
          sizes="100vw"
          style={{ objectFit: "cover" }}
        />
      </div>
      {/* Background watermark */}
      <div style={{
        position: "absolute", inset: 0,
        display: "flex", alignItems: "center", justifyContent: "center",
        pointerEvents: "none", userSelect: "none",
        overflow: "hidden",
      }}>
        <span style={{
          fontFamily: "var(--font-fraunces)", fontWeight: 700,
          fontSize: "clamp(8rem, 18vw, 18rem)",
          color: "rgba(255,255,255,0.025)", letterSpacing: "-0.05em",
          whiteSpace: "nowrap",
        }}>
          HANCOCO
        </span>
      </div>

      <div className="wrap" style={{ position: "relative", zIndex: 1, textAlign: "center" }}>
        <span className="eyebrow on-dark">{t("eyebrow")}</span>

        {/* Big statement */}
        <h2 style={{
          fontFamily: "var(--font-fraunces)",
          fontSize: "clamp(2rem, 4.5vw, 4rem)",
          fontWeight: 600, lineHeight: "1.1",
          letterSpacing: "-0.02em",
          maxWidth: "800px", margin: "0 auto 24px",
          color: "var(--ivory)",
        }}>
          {t("headline")}
        </h2>

        <p style={{
          fontFamily: "var(--font-mono)", fontSize: "14px",
          color: "rgba(232,223,200,0.6)", letterSpacing: "0.08em",
          textTransform: "uppercase", marginBottom: "56px",
        }}>
          {t("sub")}
        </p>

          {/* 3 CTAs */}
        <div className="manifesto-ctas" style={{ display: "flex", gap: "14px", justifyContent: "center", flexWrap: "wrap" }}>
          <Link href={`/${locale}/store/rfq`} className="btn btn-primary manifesto-cta" style={{ fontSize: "15px", padding: "16px 28px" }}>
            {t("cta1")}
          </Link>
          <a href="/documents/hancoco-company-profile.pdf" className="btn btn-on-dark manifesto-cta" style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "15px", padding: "16px 28px" }}>
            <FileText size={16} /> {t("cta2")}
          </a>
          <Link href={`/${locale}/support/contact`} className="btn btn-on-dark manifesto-cta" style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "15px", padding: "16px 28px" }}>
            <Phone size={16} /> {t("cta3")}
          </Link>
        </div>

        {/* Decorative line */}
        <div style={{
          marginTop: "80px",
          height: "1px",
          background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent)",
        }} />

        <p style={{
          marginTop: "28px",
          fontFamily: "var(--font-mono)", fontSize: "11.5px",
          color: "rgba(232,223,200,0.35)", letterSpacing: "0.1em",
        }}>
          HANCOCO · INDONESIA · EST. 2020
        </p>
      </div>
      <style>{`
        @media (max-width: 768px) {
          .manifesto-section { padding: 80px 0 !important; }
        }
        @media (max-width: 480px) {
          .manifesto-section { padding: 60px 0 !important; }
        }
        @media (max-width: 640px) {
          .manifesto-ctas { flex-direction: column !important; }
          .manifesto-cta { width: 100% !important; justify-content: center !important; }
        }
      `}</style>
    </section>
  );
}
