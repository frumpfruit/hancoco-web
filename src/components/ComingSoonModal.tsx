"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Construction } from "lucide-react";

export default function ComingSoonModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          style={{
            position: "fixed", inset: 0,
            background: "rgba(0,0,0,0.5)",
            zIndex: 999,
            backdropFilter: "blur(4px)",
            display: "flex", alignItems: "center", justifyContent: "center",
            padding: "24px",
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "var(--ivory)", borderRadius: "16px", padding: "48px 40px 40px",
              maxWidth: "400px", width: "100%",
              textAlign: "center",
              boxShadow: "0 24px 48px -12px rgba(0,0,0,0.25)",
              position: "relative",
            }}
          >
            <button
              onClick={onClose}
              style={{
                position: "absolute", top: "16px", right: "16px",
                width: "36px", height: "36px", borderRadius: "50%",
                background: "var(--ivory-dim)", border: "none",
                cursor: "pointer", color: "var(--charcoal-soft)",
                display: "flex", alignItems: "center", justifyContent: "center",
                transition: "background 0.2s",
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "var(--line)")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "var(--ivory-dim)")}
            >
              <X size={18} />
            </button>

            <div style={{
              width: "64px", height: "64px", borderRadius: "50%",
              background: "var(--forest)", color: "var(--sand)",
              display: "flex", alignItems: "center", justifyContent: "center",
              margin: "0 auto 20px",
            }}>
              <Construction size={28} />
            </div>

            <h3 style={{
              fontFamily: "var(--font-fraunces)", fontSize: "22px",
              color: "var(--charcoal)", marginBottom: "12px", fontWeight: 600,
            }}>
              Halaman Sedang Dikembangkan
            </h3>
            <p style={{
              fontSize: "15px", color: "var(--charcoal-soft)",
              lineHeight: "1.6", maxWidth: "300px", margin: "0 auto",
            }}>
              Kami sedang menyiapkan halaman ini. Silakan kembali lagi nanti.
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
