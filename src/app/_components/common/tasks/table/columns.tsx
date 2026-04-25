"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { DataTableColumnHeader } from "@/components/ui/data-table";
import { cn } from "@/lib/utils";
import { DIFFICULTY_LEVEL, TASK_STATUS, type Tasks } from "./types";

const STATUS_CONFIG: Record<TASK_STATUS, { label: string; className: string }> =
  {
    [TASK_STATUS.BACKLOG]: {
      label: "Backlog",
      className: "bg-slate-50 text-slate-600 border-slate-200",
    },

    [TASK_STATUS.IN_PROGRESS]: {
      label: "In Progress",
      className: "bg-blue-50 text-blue-700 border-blue-200",
    },
    [TASK_STATUS.NEED_REVIEW]: {
      label: "Need Review",
      className: "bg-purple-50 text-purple-700 border-purple-200",
    },
    [TASK_STATUS.COMPLETED]: {
      label: "Completed",
      className: "bg-emerald-50 text-emerald-700 border-emerald-200",
    },
    [TASK_STATUS.BLOCKED]: {
      label: "Blocked",
      className: "bg-red-50 text-red-700 border-red-200",
    },
    [TASK_STATUS.ON_HOLD]: {
      label: "On Hold",
      className: "bg-amber-50 text-amber-700 border-amber-200",
    },
    [TASK_STATUS.CANCELLED]: {
      label: "Cancelled",
      className: "bg-slate-100 text-slate-500 border-slate-200",
    },
  };

const DIFFICULTY_CONFIG: Record<
  DIFFICULTY_LEVEL,
  { label: string; className: string }
> = {
  [DIFFICULTY_LEVEL.LOW]: {
    label: "Low",
    className: "text-emerald-600 bg-emerald-50",
  },
  [DIFFICULTY_LEVEL.MEDIUM]: {
    label: "Medium",
    className: "text-amber-600 bg-amber-50",
  },
  [DIFFICULTY_LEVEL.HIGH]: {
    label: "High",
    className: "text-red-600 bg-red-50",
  },
};

function AvatarGroup({
  members,
  max = 3,
}: {
  members: Tasks["assignedTo"];
  max?: number;
}) {
  if (!members || members.length === 0)
    return <span className="text-xs text-slate-400">Unassigned</span>;
  const visible = members.slice(0, max);
  const overflow = members.length - max;

  return (
    <TooltipProvider>
      <div className="flex -space-x-2">
        {visible.map((member) => (
          <Tooltip key={member.id}>
            <TooltipTrigger asChild>
              <Avatar className="border-background h-7 w-7 border-2 ring-0">
                <AvatarImage src={member.profile} alt={member.name} />
                <AvatarFallback className="bg-slate-100 text-[10px] font-medium text-slate-600">
                  {member.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .slice(0, 2)
                    .toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </TooltipTrigger>
            <TooltipContent side="top">{member.name}</TooltipContent>
          </Tooltip>
        ))}
        {overflow > 0 && (
          <div className="border-background bg-muted text-muted-foreground flex h-7 w-7 items-center justify-center rounded-full border-2 text-[10px] font-medium">
            +{overflow}
          </div>
        )}
      </div>
    </TooltipProvider>
  );
}

export const tasksColumns: ColumnDef<Tasks>[] = [
  {
    accessorKey: "id",
    size: 40,
    header: ({ column }) => (
      <div className="">
        <DataTableColumnHeader column={column} title="ID" />
      </div>
    ),
    cell: ({ row }) => {
      const task = row.original;
      return (
        <div className="flex min-w-0 flex-col gap-0.5  text-xs font-medium text-slate-500">
          {task.id}
        </div>
      );
    },
    filterFn: (row, _columnId, value: string) =>
      row.original.title.toLowerCase().includes(value.toLowerCase()) ||
      row.original.description.toLowerCase().includes(value.toLowerCase()),
  },
  {
    accessorKey: "title",
    size: 280,
    header: ({ column }) => (
      <div className="">
        <DataTableColumnHeader column={column} title="Title" />
      </div>
    ),
    cell: ({ row }) => {
      const task = row.original;
      return (
        <div className="flex min-w-0 flex-col gap-1">
          <span className="truncate text-sm leading-tight font-medium text-slate-800">
            {task.title}
          </span>
          {task.tags && task.tags.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {task.tags.slice(0, 2).map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="h-4 px-1.5 text-[10px] font-normal"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </div>
      );
    },
    filterFn: (row, _columnId, value: string) =>
      row.original.title.toLowerCase().includes(value.toLowerCase()) ||
      row.original.description.toLowerCase().includes(value.toLowerCase()),
  },

  {
    accessorKey: "description",
    size: 320,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Description" />
    ),
    cell: ({ row }) => {
      const task = row.original;
      return (
        <div className="flex min-w-0 flex-col gap-1 pr-4">
          <span
            className="truncate text-xs leading-tight text-slate-500"
            title={task.description}
          >
            {task.description}
          </span>
        </div>
      );
    },
  },

  {
    accessorKey: "status",
    size: 110,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const config = STATUS_CONFIG[row.original.status] || {
        label: "Unknown",
        className: "bg-slate-100 text-slate-600",
      };
      return (
        <Badge
          variant="outline"
          className={cn(
            "text-xs font-medium whitespace-nowrap",
            config.className,
          )}
        >
          {config.label}
        </Badge>
      );
    },
    filterFn: (row, _columnId, value: number[]) =>
      value.includes(row.original.status),
  },

  {
    accessorKey: "assignedTo",
    size: 130,
    header: () => (
      <span className="text-xs font-medium text-slate-500">Assignees</span>
    ),
    cell: ({ row }) => (
      <AvatarGroup members={row.original.assignedTo} max={3} />
    ),
    enableSorting: false,
  },

  {
    accessorKey: "date",
    size: 140,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Timeline" />
    ),
    cell: ({ row }) => {
      const startDate = row.original.startDate;
      const dueDate = row.original.dueDate;
      const isOverdue =
        dueDate &&
        new Date() > dueDate &&
        row.original.status !== TASK_STATUS.COMPLETED;

      return (
        <div className="flex flex-col gap-0.5">
          {startDate && (
            <span className="text-[11px] text-slate-500">
              Start: {format(startDate, "MMM d, yyyy")}
            </span>
          )}
          {dueDate ? (
            <span
              className={cn(
                "text-[11px] font-medium",
                isOverdue ? "text-red-600" : "text-slate-700",
              )}
            >
              Due: {format(dueDate, "MMM d, yyyy")}
            </span>
          ) : (
            <span className="text-[11px] text-slate-400">No Due Date</span>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "assignedBy",
    size: 100,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Assigned By" />
    ),
    cell: ({ row }) => {
      const reporter = row.original.assignedBy;
      if (!reporter) return null;

      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Avatar className="h-7 w-7 border ring-0">
                <AvatarImage src={reporter.profile} alt={reporter.name} />
                <AvatarFallback className="bg-slate-100 text-[10px] font-medium text-slate-600">
                  {reporter.name.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </TooltipTrigger>
            <TooltipContent side="top">{reporter.name}</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    },
  },
  {
    accessorKey: "difficultyLevel",
    size: 120,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Difficulty" />
    ),
    cell: ({ row }) => {
      const config = DIFFICULTY_CONFIG[row.original.difficultyLevel];
      if (!config) return null;
      return (
        <Badge
          variant="secondary"
          className={cn(
            "border-transparent text-[10px] font-medium",
            config.className,
          )}
        >
          {config.label}
        </Badge>
      );
    },
  },
];
