"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "../common/Logo";

const AuthHeader = () => {
  const path = usePathname();
  const isLogin = path === "/onboard/login";

  return (
    <header className="absolute top-0 left-0 z-50 w-full">
      <nav className="flex items-center justify-between p-6">
        <Logo withDot color="text-neutral-800" size="xl" />

        <div>
          {isLogin ? (
            <Link href="/onboard/signup">
              <p className="hover:text-foreground text-sm text-slate-600 transition hover:underline">
                Don&apos;t have an account? Sign up
              </p>
            </Link>
          ) : (
            <Link href="/onboard/login">
              <p className="hover:text-foreground text-sm text-slate-600 transition hover:underline">
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
