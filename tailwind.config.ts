import type { Config } from "tailwindcss";
import forms from "@tailwindcss/forms";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        nexora: {
          primary: "#6A89A7",
          secondary: "#BDDDFC",
          accent: "#88BDF2",
          dark: "#0F172A",
          card: "#1E293B",
          text: "#E5E7EB",
          muted: "#94A3B8",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "ui-sans-serif", "system-ui"],
      },
      boxShadow: {
        soft: "0 20px 60px rgba(2, 6, 23, 0.28)",
      },
    },
  },
  plugins: [forms],
};

export default config;
