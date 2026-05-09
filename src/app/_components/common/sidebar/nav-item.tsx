"use client";

import { ArrowRight01Icon } from "hugeicons-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import * as React from "react";

import { Badge } from "@/components/ui/badge";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import type { NavItem } from "./types";

const NavItemComponent = ({ item }: { item: NavItem }) => {
  const pathname = usePathname();
  const isActive =
    pathname === item.href || pathname.startsWith(item.href + "/app");
  const [open, setOpen] = React.useState(isActive);

  const activeClass =
    "bg-primary/5 hover:bg-primary/5 hover:text-primary text-primary font-medium";
  const inactiveClass =
    "text-slate-600 hover:bg-neutral-100 hover:text-neutral-900";

  const BadgeEl = item.badge ? (
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
  ) : null;

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
                isActive ? activeClass : inactiveClass,
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
              {BadgeEl}
              <ArrowRight01Icon
                className={cn(
                  "size-3.5 text-slate-600 transition-transform duration-200",
                  open && "rotate-90",
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
                            ? activeClass
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
          isActive ? activeClass : inactiveClass,
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
          {BadgeEl}
          {isActive && <ArrowRight01Icon className="text-primary" />}
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
};

export default NavItemComponent;
