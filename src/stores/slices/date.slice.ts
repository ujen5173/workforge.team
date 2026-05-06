import type { StateCreator } from "zustand";
import type { StoreState } from "../useStore";

export type HolidayType = {
  date: string;
  dateInAD: string;
  title: string;
  description: string;
  type: string;
};

export type DateSlice = {
  todayBS: string | null;
  holidays: HolidayType[];

  setHolidaysAndToday: (
    data: { todayBS: string; holidays: HolidayType[] } | null,
  ) => void;
};

export const createDateSlice: StateCreator<
  StoreState,
  [["zustand/immer", never]],
  [],
  DateSlice
> = (set) => ({
  todayBS: null,
  holidays: [],

  setHolidaysAndToday: (data) => {
    set({ todayBS: data?.todayBS ?? "N/A", holidays: data?.holidays ?? [] });
  },
});
