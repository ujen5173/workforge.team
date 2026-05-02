"use client";

import { CustomerSupportIcon } from "hugeicons-react";
import { ArrowLeft, Briefcase, FileQuestion, Search } from "lucide-react";
import Link from "next/link";

import { Button } from "~/components/ui/button";

import Header from "./_components/headers/main-header";

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="relative flex h-dvh flex-col items-center justify-center overflow-hidden bg-[#f8f6f3] px-4 pt-16">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,#e2f3f3_0%,transparent_50%),radial-gradient(circle_at_50%_120%,#fdf2e9_0%,transparent_50%)]" />

        <div
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: "radial-gradient(#000 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        <div className="pointer-events-none absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-cyan-200/20 blur-[100px]" />
        <div className="pointer-events-none absolute right-1/4 bottom-1/4 h-80 w-80 rounded-full bg-teal-200/15 blur-[100px]" />

        <div className="relative z-10 flex w-full max-w-3xl flex-col items-center text-center">
          <div className="relative flex w-full items-center justify-center py-8 sm:py-12">
            <h1 className="pointer-events-none absolute inset-0 flex select-none items-center justify-center text-[8rem] font-bold tracking-tighter text-slate-900/[0.04] sm:text-[11rem] md:text-[14rem]">
              404
            </h1>

            <div className="relative flex h-24 w-24 items-center justify-center rounded-[2rem] border border-white/50 bg-white/40 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.08)] backdrop-blur-xl transition-all duration-500 hover:bg-white/60">
              <div className="relative h-10 w-10">
                <div className="flex h-full w-full items-center justify-center text-slate-800">
                  <FileQuestion className="h-full w-full" strokeWidth={1.2} />
                </div>
                <div className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white shadow-lg">
                  !
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-200/60 bg-white/50 px-4 py-1.5 text-[10px] font-bold tracking-[0.2em] uppercase text-slate-500 backdrop-blur-sm">
              <Briefcase className="h-3 w-3" />
              Page Not Found
            </div>

            <h2 className="bg-gradient-to-br from-slate-900 to-slate-600 bg-clip-text px-4 text-3xl font-semibold tracking-tight text-transparent sm:text-5xl">
              Lost in the workspace.
            </h2>

            <p className="mx-auto max-w-lg px-4 text-sm leading-relaxed text-slate-500 sm:text-base">
              The page you&apos;re looking for might have been moved, renamed,
              or it doesn&apos;t exist in this workspace anymore.
            </p>

            <div className="group relative mx-auto mt-4 w-full max-w-md px-4">
              <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 group-focus-within:border-slate-300 group-focus-within:shadow-md group-focus-within:ring-4 group-focus-within:ring-slate-900/5">
                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search for documents, tasks..."
                  className="h-14 w-full bg-transparent px-12 text-slate-600 placeholder:text-slate-400 focus:outline-none"
                />
                <div className="absolute inset-y-2 right-2">
                  <Button className="h-10 rounded-xl transition duration-300 bg-slate-900 px-4 text-xs font-semibold text-white">
                    Search
                  </Button>
                </div>
              </div>
            </div>

            <div className="mt-6 flex flex-col items-center justify-center gap-3 px-4 sm:flex-row">
              <Button
                asChild
                size="lg"
                icon={ArrowLeft}
                iconPlacement="left"
                className="h-12 w-full rounded-2xl bg-slate-900 px-8 text-sm font-medium text-white shadow-[0_20px_40px_-12px_rgba(0,0,0,0.25)] transition-all hover:scale-[1.02] active:scale-[0.98] sm:w-auto"
              >
                <Link href="/">Back to Dashboard</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                effect="shineHover"
                className="h-12 w-full rounded-2xl border-slate-200 bg-white/50 px-8 text-sm font-medium text-slate-700 backdrop-blur-md transition-all hover:bg-white hover:border-slate-300 sm:w-auto"
              >
                <Link href="/support">
                  <CustomerSupportIcon size={18} className="mr-2" />
                  Contact Support
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
