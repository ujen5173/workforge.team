import { useShallow } from "zustand/react/shallow";
import { useAppStore } from "./StoreProvider";

export const useDate = () =>
  useAppStore(
    useShallow((s) => ({
      selectedDate: s.selectedDate,
      setSelectedDate: s.setSelectedDate,
      clearDate: s.clearDate,
    })),
  );

export const useTimer = () =>
  useAppStore(
    useShallow((s) => ({
      isRunning: s.isRunning,
      elapsedMs: s.elapsedMs,
      start: s.start,
      stop: s.stop,
      reset: s.reset,
    })),
  );
