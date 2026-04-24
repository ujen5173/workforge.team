"use server";

import axios, { type AxiosResponse } from "axios";
import NepaliDate from "nepali-date-converter";
import { env } from "~/env";
import type { HolidayType } from "~/stores/slices/date.slice";

type API_RESPONSE = {
  meta: number;
  response: {
    holidays: {
      canonical_url: string;
      country: { id: string; name: string };
      date: {
        datetime: {
          year: number;
          month: number;
          day: number;
        };
        iso: string;
      };
      description: string;
      locations: string;
      name: string;
      primary_type: string;
      states: string;
      type: string[];
      urlid: string;
    }[];
  };
};

export async function getDateData(): Promise<{
  todayBS: string;
  holidays: HolidayType[];
} | null> {
  const res: AxiosResponse<API_RESPONSE> = await axios.get(
    `https://calendarific.com/api/v2/holidays?api_key=${env.CALENDARIFIC_API_KEY}&country=NP&year=${new Date().getFullYear()}`,
  );

  if (res.data.meta) {
    return {
      todayBS: new NepaliDate(new Date()).format("YYYY-MM-DD"),
      holidays: res.data.response.holidays.map((e) => ({
        date: new NepaliDate(new Date(e.date.iso)).format("YYYY-MM-DD"),
        dateInAD: new Date(e.date.iso).toISOString(),
        title: e.name,
        description: e.description,
        type: e.primary_type,
      })),
    };
  } else {
    return null;
  }
}
