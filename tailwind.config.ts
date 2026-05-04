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
        nexore: {
          primary: "#6A89A7",
          secondary: "#BDDDFC",
          accent: "#88BDF2",
          dark: "#384959",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "ui-sans-serif", "system-ui"],
      },
      boxShadow: {
        soft: "0 20px 60px rgba(56, 73, 89, 0.14)",
      },
    },
  },
  plugins: [forms],
};

export default config;
