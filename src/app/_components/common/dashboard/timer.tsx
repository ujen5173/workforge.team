"use client";

import { Clock02Icon, PlayIcon, Timer02Icon } from "hugeicons-react";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import { Button } from "~/components/ui/button";
import { Separator } from "~/components/ui/separator";
import { useTimer } from "~/stores/hooks";

const Timer = () => {
  const { elapsedMs, isRunning } = useTimer();

  console.log({
    elapsedMs,
    isRunning,
  });

  return (
    <div className="border-border h-full w-full max-w-sm rounded-xl border bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="bg-primary/8 text-primary flex h-7 w-7 items-center justify-center rounded-lg">
            <Timer02Icon size={15} />
          </div>
          <p className="text-sm font-semibold text-slate-800">Time Tracker</p>
        </div>
        <Button icon={Clock02Icon} variant="outline" size="xs">
          History
        </Button>
      </div>

      <Separator className="my-3" />

      <div className="border-border mb-4 overflow-hidden rounded-lg border shadow-xs">
        <div className="border-border flex items-center justify-between border-b bg-slate-50 px-2 py-1">
          <div className="flex items-center gap-1.5">
            <Image
              src="/images/svg/lines.svg"
              className="size-4 mix-blend-multiply"
              alt=""
              width={32}
              height={32}
            />
            <p className="text-xs">Build, Ship, Repeat</p>
          </div>
          <ChevronDown size={15} />
        </div>

        <div className="flex flex-col items-center justify-center gap-1 p-3">
          <p className="text-xs text-slate-500">Awaiting</p>
          <h5 className="mb-1 text-2xl font-semibold tracking-wider text-slate-800">
            00:00:<span className="text-gray-500">00</span>
          </h5>
          <button
            type="button"
            className="text-primary flex cursor-pointer items-center justify-center gap-0.5 bg-white text-xs hover:underline"
          >
            <PlayIcon size={10} />
            Start Time Timer
          </button>
        </div>
      </div>

      <div>
        <div className="mb-2">
          <p className="text-xs font-semibold tracking-wider text-slate-500 uppercase">
            Today&apos;s Sessions
          </p>
        </div>
        <div>
          <div className="mb-2 flex flex-col gap-1 text-sm">
            <div className="flex items-center gap-2">
              <span
                className="h-2 w-2 rounded-full bg-emerald-400"
                aria-hidden
              />
              <span className="w-16">Work</span>
              <span className="font-semibold">: 3hr 40min</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-amber-400" aria-hidden />
              <span className="w-16">Meeting</span>
              <span className="font-semibold">: 15min</span>
            </div>
            <div className="flex items-center gap-2">
              <span
                className="h-2 w-2 rounded-full bg-neutral-300"
                aria-hidden
              />
              <span className="w-16">Away</span>
              <span className="font-semibold">: 5min</span>
            </div>
          </div>

          <div className="flex h-2 w-full gap-0.5">
            <div className="w-[79%] rounded-[1.5px] bg-amber-400"></div>
            <div className="w-[17%] rounded-[1.5px] bg-emerald-400"></div>
            <div className="w-[4%] rounded-[1.5px] bg-neutral-400"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Timer;
