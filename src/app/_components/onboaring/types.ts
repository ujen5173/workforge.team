import { Crown02Icon, UserSettings01Icon, WorkIcon } from "hugeicons-react";

export const INVITE_ROLE_OPTIONS = [
  { value: "owner", label: "Owner (CEO / Founder)" },
  { value: "manager", label: "Manager" },
  { value: "employee", label: "Employee" },
] as const;

type Role = (typeof ROLES)[number]["value"];

export type TeamInvite = {
  id: string;
  email: string;
  role: Role | null;
};

export const INDUSTRIES = [
  "Technology & Software",
  "Finance & Banking",
  "Healthcare & Biotech",
  "E-commerce & Retail",
  "Education & EdTech",
  "Manufacturing",
  "Media & Entertainment",
  "Legal & Compliance",
  "Logistics & Supply Chain",
  "Consulting & Professional Services",
  "Real Estate",
  "Other",
] as const;

export const TEAM_SIZES = [
  { label: "1-10", value: "1-10" },
  { label: "11-25", value: "11-25" },
  { label: "26-50", value: "26-50" },
  { label: "50+", value: "50+" },
] as const;

export const ROLES = [
  {
    value: "owner",
    label: "CEO / Founder",
    description: "Full access across the entire workspace",
    Icon: Crown02Icon,
  },
  {
    value: "employee",
    label: "Employee",
    description: "Manage your workflow, get recognize, manage your work",
    Icon: WorkIcon,
  },
  {
    value: "manager",
    label: "Manager",
    description: "Manage people, payroll & leave",
    Icon: UserSettings01Icon,
  },
] as const;
