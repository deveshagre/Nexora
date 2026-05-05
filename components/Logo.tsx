import Link from "next/link";
import Image from "next/image";

export function Logo() {
  return (
    <Link href="/" className="focus-ring inline-flex items-center gap-2 rounded-md">
      <Image 
        src="/header-logo.png" 
        alt="Nexora Logo" 
        width={140} 
        height={50} 
        className="object-contain" 
        priority 
      />
    </Link>
  );
}
