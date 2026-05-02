const STEPS = [
  { id: 1, label: "Identity" },
  { id: 2, label: "Details" },
  { id: 3, label: "Sign up" },
  { id: 4, label: "Team" },
  { id: 5, label: "Verification" },
] as const;

const StepIndicator = ({ current }: { current: number }) => (
  <div className="flex items-center gap-1.5 mb-8">
    {STEPS.map((step, i) => {
      const done = current > step.id;
      const active = current === step.id;
      return (
        <div key={step.id} className="flex items-center gap-1.5">
          <div className="flex items-center gap-2">
            <div
              className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-semibold transition-all duration-200 ${
                done
                  ? "bg-primary text-primary-foreground scale-95"
                  : active
                    ? "border-primary text-primary border-2"
                    : "border-border text-muted-foreground border-2"
              }`}
            >
              {done ? "✓" : step.id}
            </div>
            <span
              className={`hidden text-sm font-medium sm:inline ${
                active
                  ? "text-slate-800"
                  : done
                    ? "text-slate-500"
                    : "text-muted-foreground"
              }`}
            >
              {step.label}
            </span>
          </div>
          {i < STEPS.length - 1 && (
            <div
              className={`h-px w-6 flex-shrink-0 transition-colors duration-300 sm:w-10 ${
                done ? "bg-primary" : "bg-border"
              }`}
            />
          )}
        </div>
      );
    })}
  </div>
);

export default StepIndicator;
