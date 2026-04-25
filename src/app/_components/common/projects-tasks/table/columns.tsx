"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { ArrowRight01Icon, Folder01Icon } from "hugeicons-react";
import Image from "next/image";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DataTableColumnHeader } from "@/components/ui/data-table";
import { Progress } from "@/components/ui/progress";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

import type { Project, ProjectPriority, ProjectStatus } from "./types";

const STATUS_CONFIG: Record<
  ProjectStatus,
  { label: string; className: string }
> = {
  planning: {
    label: "Planning",
    className: "bg-blue-50 text-blue-700 border-blue-200",
  },
  active: {
    label: "Active",
    className: "bg-emerald-50 text-emerald-700 border-emerald-200",
  },
  on_hold: {
    label: "On Hold",
    className: "bg-amber-50 text-amber-700 border-amber-200",
  },
  completed: {
    label: "Completed",
    className: "bg-slate-100 text-slate-600 border-slate-200",
  },
  cancelled: {
    label: "Cancelled",
    className: "bg-red-50 text-red-600 border-red-200",
  },
};

const PRIORITY_CONFIG: Record<ProjectPriority, { label: string; dot: string }> =
  {
    low: { label: "Low", dot: "bg-slate-400" },
    medium: { label: "Medium", dot: "bg-blue-500" },
    high: { label: "High", dot: "bg-orange-500" },
    urgent: { label: "Urgent", dot: "bg-red-500" },
  };

function AvatarGroup({
  members,
  max = 3,
}: {
  members: Project["assignees"];
  max?: number;
}) {
  const visible = members.slice(0, max);
  const overflow = members.length - max;

  return (
    <TooltipProvider>
      <div className="flex -space-x-2">
        {visible.map((member) => (
          <Tooltip key={member.id}>
            <TooltipTrigger asChild>
              <Avatar className="border-background h-7 w-7 border-2 ring-0">
                <AvatarImage src={member.avatar} alt={member.name} />
                <AvatarFallback className="text-[10px] font-medium">
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

export const projectColumns: ColumnDef<Project>[] = [
  {
    accessorKey: "logo",
    size: 40,
    header: ({ column }) => (
      <div className="pl-4">
        <DataTableColumnHeader column={column} title="Logo" />
      </div>
    ),
    cell: ({ row }) => {
      const project = row.original;
      return (
        <div className="flex min-w-0 flex-col gap-0.5 pl-4">
          {project.logo ? (
            <div className="border-border size-10 rounded-full border">
              <Image
                src={project.logo}
                width={200}
                height={200}
                className="aspect-square rounded-full object-contain"
                alt={"Project Logo"}
              />
            </div>
          ) : (
            <div className="border-border flex size-10 items-center justify-center rounded-full border bg-slate-100 p-2.5 text-slate-700">
              <Folder01Icon />
            </div>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "title",
    size: 280,
    header: ({ column }) => (
      <div className="pl-4">
        <DataTableColumnHeader column={column} title="Project" />
      </div>
    ),
    cell: ({ row }) => {
      const project = row.original;
      return (
        <div className="flex min-w-0 flex-col gap-1 pl-4">
          <span className="truncate text-sm leading-tight font-medium">
            {project.title}
          </span>
          {project.tags.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {project.tags.slice(0, 2).map((tag) => (
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
    accessorKey: "status",
    size: 120,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const config = STATUS_CONFIG[row.original.status];
      return (
        <Badge
          variant="outline"
          className={cn("text-xs font-medium", config.className)}
        >
          {config.label}
        </Badge>
      );
    },
    filterFn: (row, _columnId, value: string[]) =>
      value.includes(row.original.status),
  },

  {
    accessorKey: "priority",
    size: 110,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Priority" />
    ),
    cell: ({ row }) => {
      const config = PRIORITY_CONFIG[row.original.priority];
      return (
        <div className="flex items-center gap-1.5">
          <span className={cn("h-2 w-2 shrink-0 rounded-full", config.dot)} />
          <span className="text-xs">{config.label}</span>
        </div>
      );
    },
    filterFn: (row, _columnId, value: string[]) =>
      value.includes(row.original.priority),
  },

  {
    accessorKey: "assignees",
    size: 130,
    header: () => <span className="text-xs font-medium">Assignees</span>,
    cell: ({ row }) => <AvatarGroup members={row.original.assignees} max={3} />,
    enableSorting: false,
  },

  {
    accessorKey: "dueDate",
    size: 120,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Due Date" />
    ),
    cell: ({ row }) => {
      const due = row.original.dueDate;
      const isOverdue = due < new Date() && row.original.status !== "completed";
      return (
        <span
          className={cn(
            "text-xs",
            isOverdue
              ? "text-destructive/80 font-medium"
              : "text-muted-foreground",
          )}
        >
          {format(due, "MMM d, yyyy")}
        </span>
      );
    },
  },

  {
    accessorKey: "progress",
    size: 160,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Progress" />
    ),
    cell: ({ row }) => {
      const { progress, tasks } = row.original;
      return (
        <div className="flex min-w-[100px] flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground text-xs">
              {tasks.completed}/{tasks.total} tasks
            </span>
            <span className="text-xs font-medium">{progress}%</span>
          </div>
          <Progress value={progress} className="h-1.5" />
        </div>
      );
    },
  },

  {
    accessorKey: "client",
    size: 130,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Client" />
    ),
    cell: ({ row }) => (
      <span className="text-muted-foreground text-xs">
        {row.original.client}
      </span>
    ),
    filterFn: (row, _columnId, value: string[]) =>
      value.includes(row.original.client),
  },
  {
    id: "actions",
    size: 52,
    enableHiding: false,
    cell: () => {
      return (
        <div className="flex items-center gap-2">
          <Button size="icon-sm" icon={ArrowRight01Icon} variant={"outline"} />
        </div>
      );
    },
  },
];
