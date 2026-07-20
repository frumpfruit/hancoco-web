import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ivory: {
          DEFAULT: "#FBFAF6",
          dim: "#F3F1E8",
        },
        forest: {
          DEFAULT: "#1F4D3A",
          dark: "#12281F",
          soft: "#2C6349",
        },
        charcoal: {
          DEFAULT: "#22231E",
          soft: "#5B5B52",
        },
        sand: {
          DEFAULT: "#E8DFC8",
          deep: "#C9BC98",
        },
        brown: {
          DEFAULT: "#6B4A32",
        },
        line: "#DAD5C4",
      },
      fontFamily: {
        display: ["Fraunces", "serif"],
        sans: ["Inter", "sans-serif"],
        mono: ["IBM Plex Mono", "monospace"],
      },
      fontSize: {
        "display-xl": ["clamp(3rem, 5.5vw, 5rem)", { lineHeight: "1.04", letterSpacing: "-0.03em" }],
        "display-lg": ["clamp(2.4rem, 4vw, 3.8rem)", { lineHeight: "1.06", letterSpacing: "-0.02em" }],
        "display-md": ["clamp(1.8rem, 3vw, 2.8rem)", { lineHeight: "1.1", letterSpacing: "-0.015em" }],
        "display-sm": ["clamp(1.4rem, 2.2vw, 2rem)", { lineHeight: "1.2" }],
      },
      spacing: {
        section: "120px",
        "section-sm": "80px",
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
      },
      transitionTimingFunction: {
        smooth: "cubic-bezier(0.4, 0, 0.2, 1)",
        spring: "cubic-bezier(0.34, 1.56, 0.64, 1)",
      },
      keyframes: {
        scrollx: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        scrollline: {
          "0%": { transform: "scaleY(0)", transformOrigin: "top" },
          "50%": { transform: "scaleY(1)", transformOrigin: "top" },
          "51%": { transformOrigin: "bottom" },
          "100%": { transform: "scaleY(0)", transformOrigin: "bottom" },
        },
        pulse_dot: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.3" },
        },
        mappulse: {
          "0%": { transform: "scale(0.6)", opacity: "1" },
          "100%": { transform: "scale(2)", opacity: "0" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        scrollx: "scrollx 28s linear infinite",
        scrollline: "scrollline 1.8s ease-in-out infinite",
        pulse_dot: "pulse_dot 1.8s ease-in-out infinite",
        mappulse: "mappulse 2s ease-out infinite",
        "fade-up": "fade-up 0.7s cubic-bezier(0.4,0,0.2,1) forwards",
      },
    },
  },
  plugins: [],
};

export default config;
