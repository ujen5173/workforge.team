const pad2 = (n: number) => n.toString().padStart(2, "0");

export const formatTime = (sec: number) => {
  const hrs = Math.floor(sec / 3600);
  const mins = Math.floor((sec % 3600) / 60);
  const secs = sec % 60;

  const h = pad2(hrs);
  const m = pad2(mins);
  const s = pad2(secs);

  return {
    sec,
    h,
    m,
    s,
    digits: {
      h: h.split("").map(Number),
      m: m.split("").map(Number),
      s: s.split("").map(Number),
    },
  };
};

export const getAwayTimeSec = (
  sessions: { start: number; end?: number | null }[],
) => {
  if (!sessions.length) return 0;

  const firstStart = sessions[0]!.start;
  const lastEnd = sessions.at(-1)?.end ?? Date.now();

  const wallClockMs = lastEnd - firstStart;

  const activeMs = sessions.reduce((acc, s) => {
    return acc + ((s.end ?? Date.now()) - s.start);
  }, 0);

  return Math.floor((wallClockMs - activeMs) / 1000);
};
