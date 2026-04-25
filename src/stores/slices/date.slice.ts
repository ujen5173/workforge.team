import type { StateCreator } from "zustand";

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
  DateSlice,
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
