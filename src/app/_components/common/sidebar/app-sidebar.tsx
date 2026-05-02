"use client";

import {
  ArrowRight01Icon,
  ArrowUpDownIcon,
  Calendar01Icon,
  CalendarRemove01Icon,
  ChartIncreaseIcon,
  CircleLock02Icon,
  CreditCardPosIcon,
  DashboardSquare01Icon,
  DocumentAttachmentIcon,
  KanbanIcon,
  Logout01Icon,
  MessageSecure02Icon,
  MoreHorizontalIcon,
  Notification01Icon,
  Pdf01Icon,
  PlusSignIcon,
  SecurityCheckIcon,
  Settings01Icon,
  SparklesIcon,
  TaskDaily02Icon,
  Tick01Icon,
  UserCircleIcon,
  UserGroup03Icon,
  Video01Icon,
} from "hugeicons-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import * as React from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { Kbd } from "~/components/ui/kbd";

type Role = "ceo" | "hr" | "manager" | "employee";

interface Company {
  id: string;
  name: string;
  slug: string;
  color: string;
  current: boolean;
  period: string;
  image: string;
  role: string;
  memberCount: number;
}

interface NavItem {
  title: string;
  href: string;
  icon: React.ElementType;
  badge?: string | number;
  roles?: Role[];
  children?: { title: string; href: string }[];
}

interface Channel {
  id: string;
  title: string;
  href: string;
  color: string;
  shortcut: string;
}

const companies: Company[] = [
  {
    id: "1",
    name: "Workforge Pvt Ltd.",
    slug: "workforge",
    color: "#6366f1",
    current: true,
    image: "deel.jpg",
    period: "Jan 2024 – Present",
    role: "CEO",
    memberCount: 24,
  },
  {
    id: "2",
    name: "Stark Industries",
    slug: "stark",
    color: "#f59e0b",
    current: false,
    image: "khalti.png",
    period: "Mar 2022 – Dec 2023",
    role: "Engineer",
    memberCount: 142,
  },
  {
    id: "3",
    name: "Wayne Enterprises",
    slug: "wayne",
    color: "#10b981",
    current: false,
    image: "fonepay.png",
    period: "Jun 2019 – Feb 2022",
    role: "Manager",
    memberCount: 87,
  },
];

