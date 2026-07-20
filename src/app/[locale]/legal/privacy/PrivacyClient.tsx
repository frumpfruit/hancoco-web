"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { useLocale } from "next-intl";
import { Shield, ArrowLeft } from "lucide-react";

export default function PrivacyClient() {
  const t = useTranslations("privacyPage");
  const locale = useLocale();

  const sections = t.raw("sections") as { title: string; body: string }[];

  return (
    <div style={{ background: "var(--ivory)", color: "var(--charcoal)", minHeight: "100vh" }}>

      {/* Hero */}
      <section style={{
        background: "var(--charcoal)", color: "var(--ivory)",
        padding: "100px 0 60px", textAlign: "center",
      }}>
        <div className="wrap" style={{ maxWidth: "720px" }}>
          <div style={{
            width: "48px", height: "48px", borderRadius: "50%",
            background: "var(--forest-soft)", margin: "0 auto 24px",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <Shield size={22} style={{ color: "var(--sand)" }} />
          </div>
          <h1 style={{
            fontFamily: "var(--font-fraunces)", fontSize: "clamp(2rem, 4vw, 3rem)",
            lineHeight: 1.15, marginBottom: "12px",
          }}>
            {t("hero.headline")}
          </h1>
          <p style={{
            color: "rgba(251,250,246,0.7)", fontSize: "16px",
            lineHeight: 1.6, maxWidth: "560px", margin: "0 auto",
          }}>
            {t("hero.copy")}
          </p>
        </div>
      </section>

      {/* Back link */}
      <div className="wrap" style={{ paddingTop: "32px" }}>
        <Link
          href={`/${locale}`}
          style={{
            display: "inline-flex", alignItems: "center", gap: "6px",
            fontFamily: "var(--font-mono)", fontSize: "13px",
            color: "var(--charcoal-soft)", transition: "color 0.2s",
          }}
        >
          <ArrowLeft size={14} /> Back to Home
        </Link>
      </div>

      {/* Content */}
      <section style={{ padding: "40px 0 100px" }}>
        <div className="wrap" style={{ maxWidth: "720px" }}>
          <p style={{
            fontFamily: "var(--font-mono)", fontSize: "12px",
            color: "var(--charcoal-soft)", marginBottom: "40px",
          }}>
            {t("lastUpdated")}
          </p>

          {sections.map((section, i) => (
            <div key={i} style={{ marginBottom: "40px" }}>
              <h2 style={{
                fontFamily: "var(--font-fraunces)", fontSize: "20px",
                fontWeight: 600, marginBottom: "12px",
                color: "var(--forest-dark)",
              }}>
                {section.title}
              </h2>
              {section.body.split("\n\n").map((paragraph, j) => (
                <p key={j} style={{
                  fontSize: "15px", lineHeight: "1.7",
                  color: "var(--charcoal-soft)", marginBottom: "12px",
                }}>
                  {paragraph}
                </p>
              ))}
            </div>
          ))}
        </div>
      </section>

      <style>{`
        @media (max-width: 640px) {
          section:first-child { padding: 80px 0 40px !important; }
        }
      `}</style>
    </div>
  );
}
