"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

import { Button } from "~/components/ui/button";

import Logo from "../common/Logo";

const navItems = [
  { label: "Product", href: "#features" },
  { label: "Solutions", href: "#features" },
  { label: "Features", href: "#features" },
  { label: "Insights", href: "#stats" },
  { label: "FAQs", href: "#faqs" },
];

const INVALID_PATHS = ["/onboard", "/app"];

const Header = () => {
  const path = usePathname();
  const isInValidPath = INVALID_PATHS.some((p) => path.startsWith(p));

  if (isInValidPath) {
    return null;
  }

  return (
    <header className="top-0 z-50 fixed px-4 md:px-8 py-3 w-full">
      <div className="flex justify-between items-center gap-4 bg-white/90 shadow-[0_8px_24px_-18px_rgba(0,0,0,0.35)] backdrop-blur-md mx-auto px-3 md:px-4 border border-neutral-200/80 rounded-2xl max-w-6xl h-16">
        <Logo size="xl" color="text-neutral-900" />

        <nav className="hidden md:flex items-center gap-5">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="font-medium text-neutral-600 hover:text-primary text-sm hover:underline underline-offset-2 transition"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex flex-1 justify-end items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            className="hidden md:inline-flex hover:bg-neutral-100 border border-neutral-200 rounded-full text-neutral-700"
            asChild
          >
            <Link href="/onboard/login" className="font-medium text-sm">
              Sign in
            </Link>
          </Button>
          <Button
            size="sm"
            className="bg-neutral-900 hover:bg-neutral-800 px-4 rounded-full text-white"
          >
            Book a demo
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
