"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import Logo from "../common/Logo";

const AuthHeader = () => {
  const path = usePathname();
  const isLogin = path === "/onboard/login";

  return (
    <header className="top-0 left-0 z-50 absolute w-full">
      <nav className="flex justify-between items-center p-6">
        <Logo withDot color="text-neutral-800" size="xl" />

        <div>
          {isLogin ? (
            <Link href="/onboard/company">
              <p className="text-slate-600 hover:text-foreground text-sm hover:underline transition">
                Sign up an organization.
              </p>
            </Link>
          ) : (
            <Link href="/onboard/login">
              <p className="text-slate-600 hover:text-foreground text-sm hover:underline transition">
                Already have an account? Log in
              </p>
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
};

export default AuthHeader;
