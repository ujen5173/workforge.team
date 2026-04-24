// components/DateHydrator.tsx
"use client";

import { useEffect } from "react";
import { useDate } from "~/stores/hooks";
import type { HolidayType } from "~/stores/slices/date.slice";

type Props = {
  data: { todayBS: string; holidays: HolidayType[] } | null;
};

export const DateHydrator = ({ data }: Props) => {
  const { setHolidaysAndToday } = useDate();

  useEffect(() => {
    setHolidaysAndToday(data);
  }, []);

  return null;
};
