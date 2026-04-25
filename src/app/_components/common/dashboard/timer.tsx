"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Clock02Icon,
  Logout01Icon,
  PauseIcon,
  PlayIcon,
  Timer02Icon,
} from "hugeicons-react";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useMemo, useState } from "react";
import SlotCounter from "react-slot-counter";
import { formatTime, getAwayTimeSec } from "~/app/utils/time";
import { Button } from "~/components/ui/button";
import { Separator } from "~/components/ui/separator";
import { cn } from "~/lib/utils";
import { useTimer } from "~/stores/hooks";

const Timer = () => {
  const [endDialog, setEndDialog] = useState(false);

  const {
    sessions,
    status,
    start,
    stop,
    endSession,
    endedTime,
    elapsedSec: getElapsedSec,
  } = useTimer();

  const [, tick] = useState(0);

  useEffect(() => {
    if (status !== "RUNNING") return;

    const id = setInterval(() => tick((n) => n + 1), 500);
    return () => clearInterval(id);
  }, [status]);

  const elapsedSec = status === "ENDED" ? endedTime : getElapsedSec();

  const active = useMemo(() => formatTime(elapsedSec), [elapsedSec]);

  const awaySec = useMemo(() => getAwayTimeSec(sessions), [sessions]);

  const away = useMemo(() => formatTime(awaySec), [awaySec]);

  const WORK_HOURS = 8; // this will be getting from backend
  const TOTAL_SECONDS = WORK_HOURS * 60 * 60;

  const getWorkProgress = useCallback(
    (elapsedSeconds: number): number => {
      if (elapsedSeconds <= 0) return 0;

      const progress = (elapsedSeconds / TOTAL_SECONDS) * 100;

      // clamp between 0 and 100
      return Math.min(100, Math.max(0, progress));
    },
    [elapsedSec, away],
  );

  return (
    <div className="border-border flex h-full w-full max-w-sm flex-col rounded-xl border bg-white p-4 shadow-sm">
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

      <div className="border-border mb-4 flex flex-1 flex-col overflow-hidden rounded-lg border shadow-xs">
        <div
          className={cn(
            "border-border flex items-center justify-between border-b bg-slate-50 px-2 py-1",
            endedTime > 0 && "opacity-50",
          )}
        >
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

        <div className="flex flex-1 flex-col items-center justify-center gap-1 p-3">
          <p
            className={cn(
              "text-sm font-semibold",
              status === "ENDED" ? "text-destructive" : "text-slate-400",
            )}
          >
            {status === "ENDED"
              ? "Ended Session for today at"
              : status === "PAUSED"
                ? "Awaiting"
                : status === "IDLE"
                  ? "Waiting"
                  : "Grinding"}
          </p>
          <h5
            className={cn(
              "mb-1 text-3xl font-semibold tracking-wider",
              status === "ENDED"
                ? "text-destructive"
                : status === "RUNNING"
                  ? "text-primary"
                  : "text-slate-800",
            )}
          >
            <SlotCounter value={active.h} speed={0} duration={0.2} />
            :
            <SlotCounter value={active.m} speed={0} duration={0.2} />
            :
            <SlotCounter
              numberClassName="opacity-70"
              value={active.s}
              speed={0}
              duration={0.2}
            />
          </h5>

          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={status === "ENDED"}
              onClick={() => {
                if (status === "ENDED") return;
                if (status === "RUNNING") {
                  stop();
                } else {
                  start();
                }
              }}
              className="flex cursor-pointer items-center justify-center gap-0.5 bg-white text-sm text-blue-500 hover:underline disabled:cursor-not-allowed disabled:opacity-70"
            >
              {status === "RUNNING" ? (
                <>
                  <PauseIcon size={16} />
                  Pause Time Timer
                </>
              ) : (
                <>
                  <PlayIcon size={16} />
                  {status === "PAUSED" ? "Resume" : "Start"} Time Tracker{" "}
                </>
              )}
            </button>
            {status !== "ENDED" && status !== "IDLE" && (
              <>
                <Separator className="mx-1 h-4" orientation="vertical" />

                <AlertDialog open={endDialog}>
                  <button
                    type="button"
                    className="text-destructive flex cursor-pointer items-center justify-center gap-0.5 bg-white text-sm hover:underline"
                    onClick={() => setEndDialog(true)}
                  >
                    <Logout01Icon size={16} />
                    End Today&apos;s session
                  </button>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Punch out?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. It will permanently end
                        your sessions for today and you won&apos;t be able to
                        resume it till tomorrow.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel onClick={() => setEndDialog(false)}>
                        Cancel
                      </AlertDialogCancel>
                      <AlertDialogAction onClick={() => endSession()}>
                        Continue
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </>
            )}
          </div>
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
              <span className="font-semibold">
                :{" "}
                {active.sec === 0
                  ? "N/A"
                  : `${+active.h ? `${active.h}h ` : ""}${+active.m}min`}{" "}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-stone-600" aria-hidden />
              <span className="w-16">Away</span>
              <span className="font-semibold">
                :{" "}
                {away.sec === 0
                  ? "N/A"
                  : `${+away.h ? `${away.h}h ` : ""}${+away.m}min`}{" "}
              </span>
            </div>
          </div>

          <div className="flex h-2 w-full gap-0.5">
            <div
              style={{
                width: `${getWorkProgress(elapsedSec)}%`,
              }}
              className="w-[94%] rounded-[1.5px] bg-emerald-400"
            ></div>
            <div
              style={{
                width: `${getWorkProgress(awaySec)}%`,
              }}
              className="rounded-[1.5px] bg-stone-600"
            ></div>
            <div className="flex-1 rounded-[1.5px] bg-slate-200"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Timer;
