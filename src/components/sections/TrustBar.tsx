"use client";

import { useTranslations } from "next-intl";

export default function TrustBar() {
  const t = useTranslations("trust");
  const items: string[] = t.raw("items");
  const doubled = [...items, ...items];

  return (
    <div style={{
      borderTop: "1px solid var(--line)",
      borderBottom: "1px solid var(--line)",
      background: "var(--ivory-dim)",
      padding: "20px 0",
      overflow: "hidden",
    }}>
      <div
        style={{ display: "flex", gap: "64px", width: "max-content", animation: "scrollx 30s linear infinite" }}
        onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.animationPlayState = "paused")}
        onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.animationPlayState = "running")}
      >
        {doubled.map((item, i) => (
          <span key={i} style={{
            fontFamily: "var(--font-mono)", fontSize: "12.5px",
            color: "var(--charcoal-soft)", display: "flex",
            alignItems: "center", gap: "12px", whiteSpace: "nowrap",
          }}>
            <span style={{ color: "var(--forest)", fontSize: "8px" }}>◆</span>
            {item}
          </span>
        ))}
      </div>
      <style>{`
        @keyframes scrollx {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
