import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        atlas: {
          bg: "#0A0E1A",
          card: "#111827",
          "card-hover": "#1A2332",
          surface: "#1E293B",
          "surface-light": "#2A3A4E",
          border: "#1E293B",
          "border-light": "#2D3B50",
          gold: "#D4A843",
          "gold-light": "#F0D78C",
          "gold-dark": "#A07830",
          cyan: "#00D4FF",
          "cyan-dark": "#0099BB",
          magenta: "#FF3366",
          emerald: "#00CC88",
          purple: "#8B5CF6",
          orange: "#FF8C42",
          text: "#E8ECF1",
          "text-muted": "#8B95A5",
          "text-dim": "#5A6577",
        },
      },
      fontFamily: {
        display: ["Bebas Neue", "sans-serif"],
        body: ["DM Sans", "sans-serif"],
      },
      animation: {
        "fade-in": "fadeIn 0.4s ease-out",
        "fade-in-up": "fadeInUp 0.5s ease-out",
        "slide-in": "slideIn 0.3s ease-out",
        "scale-in": "scaleIn 0.3s ease-out",
        "pulse-glow": "pulseGlow 2s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideIn: {
          "0%": { opacity: "0", transform: "translateX(-12px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        scaleIn: {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        pulseGlow: {
          "0%, 100%": { boxShadow: "0 0 20px rgba(212,168,67,0.1)" },
          "50%": { boxShadow: "0 0 40px rgba(212,168,67,0.25)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
