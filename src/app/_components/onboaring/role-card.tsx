import type { ROLES } from "./types";

const RoleCard = ({
  role,
  selected,
  onSelect,
}: {
  role: (typeof ROLES)[number];
  selected: boolean;
  onSelect: () => void;
}) => {
  const { Icon, label, description } = role;

  return (
    <button
      type="button"
      onClick={onSelect}
      className={`flex items-start gap-3 rounded-xl border p-4 text-left transition-all duration-150 ${
        selected
          ? "border-primary bg-primary/5 ring-primary/20 ring-2"
          : "border-border hover:border-primary/40 hover:bg-slate-50"
      }`}
    >
      <div
        className={`mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg transition-colors ${
          selected
            ? "bg-primary text-primary-foreground"
            : "bg-muted text-muted-foreground"
        }`}
      >
        <Icon className="w-4 h-4" />
      </div>
      <div className="min-w-0">
        <p
          className={`text-sm font-semibold ${selected ? "text-primary" : "text-slate-800"}`}
        >
          {label}
        </p>
        <p className="mt-0.5 text-muted-foreground text-xs leading-snug">
          {description}
        </p>
      </div>
    </button>
  );
};

export default RoleCard;