const mainNav: NavItem[] = [
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

const secondaryNav: NavItem[] = [
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

const channels: Channel[] = [
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

const WorkspaceSwitcher = () => {
  const current = companies.find((c) => c.current)!;
  const [active, setActive] = React.useState<Company>(current);
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");

  const currentCompanies = companies.filter((c) => c.current);
  const pastCompanies = companies.filter((c) => !c.current);

  const filterCompanies = (list: Company[]) =>
    query.trim()
      ? list.filter((c) => c.name.toLowerCase().includes(query.toLowerCase()))
      : list;

  const filteredCurrent = filterCompanies(currentCompanies);
  const filteredPast = filterCompanies(pastCompanies);

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu open={open} onOpenChange={setOpen}>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="group h-15 rounded-2xl bg-linear-to-br from-white to-neutral-50 p-2.5 shadow-[0_2px_10px_-3px_rgba(0,0,0,0.05)] ring-1 ring-neutral-200/60 transition-all duration-300 hover:shadow-[0_4px_12px_-4px_rgba(0,0,0,0.1)] hover:ring-neutral-300 data-[state=open]:shadow-[0_4px_12px_-4px_rgba(0,0,0,0.1)] data-[state=open]:ring-neutral-300"
            >
              <div className="relative shrink-0">
                <Avatar className="size-8 rounded-xl shadow-sm ring-1 ring-black/5">
                  <AvatarImage
                    className="rounded-xl object-contain"
                    src="/images/img/trustedCompanies/deel.jpg"
                  />
                  <AvatarFallback
                    className="rounded-xl text-[11px] font-bold text-white"
                    style={{ backgroundColor: active.color }}
                  >
                    {active.name[0]}
                  </AvatarFallback>
                </Avatar>
                {active.current && (
                  <span className="absolute -right-0.5 -bottom-0.5 flex h-2.5 w-2.5 items-center justify-center rounded-full bg-white ring-1 ring-neutral-100">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  </span>
                )}
              </div>

              <div className="ml-1 flex min-w-0 flex-1 flex-col justify-center text-left">
                <span className="truncate text-[13.5px] font-bold tracking-tight text-slate-700">
                  {active.name}
                </span>
                <div className="mt-0.5 flex items-center gap-1.5">
                  <span
                    className="inline-flex h-3.5 items-center rounded px-1 text-[8.5px] font-bold tracking-wide text-white uppercase"
                    style={{ backgroundColor: active.color }}
                  >
                    {active.role}
                  </span>
                  <span className="text-[10px] text-slate-600">
                    {active.memberCount} members
                  </span>
                </div>
              </div>

              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white text-slate-600 shadow-sm ring-1 ring-neutral-200/80 transition-colors duration-200 group-hover:bg-neutral-50 group-hover:text-neutral-600">
                <ArrowUpDownIcon className="size-3.5" />
              </div>
            </SidebarMenuButton>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            className="w-64 overflow-hidden rounded-2xl border border-neutral-200/80 bg-white p-0 shadow-xl shadow-neutral-200/50"
            side="bottom"
            align="start"
            sideOffset={8}
          >
            <div className="max-h-72 overflow-y-auto p-2">
              <p className="px-2 pt-1 pb-1.5 text-[9.5px] font-bold tracking-widest text-slate-600 uppercase">
                Active
              </p>
              {filteredCurrent.map((co) => (
                <WorkspaceItem
                  key={co.id}
                  company={co}
                  isSelected={active.id === co.id}
                  onSelect={() => {
                    setActive(co);
                    setOpen(false);
                    setQuery("");
                  }}
                />
              ))}

              {filteredPast.length > 0 && (
                <>
                  <div className="my-1.5 border-t border-neutral-100" />
                  <p className="px-2 pt-0.5 pb-1.5 text-[9.5px] font-bold tracking-widest text-slate-600 uppercase">
                    Previous
                  </p>
                  <TooltipProvider delayDuration={300}>
                    {filteredPast.map((co) => (
                      <Tooltip key={co.id}>
                        <TooltipTrigger asChild>
                          <WorkspaceItem
                            company={co}
                            isSelected={active.id === co.id}
                            isPast
                            onSelect={() => {
                              setActive(co);
                              setOpen(false);
                              setQuery("");
                            }}
                          />
                        </TooltipTrigger>
                        <TooltipContent
                          side="right"
                          className="flex items-center gap-1.5"
                        >
                          <CircleLock02Icon className="size-2.5" />
                          <span>Read-only archive</span>
                        </TooltipContent>
                      </Tooltip>
                    ))}
                  </TooltipProvider>
                </>
              )}
            </div>

            {/* Footer CTA */}
            <div className="border-t border-neutral-100 p-2">
              <button className="flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-[12px] font-medium text-slate-600 transition-colors hover:bg-neutral-50 hover:text-neutral-800">
                <div className="flex size-5 items-center justify-center rounded-md border border-dashed border-neutral-300 text-slate-600">
                  <PlusSignIcon className="size-3" />
                </div>
                Create or join workspace
              </button>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};

const WorkspaceItem = ({
  company,
  isSelected,
  isPast = false,
  onSelect,
}: {
  company: Company;
  isSelected: boolean;
  isPast?: boolean;
  onSelect: () => void;
}) => (
  <button
    onClick={onSelect}
    className={cn(
      "flex w-full cursor-pointer items-center gap-2.5 rounded-xl px-2 py-2 text-left transition-all duration-150",
      isSelected
        ? "bg-neutral-100 ring-1 ring-neutral-200/80"
        : "hover:bg-neutral-50",
      isPast && "opacity-60",
    )}
  >
    <div className="relative shrink-0">
      <Avatar className="size-8 rounded-lg shadow-sm ring-1 ring-black/5">
        <AvatarImage
          className="rounded-xl object-contain mix-blend-multiply"
          src={`/images/img/trustedCompanies/${company.image}`}
        />
        <AvatarFallback
          className="rounded-lg text-[11px] font-bold text-white"
          style={{ backgroundColor: company.color }}
        >
          {company.name[0]}
        </AvatarFallback>
      </Avatar>
      {isPast && (
        <span className="absolute -right-0.5 -bottom-0.5 flex size-3 items-center justify-center rounded-full bg-white ring-1 ring-neutral-200">
          <CircleLock02Icon className="size-1.5 text-slate-600" />
        </span>
      )}
    </div>

    <div className="flex min-w-0 flex-1 flex-col">
      <span
        className={cn(
          "truncate text-[12.5px] leading-tight font-semibold",
          isPast ? "text-slate-600" : "text-neutral-900",
        )}
      >
        {company.name}
      </span>
      <span className="text-[10.5px] leading-tight text-slate-600">
        {company.period}
      </span>
    </div>

    <div className="flex shrink-0 flex-col items-end gap-1">
      {isSelected ? (
        <span className="flex size-4 items-center justify-center rounded-full bg-emerald-500">
          <Tick01Icon className="size-2.5 text-white" />
        </span>
      ) : (
        <span
          className="inline-flex h-4 items-center rounded px-1.5 text-[9px] font-bold tracking-wide text-white uppercase"
          style={{ backgroundColor: company.color + "cc" }}
        >
          {company.role}
        </span>
      )}
    </div>
  </button>
);

const NavItemComponent = ({ item }: { item: NavItem }) => {
  const pathname = usePathname();
  const isActive =
    pathname === item.href || pathname.startsWith(item.href + "/app");
  const [open, setOpen] = React.useState(isActive);

  if (item.children) {
    return (
      <Collapsible
        open={open}
        onOpenChange={setOpen}
        className="group/collapsible"
      >
        <SidebarMenuItem>
          <CollapsibleTrigger asChild>
            <SidebarMenuButton
              tooltip={item.title}
              className={cn(
                "group relative h-9 rounded-lg transition-all duration-200",
                isActive
                  ? "bg-primary/5 hover:bg-primary/5 hover:text-primary text-primary font-medium"
                  : "text-slate-600 hover:bg-neutral-100 hover:text-neutral-900",
              )}
            >
              <item.icon
                className={cn(
                  "size-[16px] shrink-0 transition-colors duration-150",
                  isActive
                    ? "text-primary"
                    : "text-slate-600 group-hover:text-neutral-600",
                )}
              />
              <span className="flex-1 text-[13px] tracking-tight">
                {item.title}
              </span>
              {item.badge && (
                <Badge
                  variant="secondary"
                  className={cn(
                    "ml-auto h-[18px] px-1.5 text-[9px] leading-none font-bold tracking-wide uppercase",
                    typeof item.badge === "string"
                      ? "bg-emerald-500/10 text-emerald-700 ring-1 ring-emerald-500/20"
                      : "bg-neutral-100 text-neutral-600 ring-1 ring-neutral-200",
                  )}
                >
                  {item.badge}
                </Badge>
              )}
              <ArrowRight01Icon
                className={cn(
                  "size-3.5 text-slate-600 transition-transform duration-200",
                  open && "rotate-90 text-slate-600",
                )}
              />
            </SidebarMenuButton>
          </CollapsibleTrigger>
          <CollapsibleContent className="data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down overflow-hidden">
            <SidebarMenuSub className="mt-1 ml-5 space-y-0.5 border-l border-neutral-100 pl-3">
              {item.children.map((child) => {
                const childActive = pathname === child.href;
                return (
                  <SidebarMenuSubItem key={child.href}>
                    <SidebarMenuSubButton asChild>
                      <Link
                        href={child.href}
                        className={cn(
                          "flex h-8 items-center gap-2.5 rounded-md px-2 text-[12.5px] transition-all duration-200",
                          childActive
                            ? "bg-primary/5 hover:bg-primary/5 hover:text-primary text-primary font-medium"
                            : "text-slate-600 hover:bg-neutral-100 hover:text-neutral-800",
                        )}
                      >
                        {childActive && (
                          <span className="size-1.5 shrink-0 rounded-full bg-emerald-500" />
                        )}
                        {child.title}
                      </Link>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                );
              })}
            </SidebarMenuSub>
          </CollapsibleContent>
        </SidebarMenuItem>
      </Collapsible>
    );
  }

  return (
    <SidebarMenuItem className="relative">
      {isActive && (
        <span className="bg-primary absolute top-1/2 -left-3 h-5 w-1 -translate-y-1/2 rounded-r-full" />
      )}
      <SidebarMenuButton
        asChild
        tooltip={item.title}
        className={cn(
          "h-9 rounded-lg transition-all duration-200",
          isActive
            ? "bg-primary/5 hover:bg-primary/5 hover:text-primary text-primary font-medium"
            : "text-slate-600 hover:bg-neutral-100 hover:text-neutral-900",
        )}
      >
        <Link href={item.href} className="flex items-center gap-2.5">
          <item.icon
            className={cn(
              "size-[16px] shrink-0 transition-colors duration-150",
              isActive ? "text-primary" : "text-slate-600",
            )}
          />
          <span className="flex-1 text-[13px] tracking-tight">
            {item.title}
          </span>
          {item.badge && (
            <Badge
              variant="secondary"
              className={cn(
                "ml-auto h-[18px] px-1.5 text-[9px] leading-none font-bold tracking-wide uppercase",
                typeof item.badge === "string"
                  ? "bg-emerald-500/10 text-emerald-700 ring-1 ring-emerald-500/20"
                  : "bg-neutral-100 text-neutral-600 ring-1 ring-neutral-200",
              )}
            >
              {item.badge}
            </Badge>
          )}
          {isActive && <ArrowRight01Icon className="text-primary" />}
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
};

const UserFooter = () => {
  const user = {
    name: "Aiden Cooper",
    email: "aiden@acme.workforge.team",
    avatarUrl:
      "https://yt3.ggpht.com/I1ckvWK4apdppBpymT0AKYkj4qOTg7Bn_cgbddnU0JJi1_Sn9hoEI6yuv-MkaaQQeWrhs5JgJRw=s88-c-k-c0x00ffffff-no-rj",
    initials: "AC",
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="group h-[52px] rounded-xl border border-transparent px-2 transition-all duration-200 hover:border-neutral-200 hover:bg-white hover:shadow-sm data-[state=open]:border-neutral-200 data-[state=open]:bg-white data-[state=open]:shadow-sm"
            >
              <Avatar className="size-8 shrink-0 rounded-lg shadow-sm ring-1 ring-neutral-200/50">
                <AvatarImage src={user.avatarUrl} alt={user.name} />
                <AvatarFallback className="rounded-lg bg-gradient-to-br from-neutral-800 to-neutral-950 text-[11px] font-semibold text-white">
                  {user.initials}
                </AvatarFallback>
              </Avatar>
              <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                <span className="truncate text-[13px] leading-tight font-semibold text-neutral-900">
                  {user.name}
                </span>
                <span className="truncate text-[10.5px] leading-tight tracking-tight text-slate-600">
                  {user.email}
                </span>
              </div>
              <ArrowUpDownIcon className="size-4 shrink-0 text-slate-600 transition-colors duration-150 group-hover:text-slate-600" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-56 overflow-hidden rounded-xl border border-neutral-200 bg-white p-1 shadow-lg shadow-neutral-200/60"
            side="top"
            align="start"
            sideOffset={8}
          >
            <div className="flex items-center gap-2.5 px-2 py-2">
              <Avatar className="size-8 shrink-0 rounded-lg">
                <AvatarFallback className="rounded-lg bg-neutral-900 text-xs font-semibold text-white">
                  {user.initials}
                </AvatarFallback>
              </Avatar>
              <div className="flex min-w-0 flex-col">
                <span className="truncate text-[12.5px] font-semibold text-neutral-900">
                  {user.name}
                </span>
                <span className="truncate text-[10.5px] text-slate-600">
                  {user.email}
                </span>
              </div>
            </div>
            <div className="my-1 border-t border-neutral-100" />
            {[
              {
                href: "/app/profile",
                icon: UserCircleIcon,
                label: "My Profile",
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
              },
            ].map(({ href, icon: Icon, label, badge }) => (
              <Link
                key={href}
                href={href}
                className="flex cursor-pointer items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-[12.5px] text-neutral-700 transition-colors duration-150 hover:bg-neutral-100"
              >
                <Icon className="size-3.5 text-slate-600" />
                {label}
                {badge && (
                  <Badge className="ml-auto h-4 bg-neutral-100 px-1.5 text-[10px] text-slate-600 hover:bg-neutral-100">
                    {badge}
                  </Badge>
                )}
              </Link>
            ))}
            <div className="my-1 border-t border-neutral-100" />
            <button className="flex w-full cursor-pointer items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-[12.5px] text-red-500 transition-colors duration-150 hover:bg-red-50">
              <Logout01Icon className="size-3.5" />
              Log out
            </button>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};

export function AppSidebar({ role = "ceo" }: { role?: Role }) {
  const filteredNav = mainNav.filter(
    (item) => !item.roles || item.roles.includes(role),
  );

  return (
    <Sidebar
      collapsible="icon"
      className="border-r border-neutral-200 bg-white"
    >
      <SidebarHeader className="border-b border-neutral-100 px-3 py-3">
        <WorkspaceSwitcher />
      </SidebarHeader>

      <SidebarContent className="gap-0 px-3 py-2">
        <SidebarGroup className="p-0">
          <SidebarGroupLabel className="h-auto px-2 pt-2 pb-1.5 text-[10px] font-bold tracking-widest text-slate-600 uppercase">
            Main
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="gap-0.5">
              {filteredNav.map((item) => (
                <NavItemComponent key={item.href} item={item} />
              ))}
              <Collapsible className="group/more">
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton className="group/more-btn h-9 rounded-lg text-slate-600 transition-all duration-200 hover:bg-neutral-100 hover:text-neutral-900">
                      <MoreHorizontalIcon className="size-[16px] shrink-0 text-slate-600 transition-colors duration-150 group-hover/more-btn:text-neutral-600" />
                      <span className="flex-1 text-[13px] tracking-tight">
                        Show more
                      </span>
                      <ArrowRight01Icon className="size-3.5 text-slate-600 transition-transform duration-200 group-data-[state=open]/more:rotate-90 group-data-[state=open]/more:text-slate-600" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down overflow-hidden">
                    <SidebarMenuSub className="mt-1 ml-5 space-y-0.5 border-l border-neutral-100 pl-3">
                      {secondaryNav
                        .filter(
                          (item) => !item.roles || item.roles.includes(role),
                        )
                        .map((item) => (
                          <NavItemComponent key={item.href} item={item} />
                        ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator className="mx-2 my-2 bg-neutral-100" />

        <SidebarGroup className="p-0">
          <SidebarGroupLabel className="flex h-auto items-center justify-between px-2 pt-3 pb-1.5 text-[10px] font-bold tracking-widest text-slate-600 uppercase">
            <span>Channels</span>
            <button className="rounded-md p-1 text-slate-600 transition-all duration-200 hover:bg-neutral-100 hover:text-neutral-900">
              <PlusSignIcon className="size-3.5" />
            </button>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="gap-0.5">
              {channels.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton
                    asChild
                    className="group/pin h-8 rounded-lg text-slate-600 transition-all duration-200 hover:bg-neutral-100 hover:text-neutral-900"
                  >
                    <Link href={item.href} className="flex items-center gap-3">
                      <span
                        className="size-2 shrink-0 rounded-full shadow-[0_0_0_2px_#fff] transition-transform duration-200 group-hover/pin:scale-110"
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="flex-1 truncate text-[12.5px] tracking-tight">
                        {item.title}
                      </span>
                      <Kbd className="gap-1 rounded-md bg-white px-1.5 py-0.5 text-[9px] font-semibold tracking-widest text-slate-600 uppercase shadow-sm ring-1 ring-neutral-200/60 transition-colors duration-200 group-hover/pin:text-slate-600">
                        {item.shortcut}
                      </Kbd>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator className="mx-2 my-2 bg-neutral-100" />

        <SidebarGroup className="p-0">
          <SidebarGroupLabel className="h-auto px-2 pt-3 pb-1.5 text-[10px] font-bold tracking-widest text-slate-600 uppercase">
            Tools & System
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="gap-0.5">
              {[
                {
                  href: "/app/settings",
                  icon: Settings01Icon,
                  label: "Settings",
                  tooltip: "Settings",
                },
              ].map(({ href, icon: Icon, label, tooltip }) => (
                <SidebarMenuItem key={href}>
                  <SidebarMenuButton
                    asChild
                    tooltip={tooltip}
                    className="group h-8.5 rounded-lg text-slate-600 transition-all duration-200 hover:bg-neutral-100 hover:text-neutral-900"
                  >
                    <Link href={href} className="flex items-center gap-2.5">
                      <Icon className="size-[16px] shrink-0 text-slate-600 transition-colors duration-200 group-hover:text-neutral-600" />
                      <span className="text-[13px] tracking-tight">
                        {label}
                      </span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  tooltip="What's New"
                  className="group h-8.5 rounded-lg text-slate-600 transition-all duration-200 hover:bg-neutral-100 hover:text-neutral-900"
                >
                  <Link
                    href="/app/changelog"
                    className="flex items-center gap-2.5"
                  >
                    <SparklesIcon className="size-[16px] shrink-0 text-slate-600 transition-colors duration-200 group-hover:text-amber-500" />
                    <span className="text-[13px] tracking-tight">
                      What&apos;s New
                    </span>
                    <Badge
                      variant="secondary"
                      className="ml-auto h-[18px] bg-amber-500/10 px-1.5 py-0 text-[9px] font-bold tracking-widest text-amber-700 uppercase ring-1 ring-amber-500/20 transition-colors duration-200 hover:bg-amber-500/20"
                    >
                      v0.0.1
                    </Badge>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-neutral-100 px-2 py-2">
        <UserFooter />
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
