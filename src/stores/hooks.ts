import { useShallow } from "zustand/react/shallow";
import { useAppStore } from "./StoreProvider";

export const useDate = () =>
  useAppStore(
    useShallow((s) => ({
      todayBS: s.todayBS,
      holidays: s.holidays,

      setHolidaysAndToday: s.setHolidaysAndToday,
    })),
  );

export const useTimer = () =>
  useAppStore(
    useShallow((s) => ({
      status: s.status,
      elapsedSec: s.getElapsedSec,
      start: s.start,
      endedTime: s.endedTime,
      sessions: s.sessions,
      stop: s.stop,
      endSession: s.endSession,
    })),
  );
