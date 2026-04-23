import type { StateCreator } from "zustand";

export type DateSlice = {
  selectedDate: Date | null;
  setSelectedDate: (date: Date | null) => void;
  clearDate: () => void;
};

export const createDateSlice: StateCreator<
  DateSlice,
  [["zustand/immer", never]],
  [],
  DateSlice
> = (set) => ({
  selectedDate: null,
  setSelectedDate: (date) =>
    set((state) => {
      state.selectedDate = date;
    }),
  clearDate: () =>
    set((state) => {
      state.selectedDate = null;
    }),
});
