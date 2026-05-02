// TODO: Server fetching is required to make sure the timer is ended and check the status of the timer.

import type { StateCreator } from "zustand";

type Session = { start: number; end: number | null };

const STORAGE_KEY = "timer_sessions";
const ENDED_TIMER_STORAGE_KEY = "timer_status";

function loadSessions(): Session[] {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]") as Session[];
  } catch {
    return [];
  }
}

function loadEndedTime(): {
  status: boolean;
  endedTime: number;
  createdAt: string | null;
} {
  try {
    const res = JSON.parse(
      localStorage.getItem(ENDED_TIMER_STORAGE_KEY) ??
        "{status: false, endedTime: -1, createdAt: null}",
    ) as { status: boolean; endedTime: number; createdAt: string };

    if (new Date(res.createdAt) < new Date()) {
      return {
        status: false,
        endedTime: -1,
        createdAt: null,
      };
    } else {
      return res;
    }
  } catch {
    return {
      status: false,
      endedTime: -1,
      createdAt: null,
    };
  }
}

function saveSessions(sessions: Session[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions));
}

function saveSessionEnded(time: number) {
  localStorage.setItem(
    ENDED_TIMER_STORAGE_KEY,
    JSON.stringify({
      status: true,
      endedTime: time,
      createdAt: new Date().toLocaleDateString(),
    }),
  );
}

export type TimerSlice = {
  sessions: Session[];
  status: "RUNNING" | "PAUSED" | "ENDED" | "IDLE";
  endedTime: number;

  start: () => void;
  stop: () => void;
  endSession: () => void;
  getElapsedSec: () => number;
};

export const createTimerSlice: StateCreator<TimerSlice> = (set, get) => {
  const persisted = loadSessions();
  const endedPersisted = loadEndedTime();

  const lastSession = persisted.at(-1);
  const status =
    !!lastSession && lastSession.end === null
      ? "RUNNING"
      : endedPersisted.status
        ? "ENDED"
        : "IDLE";

  return {
    sessions: persisted,
    status,
    endedTime: endedPersisted.endedTime ?? -1,

    start: () => {
      if (get().status === "RUNNING") return;
      const sessions = [...get().sessions, { start: Date.now(), end: null }];
      saveSessions(sessions);
      set({ sessions, status: "RUNNING", endedTime: -1 });
    },

    stop: () => {
      if (get().status !== "RUNNING") return;
      const sessions = get().sessions.map((s, i) =>
        i === get().sessions.length - 1 ? { ...s, end: Date.now() } : s,
      );
      saveSessions(sessions);
      set({ sessions, status: "PAUSED", endedTime: -1 });
    },

    endSession: () => {
      if (get().status === "ENDED") return;
      const endedTime = get().getElapsedSec();
      if (get().status === "RUNNING") {
        const sessions = get().sessions.map((s, i) =>
          i === get().sessions.length - 1 ? { ...s, end: Date.now() } : s,
        );
        saveSessions(sessions);
      }
      saveSessions([]);
      set({ sessions: [], status: "ENDED", endedTime });
      saveSessionEnded(endedTime);
    },

    getElapsedSec: () => {
      const { sessions } = get();
      const ms = sessions.reduce((acc, s) => {
        const end = s.end ?? Date.now();
        return acc + (end - s.start);
      }, 0);
      return Math.floor(ms / 1000);
    },
  };
};
