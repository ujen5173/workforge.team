"use client";

import { type Table } from "@tanstack/react-table";
import {
  GridViewIcon,
  LeftToRightListTriangleIcon,
  PlusSignIcon,
  Search01Icon,
} from "hugeicons-react";
import { X } from "lucide-react";

import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "~/components/ui/tabs";

import type { Project, ProjectPriority, ProjectStatus } from "./types";

interface ProjectsToolbarProps {
  table: Table<Project>;
  onCreateProject?: () => void;
}

export function ProjectsToolbar({
  table,
  onCreateProject,
}: ProjectsToolbarProps) {
  const searchValue =
    (table.getColumn("title")?.getFilterValue() as string) ?? "";

  const statusFilter =
    (table.getColumn("status")?.getFilterValue() as ProjectStatus[]) ?? [];

  const priorityFilter =
    (table.getColumn("priority")?.getFilterValue() as ProjectPriority[]) ?? [];

  const hasActiveFilters =
    statusFilter.length > 0 || priorityFilter.length > 0 || searchValue;

  function clearAllFilters() {
    table.getColumn("title")?.setFilterValue(undefined);
    table.getColumn("status")?.setFilterValue(undefined);
    table.getColumn("priority")?.setFilterValue(undefined);
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <div className="flex flex-wrap items-center gap-2">
          <div className="relative">
            <Input
              placeholder="Search projects..."
              value={searchValue}
              onChange={(e) =>
                table
                  .getColumn("title")
                  ?.setFilterValue(e.target.value || undefined)
              }
              icon={Search01Icon}
              className="w-96"
              iconStyle="size-4"
            />
          </div>

          {hasActiveFilters && (
            <Button
              variant="ghost"
              className="text-muted-foreground hover:text-foreground h-8 gap-1"
              onClick={clearAllFilters}
            >
              <X className="h-3.5 w-3.5" />
              Clear
            </Button>
          )}
        </div>

        <div className="flex items-center justify-end gap-2">
          <Tabs defaultValue="account">
            <TabsList className="h-10! gap-1 rounded-sm">
              <TabsTrigger
                value="account"
                className={buttonVariants({
                  variant: "outline",
                  size: "icon-sm",
                  className:
                    "data-[state=active]:bg-primary rounded-sm border-transparent bg-transparent data-[state=active]:text-slate-100 data-[state=active]:hover:text-slate-100",
                })}
              >
                <GridViewIcon className="size-3" />
              </TabsTrigger>
              <TabsTrigger
                value="password"
                className={buttonVariants({
                  variant: "outline",
                  size: "icon-sm",
                  className:
                    "data-[state=active]:bg-primary rounded-sm border-transparent bg-transparent data-[state=active]:text-slate-100 data-[state=active]:hover:text-slate-100",
                })}
              >
                <LeftToRightListTriangleIcon className="size-3" />
              </TabsTrigger>
            </TabsList>
            {/* <TabsContent value="account">
              Make changes to your account here.
            </TabsContent>
            <TabsContent value="password">
              Change your password here.
            </TabsContent> */}
          </Tabs>

          {onCreateProject && (
            <Button icon={PlusSignIcon} onClick={onCreateProject}>
              New Project
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
