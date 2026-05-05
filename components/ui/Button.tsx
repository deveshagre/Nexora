import type { ButtonHTMLAttributes, AnchorHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost";
};

type AnchorButtonProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant?: "primary" | "secondary" | "ghost";
};

const variants = {
  primary: "bg-nexora-accent text-slate-950 shadow-[0_14px_32px_rgba(136,189,242,0.24)] hover:bg-[#BDDDFC]",
  secondary: "border border-white/10 bg-white/8 text-nexora-text hover:border-nexora-accent/55 hover:bg-white/12",
  ghost: "text-nexora-text hover:bg-white/8",
};

const base =
  "focus-ring inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-black transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50";

export function Button({ className = "", variant = "primary", ...props }: ButtonProps) {
  return <button className={`${base} ${variants[variant]} ${className}`} {...props} />;
}

export function AnchorButton({ className = "", variant = "primary", ...props }: AnchorButtonProps) {
  return <a className={`${base} ${variants[variant]} ${className}`} {...props} />;
}
