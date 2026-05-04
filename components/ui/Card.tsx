import type { HTMLAttributes } from "react";

export function Card({ className = "", ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`rounded-xl border border-white/10 bg-nexore-card/88 shadow-[0_18px_50px_rgba(2,6,23,0.32)] backdrop-blur transition hover:-translate-y-1 hover:border-nexore-accent/45 ${className}`}
      {...props}
    />
  );
}
