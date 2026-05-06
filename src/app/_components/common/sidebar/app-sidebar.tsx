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

interface TenantOrg {
  id: string;
  name: string;
  slug: string | null;
  logo: string | null;
}

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
  roles?: string[];
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

const WorkspaceSwitcher = ({ organization }: { organization: TenantOrg }) => {
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

  const orgInitial = organization.name?.[0]?.toUpperCase() ?? "W";
  const orgColor = "#6366f1";

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu open={open} onOpenChange={setOpen}>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="group bg-linear-to-br from-white to-neutral-50 shadow-[0_2px_10px_-3px_rgba(0,0,0,0.05)] data-[state=open]:shadow-[0_4px_12px_-4px_rgba(0,0,0,0.1)] hover:shadow-[0_4px_12px_-4px_rgba(0,0,0,0.1)] p-2.5 rounded-2xl ring-1 ring-neutral-200/60 data-[state=open]:ring-neutral-300 hover:ring-neutral-300 h-15 transition-all duration-300"
            >
              <div className="relative shrink-0">
                <Avatar className="shadow-sm rounded-xl ring-1 ring-black/5 size-8">
                  {organization.logo ? (
                    <AvatarImage
                      className="rounded-xl object-contain"
                      src={organization.logo}
                    />
                  ) : null}
                  <AvatarFallback
                    className="rounded-xl font-bold text-[11px] text-white"
                    style={{ backgroundColor: orgColor }}
                  >
                    {orgInitial}
                  </AvatarFallback>
                </Avatar>
                <span className="-right-0.5 -bottom-0.5 absolute flex justify-center items-center bg-white rounded-full ring-1 ring-neutral-100 w-2.5 h-2.5">
                  <span className="bg-emerald-500 rounded-full w-1.5 h-1.5" />
                </span>
              </div>

              <div className="flex flex-col flex-1 justify-center ml-1 min-w-0 text-left">
                <span className="font-bold text-[13.5px] text-slate-700 truncate tracking-tight">
                  {organization.name}
                </span>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span
                    className="inline-flex items-center px-1 rounded h-3.5 font-bold text-[8.5px] text-white uppercase tracking-wide"
                    style={{ backgroundColor: active.color }}
                  >
                    {active.role}
                  </span>
                  <span className="text-[10px] text-slate-600">
                    {active.memberCount} members
                  </span>
                </div>
              </div>

              <div className="flex justify-center items-center bg-white group-hover:bg-neutral-50 shadow-sm rounded-full ring-1 ring-neutral-200/80 w-6 h-6 text-slate-600 group-hover:text-neutral-600 transition-colors duration-200 shrink-0">
                <ArrowUpDownIcon className="size-3.5" />
              </div>
            </SidebarMenuButton>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            className="bg-white shadow-neutral-200/50 shadow-xl p-0 border border-neutral-200/80 rounded-2xl w-64 overflow-hidden"
            side="bottom"
            align="start"
            sideOffset={8}
          >
            <div className="p-2 max-h-72 overflow-y-auto">
              <p className="px-2 pt-1 pb-1.5 font-bold text-[9.5px] text-slate-600 uppercase tracking-widest">
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
                  <div className="my-1.5 border-neutral-100 border-t" />
                  <p className="px-2 pt-0.5 pb-1.5 font-bold text-[9.5px] text-slate-600 uppercase tracking-widest">
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

            <div className="p-2 border-neutral-100 border-t">
              <button className="flex items-center gap-2 hover:bg-neutral-50 px-2.5 py-2 rounded-lg w-full font-medium text-[12px] text-slate-600 hover:text-neutral-800 transition-colors">
                <div className="flex justify-center items-center border border-neutral-300 border-dashed rounded-md size-5 text-slate-600">
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
      "flex items-center gap-2.5 px-2 py-2 rounded-xl w-full text-left transition-all duration-150 cursor-pointer",
      isSelected
        ? "bg-neutral-100 ring-1 ring-neutral-200/80"
        : "hover:bg-neutral-50",
      isPast && "opacity-60",
    )}
  >
    <div className="relative shrink-0">
      <Avatar className="shadow-sm rounded-lg ring-1 ring-black/5 size-8">
        <AvatarImage
          className="rounded-xl object-contain mix-blend-multiply"
          src={`/images/img/trustedCompanies/${company.image}`}
        />
        <AvatarFallback
          className="rounded-lg font-bold text-[11px] text-white"
          style={{ backgroundColor: company.color }}
        >
          {company.name[0]}
        </AvatarFallback>
      </Avatar>
      {isPast && (
        <span className="-right-0.5 -bottom-0.5 absolute flex justify-center items-center bg-white rounded-full ring-1 ring-neutral-200 size-3">
          <CircleLock02Icon className="size-1.5 text-slate-600" />
        </span>
      )}
    </div>

    <div className="flex flex-col flex-1 min-w-0">
      <span
        className={cn(
          "font-semibold text-[12.5px] truncate leading-tight",
          isPast ? "text-slate-600" : "text-neutral-900",
        )}
      >
        {company.name}
      </span>
      <span className="text-[10.5px] text-slate-600 leading-tight">
        {company.period}
      </span>
    </div>

    <div className="flex flex-col items-end gap-1 shrink-0">
      {isSelected ? (
        <span className="flex justify-center items-center bg-emerald-500 rounded-full size-4">
          <Tick01Icon className="size-2.5 text-white" />
        </span>
      ) : (
        <span
          className="inline-flex items-center px-1.5 rounded h-4 font-bold text-[9px] text-white uppercase tracking-wide"
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
                "group relative rounded-lg h-9 transition-all duration-200",
                isActive
                  ? "bg-primary/5 hover:bg-primary/5 hover:text-primary text-primary font-medium"
                  : "text-slate-600 hover:bg-neutral-100 hover:text-neutral-900",
              )}
            >
              <item.icon
                className={cn(
                  "size-[16px] transition-colors duration-150 shrink-0",
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
                    "ml-auto px-1.5 h-[18px] font-bold text-[9px] uppercase leading-none tracking-wide",
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
          <CollapsibleContent className="overflow-hidden data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down">
            <SidebarMenuSub className="space-y-0.5 mt-1 ml-5 pl-3 border-neutral-100 border-l">
              {item.children.map((child) => {
                const childActive = pathname === child.href;
                return (
                  <SidebarMenuSubItem key={child.href}>
                    <SidebarMenuSubButton asChild>
                      <Link
                        href={child.href}
                        className={cn(
                          "flex items-center gap-2.5 px-2 rounded-md h-8 text-[12.5px] transition-all duration-200",
                          childActive
                            ? "bg-primary/5 hover:bg-primary/5 hover:text-primary text-primary font-medium"
                            : "text-slate-600 hover:bg-neutral-100 hover:text-neutral-800",
                        )}
                      >
                        {childActive && (
                          <span className="bg-emerald-500 rounded-full size-1.5 shrink-0" />
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
        <span className="top-1/2 -left-3 absolute bg-primary rounded-r-full w-1 h-5 -translate-y-1/2" />
      )}
      <SidebarMenuButton
        asChild
        tooltip={item.title}
        className={cn(
          "rounded-lg h-9 transition-all duration-200",
          isActive
            ? "bg-primary/5 hover:bg-primary/5 hover:text-primary text-primary font-medium"
            : "text-slate-600 hover:bg-neutral-100 hover:text-neutral-900",
        )}
      >
        <Link href={item.href} className="flex items-center gap-2.5">
          <item.icon
            className={cn(
              "size-[16px] transition-colors duration-150 shrink-0",
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
                "ml-auto px-1.5 h-[18px] font-bold text-[9px] uppercase leading-none tracking-wide",
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
              className="group data-[state=open]:bg-white hover:bg-white data-[state=open]:shadow-sm hover:shadow-sm px-2 border border-transparent data-[state=open]:border-neutral-200 hover:border-neutral-200 rounded-xl h-[52px] transition-all duration-200"
            >
              <Avatar className="shadow-sm rounded-lg ring-1 ring-neutral-200/50 size-8 shrink-0">
                <AvatarImage src={user.avatarUrl} alt={user.name} />
                <AvatarFallback className="bg-gradient-to-br from-neutral-800 to-neutral-950 rounded-lg font-semibold text-[11px] text-white">
                  {user.initials}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col flex-1 gap-0.5 min-w-0">
                <span className="font-semibold text-[13px] text-neutral-900 truncate leading-tight">
                  {user.name}
                </span>
                <span className="text-[10.5px] text-slate-600 truncate leading-tight tracking-tight">
                  {user.email}
                </span>
              </div>
              <ArrowUpDownIcon className="size-4 text-slate-600 group-hover:text-slate-600 transition-colors duration-150 shrink-0" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="bg-white shadow-lg shadow-neutral-200/60 p-1 border border-neutral-200 rounded-xl w-56 overflow-hidden"
            side="top"
            align="start"
            sideOffset={8}
          >
            <div className="flex items-center gap-2.5 px-2 py-2">
              <Avatar className="rounded-lg size-8 shrink-0">
                <AvatarFallback className="bg-neutral-900 rounded-lg font-semibold text-white text-xs">
                  {user.initials}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col min-w-0">
                <span className="font-semibold text-[12.5px] text-neutral-900 truncate">
                  {user.name}
                </span>
                <span className="text-[10.5px] text-slate-600 truncate">
                  {user.email}
                </span>
              </div>
            </div>
            <div className="my-1 border-neutral-100 border-t" />
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
                className="flex items-center gap-2.5 hover:bg-neutral-100 px-2.5 py-1.5 rounded-lg text-[12.5px] text-neutral-700 transition-colors duration-150 cursor-pointer"
              >
                <Icon className="size-3.5 text-slate-600" />
                {label}
                {badge && (
                  <Badge className="bg-neutral-100 hover:bg-neutral-100 ml-auto px-1.5 h-4 text-[10px] text-slate-600">
                    {badge}
                  </Badge>
                )}
              </Link>
            ))}
            <div className="my-1 border-neutral-100 border-t" />
            <button className="flex items-center gap-2.5 hover:bg-red-50 px-2.5 py-1.5 rounded-lg w-full text-[12.5px] text-red-500 transition-colors duration-150 cursor-pointer">
              <Logout01Icon className="size-3.5" />
              Log out
            </button>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};

export function AppSidebar({
  role = "ceo",
  organization,
}: {
  role?: string;
  organization: TenantOrg;
}) {
  const filteredNav = mainNav.filter(
    (item) => !item.roles || item.roles.includes(role),
  );

  return (
    <Sidebar
      collapsible="icon"
      className="bg-white border-neutral-200 border-r"
    >
      <SidebarHeader className="px-3 py-3 border-neutral-100 border-b">
        <WorkspaceSwitcher organization={organization} />
      </SidebarHeader>

      <SidebarContent className="gap-0 px-3 py-2">
        <SidebarGroup className="p-0">
          <SidebarGroupLabel className="px-2 pt-2 pb-1.5 h-auto font-bold text-[10px] text-slate-600 uppercase tracking-widest">
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
                    <SidebarMenuButton className="group/more-btn hover:bg-neutral-100 rounded-lg h-9 text-slate-600 hover:text-neutral-900 transition-all duration-200">
                      <MoreHorizontalIcon className="size-[16px] text-slate-600 group-hover/more-btn:text-neutral-600 transition-colors duration-150 shrink-0" />
                      <span className="flex-1 text-[13px] tracking-tight">
                        Show more
                      </span>
                      <ArrowRight01Icon className="size-3.5 text-slate-600 group-data-[state=open]/more:text-slate-600 group-data-[state=open]/more:rotate-90 transition-transform duration-200" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="overflow-hidden data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down">
                    <SidebarMenuSub className="space-y-0.5 mt-1 ml-5 pl-3 border-neutral-100 border-l">
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

        <SidebarSeparator className="bg-neutral-100 mx-2 my-2" />

        <SidebarGroup className="p-0">
          <SidebarGroupLabel className="flex justify-between items-center px-2 pt-3 pb-1.5 h-auto font-bold text-[10px] text-slate-600 uppercase tracking-widest">
            <span>Channels</span>
            <button className="hover:bg-neutral-100 p-1 rounded-md text-slate-600 hover:text-neutral-900 transition-all duration-200">
              <PlusSignIcon className="size-3.5" />
            </button>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="gap-0.5">
              {channels.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton
                    asChild
                    className="group/pin hover:bg-neutral-100 rounded-lg h-8 text-slate-600 hover:text-neutral-900 transition-all duration-200"
                  >
                    <Link href={item.href} className="flex items-center gap-3">
                      <span
                        className="shadow-[0_0_0_2px_#fff] rounded-full size-2 group-hover/pin:scale-110 transition-transform duration-200 shrink-0"
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="flex-1 text-[12.5px] truncate tracking-tight">
                        {item.title}
                      </span>
                      <Kbd className="gap-1 bg-white shadow-sm px-1.5 py-0.5 rounded-md ring-1 ring-neutral-200/60 font-semibold text-[9px] text-slate-600 group-hover/pin:text-slate-600 uppercase tracking-widest transition-colors duration-200">
                        {item.shortcut}
                      </Kbd>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator className="bg-neutral-100 mx-2 my-2" />

        <SidebarGroup className="p-0">
          <SidebarGroupLabel className="px-2 pt-3 pb-1.5 h-auto font-bold text-[10px] text-slate-600 uppercase tracking-widest">
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
                    className="group hover:bg-neutral-100 rounded-lg h-8.5 text-slate-600 hover:text-neutral-900 transition-all duration-200"
                  >
                    <Link href={href} className="flex items-center gap-2.5">
                      <Icon className="size-[16px] text-slate-600 group-hover:text-neutral-600 transition-colors duration-200 shrink-0" />
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
                  className="group hover:bg-neutral-100 rounded-lg h-8.5 text-slate-600 hover:text-neutral-900 transition-all duration-200"
                >
                  <Link
                    href="/app/changelog"
                    className="flex items-center gap-2.5"
                  >
                    <SparklesIcon className="size-[16px] text-slate-600 group-hover:text-amber-500 transition-colors duration-200 shrink-0" />
                    <span className="text-[13px] tracking-tight">
                      What&apos;s New
                    </span>
                    <Badge
                      variant="secondary"
                      className="bg-amber-500/10 hover:bg-amber-500/20 ml-auto px-1.5 py-0 ring-1 ring-amber-500/20 h-[18px] font-bold text-[9px] text-amber-700 uppercase tracking-widest transition-colors duration-200"
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

      <SidebarFooter className="px-2 py-2 border-neutral-100 border-t">
        <UserFooter />
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
