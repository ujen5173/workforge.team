"use client";

import { differenceInCalendarDays, format, parseISO } from "date-fns";
import { Calendar03Icon, GiftIcon } from "hugeicons-react";

import { Badge } from "~/components/ui/badge";
import { Separator } from "~/components/ui/separator";
import { cn } from "~/lib/utils";
import { useDate } from "~/stores/hooks";

export type HolidayType = {
  date: string; // BS date string
  dateInAD: string; // ISO date string e.g. "2025-04-14"
  title: string;
  description: string;
  type: string;
};

function getDaysLeft(dateInAD: string): number {
  return differenceInCalendarDays(parseISO(dateInAD), new Date());
}

function fmtAD(dateInAD: string): string {
  return format(parseISO(dateInAD), "MMM d, yyyy");
}

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
  const { holidays } = useDate();

  const upcoming = holidays
    .filter((h) => getDaysLeft(h.dateInAD) >= 0)
    .sort((a, b) => getDaysLeft(a.dateInAD) - getDaysLeft(b.dateInAD))
    .reduce(
      (accum, current) => {
        if (Object.hasOwn(accum, current.date)) {
          accum[current.date] = {
            ...accum[current.date]!,
            title: accum[current.date]!.title + ` / ${current.title}`,
          };
        } else {
          accum[current.date] = current;
        }
        return accum;
      },
      {} as Record<string, HolidayType>,
    );

  const upcomingList = Object.values(upcoming);
  const next = upcomingList[0];
  const rest = upcomingList.slice(0, 2);

  if (!next) {
    return (
      <div className="border-border h-full w-full max-w-sm rounded-xl border bg-white p-4 shadow-sm">
        <p className="text-sm text-slate-400">No upcoming holidays.</p>
      </div>
    );
  }

  const nextDaysLeft = getDaysLeft(next.dateInAD);

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
          variant="secondary"
          className="px-1.5 py-0 text-[10px] font-medium capitalize"
        >
          {next.type}
        </Badge>
      </div>

      <Separator className="my-3" />

      <div className="from-primary/5 to-primary/2 ring-primary/10 mb-4 flex items-center gap-4 rounded-xl bg-gradient-to-br px-4 py-3.5 ring-1">
        <DaysLeftRing days={nextDaysLeft} />
        <div className="min-w-0 flex-1">
          <p className="text-sm leading-snug font-semibold text-slate-800">
            {next.title}
          </p>
          {next.description && (
            <p className="mt-0.5 line-clamp-2 text-[11px] leading-snug text-slate-400">
              {next.description}
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
              {fmtAD(next.dateInAD)}
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
              {next.date}
            </span>
          </div>
        </div>
      </div>

      {rest.length > 0 && (
        <div>
          <p className="mb-2 text-[10px] font-semibold tracking-wider text-slate-400 uppercase">
            Coming Up
          </p>
          <div className="space-y-1.5">
            {rest.map((h, i) => {
              const parsed = parseISO(h.dateInAD);
              const dayNum = format(parsed, "d");
              const monAbbr = format(parsed, "MMM");
              const dLeft = getDaysLeft(h.dateInAD);

              return (
                <div
                  key={i}
                  className="flex cursor-pointer items-center gap-3 rounded-lg px-1.5 py-1.5 transition-colors hover:bg-slate-50"
                >
                  {/* Mini calendar tile */}
                  <div className="flex h-8 w-8 shrink-0 flex-col items-center justify-center rounded-md bg-slate-100 text-center">
                    <span className="text-[10px] leading-none font-bold text-slate-500">
                      {dayNum}
                    </span>
                    <span className="text-[9px] font-medium text-slate-400">
                      {monAbbr}
                    </span>
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-xs font-medium text-slate-700">
                      {h.title}
                    </p>
                    <p className="text-[10px] text-slate-400">{h.date}</p>
                  </div>

                  <span className="shrink-0 text-[10px] font-medium text-slate-400">
                    {dLeft}d
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default NextHoliday;
