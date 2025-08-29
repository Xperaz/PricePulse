import { BrandLogo } from "@/components/BrandLogo";
import Link from "next/link";

export function NavBar() {
  return (
    <header className="flex py-6 shadow-xl fixed top-0 w-full z-10 bg-background/95">
      <nav className="container flex items-center gap-10 font-semibold">
        <Link href="/" className="mr-auto">
          <BrandLogo />
        </Link>

        <Link href="#" className="hover:underline">
          Features
        </Link>
        <Link href="/#pricing" className="hover:underline">
          Pricing
        </Link>
        <Link href="/#about" className="hover:underline">
          About
        </Link>
      </nav>
    </header>
  );
}
