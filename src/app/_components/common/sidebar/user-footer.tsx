"use client";

import { ArrowUpDownIcon, Logout01Icon } from "hugeicons-react";
import Link from "next/link";
import { redirect } from "next/navigation";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
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
import { env } from "~/env";
import { authClient } from "~/server/better-auth/client";
import { userMenuLinks } from "./constants";

const UserFooter = ({
  userDetails,
}: {
  userDetails: { name: string; email: string; image: string };
}) => {
  const initials = userDetails.name
    .split(" ")
    .map((e) => e[0])
    .join("");

  const handleLogout = async () => {
    const { data } = await authClient.signOut();
    if (!data?.success) redirect(env.NEXT_PUBLIC_APP_URL);
  };

  const AvatarEl = (
    <Avatar className="shadow-sm rounded-lg ring-1 ring-neutral-200/50 size-8 shrink-0">
      <AvatarImage src={userDetails.image} alt={userDetails.name} />
      <AvatarFallback className="bg-gradient-to-br from-neutral-800 to-neutral-950 rounded-lg font-semibold text-[11px] text-white">
        {initials}
      </AvatarFallback>
    </Avatar>
  );

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="group data-[state=open]:bg-white hover:bg-white data-[state=open]:shadow-sm hover:shadow-sm px-2 border border-transparent data-[state=open]:border-neutral-200 hover:border-neutral-200 rounded-xl h-[52px] transition-all duration-200"
            >
              {AvatarEl}
              <div className="flex flex-col flex-1 gap-0.5 min-w-0">
                <span className="font-semibold text-[13px] text-neutral-900 truncate leading-tight">
                  {userDetails.name}
                </span>
                <span className="text-[10.5px] text-slate-600 truncate leading-tight tracking-tight">
                  {userDetails.email}
                </span>
              </div>
              <ArrowUpDownIcon className="size-4 text-slate-600 transition-colors duration-150 shrink-0" />
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
                <AvatarImage src={userDetails.image} alt={userDetails.name} />
                <AvatarFallback className="bg-neutral-900 rounded-lg font-semibold text-white text-xs">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col min-w-0">
                <span className="font-semibold text-[12.5px] text-neutral-900 truncate">
                  {userDetails.name}
                </span>
                <span className="text-[10.5px] text-slate-600 truncate">
                  {userDetails.email}
                </span>
              </div>
            </div>
            <div className="my-1 border-neutral-100 border-t" />
            {userMenuLinks.map(({ href, icon: Icon, label, badge }) => (
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
            <button
              onClick={handleLogout}
              className="flex items-center gap-2.5 hover:bg-red-50 px-2.5 py-1.5 rounded-lg w-full text-[12.5px] text-red-500 transition-colors duration-150 cursor-pointer"
            >
              <Logout01Icon className="size-3.5" />
              Log out
            </button>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};

export default UserFooter;
