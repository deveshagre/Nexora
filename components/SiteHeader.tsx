import Link from "next/link";
import { Logo } from "@/components/Logo";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-nexora-dark/82 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        <Logo />
        <Link
          href="/diagnosis/start"
          className="focus-ring rounded-xl bg-nexora-accent px-4 py-2 text-sm font-black text-slate-950 shadow-soft hover:-translate-y-0.5 hover:bg-nexora-secondary"
        >
          Start Free Diagnosis
        </Link>
      </div>
    </header>
  );
}
