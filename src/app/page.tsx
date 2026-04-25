import { ArrowRight, CheckCircle2, Sparkles } from "lucide-react";
import Link from "next/link";

import { Button } from "~/components/ui/button";
import { siteConfig } from "~/lib/site";

import FaqSection from "./_components/common/FaqSection";
import FeaturesSection from "./_components/common/FeaturesSection";
import FooterSection from "./_components/common/FooterSection";
import StatsSection from "./_components/common/StatsSection";
import TrustedCompanies from "./_components/common/TrustedCompanies";

const Hero = () => {
  return (
    <section className="relative flex flex-col items-center overflow-hidden px-4 pt-36 pb-16 text-center md:px-8 md:pt-44 md:pb-24">
      <div className="absolute inset-0 bg-linear-to-b from-[#f6fbfb] via-[#fbfaf8] to-[#f8f6f3]" />
      <div className="pointer-events-none absolute top-0 left-1/2 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-cyan-200/20 blur-3xl" />
      <div className="pointer-events-none absolute top-40 right-0 h-80 w-80 rounded-full bg-teal-200/15 blur-3xl" />
      <div className="pointer-events-none absolute top-40 left-0 h-80 w-80 rounded-full bg-blue-200/15 blur-3xl" />

      <div className="relative z-10 mx-auto flex max-w-5xl flex-col items-center">
        <span className="text-primary inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-3 py-1.5 text-[11px] font-semibold tracking-[0.16em] uppercase shadow-sm backdrop-blur-sm">
          <Sparkles className="h-3.5 w-3.5" />
          The all-in-one company operating system
        </span>

        <h1 className="mt-8 text-4xl leading-[1.05] font-semibold tracking-tight text-slate-800 md:text-6xl lg:text-7xl">
          Your company,
          <br className="hidden sm:block" />
          finally working
          <span className="text-primary block sm:inline"> as one system.</span>
        </h1>

        <p className="mt-6 max-w-2xl text-base leading-relaxed text-slate-600 md:text-xl">
          {siteConfig.name} connects hiring, communication, projects, HR,
          payroll, and performance in one place so teams move faster, managers
          stay aligned, and operations stop feeling fragmented.
        </p>

        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
          <Button
            size="lg"
            className="shadow-primary/20 h-12 rounded-full px-8 text-base shadow-lg"
            asChild
          >
            <Link href="/onboard/company">
              Start your workspace
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="h-12 rounded-full border-slate-300 bg-white/50 px-8 text-base backdrop-blur-sm hover:bg-white"
            asChild
          >
            <Link href="/onboard/login">Book a 30-minute demo</Link>
          </Button>
        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-3 text-sm text-slate-600">
          {[
            "Hire to retire lifecycle coverage",
            "Multi-tenant and role-based access",
            "AI assistance across every module",
          ].map((item) => (
            <div
              key={item}
              className="inline-flex items-center gap-2 rounded-full border border-slate-200/80 bg-white/70 px-4 py-2 shadow-sm backdrop-blur-sm transition-all hover:bg-white hover:shadow-md"
            >
              <CheckCircle2 className="text-primary h-4 w-4" />
              <span className="font-medium">{item}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="relative z-10 mx-auto mt-20 w-full max-w-6xl">
        <div className="pointer-events-none absolute inset-0 z-10 h-full w-full rounded-2xl bg-gradient-to-t from-[#f8f6f3] via-[#f8f6f3]/20 to-transparent md:from-[#f8f6f3] md:via-transparent" />
        <div className="relative rounded-2xl border border-slate-200/50 bg-white/30 p-2 shadow-2xl backdrop-blur-md lg:p-4">
          <div className="overflow-hidden rounded-xl border border-slate-100 bg-white shadow-inner">
            <img
              src="/images/img/hero-image.png"
              alt="Workforge Dashboard"
              width={1920}
              height={1080}
              className="h-auto w-full rounded-lg object-cover"
              priority={"true"}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-[#f8f6f3]">
      <Hero />

      <section className="px-4 py-6 md:px-8 md:py-12">
        <div className="mx-auto max-w-6xl">
          <TrustedCompanies />
          <div id="features">
            <FeaturesSection />
          </div>
          <div id="stats">
            <StatsSection />
          </div>
          <div id="faqs">
            <FaqSection />
          </div>
        </div>
      </section>

      <div id="pricing">
        <FooterSection />
      </div>
    </main>
  );
}
