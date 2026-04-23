import { createStore } from "zustand";
import { immer } from "zustand/middleware/immer";
import { createDateSlice, type DateSlice } from "./slices/date.slice";
import { createTimerSlice, type TimerSlice } from "./slices/timer.slice";

export type StoreState = DateSlice & TimerSlice;

export type AppStore = ReturnType<typeof createAppStore>;

export const createAppStore = () =>
  createStore<StoreState>()(
    immer((...args) => ({
      ...createDateSlice(...args),
      ...createTimerSlice(...args),
    })),
  );
