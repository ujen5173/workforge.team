import { createStore } from "zustand";
import { immer } from "zustand/middleware/immer";

import { createDateSlice, type DateSlice } from "./slices/date.slice";
import {
  createOnboardSlice,
  type OnboardFormSlice,
} from "./slices/onboard.slice";
import { createTimerSlice, type TimerSlice } from "./slices/timer.slice";

export type StoreState = DateSlice & TimerSlice & OnboardFormSlice;

export type AppStore = ReturnType<typeof createAppStore>;

export const createAppStore = () =>
  createStore<StoreState>()(
    immer((...args) => ({
      ...createDateSlice(...args),
      ...createTimerSlice(...args),
      ...createOnboardSlice(...args),
    })),
  );
