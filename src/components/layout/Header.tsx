"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { 
  ShoppingCart, Search, User, ChevronDown, Menu, X, ArrowRight,
  Flame, Droplet, Package, LayoutGrid, 
  BookOpen, Factory, Leaf, Building, Lightbulb, 
  Phone, Info, Truck
} from "lucide-react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useRFQ } from "@/context/RFQContext";
import { Send, CheckCircle2 } from "lucide-react";
import ComingSoonModal from "@/components/ComingSoonModal";

export default function Header() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();
  const { items, setIsOpen, isOpen } = useRFQ();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [mobileActiveTab, setMobileActiveTab] = useState<string | null>(null);
  const [showComingSoon, setShowComingSoon] = useState(false);
  let timeoutId: NodeJS.Timeout;

  const getLocalizedPath = (targetLocale: string) => {
    if (!pathname) return `/${targetLocale}`;
    const segments = pathname.split("/");
    if (segments[1] === "en" || segments[1] === "id") {
      segments[1] = targetLocale;
      return segments.join("/");
    }
    return `/${targetLocale}${pathname}`;
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setActiveMenu(null);
    setMobileOpen(false);
    setMobileActiveTab(null);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const otherLocale = locale === "en" ? "id" : "en";

  const handleMouseEnter = (menu: string) => {
    clearTimeout(timeoutId);
    setActiveMenu(menu);
  };

  const handleMouseLeave = () => {
    timeoutId = setTimeout(() => {
      setActiveMenu(null);
    }, 150); // slight delay to prevent flickering
  };

  const megamenus = {
    store: {
      main: [
        { href: "store/white-copra", label: t("whiteCopra"), desc: "Premium edible copra.", icon: <Package size={18} /> },
        { href: "store/black-copra", label: t("blackCopra"), desc: "High-yield milling copra.", icon: <Package size={18} /> },
        { href: "store/coconut-charcoal", label: t("charcoal"), desc: "Activated carbon & briquettes.", icon: <Flame size={18} /> },
        { href: "store/coconut-oil", label: t("oil"), desc: "RBD and crude coconut oil.", icon: <Droplet size={18} /> },
      ],
      side: [
        { href: "store", label: t("allProducts"), desc: "Browse our complete catalog.", icon: <LayoutGrid size={18} /> }
      ]
    },
    about: {
      main: [
        { href: "about/our-story", label: t("ourStory"), desc: "From local farm to global export.", icon: <BookOpen size={18} /> },
        { href: "about/manufacturing", label: t("manufacturing"), desc: "State-of-the-art facilities.", icon: <Factory size={18} /> },
        { href: "about/sustainability", label: t("sustainability"), desc: "Zero-waste circular economy.", icon: <Leaf size={18} /> },
      ],
      side: [
        { href: "about/corporate", label: t("corporate"), desc: "Company profiles and legal.", icon: <Building size={18} /> },
        { href: "about/insight", label: t("insight"), desc: "News and market research.", icon: <Lightbulb size={18} /> }
      ]
    },
    support: {
      main: [
        { href: "support/contact", label: t("contact"), desc: "Reach our global sales team.", icon: <Phone size={18} /> },
        { href: "support/faq", label: t("faq"), desc: "Answers to common inquiries.", icon: <Info size={18} /> },
        { href: "support/shipping", label: t("shipping"), desc: "Logistics and export terms.", icon: <Truck size={18} /> },
      ],
      side: []
    }
  };

  const standaloneLinks = [
    { href: "legal/terms", label: t("tnc") },
    { href: "legal/privacy", label: t("privacy") },
  ];

  return (
    <header
      onMouseLeave={handleMouseLeave}
      style={{
        position: "sticky",
        top: 0,
        zIndex: 990,
      }}
    >
      {/* BACKGROUND LAYER */}
      <motion.div 
        initial={false}
        animate={{
          background: activeMenu ? "rgba(251,250,246,1)" : (scrolled ? "rgba(251,250,246,0.92)" : "rgba(251,250,246,0.98)"),
          backdropFilter: activeMenu ? "none" : (scrolled ? "blur(12px)" : "none"),
          borderBottom: activeMenu ? "1px solid var(--line)" : (scrolled ? "1px solid var(--line)" : "1px solid transparent"),
        }}
        transition={{ duration: 0.3 }}
        style={{
          position: "absolute",
          inset: 0,
          zIndex: -1
        }}
      />

      <div className="wrap">
        <nav style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px 0", gap: "2rem" }}>
          {/* LEFT NAV */}
          <div className="desktop-nav" style={{ display: "flex", gap: "32px", alignItems: "center", flex: 1 }}>
            
            {["store", "about", "support"].map((key) => (
              <div 
                key={key}
                onMouseEnter={() => handleMouseEnter(key)}
                style={{ display: "flex", alignItems: "center", height: "100%", cursor: "pointer", padding: "10px 0" }}
              >
                <span
                  style={{
                    display: "flex", alignItems: "center", gap: "6px",
                    fontSize: "14px", fontWeight: 500, 
                    color: activeMenu === key ? "var(--forest)" : "var(--charcoal-soft)",
                    transition: "color 0.2s",
                  }}
                >
                  {t(key)}
                  <ChevronDown size={14} style={{ transition: "transform 0.2s", transform: activeMenu === key ? "rotate(180deg)" : "rotate(0)", opacity: 0.7 }} />
                </span>
              </div>
            ))}
          </div>

          {/* CENTER LOGO */}
          <Link href={`/${locale}`} onMouseEnter={() => handleMouseEnter("")} style={{ display: "flex", alignItems: "center", gap: "10px", flexShrink: 0 }}>
            <div style={{
              width: "32px", height: "32px", borderRadius: "50%",
              background: "var(--forest)", position: "relative", flexShrink: 0,
            }}>
              <div style={{
                position: "absolute", inset: "8px",
                border: "2px solid var(--ivory)", borderRadius: "50%",
                borderRightColor: "transparent",
                transform: "rotate(45deg)",
              }} />
            </div>
            <span style={{
              fontFamily: "var(--font-fraunces)",
              fontWeight: 700, fontSize: "22px",
              color: "var(--charcoal)", letterSpacing: "-0.02em",
            }}>
              HANCOCO
            </span>
          </Link>

          {/* RIGHT NAV */}
          <div style={{ display: "flex", alignItems: "center", gap: "14px", flex: 1, justifyContent: "flex-end" }} onMouseEnter={() => handleMouseEnter("")}>
            <div className="desktop-nav" style={{ display: "flex", alignItems: "center", gap: "14px" }}>
              {/* Language Switch */}
              <div style={{ fontFamily: "var(--font-mono)", fontSize: "12px", display: "flex", gap: "4px", alignItems: "center" }}>
                <a href={getLocalizedPath("en")} style={{ color: locale === "en" ? "var(--forest)" : "var(--charcoal-soft)", fontWeight: locale === "en" ? 600 : 400, textDecoration: "none" }}>EN</a>
                <span style={{ color: "var(--line)" }}>|</span>
                <a href={getLocalizedPath("id")} style={{ color: locale === "id" ? "var(--forest)" : "var(--charcoal-soft)", fontWeight: locale === "id" ? 600 : 400, textDecoration: "none" }}>ID</a>
              </div>

              {/* Icon buttons */}
              <button aria-label="Search" style={{ width: "34px", height: "34px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--charcoal-soft)", transition: "background 0.2s", cursor: "pointer", border: "none", background: "none" }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "var(--ivory-dim)")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "none")}
              >
                <Search size={17} />
              </button>

              <Link href={`/${locale}/login`} aria-label="Login Buyer" style={{ width: "34px", height: "34px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--charcoal-soft)", transition: "background 0.2s" }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "var(--ivory-dim)")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "none")}
              >
                <User size={17} />
              </Link>
            </div>

            {/* Always Visible: Cart and Hamburger */}
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <button onClick={() => setIsOpen(true)} className="cart-btn" style={{
                display: "flex", alignItems: "center", gap: "7px",
                background: "var(--forest)", color: "var(--white)",
                padding: "9px 16px", borderRadius: "8px",
                fontWeight: 600, fontSize: "13.5px",
                transition: "background 0.2s, transform 0.2s",
                textDecoration: "none", border: "none", cursor: "pointer"
              }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.background = "var(--forest-dark)";
                  el.style.transform = "translateY(-1px)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.background = "var(--forest)";
                  el.style.transform = "translateY(0)";
                }}
              >
                <ShoppingCart size={15} />
                <span className="desktop-text">{t("cart")}</span>
                {items.length > 0 && (
                  <span style={{ background: "var(--sand)", color: "var(--forest-dark)", borderRadius: "50%", padding: "2px 6px", fontSize: "10px", fontWeight: 700, marginLeft: "4px" }}>
                    {items.reduce((s, i) => s + i.quantity, 0)}
                  </span>
                )}
              </button>

              {/* Mobile hamburger */}
              <button
                aria-label="Toggle menu"
                onClick={() => { setMobileOpen(!mobileOpen); setMobileActiveTab(null); }}
                style={{ display: "none", border: "none", background: "none", cursor: "pointer", color: "var(--charcoal)" }}
                className="mobile-hamburger"
              >
                {mobileOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </nav>
      </div>

      {/* MEGAMENU DESKTOP */}
      <AnimatePresence>
        {activeMenu && activeMenu !== "" && megamenus[activeMenu as keyof typeof megamenus] && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10, transition: { duration: 0.2 } }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            style={{
              position: "absolute",
              top: "100%",
              left: 0,
              right: 0,
              background: "var(--white)",
              borderBottom: "1px solid var(--line)",
              boxShadow: "0 20px 40px -20px rgba(0,0,0,0.1)",
              overflow: "hidden"
            }}
          >
            <div className="wrap" style={{ padding: "40px 24px" }}>
              <div style={{ display: "flex", gap: "60px" }}>
                
                {/* Main Links Area (Compact Text) */}
                <div style={{ flex: "1 1 70%" }}>
                  <h4 style={{ fontSize: "12px", fontFamily: "var(--font-mono)", color: "var(--charcoal-soft)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "24px" }}>
                    {t(activeMenu)}
                  </h4>
                  <div style={{ 
                    display: "grid", 
                    gridTemplateColumns: "repeat(2, 1fr)", 
                    gap: "24px 40px" 
                  }}>
                    {[...megamenus[activeMenu as keyof typeof megamenus].main, ...megamenus[activeMenu as keyof typeof megamenus].side].map((item: any, i) => (
                      item.modal ? (
                        <button
                          key={item.href}
                          onClick={() => setShowComingSoon(true)}
                          className="megamenu-text-link"
                          style={{
                            display: "flex", gap: "16px", alignItems: "flex-start",
                            textDecoration: "none", padding: "12px", margin: "-12px",
                            borderRadius: "12px", transition: "background 0.2s",
                            cursor: "pointer", background: "none", border: "none",
                            fontFamily: "inherit", textAlign: "left", width: "100%"
                          }}
                        >
                          <div className="megamenu-icon-wrap" style={{
                            width: "40px", height: "40px", borderRadius: "10px",
                            background: "var(--ivory-dim)", color: "var(--forest)",
                            display: "flex", alignItems: "center", justifyContent: "center",
                            flexShrink: 0, transition: "all 0.2s"
                          }}>
                            {item.icon}
                          </div>
                          <div style={{ display: "flex", flexDirection: "column", gap: "4px", flex: 1 }}>
                            <h5 style={{ 
                              fontSize: "15px", fontWeight: 600, color: "var(--charcoal)",
                              display: "flex", alignItems: "center", justifyContent: "space-between"
                            }}>
                              {item.label}
                              <ArrowRight size={14} className="arrow" style={{ opacity: 0, transform: "translateX(-5px)", transition: "all 0.3s ease", color: "var(--forest)" }} />
                            </h5>
                            <p style={{ fontSize: "13.5px", color: "var(--charcoal-soft)", lineHeight: "1.5" }}>
                              {item.desc}
                            </p>
                          </div>
                        </button>
                      ) : (
                        <Link
                          key={item.href}
                          href={`/${locale}/${item.href}`}
                          className="megamenu-text-link"
                          style={{
                            display: "flex", gap: "16px", alignItems: "flex-start",
                            textDecoration: "none", padding: "12px", margin: "-12px",
                            borderRadius: "12px", transition: "background 0.2s"
                          }}
                        >
                          <div className="megamenu-icon-wrap" style={{
                            width: "40px", height: "40px", borderRadius: "10px",
                            background: "var(--ivory-dim)", color: "var(--forest)",
                            display: "flex", alignItems: "center", justifyContent: "center",
                            flexShrink: 0, transition: "all 0.2s"
                          }}>
                            {item.icon}
                          </div>
                          <div style={{ display: "flex", flexDirection: "column", gap: "4px", flex: 1 }}>
                            <h5 style={{ 
                              fontSize: "15px", fontWeight: 600, color: "var(--charcoal)",
                              display: "flex", alignItems: "center", justifyContent: "space-between"
                            }}>
                              {item.label}
                              <ArrowRight size={14} className="arrow" style={{ opacity: 0, transform: "translateX(-5px)", transition: "all 0.3s ease", color: "var(--forest)" }} />
                            </h5>
                            <p style={{ fontSize: "13.5px", color: "var(--charcoal-soft)", lineHeight: "1.5" }}>
                              {item.desc}
                            </p>
                          </div>
                        </Link>
                      )
                    ))}
                  </div>
                </div>

                {/* Featured Image Area (Right Sidebar) */}
                <div style={{ flex: "0 0 30%", borderLeft: "1px solid var(--line)", paddingLeft: "60px" }}>
                  <h4 style={{ fontSize: "12px", fontFamily: "var(--font-mono)", color: "var(--charcoal-soft)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "24px" }}>
                    Featured
                  </h4>
                  <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                    <div style={{
                      width: "100%", height: "140px",
                      borderRadius: "12px",
                      background: activeMenu === "store" 
                        ? "linear-gradient(135deg, #1F4D3A 0%, #15382A 100%)" 
                        : "linear-gradient(135deg, #E8DCC4 0%, #D4C5A8 100%)",
                      border: "1px solid var(--line)",
                      position: "relative",
                      overflow: "hidden"
                    }}>
                      <div style={{ position: "absolute", inset: 0, opacity: 0.1, background: "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPgo8cmVjdCB3aWR0aD0iOCIgaGVpZ2h0PSI4IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMSI+PC9yZWN0Pgo8cGF0aCBkPSJNMCAwbDh6bTggMGwtOHoiIHN0cm9rZT0iIzAwMCIgc3Ryb2tlLXdpZHRoPSIxIiBzdHJva2Utb3BhY2l0eT0iMC4xIiBmaWxsPSJub25lIj48L3BhdGg+Cjwvc3ZnPg==')" }} />
                    </div>
                    <div>
                      <h5 style={{ fontSize: "15px", fontWeight: 600, color: "var(--charcoal)", marginBottom: "4px" }}>
                        {activeMenu === "store" ? "Export Ready Supply" : "Global Reach"}
                      </h5>
                      <p style={{ fontSize: "13px", color: "var(--charcoal-soft)", lineHeight: "1.5" }}>
                        {activeMenu === "store" 
                          ? "Our products are manufactured to meet international standards. Available for B2B bulk orders." 
                          : "Learn more about our integrated supply chain and how we deliver value worldwide."}
                      </p>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            style={{
              position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
              background: "var(--white)",
              zIndex: 9999,
              display: "flex",
              flexDirection: "column"
            }}
          >
            {/* Mobile nav header */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 24px", borderBottom: "1px solid var(--line)" }}>
              <Link href={`/${locale}`} onClick={() => setMobileOpen(false)} style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none" }}>
                <div style={{
                  width: "28px", height: "28px", borderRadius: "50%",
                  background: "var(--forest)", position: "relative", flexShrink: 0,
                }}>
                  <div style={{
                    position: "absolute", inset: "6px",
                    border: "2px solid var(--ivory)", borderRadius: "50%",
                    borderRightColor: "transparent",
                    transform: "rotate(45deg)",
                  }} />
                </div>
                <span style={{ fontFamily: "var(--font-fraunces)", fontWeight: 700, fontSize: "18px", color: "var(--charcoal)", letterSpacing: "-0.02em" }}>
                  HANCOCO
                </span>
              </Link>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <button onClick={() => { setIsOpen(true); setMobileOpen(false); }} className="cart-btn" style={{
                  width: "36px", height: "36px", borderRadius: "50%",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  background: "var(--ivory-dim)", border: "none", cursor: "pointer", color: "var(--charcoal)",
                  position: "relative",
                }}>
                  <ShoppingCart size={17} />
                  {items.length > 0 && (
                    <span style={{ position: "absolute", top: "-2px", right: "-2px", background: "var(--forest)", color: "var(--sand)", borderRadius: "50%", width: "16px", height: "16px", fontSize: "9px", fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      {items.reduce((s, i) => s + i.quantity, 0)}
                    </span>
                  )}
                </button>
                <button
                  onClick={() => { setMobileOpen(false); setMobileActiveTab(null); }}
                  style={{ width: "36px", height: "36px", borderRadius: "50%", background: "var(--ivory-dim)", border: "none", cursor: "pointer", color: "var(--charcoal)", display: "flex", alignItems: "center", justifyContent: "center" }}
                >
                  <X size={18} />
                </button>
              </div>
            </div>
            <div style={{ flex: 1, overflowY: "auto", position: "relative", overflowX: "hidden" }}>
              <AnimatePresence mode="wait">
                {!mobileActiveTab ? (
                  <motion.div 
                    key="main"
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -20, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    style={{ padding: "16px 24px" }}
                  >
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      {Object.keys(megamenus).map((key, idx, arr) => (
                        <button
                          key={key}
                          onClick={() => setMobileActiveTab(key)}
                          style={{
                            display: "flex", justifyContent: "space-between", alignItems: "center",
                            padding: "20px 0",
                            borderBottom: idx === arr.length - 1 ? "none" : "1px solid var(--line)",
                            fontSize: "18px", fontWeight: 500, color: "var(--charcoal)",
                            width: "100%", textAlign: "left"
                          }}
                        >
                          {t(key)}
                          <ArrowRight size={18} style={{ color: "var(--charcoal-soft)" }} />
                        </button>
                      ))}
                      
                      {/* Bottom links: Shipping, Terms, Privacy */}
                      <div style={{ borderTop: "1px solid var(--line)", paddingTop: "12px", marginTop: "8px" }}>
                        {[
                          { href: "support/shipping", label: t("shipping") },
                          ...standaloneLinks.map(item => ({ href: item.href, label: item.label })),
                        ].map((item) => (
                          <Link
                            key={item.href}
                            href={`/${locale}/${item.href}`}
                            onClick={() => setMobileOpen(false)}
                            style={{
                              display: "block",
                              padding: "10px 0",
                              fontSize: "16px", fontWeight: 500, color: "var(--charcoal)",
                              textDecoration: "none"
                            }}
                          >
                            {item.label}
                          </Link>
                        ))}
                      </div>

                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="sub"
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: 20, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    style={{ padding: "16px 24px" }}
                  >
                    <button
                      onClick={() => setMobileActiveTab(null)}
                      style={{
                        display: "flex", alignItems: "center", gap: "8px",
                        padding: "12px 0 24px", color: "var(--charcoal-soft)",
                        fontSize: "15px", fontWeight: 500
                      }}
                    >
                      <ChevronDown size={16} style={{ transform: "rotate(90deg)" }} /> Back
                    </button>

                    <h3 style={{ fontSize: "22px", fontFamily: "var(--font-fraunces)", color: "var(--charcoal)", marginBottom: "24px", textTransform: "capitalize" }}>
                      {t(mobileActiveTab)}
                    </h3>

                    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                      {[...megamenus[mobileActiveTab as keyof typeof megamenus].main, ...megamenus[mobileActiveTab as keyof typeof megamenus].side].filter((item: any) => mobileActiveTab !== "support" || item.href !== "support/shipping").map((item: any) => (
                        item.modal ? (
                          <button
                            key={item.href}
                            onClick={() => { setShowComingSoon(true); setMobileOpen(false); }}
                            style={{
                              display: "flex", gap: "16px", alignItems: "flex-start",
                              padding: "16px", background: "var(--ivory)", borderRadius: "12px",
                              textDecoration: "none", cursor: "pointer", border: "none",
                              fontFamily: "inherit", textAlign: "left", width: "100%"
                            }}
                          >
                            <div style={{ color: "var(--forest)", marginTop: "2px" }}>{item.icon}</div>
                            <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                              <span style={{ fontSize: "16px", fontWeight: 500, color: "var(--charcoal)" }}>{item.label}</span>
                              <span style={{ fontSize: "13.5px", color: "var(--charcoal-soft)", lineHeight: "1.4" }}>{item.desc}</span>
                            </div>
                          </button>
                        ) : (
                          <Link
                            key={item.href}
                            href={`/${locale}/${item.href}`}
                            onClick={() => setMobileOpen(false)}
                            style={{
                              display: "flex", gap: "16px", alignItems: "flex-start",
                              padding: "16px", background: "var(--ivory)", borderRadius: "12px",
                              textDecoration: "none"
                            }}
                          >
                            <div style={{ color: "var(--forest)", marginTop: "2px" }}>{item.icon}</div>
                            <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                              <span style={{ fontSize: "16px", fontWeight: 500, color: "var(--charcoal)" }}>{item.label}</span>
                              <span style={{ fontSize: "13.5px", color: "var(--charcoal-soft)", lineHeight: "1.4" }}>{item.desc}</span>
                            </div>
                          </Link>
                        )
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Language Switch — bottom left */}
            <div style={{ padding: "16px 24px 24px" }}>
              <div style={{ display: "flex", gap: "10px", fontSize: "14px", fontFamily: "var(--font-mono)", alignItems: "center" }}>
                <span style={{ color: "var(--charcoal-soft)" }}>Language:</span>
                <a href={getLocalizedPath("en")} style={{ color: locale === "en" ? "var(--forest)" : "var(--charcoal-soft)", fontWeight: locale === "en" ? 600 : 400, textDecoration: "none" }}>EN</a>
                <span style={{ color: "var(--line)" }}>/</span>
                <a href={getLocalizedPath("id")} style={{ color: locale === "id" ? "var(--forest)" : "var(--charcoal-soft)", fontWeight: locale === "id" ? 600 : 400, textDecoration: "none" }}>ID</a>
              </div>
            </div>

          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 900px) {
          .mobile-hamburger { display: flex !important; }
          .desktop-nav { display: none !important; }
          .desktop-text { display: none !important; }
          .cart-btn { 
            padding: 8px !important; 
            border-radius: 50% !important; 
            background: none !important; 
            color: var(--charcoal) !important; 
          }
        }
        .megamenu-card:hover .img-wrap {
          transform: translateY(-4px);
          box-shadow: 0 12px 24px -12px rgba(0,0,0,0.15);
        }
        .megamenu-card:hover .arrow {
          opacity: 1 !important;
          transform: translateX(0) !important;
        }
        .megamenu-card h5 {
          transition: color 0.2s;
        }
        .megamenu-card:hover h5 {
          color: var(--forest) !important;
        }
        
        .megamenu-text-link:hover {
          background: var(--ivory-dim) !important;
        }
        .megamenu-text-link:hover .arrow {
          opacity: 1 !important;
          transform: translateX(0) !important;
        }
        .megamenu-text-link:hover .megamenu-icon-wrap {
          background: var(--forest) !important;
          color: var(--white) !important;
        }
        .megamenu-text-link h5 {
          transition: color 0.2s;
        }
        .megamenu-text-link:hover h5 {
          color: var(--forest) !important;
        }
      `}</style>
      <RFQPanel />
      <ComingSoonModal open={showComingSoon} onClose={() => setShowComingSoon(false)} />
    </header>
  );
}

function RFQPanel() {
  const t = useTranslations("storePage");
  const { items, removeItem, updateQty, isOpen, setIsOpen, clearCart } = useRFQ();
  const [showForm, setShowForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [form, setForm] = useState({ company: "", contact: "", email: "", country: "", whatsapp: "", port: "", incoterms: "", quantity: "", date: "", notes: "" });

  const rfqFields = t.raw("rfq.fields") as Record<string, string | string[]>;
  const incotermsOptions = rfqFields.incotermsOptions as string[];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.company || !form.contact || !form.email) {
      alert("Please fill in Company Name, Contact Person, and Email.");
      return;
    }
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setSubmitSuccess(true);
    clearCart();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => { setIsOpen(false); setSubmitSuccess(false); }}
            style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 999, backdropFilter: "blur(4px)" }} />
          <motion.div 
            className="rfq-panel"
            initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", damping: 25, stiffness: 200 }}
            style={{ position: "fixed", right: 0, top: 0, bottom: 0, width: "min(520px, 95vw)", background: "var(--forest-dark)", zIndex: 1000, display: "flex", flexDirection: "column", overflow: "hidden" }}>

            {/* Header */}
            <div className="rfq-panel-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "28px 32px", borderBottom: "1px solid rgba(251,250,246,0.1)" }}>
              <div>
                <h3 style={{ fontFamily: "var(--font-fraunces)", fontSize: "22px", color: "var(--ivory)" }}>{t("cart.title")}</h3>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "12px", color: "rgba(251,250,246,0.5)" }}>{items.length} product{items.length !== 1 ? "s" : ""} selected</span>
              </div>
              <button onClick={() => { setIsOpen(false); setSubmitSuccess(false); }} style={{ background: "rgba(255,255,255,0.08)", border: "none", borderRadius: "50%", width: "40px", height: "40px", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "var(--ivory)" }}>
                <X size={18} />
              </button>
            </div>

            {/* Panel Body */}
            <div className="rfq-panel-body" style={{ flex: 1, overflowY: "auto", padding: "24px 32px" }}>
              {submitSuccess ? (
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", textAlign: "center", gap: "24px", color: "var(--ivory)" }}>
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 200, damping: 15 }}>
                    <CheckCircle2 size={64} style={{ color: "var(--sand)" }} />
                  </motion.div>
                  <div>
                    <h3 style={{ fontFamily: "var(--font-fraunces)", fontSize: "24px", marginBottom: "12px" }}>RFQ Submitted!</h3>
                    <p style={{ fontSize: "15px", color: "rgba(251,250,246,0.7)", lineHeight: 1.6, maxWidth: "320px" }}>
                      Thank you for your interest. Our global export sales team will review your inquiry and contact you within 24 hours.
                    </p>
                  </div>
                  <button onClick={() => { setIsOpen(false); setSubmitSuccess(false); }} style={{ padding: "14px 32px", borderRadius: "100px", background: "var(--sand)", color: "var(--forest-dark)", fontSize: "15px", fontWeight: 700, border: "none", cursor: "pointer" }}>
                    Close Panel
                  </button>
                </div>
              ) : items.length === 0 ? (
                <p style={{ fontSize: "15px", color: "rgba(251,250,246,0.5)", textAlign: "center", padding: "48px 0" }}>{t("cart.empty")}</p>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", height: "100%" }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                      {items.map(item => (
                        <div key={item.id} style={{ display: "grid", gridTemplateColumns: "56px 1fr auto", gap: "16px", alignItems: "center", padding: "16px", background: "rgba(255,255,255,0.05)", borderRadius: "12px", border: "1px solid rgba(251,250,246,0.08)" }}>
                          <div style={{ position: "relative", height: "56px", borderRadius: "8px", overflow: "hidden" }}>
                            <Image src={item.image} alt={item.name} fill sizes="56px" style={{ objectFit: "cover" }} />
                          </div>
                          <div>
                            <p style={{ fontSize: "15px", fontWeight: 600, color: "var(--ivory)", marginBottom: "8px" }}>{item.name}</p>
                            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                              <button type="button" onClick={() => updateQty(item.id, item.quantity - 1)} style={{ width: "28px", height: "28px", borderRadius: "6px", background: "rgba(255,255,255,0.08)", border: "none", color: "var(--ivory)", cursor: "pointer", fontSize: "16px" }}>−</button>
                              <span style={{ fontFamily: "var(--font-mono)", fontSize: "14px", color: "var(--sand)", minWidth: "24px", textAlign: "center" }}>{item.quantity}</span>
                              <button type="button" onClick={() => updateQty(item.id, item.quantity + 1)} style={{ width: "28px", height: "28px", borderRadius: "6px", background: "rgba(255,255,255,0.08)", border: "none", color: "var(--ivory)", cursor: "pointer", fontSize: "16px" }}>+</button>
                              <span style={{ fontSize: "12px", color: "rgba(251,250,246,0.4)", fontFamily: "var(--font-mono)" }}>containers</span>
                            </div>
                          </div>
                          <button type="button" onClick={() => removeItem(item.id)} style={{ background: "none", border: "none", color: "rgba(251,250,246,0.4)", cursor: "pointer" }}>
                            <X size={16} />
                          </button>
                        </div>
                      ))}
                    </div>

                    <div style={{ marginTop: "32px", borderTop: "1px solid rgba(251,250,246,0.1)" }}>
                      <button type="button" onClick={() => setShowForm(!showForm)} style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 0", background: "none", border: "none", color: "var(--ivory)", cursor: "pointer" }}>
                        <span style={{ fontFamily: "var(--font-fraunces)", fontSize: "17px" }}>{t("rfq.headline")}</span>
                        <motion.div animate={{ rotate: showForm ? 180 : 0 }}><ChevronDown size={18} /></motion.div>
                      </button>

                      <AnimatePresence>
                        {showForm && (
                          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} style={{ overflow: "hidden" }}>
                            <div style={{ display: "flex", flexDirection: "column", gap: "12px", paddingTop: "8px", paddingBottom: "24px" }}>
                              {[
                                { key: "company", label: rfqFields.company as string, req: true },
                                { key: "contact", label: rfqFields.contact as string, req: true },
                                { key: "email", label: rfqFields.email as string, req: true },
                                { key: "country", label: rfqFields.country as string },
                                { key: "whatsapp", label: rfqFields.whatsapp as string },
                                { key: "port", label: rfqFields.port as string },
                              ].map(f => (
                                <div key={f.key}>
                                  <label style={{ display: "block", fontSize: "11px", fontFamily: "var(--font-mono)", color: "rgba(251,250,246,0.4)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "6px" }}>
                                    {f.label} {f.req && <span style={{ color: "var(--sand)" }}>*</span>}
                                  </label>
                                  <input type="text" required={f.req} value={form[f.key as keyof typeof form]} onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))}
                                    style={{ width: "100%", padding: "12px 14px", borderRadius: "10px", border: "1px solid rgba(251,250,246,0.12)", background: "rgba(255,255,255,0.05)", color: "var(--ivory)", fontSize: "14px", outline: "none", boxSizing: "border-box" }} />
                                </div>
                              ))}
                              <div>
                                <label style={{ display: "block", fontSize: "11px", fontFamily: "var(--font-mono)", color: "rgba(251,250,246,0.4)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "6px" }}>{rfqFields.incoterms as string}</label>
                                <select value={form.incoterms} onChange={e => setForm(p => ({ ...p, incoterms: e.target.value }))}
                                  style={{ width: "100%", padding: "12px 14px", borderRadius: "10px", border: "1px solid rgba(251,250,246,0.12)", background: "rgba(255,255,255,0.05)", color: "var(--ivory)", fontSize: "14px", outline: "none" }}>
                                  <option value="" style={{ background: "#12281F" }}>Select...</option>
                                  {incotermsOptions.map((o, i) => <option key={i} value={o} style={{ background: "#12281F" }}>{o}</option>)}
                                </select>
                              </div>
                              <div>
                                <label style={{ display: "block", fontSize: "11px", fontFamily: "var(--font-mono)", color: "rgba(251,250,246,0.4)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "6px" }}>{rfqFields.notes as string}</label>
                                <textarea rows={3} placeholder={rfqFields.notesPlaceholder as string} value={form.notes} onChange={e => setForm(p => ({ ...p, notes: e.target.value }))}
                                  style={{ width: "100%", padding: "12px 14px", borderRadius: "10px", border: "1px solid rgba(251,250,246,0.12)", background: "rgba(255,255,255,0.05)", color: "var(--ivory)", fontSize: "14px", outline: "none", resize: "vertical", boxSizing: "border-box" }} />
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>

                  {/* Footer Submit CTA */}
                  <div style={{ padding: "24px 0", borderTop: "1px solid rgba(251,250,246,0.1)", marginTop: "auto" }}>
                    <button type="submit" disabled={isSubmitting} style={{ width: "100%", padding: "18px", borderRadius: "100px", background: "var(--sand)", color: "var(--forest-dark)", fontSize: "16px", fontWeight: 700, border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "10px", marginBottom: "12px" }}>
                      {isSubmitting ? (
                        <span>Submitting...</span>
                      ) : (
                        <>
                          <Send size={16} /> {t("rfq.submit")}
                        </>
                      )}
                    </button>
                    <p style={{ fontSize: "12px", color: "rgba(251,250,246,0.4)", textAlign: "center" }}>{t("rfq.note")}</p>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
