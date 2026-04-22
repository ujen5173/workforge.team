import { Button } from "~/components/ui/button";
import { siteConfig } from "~/lib/site";

const StatsSection = () => {
  return (
    <section className="w-full">
      <div className="mx-auto max-w-4xl px-4 py-12">
        <h1 className="mx-auto mb-8 w-2/3 text-center text-3xl leading-snug font-semibold text-slate-800">
          <span className="text-primary">{siteConfig.name}</span> makes growing
          remove and international teams effortless
        </h1>

        <div className="mb-16 flex items-center justify-center gap-4">
          <div className="flex-1 space-y-2 text-center">
            <h4 className="text-4xl text-slate-800">500+</h4>
            <p className="text-xs text-slate-700">teams onboarded</p>
          </div>
          <div className="flex-1 space-y-2 text-center">
            <h4 className="text-4xl text-slate-800">98%</h4>
            <p className="text-xs text-slate-700">
              on-time task completion rate
            </p>
          </div>
          <div className="flex-1 space-y-2 text-center">
            <h4 className="text-4xl text-slate-800">~ 2 min</h4>
            <p className="text-xs text-slate-700">
              average leave approval time
            </p>
          </div>
          <div className="flex-1 space-y-2 text-center">
            <h4 className="text-4xl text-slate-800">4.9 / 5</h4>
            <p className="text-xs text-slate-700">
              average manager satisfaction{" "}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-center">
          <Button>Get a free 30-minute demo</Button>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
