"use client";

import { CircleLock02Icon, Tick01Icon } from "hugeicons-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import type { StructuredOrg } from "./types";

const WorkspaceItem = ({
  org,
  isSelected,
  isPast = false,
  onSelect,
}: {
  org: StructuredOrg;
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
      <Avatar className="shadow-sm p-1 rounded-lg ring-1 ring-black/5 size-8">
        {org.logo ? (
          <AvatarImage
            className="rounded-xl object-contain mix-blend-multiply"
            src={org.logo}
          />
        ) : null}
        <AvatarFallback
          className="rounded-lg font-bold text-[11px] text-white"
          style={{ backgroundColor: org.color }}
        >
          {org.name[0]}
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
        {org.name}
      </span>
      <span className="text-[10.5px] text-slate-600 leading-tight">
        {org.timePeriod}
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
          style={{ backgroundColor: org.color + "cc" }}
        >
          {org.role}
        </span>
      )}
    </div>
  </button>
);

export default WorkspaceItem;
