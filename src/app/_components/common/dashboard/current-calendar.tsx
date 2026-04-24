"use client";

import { Calendar01Icon } from "hugeicons-react";
import NepaliDate from "nepali-date-converter";
import { useState } from "react";
import { Calendar } from "~/components/ui/calendar";
import { Separator } from "~/components/ui/separator";

/**
 * Nepali (Bikram Sambat) date conversion — approximate.
 * Replace with a proper library (e.g. `nepali-date-converter`) for production.
 */
const NEPALI_MONTHS = [
  "Baisakh",
  "Jestha",
  "Ashadh",
  "Shrawan",
  "Bhadra",
  "Ashwin",
  "Kartik",
  "Mangsir",
  "Poush",
  "Magh",
  "Falgun",
  "Chaitra",
] as const;

const formatEnglishDate = (date: Date) =>
  date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

const DashboardCalendar = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const nepali = new NepaliDate(date);

  return (
    <div className="border-border h-full w-full max-w-sm rounded-xl border bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="bg-primary/8 text-primary flex h-7 w-7 items-center justify-center rounded-lg">
            <Calendar01Icon size={15} />
          </div>
          <p className="text-sm font-semibold text-slate-800">Calendar</p>
        </div>
        <div className="flex items-center gap-1 rounded-md bg-slate-50 px-2 py-1">
          <span className="text-[10px] font-medium text-slate-400">BS</span>
          <span className="text-[10px] font-semibold text-slate-600">
            {NEPALI_MONTHS[nepali.getMonth()]} {nepali.getDate()},{" "}
            {nepali.getYear()}
          </span>
        </div>
      </div>

      <Separator className="my-3" />

      <div className="bg-primary/5 mb-3 flex items-center gap-2 rounded-lg px-3 py-2">
        <div className="flex-1">
          <p className="text-[10px] font-medium tracking-wider text-slate-400 uppercase">
            Today
          </p>
          <p className="text-sm font-semibold text-slate-700">
            {formatEnglishDate(date ?? new Date())}
          </p>
        </div>
        <div className="text-right">
          <p className="text-[10px] text-slate-400">Nepali</p>
          <p className="text-xs font-medium text-slate-600">
            {nepali.getDate()} {NEPALI_MONTHS[nepali.getMonth()]}
          </p>
        </div>
      </div>

      <div className="relative">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="w-full p-0"
          classNames={{
            month_grid: "w-full",
            months: "w-full",
            month: "w-full",
            table: "w-full",
            head_cell:
              "text-slate-400 font-medium text-[11px] w-full text-center",
            cell: "text-center text-sm p-0",
            day: "h-8 w-8 rounded-lg text-xs font-medium text-slate-600 hover:bg-slate-100 transition-colors mx-auto",
            day_selected:
              "bg-primary! text-primary-foreground! rounded-lg font-semibold",
            day_today: "font-bold text-primary",
            day_outside: "text-slate-200",
            nav_button:
              "h-6 w-6 rounded-md hover:bg-slate-100 flex items-center justify-center transition-colors",
            caption: "flex items-center justify-between px-1 mb-2",
            caption_label: "text-sm font-semibold text-slate-700",
          }}
        />
      </div>
    </div>
  );
};

export default DashboardCalendar;
