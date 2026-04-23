import type { StateCreator } from "zustand";

export type TimerSlice = {
  isRunning: boolean;
  elapsedMs: number;
  start: () => void;
  stop: () => void;
  reset: () => void;
};

export const createTimerSlice: StateCreator<
  TimerSlice,
  [["zustand/immer", never]],
  [],
  TimerSlice
> = (set) => ({
  isRunning: false,
  elapsedMs: 0,
  start: () =>
    set((state) => {
      state.isRunning = true;
    }),
  stop: () =>
    set((state) => {
      state.isRunning = false;
    }),
  reset: () =>
    set((state) => {
      state.isRunning = false;
      state.elapsedMs = 0;
    }),
});
