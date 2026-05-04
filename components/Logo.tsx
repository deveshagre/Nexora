import Link from "next/link";

export function Logo() {
  return (
    <Link href="/" className="focus-ring inline-flex items-center gap-2 rounded-md">
      <span className="grid h-9 w-9 place-items-center rounded-xl bg-nexore-accent text-sm font-black text-slate-950 shadow-soft">
        N
      </span>
      <span className="text-lg font-black tracking-normal text-nexore-text">Nexore</span>
    </Link>
  );
}
