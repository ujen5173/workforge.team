import {
  CalendarRemove01Icon,
  DocumentAttachmentIcon,
  MessageSecure02Icon,
  Notification01Icon,
  SecurityCheckIcon,
  UserCircleIcon,
} from "hugeicons-react";
import type { Channel, NavItem, TenantOrg } from "./types";

import {
  Calendar01Icon,
  ChartIncreaseIcon,
  CreditCardPosIcon,
  DashboardSquare01Icon,
  KanbanIcon,
  Pdf01Icon,
  TaskDaily02Icon,
  UserGroup03Icon,
  Video01Icon,
} from "hugeicons-react";

export const COLORS = ["#6366f1", "#f59e0b", "#10b981"];

export const channels: Channel[] = [
  {
    id: "0",
    title: "#General",
    href: "/app/channels/general",
    color: "#EF4444",
    shortcut: "⌘ 1",
  },
  {
    id: "1",
    title: "#Project 1",
    href: "/app/channels/p1",
    color: "#8B5CF6",
    shortcut: "⌘ 2",
  },
  {
    id: "2",
    title: "#Project 2",
    href: "/app/channels/p2",
    color: "#F59E0B",
    shortcut: "⌘ 3",
  },
  {
    id: "3",
    title: "#Updates",
    href: "/app/channels/updates",
    color: "#F59E0B",
    shortcut: "⌘ 4",
  },
];

export const mainNav: NavItem[] = [
  { title: "Dashboard", href: "/app", icon: DashboardSquare01Icon },
  { title: "Projects", href: "/app/projects", icon: KanbanIcon },
  { title: "Calendar", href: "/app/calendar", icon: Calendar01Icon },
  {
    title: "Messages",
    href: "/app/messages",
    icon: MessageSecure02Icon,
    badge: "12",
  },
  { title: "Video/Audio Calls", href: "/app/calls/video", icon: Video01Icon },
  {
    title: "Leave Management",
    href: "/app/leave-management",
    icon: CalendarRemove01Icon,
    badge: 2,
    roles: ["ceo", "hr", "manager"],
  },
  {
    title: "About the Company",
    href: "/app/about-us",
    icon: DocumentAttachmentIcon,
  },
];

export const secondaryNav: NavItem[] = [
  {
    title: "Task Management",
    href: "/app/task-management-board",
    icon: TaskDaily02Icon,
  },
  { title: "Teams", href: "/app/team", icon: UserGroup03Icon },
  { title: "Performance", href: "/app/performance", icon: ChartIncreaseIcon },
  {
    title: "Finance",
    href: "/app/finance",
    icon: CreditCardPosIcon,
    roles: ["employee", "hr", "manager", "ceo"],
  },
  { title: "Documents", href: "/app/documents", icon: Pdf01Icon },
];

export const ROLE_MAP: Record<NonNullable<TenantOrg["role"]>, string> = {
  OWNER: "ceo",
  MANAGER: "manager",
  EMPLOYEE: "employee",
};

export const normalizeRole = (role: TenantOrg["role"]): string =>
  role ? (ROLE_MAP[role] ?? "employee") : "employee";

export const userMenuLinks = [
  {
    href: "/app/profile",
    icon: UserCircleIcon,
    label: "My Profile",
    badge: null,
  },
  {
    href: "/app/notifications",
    icon: Notification01Icon,
    label: "Notifications",
    badge: "4",
  },
  {
    href: "/app/security",
    icon: SecurityCheckIcon,
    label: "Account Security",
    badge: null,
  },
] as const;
