"use client";

import { useTranslations } from "next-intl";

export default function Announcement() {
  const t = useTranslations("announce");

  return (
    <div
      style={{
        background: "var(--forest-dark)",
        color: "var(--sand)",
        fontFamily: "var(--font-mono)",
        fontSize: "12px",
        padding: "9px 0",
        letterSpacing: "0.04em",
      }}
    >
      <div
        className="wrap flex items-center justify-center md:justify-between"
      >
        <span className="hidden md:inline" style={{ opacity: 0.75 }}>{t("tag")}</span>
        <span className="hidden md:inline">{t("text")}</span>
        <span className="inline md:hidden">The World's Largest Supplier of Coconut Products</span>
        <span className="hidden md:inline" style={{ opacity: 0.75 }}>{t("tag")}</span>
      </div>
    </div>
  );
}
