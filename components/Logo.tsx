import Link from "next/link";

export function Logo() {
  return (
    <Link href="/" className="focus-ring inline-flex items-center gap-2 rounded-md">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/header-logo.png"
        alt="Nexora Logo"
        width={140}
        height={50}
        className="object-contain"
      />
    </Link>
  );
}
