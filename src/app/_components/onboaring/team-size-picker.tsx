import type { TeamSize } from "~/stores/slices/onboard.slice";
import { TEAM_SIZES } from "./types";

const TeamSizePicker = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: TeamSize) => void;
}) => (
  <div className="gap-2 grid grid-cols-4">
    {TEAM_SIZES.map((size) => (
      <button
        key={size.value}
        type="button"
        onClick={() => onChange(size.value)}
        className={`rounded-md border px-3 py-2 text-sm font-medium transition-colors ${
          value === size.value
            ? "border-primary bg-primary/5 text-primary"
            : "border-border text-foreground hover:border-primary/50"
        }`}
      >
        {size.label}
      </button>
    ))}
  </div>
);

export default TeamSizePicker;
