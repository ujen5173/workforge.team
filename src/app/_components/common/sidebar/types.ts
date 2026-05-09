export type TenantOrg = {
  isActive: boolean;
  role: "OWNER" | "EMPLOYEE" | "MANAGER" | undefined;
  timePeriod: string;
  name: string;
  slug: string | null;
  logo: string | null;
  memberCount: number;
};

export type StructuredOrg = TenantOrg & { id: number; color: string };

export type NavItem = {
  title: string;
  href: string;
  icon: React.ElementType;
  badge?: string | number;
  roles?: string[];
  children?: { title: string; href: string }[];
};

export type Channel = {
  id: string;
  title: string;
  href: string;
  color: string;
  shortcut: string;
};
