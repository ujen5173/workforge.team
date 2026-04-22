import { useStore } from "./root.store";

export const useElapsedMs = () => useStore((s) => s.elapsedMs);
export const useTimerStatus = () => useStore((s) => s.timerStatus);
export const useTimerCategory = () => useStore((s) => s.timerCategory);
