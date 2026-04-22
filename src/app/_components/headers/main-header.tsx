"use client";

import Link from "next/link";

import { usePathname } from "next/dist/client/components/navigation";
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
    <header className="fixed top-0 z-50 w-full px-4 py-3 md:px-8">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between rounded-2xl border border-neutral-200/80 bg-white/90 px-3 shadow-[0_8px_24px_-18px_rgba(0,0,0,0.35)] backdrop-blur-md md:px-4">
        <Link
          href="/"
          className="flex flex-1 items-center gap-2 text-neutral-900"
        >
          {/* <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-neutral-900 text-white">
            <Sparkles className="h-4 w-4" />
          </span> */}
          <Logo size="xl" color="text-neutral-900" />
        </Link>

        <nav className="hidden items-center gap-5 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="hover:text-primary text-sm font-medium text-neutral-600 underline-offset-2 transition hover:text-neutral-900 hover:underline"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex flex-1 items-center justify-end gap-2">
          <Button
            variant="ghost"
            size="sm"
            className="hidden rounded-full border border-neutral-200 text-neutral-700 hover:bg-neutral-100 md:inline-flex"
            asChild
          >
            <Link href="/onboard/login" className="text-sm font-medium">
              Sign in
            </Link>
          </Button>
          <Button
            size="sm"
            className="rounded-full bg-neutral-900 px-4 text-white hover:bg-neutral-800"
          >
            Book a demo
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
