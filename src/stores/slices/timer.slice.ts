import type { StateCreator } from "zustand";
import type { TimerCategory, TimerStatus } from "../types";

export interface TimerSlice {
  elapsedMs: number;
  timerStatus: TimerStatus;
  timerCategory: TimerCategory;
}

export const createTimerSlice: StateCreator<
  TimerSlice,
  [["zustand/devtools", never], ["zustand/persist", unknown]],
  [],
  TimerSlice
> = () => ({
  elapsedMs: 0,
  timerStatus: "IDLE",
  timerCategory: "WORK",
});
