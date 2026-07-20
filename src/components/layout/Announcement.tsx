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
        className="wrap"
        style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
      >
        <span style={{ opacity: 0.75 }}>{t("tag")}</span>
        <span>{t("text")}</span>
        <span style={{ opacity: 0.75 }}>{t("tag")}</span>
      </div>
    </div>
  );
}
