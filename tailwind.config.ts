import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["Syne", "sans-serif"],
        heading: ["DM Sans", "sans-serif"],
        body: ["IBM Plex Sans", "sans-serif"],
        mono: ["Fira Code", "monospace"],
        // Editorial accent — used surgically for hero/about/founder italic
        // moments, never for body or headings. Pairs with IBM Plex Sans.
        editorial: ["Instrument Serif", "Georgia", "serif"],
      },
      colors: {
        void: "#020810",
        base: "#060D1A",
        surface: "#0B1628",
        elevated: "#111F35",
        "code-bg": "#080E1C",
        cyan: {
          bright: "#00D9FF",
          mid: "#00A8CC",
          dim: "#006E88",
        },
        orange: {
          bright: "#FF6B2B",
          mid: "#CC4F18",
        },
        success: "#00E5A0",
        warning: "#FFB830",
        error: "#FF4B4B",
        info: "#3B9EFF",
        text: {
          primary: "#E8EDF5",
          secondary: "#7A8BA0",
          muted: "#3D5068",
          code: "#A8D8EA",
        },
        border: {
          subtle: "rgba(0, 217, 255, 0.08)",
          default: "rgba(0, 217, 255, 0.15)",
          active: "rgba(0, 217, 255, 0.40)",
        },
      },
      boxShadow: {
        "glow-cyan": "0 0 24px rgba(0, 217, 255, 0.20)",
        "glow-orange": "0 0 24px rgba(255, 107, 43, 0.25)",
        "glow-subtle": "0 0 40px rgba(0, 217, 255, 0.08)",
        "accent-left": "-2px 0 12px rgba(0, 217, 255, 0.15)",
      },
      backgroundImage: {
        "grid-pattern":
          "linear-gradient(rgba(0,217,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,217,255,0.04) 1px, transparent 1px)",
      },
      backgroundSize: {
        grid: "48px 48px",
      },
      animation: {
        scan: "scan 8s linear infinite",
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "pulse-dot": "pulse-dot 1.6s ease-in-out infinite",
      },
      keyframes: {
        scan: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100vh)" },
        },
        "pulse-dot": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.4" },
        },
      },
      borderRadius: {
        sharp: "4px",
        badge: "3px",
      },
    },
  },
  plugins: [animate],
};

export default config;
