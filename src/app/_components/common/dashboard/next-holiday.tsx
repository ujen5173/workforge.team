import { Calendar03Icon, GiftIcon } from "hugeicons-react";
import { Badge } from "~/components/ui/badge";
import { Separator } from "~/components/ui/separator";
import { cn } from "~/lib/utils";

type HolidayType = "public" | "optional" | "restricted";

interface Holiday {
  name: string;
  enDate: string;
  npDate: string; // Bikram Sambat date string
  daysLeft: number;
  type: HolidayType;
  description?: string;
}

const HOLIDAY_TYPE_CONFIG: Record<
  HolidayType,
  { label: string; badge: "default" | "secondary" | "outline" }
> = {
  public: { label: "Public Holiday", badge: "secondary" },
  optional: { label: "Optional", badge: "outline" },
  restricted: { label: "Restricted", badge: "outline" },
};

const NEXT_HOLIDAY: Holiday = {
  name: "Vijaya Dashami",
  enDate: "Oct 12, 2025",
  npDate: "Ashwin 26, 2082 BS",
  daysLeft: 14,
  type: "public",
  description:
    "The tenth day of Dashain — the most celebrated festival in Nepal.",
};

// Upcoming holidays after the next one
const UPCOMING_HOLIDAYS: Holiday[] = [
  {
    name: "Laxmi Puja",
    enDate: "Oct 20, 2025",
    npDate: "Kartik 03, 2082 BS",
    daysLeft: 22,
    type: "public",
  },
  {
    name: "Tihar (Bhai Tika)",
    enDate: "Oct 24, 2025",
    npDate: "Kartik 07, 2082 BS",
    daysLeft: 26,
    type: "public",
  },
];

const DaysLeftRing = ({ days }: { days: number }) => {
  const max = 30;
  const percentage = Math.min((days / max) * 100, 100);
  const radius = 20;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative flex h-14 w-14 items-center justify-center">
      <svg
        width="56"
        height="56"
        viewBox="0 0 56 56"
        className="-rotate-90"
        aria-hidden
      >
        <circle
          cx="28"
          cy="28"
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          className="text-slate-100"
        />
        <circle
          cx="28"
          cy="28"
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
          strokeLinecap="round"
          className={cn(
            "transition-all duration-700",
            days <= 5
              ? "text-red-400"
              : days <= 10
                ? "text-amber-400"
                : "text-primary",
          )}
        />
      </svg>
      <div className="absolute flex flex-col items-center leading-none">
        <span className="text-base font-bold text-slate-800">{days}</span>
        <span className="text-[9px] font-medium text-slate-400 uppercase">
          days
        </span>
      </div>
    </div>
  );
};

const NextHoliday = () => {
  return (
    <div className="border-border h-full w-full max-w-sm rounded-xl border bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="bg-primary/8 text-primary flex h-7 w-7 items-center justify-center rounded-lg">
            <GiftIcon size={15} />
          </div>
          <p className="text-sm font-semibold text-slate-800">Next Holiday</p>
        </div>
        <Badge
          variant={HOLIDAY_TYPE_CONFIG[NEXT_HOLIDAY.type].badge}
          className="px-1.5 py-0 text-[10px] font-medium"
        >
          {HOLIDAY_TYPE_CONFIG[NEXT_HOLIDAY.type].label}
        </Badge>
      </div>

      <Separator className="my-3" />

      <div className="from-primary/5 to-primary/2 ring-primary/10 mb-4 flex items-center gap-4 rounded-xl bg-gradient-to-br px-4 py-3.5 ring-1">
        <DaysLeftRing days={NEXT_HOLIDAY.daysLeft} />

        <div className="min-w-0 flex-1">
          <p className="text-sm leading-snug font-semibold text-slate-800">
            {NEXT_HOLIDAY.name}
          </p>
          {NEXT_HOLIDAY.description && (
            <p className="mt-0.5 line-clamp-2 text-[11px] leading-snug text-slate-400">
              {NEXT_HOLIDAY.description}
            </p>
          )}
        </div>
      </div>

      <div className="mb-4 space-y-2">
        <div className="border-border/60 flex items-center gap-3 rounded-lg border bg-slate-50 px-3 py-2">
          <Calendar03Icon size={14} className="shrink-0 text-slate-700" />
          <div className="flex flex-1 items-center justify-between">
            <span className="text-[11px] font-medium text-slate-700">
              English (AD)
            </span>
            <span className="text-xs font-semibold text-slate-700">
              {NEXT_HOLIDAY.enDate}
            </span>
          </div>
        </div>
        <div className="border-border/60 flex items-center gap-3 rounded-lg border bg-slate-50 px-3 py-2">
          <Calendar03Icon size={14} className="shrink-0 text-slate-700" />
          <div className="flex flex-1 items-center justify-between">
            <span className="text-[11px] font-medium text-slate-700">
              Nepali (BS)
            </span>
            <span className="text-xs font-semibold text-slate-700">
              {NEXT_HOLIDAY.npDate}
            </span>
          </div>
        </div>
      </div>

      <div>
        <p className="mb-2 text-[10px] font-semibold tracking-wider text-slate-400 uppercase">
          Coming Up
        </p>
        <div className="space-y-1.5">
          {UPCOMING_HOLIDAYS.map((h, i) => (
            <div
              key={i}
              className="flex cursor-pointer items-center gap-3 rounded-lg px-1.5 py-1.5 transition-colors hover:bg-slate-50"
            >
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-slate-100 text-center">
                <span className="text-[10px] leading-none font-bold text-slate-500">
                  {h.enDate.split(" ")[1]!.replace(",", "")}
                  <br />
                  <span className="font-medium text-slate-400">
                    {h.enDate.split(" ")[0]!.slice(0, 3)}
                  </span>
                </span>
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-xs font-medium text-slate-700">
                  {h.name}
                </p>
                <p className="text-[10px] text-slate-400">{h.npDate}</p>
              </div>
              <span className="shrink-0 text-[10px] font-medium text-slate-400">
                {h.daysLeft}d
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NextHoliday;
