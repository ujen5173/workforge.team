import type { StateCreator } from "zustand";
import type {
  INDUSTRIES,
  ROLES,
  TEAM_SIZES,
  TeamInvite,
} from "~/app/_components/onboaring/types";

export type OnboardSlice = {
  date: string;
  dateInAD: string;
  title: string;
  description: string;
  type: string;
};

export type TeamSize = (typeof TEAM_SIZES)[number]["value"];
export type Role = (typeof ROLES)[number]["value"];
export type Industry = (typeof INDUSTRIES)[number];

type OnboardFields = {
  logo: File | null;
  logoURL: string | null;
  companyName: string;
  slug: string;
  spirit: string;

  industry: Industry | null;
  teamSize: TeamSize | null;
  description: string;
  website: string;

  email: string;
  password: string;
  name: string;
  yourRole: string | null;
  jobTitle: string;

  inviteEmail?: string;
  inviteRole?: Role | null;
  invites?: TeamInvite[];
  invitePassword?: string;
};

type Step1Fields = Pick<
  OnboardFields,
  "logo" | "companyName" | "slug" | "spirit"
>;
type Step2Fields = Pick<
  OnboardFields,
  "industry" | "teamSize" | "description" | "website"
>;
type Step3Fields = Pick<
  OnboardFields,
  "email" | "password" | "name" | "yourRole" | "jobTitle"
>;
type Step4Fields = Pick<
  OnboardFields,
  "inviteEmail" | "inviteRole" | "invites" | "invitePassword"
>;

type StepValues = Step1Fields | Step2Fields | Step3Fields | Step4Fields;

export type OnboardFormSlice = OnboardFields & {
  step: number;
  setLogoURL: (url: string | null) => void;
  nextStep: (values: StepValues, disableStepCount?: boolean) => void;
  prevStep: (values?: StepValues) => void;
};

const initialState = {
  logo: null,
  companyName: "",
  slug: "",
  spirit: "",

  industry: null,
  teamSize: null,
  description: "",
  website: "",

  // Onboard First user
  email: "",
  password: "",
  name: "",
  yourRole: null,
  jobTitle: "",

  // Invite Component
  inviteEmail: "",
  inviteRole: null,
  invitePassword: "",
  invites: [],

  // Others:
  step: 1,
};

export const createOnboardSlice: StateCreator<OnboardFormSlice> = (set) => {
  return {
    ...initialState,

    setLogoURL: (url) => set(() => ({ logoURL: url })),
    nextStep: (values, disableStepCount = false) =>
      set((s) => ({
        ...values,
        step: disableStepCount ? s.step : s.step + 1,
      })),
    prevStep: (values) =>
      set((s) => ({
        ...values,
        step: s.step - 1,
      })),
  };
};
