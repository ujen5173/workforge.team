"use client";

import { UserMultiple02Icon } from "hugeicons-react";

import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Separator } from "~/components/ui/separator";
import { cn } from "~/lib/utils";

type Status = "active" | "busy" | "away" | "offline";

interface TeamMember {
  id: string;
  name: string;
  role: string;
  avatar: string;
  fallback: string;
  status: Status;
  project: string;
  task: string;
}

const STATUS_CONFIG: Record<
  Status,
  {
    label: string;
    dot: string;
    badge: string;
  }
> = {
  active: {
    label: "Active",
    dot: "bg-emerald-400",
    badge: "bg-emerald-100 text-emerald-700",
  },
  busy: { label: "Busy", dot: "bg-red-400", badge: "bg-red-100 text-red-700" },
  away: {
    label: "Away",
    dot: "bg-amber-400",
    badge: "bg-orange-100 text-orange-700",
  },
  offline: {
    label: "Offline",
    dot: "bg-neutral-300",
    badge: "bg-slate-100 text-slate-700",
  },
};

const STATUS_SORTING = {
  active: 1,
  busy: 2,
  away: 3,
  offline: 4,
} as Record<Status, number>;

const getSorting = (data: TeamMember[]): TeamMember[] => {
  return data.sort(
    (a, b) => STATUS_SORTING[a.status] - STATUS_SORTING[b.status],
  );
};

const TEAM: TeamMember[] = [
  {
    id: "1",
    name: "Sarah Kim",
    role: "UI Designer",
    avatar: "https://github.com/shadcn.png",
    fallback: "SK",
    status: "active",
    project: "WorkForge",
    task: "Designing auth flow",
  },
  {
    id: "2",
    name: "Ethan Niser",
    role: "Backend Engineer",
    avatar: "https://github.com/ethanniser.png",
    fallback: "EN",
    status: "busy",
    project: "ElevenHype",
    task: "API integration review",
  },
  {
    id: "3",
    name: "Laura Park",
    role: "Product Manager",
    avatar: "https://github.com/evilrabbit.png",
    fallback: "LP",
    status: "away",
    project: "WorkForge",
    task: "Q3 roadmap draft",
  },
  {
    id: "4",
    name: "Tim Neutkens",
    role: "Frontend Engineer",
    avatar: "https://github.com/timneutkens.png",
    fallback: "TN",
    status: "offline",
    project: "—",
    task: "—",
  },
  {
    id: "5",
    name: "Lee Robinson",
    role: "DevOps",
    avatar: "https://github.com/leerob.png",
    fallback: "LR",
    status: "active",
    project: "WorkForge",
    task: "CI/CD pipeline setup",
  },
];

const StatusTracker = () => {
  const activeCount = TEAM.filter(
    (m) => m.status === "active" || m.status === "busy",
  ).length;

  return (
    <div className="bg-white shadow-sm p-4 border border-border rounded-xl w-full max-w-sm h-full">
      <div className="flex justify-between items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="flex justify-center items-center bg-primary/8 rounded-lg w-7 h-7 text-primary">
            <UserMultiple02Icon size={15} />
          </div>
          <p className="font-semibold text-slate-800 text-sm">Team Status</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="relative flex w-2 h-2">
            <span className="inline-flex absolute bg-emerald-400 opacity-75 rounded-full w-full h-full animate-ping" />
            <span className="inline-flex relative bg-emerald-500 rounded-full w-2 h-2" />
          </span>
          <span className="text-slate-500 text-xs">{activeCount} online</span>
        </div>
      </div>

      <Separator className="my-3" />

      <div className="space-y-0.5">
        {getSorting(TEAM).map((member) => (
          <div
            key={member.id}
            className={cn(
              "flex items-center gap-3 px-2 py-2 rounded-lg transition-colors duration-150",
              member.status === "offline"
                ? "opacity-50"
                : "cursor-pointer hover:bg-slate-50",
            )}
          >
            <div className="relative shrink-0">
              <Avatar size="sm">
                <AvatarImage src={member.avatar} alt={member.name} />
                <AvatarFallback className="text-[10px]">
                  {member.fallback}
                </AvatarFallback>
              </Avatar>
              <span
                className={cn(
                  "-right-0.5 -bottom-0.5 absolute border-2 border-white rounded-full w-2.5 h-2.5",
                  STATUS_CONFIG[member.status].dot,
                )}
              />
            </div>

            <div className="flex-1 min-w-0">
              <p className="font-medium text-slate-700 text-sm truncate leading-tight">
                {member.name}
              </p>
              {member.status !== "offline" ? (
                <p className="text-[12px] text-slate-400 truncate">
                  <span className="text-slate-500">{member.task}</span>
                </p>
              ) : (
                <p className="text-[11px] text-slate-300">-</p>
              )}
            </div>

            <Badge
              className={cn(
                "px-1.5 py-0 font-medium text-[10px] shrink-0",
                STATUS_CONFIG[member.status].badge,
              )}
            >
              {STATUS_CONFIG[member.status].label}
            </Badge>
          </div>
        ))}
      </div>

      <Separator className="my-3" />

      <Button variant="outline" size="xs" className="w-full">
        View All Members
      </Button>
    </div>
  );
};

export default StatusTracker;
