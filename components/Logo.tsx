import Link from "next/link";

export function Logo() {
  return (
    <Link href="/" className="focus-ring inline-flex items-center gap-2 rounded-md">
      <span className="grid h-9 w-9 place-items-center rounded-lg bg-nexore-dark text-sm font-black text-white shadow-soft">
        N
      </span>
      <span className="text-lg font-black tracking-normal text-nexore-dark">Nexore</span>
    </Link>
  );
}
