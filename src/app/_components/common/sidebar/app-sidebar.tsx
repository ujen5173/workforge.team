"use client";

import {
  ArrowRight01Icon,
  MoreHorizontalIcon,
  PlusSignIcon,
} from "hugeicons-react";
import Link from "next/link";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
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
  SidebarRail,
} from "@/components/ui/sidebar";
import { Kbd } from "~/components/ui/kbd";
import { Skeleton } from "~/components/ui/skeleton";
import { authClient } from "~/server/better-auth/client";
import { useUser } from "~/stores/hooks";
import { channels, mainNav, secondaryNav } from "./constants";
import NavItemComponent from "./nav-item";
import UserFooter from "./user-footer";
import WorkspaceSwitcherSkeleton from "./workspace-skeleton";
import WorkspaceSwitcher from "./workspace-switcher";

const AppSidebar = () => {
  const { data, isPending } = authClient.useSession();
  const { user } = useUser();

  const filteredMainNav = mainNav.filter(
    (item) => !item.roles || item.roles.includes(user!.role),
  );
  const filteredSecondaryNav = secondaryNav.filter(
    (item) => !item.roles || item.roles.includes(user!.role),
  );

  return (
    <Sidebar
      collapsible="icon"
      className="bg-white border-neutral-200 border-r"
    >
      <SidebarHeader className="px-3 py-3 border-neutral-100 border-b">
        <SidebarMenu>
          <SidebarMenuItem>
            {user ? (
              <WorkspaceSwitcher organizations={user ? user.pastOrgs : []} />
            ) : (
              <WorkspaceSwitcherSkeleton />
            )}
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent className="gap-0 px-3 py-2">
        <SidebarGroup className="p-0">
          <SidebarGroupLabel className="px-2 pt-2 pb-1.5 h-auto font-bold text-[10px] text-slate-600 uppercase tracking-widest">
            Main
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="gap-0.5">
              {filteredMainNav.map((item) => (
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
                      <ArrowRight01Icon className="size-3.5 text-slate-600 group-data-[state=open]/more:rotate-90 transition-transform duration-200" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="overflow-hidden data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down">
                    <SidebarMenuSub className="space-y-0.5 mt-1 ml-5 pl-3 border-neutral-100 border-l">
                      {filteredSecondaryNav.map((item) => (
                        <NavItemComponent key={item.href} item={item} />
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

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
                      <Kbd className="gap-1 bg-white shadow-sm px-1.5 py-0.5 rounded-md ring-1 ring-neutral-200/60 font-semibold text-[9px] text-slate-600 uppercase tracking-widest transition-colors duration-200">
                        {item.shortcut}
                      </Kbd>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="px-2 py-2 border-neutral-100 border-t">
        {isPending ? (
          <div className="flex items-center gap-2 px-2">
            <Skeleton className="rounded-full size-8 shrink-0" />
            <div className="flex flex-col flex-1 gap-1.5">
              <Skeleton className="rounded w-1/3 h-3" />
              <Skeleton className="rounded w-3/4 h-3" />
            </div>
          </div>
        ) : (
          <UserFooter
            userDetails={{
              name: data!.user.name,
              email: data!.user.email,
              image: data!.user.image ?? "",
            }}
          />
        )}
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
};

export default AppSidebar;
