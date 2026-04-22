import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";
import { createTimerSlice, type TimerSlice } from "./slices/timer.slice";

export type RootStore = TimerSlice;

export const useStore = create<RootStore>()(
  devtools(
    persist(
      (...args) => ({
        ...createTimerSlice(...args),
      }),
      {
        name: "workforge-store",
        storage: createJSONStorage(() => localStorage),
        partialize: (s) => ({
          timerCategory: s.timerCategory,
        }),
        version: 1,
      },
    ),
    {
      name: "WorkForge",
      enabled: process.env.NODE_ENV === "development",
    },
  ),
);
