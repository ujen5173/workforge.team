import type { StateCreator } from "zustand";
import type { StoreState } from "../useStore";

export type Organization = {
  id: string;
  name: string;
  slug: string;
  logo: string;
  isActive: boolean;
  position: string | null;
  role: "OWNER" | "EMPLOYEE" | "MANAGER";
  timePeriod: string;
  memberCount: number;
};

export type User = {
  name: string;
  email: string;
  image: string;
  activeOrg: Organization;
  pastOrgs: Organization[];
  position: string;
  role: string;
};

export type UserSlice = {
  user: User | null;

  setUser: (data: { data: User | null }) => void;
};

export const createUserSlice: StateCreator<
  StoreState,
  [["zustand/immer", never]],
  [],
  UserSlice
> = (set) => ({
  user: null,

  setUser: ({ data }) => {
    set({ user: data });
  },
});
