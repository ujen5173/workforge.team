"use client";

import { SidebarMenuButton } from "@/components/ui/sidebar";
import { Skeleton } from "~/components/ui/skeleton";

const WorkspaceSwitcherSkeleton = () => (
  <SidebarMenuButton
    size="lg"
    className="bg-linear-to-br from-white to-neutral-50 shadow-[0_2px_10px_-3px_rgba(0,0,0,0.05)] p-2.5 rounded-2xl ring-1 ring-neutral-200/60 h-15 pointer-events-none"
  >
    <Skeleton className="rounded-xl size-8 shrink-0" />
    <div className="flex flex-col flex-1 gap-1.5 min-w-0">
      <Skeleton className="rounded w-28 h-3" />
      <div className="flex items-center gap-1.5">
        <Skeleton className="rounded w-10 h-3" />
        <Skeleton className="rounded w-16 h-3" />
      </div>
    </div>
    <Skeleton className="rounded-full size-6 shrink-0" />
  </SidebarMenuButton>
);

export default WorkspaceSwitcherSkeleton;
