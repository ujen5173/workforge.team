import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";

import { createDateSlice, type DateSlice } from "./slices/date.slice";
import {
  createOnboardSlice,
  type OnboardFormSlice,
} from "./slices/onboard.slice";
import { createTimerSlice, type TimerSlice } from "./slices/timer.slice";

export type RootStore = TimerSlice & DateSlice & OnboardFormSlice;

export const useStore = create<RootStore>()(
  devtools(
    persist(
      (...args) => ({
        ...createDateSlice(...args),
        ...createTimerSlice(...args),
        ...createOnboardSlice(...args),
      }),
      {
        name: "workforge-store",
        storage: createJSONStorage(() => localStorage),
        partialize: (s) => ({
          elapsedTime: s.getElapsedSec(),
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
