"use client";

import { useState } from "react";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { Mail, Phone, Globe, AtSign } from "lucide-react";
import ComingSoonModal from "@/components/ComingSoonModal";

export default function Footer() {
  const t = useTranslations("footer");
  const tn = useTranslations("nav");
  const locale = useLocale();
  const [showComingSoon, setShowComingSoon] = useState(false);

  const columns = [
    {
      heading: "Company",
      links: [
        { label: tn("ourStory"), href: `/${locale}/about/our-story`, desktop: false },
        { label: tn("manufacturing"), href: `/${locale}/about/manufacturing`, desktop: false },
        { label: tn("sustainability"), href: `/${locale}/about/sustainability`, desktop: false },
        { label: tn("corporate"), href: `/${locale}/about/corporate`, desktop: false },
        { label: tn("insight"), href: `/${locale}/about/insight`, desktop: false },
      ],
    },
    {
      heading: "Products",
      links: [
        { label: "White Copra", href: `/${locale}/store/white-copra`, desktop: false },
        { label: "Black Copra", href: `/${locale}/store/black-copra`, desktop: false },
        { label: "Coconut Shell Charcoal", href: `/${locale}/store/coconut-charcoal`, desktop: false },
        { label: "Coconut Oil (RBD)", href: `/${locale}/store/coconut-oil`, desktop: false },
        { label: "View All Products", href: "", modal: true, desktop: false },
      ],
    },
    {
      heading: "Support",
      links: [
        { label: tn("contact"), href: `/${locale}/support/contact`, desktop: false },
        { label: tn("faq"), href: `/${locale}/support/faq`, desktop: false },
        { label: tn("shipping"), href: `/${locale}/support/shipping`, desktop: true },
      ],
    },
  ];

  return (
    <footer style={{ background: "var(--charcoal)", color: "var(--ivory)", paddingTop: "80px" }}>
      <div className="wrap">
        {/* Top section */}
        <div style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr 1fr 1fr", gap: "48px", paddingBottom: "60px", borderBottom: "1px solid rgba(255,255,255,0.1)" }}>

          {/* Brand col */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
              <div style={{ width: "28px", height: "28px", borderRadius: "50%", background: "var(--forest-soft)", flexShrink: 0, position: "relative" }}>
                <div style={{ position: "absolute", inset: "6px", border: "1.5px solid var(--ivory)", borderRadius: "50%", borderRightColor: "transparent", transform: "rotate(45deg)" }} />
              </div>
              <span style={{ fontFamily: "var(--font-fraunces)", fontWeight: 700, fontSize: "20px", letterSpacing: "-0.02em" }}>HANCOCO</span>
            </div>
            <p style={{ fontSize: "14px", color: "rgba(251,250,246,0.85)", maxWidth: "260px", lineHeight: "1.6", marginBottom: "28px" }}>
              {t("tagline")}
            </p>
            {/* Contact */}
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <a href="mailto:sales@hancoco.com" style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13.5px", color: "rgba(251,250,246,0.8)", transition: "color 0.2s" }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--sand)")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "rgba(251,250,246,0.8)")}
              >
                <Mail size={14} /> sales@hancoco.com
              </a>
              <a href="https://wa.me/628000000000" style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13.5px", color: "rgba(251,250,246,0.8)", transition: "color 0.2s" }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--sand)")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "rgba(251,250,246,0.8)")}
              >
                <Phone size={14} /> +62 800 0000 000
              </a>
            </div>
            {/* Social */}
            <div style={{ display: "flex", gap: "10px", marginTop: "24px" }}>
            {[Globe, AtSign].map((Icon, i) => (
                <a key={i} href="#" style={{
                  width: "36px", height: "36px", border: "1px solid rgba(255,255,255,0.15)",
                  borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
                  color: "rgba(251,250,246,0.8)", transition: "border-color 0.2s, color 0.2s",
                }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.borderColor = "var(--sand)";
                    el.style.color = "var(--sand)";
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.borderColor = "rgba(255,255,255,0.25)";
                    el.style.color = "rgba(251,250,246,0.8)";
                  }}
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Nav columns */}
          {columns.map((col) => (
            <div key={col.heading}>
              <p style={{ fontFamily: "var(--font-mono)", fontSize: "11.5px", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--sand)", marginBottom: "20px", fontWeight: 500 }}>
                {col.heading}
              </p>
              <ul className="footer-col-links" style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {col.links.map((link) => (
                  <li className={link.desktop ? "hidden md:block" : ""} key={link.label}>
                    {link.modal ? (
                      <button onClick={() => setShowComingSoon(true)} style={{ fontSize: "14px", color: "rgba(251,250,246,0.85)", transition: "color 0.2s", cursor: "pointer", background: "none", border: "none", padding: 0, fontFamily: "inherit", textAlign: "left" }}
                        onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--ivory)")}
                        onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "rgba(251,250,246,0.85)")}
                      >
                        {link.label}
                      </button>
                    ) : (
                      <Link href={link.href} style={{ fontSize: "14px", color: "rgba(251,250,246,0.85)", transition: "color 0.2s" }}
                        onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--ivory)")}
                        onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "rgba(251,250,246,0.85)")}
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Desktop bottom bar */}
        <div className="footer-bottom hidden md:flex" style={{ justifyContent: "space-between", alignItems: "center", padding: "24px 0", flexWrap: "wrap", gap: "16px" }}>
          <p style={{ fontSize: "13px", color: "rgba(251,250,246,0.65)", fontFamily: "var(--font-mono)" }}>{t("copyright")}</p>
          <div style={{ display: "flex", gap: "24px" }}>
            {[
              { label: "Terms & Conditions", href: `/${locale}/legal/terms` },
              { label: "Privacy Policy", href: `/${locale}/legal/privacy` },
            ].map((item) => (
              <Link key={item.href} href={item.href} style={{ fontSize: "13px", color: "rgba(251,250,246,0.65)", fontFamily: "var(--font-mono)", transition: "color 0.2s" }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--sand)")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "rgba(251,250,246,0.65)")}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Mobile bottom bar */}
        <div className="footer-bottom-mobile md:hidden" style={{ textAlign: "center" }}>
          <div style={{ display: "flex", justifyContent: "center", gap: "24px", flexWrap: "wrap", padding: "24px 0 8px" }}>
            {[
              { label: tn("shipping"), href: `/${locale}/support/shipping` },
              { label: "Terms & Conditions", href: `/${locale}/legal/terms` },
              { label: "Privacy Policy", href: `/${locale}/legal/privacy` },
            ].map((item) => (
              <Link key={item.href} href={item.href} style={{ fontSize: "13px", color: "rgba(251,250,246,0.65)", fontFamily: "var(--font-mono)", transition: "color 0.2s" }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--sand)")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "rgba(251,250,246,0.65)")}
              >
                {item.label}
              </Link>
            ))}
          </div>
          <div style={{ padding: "0 0 24px" }}>
            <p style={{ fontSize: "13px", color: "rgba(251,250,246,0.65)", fontFamily: "var(--font-mono)" }}>{t("copyright")}</p>
          </div>
        </div>
      </div>

      <ComingSoonModal open={showComingSoon} onClose={() => setShowComingSoon(false)} />

      <style dangerouslySetInnerHTML={{ __html: `
        @media (max-width: 900px) {
          footer .wrap > div:first-child {
            grid-template-columns: 1fr 1fr !important;
            gap: 40px !important;
          }
        }
        @media (max-width: 540px) {
          footer .wrap > div:first-child {
            grid-template-columns: 1fr !important;
            gap: 32px !important;
          }
          .footer-col-links {
            gap: 16px !important;
          }
        }
      `}} />
    </footer>
  );
}
