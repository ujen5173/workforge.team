import Image from "next/image";
import { Button } from "~/components/ui/button";
import { siteConfig } from "~/lib/site";
import FaqSection from "./_components/common/FaqSection";
import FeaturesSection from "./_components/common/FeaturesSection";
import FooterSection from "./_components/common/FooterSection";
import StatsSection from "./_components/common/StatsSection";
import TrustedCompanies from "./_components/common/TrustedCompanies";

const Hero = () => {
  return (
    <section className="w-full rounded-b-xl bg-zinc-900 px-4 pt-48 pb-28">
      <div className="mx-auto flex max-w-5xl items-center gap-12">
        <div className="flex-1 space-y-3">
          <h6 className="text-sm font-normal tracking-wider text-slate-100 uppercase">
            For Everyone
          </h6>
          <h1 className="text-5xl font-bold text-slate-100">
            Run the entire worker lifecycle
          </h1>
          <p className="text-base leading-snug tracking-wider text-slate-200">
            {siteConfig.name} gives HR leaders one place to run hiring, everyday
            HR, development, compensation, and planning worldwide. Automation,
            AI, and compliance are built in, so teams move faster, reduce risk,
            and lead strategically.
          </p>
          <Button variant="outline" className="mt-6 text-xs">
            Book a free 30-minute demo
          </Button>
        </div>
        <div className="flex-1">
          <Image
            src={"/images/img/hero-image.webp"}
            alt="Hero Image"
            width={500}
            height={300}
            className="rounded-lg object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-[#f9f7f4]">
      <Hero />

      <section className="px-4 py-10 md:px-8 md:py-16">
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
