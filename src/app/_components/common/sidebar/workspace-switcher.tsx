"use client";

import {
  ArrowUpDownIcon,
  CircleLock02Icon,
  PlusSignIcon,
} from "hugeicons-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useEffect, useMemo, useState } from "react";
import { COLORS } from "./constants";
import type { StructuredOrg, TenantOrg } from "./types";
import WorkspaceItem from "./workspace-item";

const WorkspaceSwitcher = ({
  organizations,
}: {
  organizations: TenantOrg[];
}) => {
  console.log({ organizations });
  const structuredOrgs = useMemo<StructuredOrg[]>(
    () =>
      organizations.map((org, idx) => ({
        ...org,
        id: idx,
        color: COLORS[idx % COLORS.length] ?? "#6366f1",
      })),
    [organizations],
  );

  const [active, setActive] = useState<StructuredOrg | undefined>(undefined);

  useEffect(() => {
    if (structuredOrgs.length === 0) return;
    setActive(
      (prev) =>
        prev ?? structuredOrgs.find((o) => o.isActive) ?? structuredOrgs[0],
    );
  }, [structuredOrgs]);

  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  const filterOrgs = (list: StructuredOrg[]) =>
    query.trim()
      ? list.filter((o) => o.name.toLowerCase().includes(query.toLowerCase()))
      : list;

  const filteredCurrent = filterOrgs(structuredOrgs.filter((o) => o.isActive));
  const filteredPast = filterOrgs(structuredOrgs.filter((o) => !o.isActive));
  const orgInitial = active?.name?.[0]?.toUpperCase() ?? "W";

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
                <Avatar className="shadow-sm p-1 rounded-xl ring-1 ring-black/5 size-8">
                  {active?.logo ? (
                    <AvatarImage
                      className="rounded-xl object-contain"
                      src={active.logo}
                    />
                  ) : null}
                  <AvatarFallback
                    className="rounded-xl font-bold text-[11px] text-white"
                    style={{ backgroundColor: active?.color }}
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
                  {active?.name}
                </span>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span
                    className="inline-flex items-center px-1 rounded h-3.5 font-bold text-[8.5px] text-white uppercase tracking-wide"
                    style={{ backgroundColor: active?.color }}
                  >
                    {active?.role}
                  </span>
                  <span className="text-[10px] text-slate-600">
                    {active?.memberCount} members
                  </span>
                </div>
              </div>

              <div className="flex justify-center items-center bg-white group-hover:bg-neutral-50 shadow-sm rounded-full ring-1 ring-neutral-200/80 w-6 h-6 text-slate-600 transition-colors duration-200 shrink-0">
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
              {filteredCurrent.map((org) => (
                <WorkspaceItem
                  key={org.id}
                  org={org}
                  isSelected={active?.id === org.id}
                  onSelect={() => {
                    setActive(org);
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
                    {filteredPast.map((org) => (
                      <Tooltip key={org.id}>
                        <TooltipTrigger asChild>
                          <WorkspaceItem
                            org={org}
                            isSelected={active?.id === org.id}
                            isPast
                            onSelect={() => {
                              setActive(org);
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
                <div className="flex justify-center items-center border border-neutral-300 border-dashed rounded-md size-5">
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

export default WorkspaceSwitcher;
