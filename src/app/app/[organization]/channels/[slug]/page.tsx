"use client";

import {
  Popover,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import {
  Bookmark02Icon,
  HashtagIcon,
  LinkBackwardIcon,
  LinkForwardIcon,
  MoreVerticalSquare01Icon,
  Navigation03Icon,
  Notification01Icon,
  PinIcon,
  PlusSignIcon,
  Search01Icon,
  UserGroupIcon,
} from "hugeicons-react";
import { SmilePlusIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";

type Chat = {
  name: string;
  username: string;
  avatar: string;
  body: string;
  createdAt: string;
};

export const chats: Chat[] = [
  {
    name: "Aarav Shrestha",
    username: "aarav_s",
    avatar:
      "https://mm.acidintegrations.com/api/v4/users/temaqyu13pf1iqzok6mudqn16r/image",
    body: "Hey, are we still on for tomorrow?",
    createdAt: "2026-04-25T10:15:00Z",
  },
  {
    name: "Sita Gurung",
    username: "sita_g",
    avatar:
      "https://mm.acidintegrations.com/api/v4/users/z7uij9wsgffj5fbyhsafykm8jy/image?_=1770737759644",
    body: "I just pushed the latest changes, check it out.",
    createdAt: "2026-04-25T11:30:00Z",
  },
  {
    name: "Rohan Karki",
    username: "rohan_k",
    avatar:
      "https://mm.acidintegrations.com/api/v4/users/uxpxnttkwtf798xh99toernwro/image?_=-1745901940048",
    body: "That bug was tricky, finally fixed it.",
    createdAt: "2026-04-25T12:05:00Z",
  },
  {
    name: "Rohan Karki",
    username: "rohan_k",
    avatar:
      "https://mm.acidintegrations.com/api/v4/users/uxpxnttkwtf798xh99toernwro/image?_=-1745901940048",
    body: "That bug was tricky, finally fixed it.",
    createdAt: "2026-04-25T12:05:00Z",
  },
  {
    name: "Nisha Rai",
    username: "nisha_r",
    avatar:
      "https://mm.acidintegrations.com/api/v4/users/odugodre3781bmerragqzqt86h/image?_=1745848257549",
    body: "Can you review my PR when you get time?",
    createdAt: "2026-04-25T13:20:00Z",
  },
  {
    name: "Kiran Thapa",
    username: "kiran_t",
    avatar:
      "https://mm.acidintegrations.com/api/v4/users/w9kycis6p7n8jrrci197b4miqc/image",
    body: "Lunch break? I'm starving.",
    createdAt: "2026-04-25T14:10:00Z",
  },
  {
    name: "Pooja Lama",
    username: "pooja_l",
    avatar:
      "https://mm.acidintegrations.com/api/v4/users/4zsp7jtjk7nfzfw4zfpzx3yz7y/image?_=1761935500647",
    body: "The UI looks much cleaner now.",
    createdAt: "2026-04-25T15:45:00Z",
  },
  {
    name: "Bikash Adhikari",
    username: "bikash_a",
    avatar:
      "https://mm.acidintegrations.com/api/v4/users/odugodre3781bmerragqzqt86h/image?_=1745848257549",
    body: "Deployment failed again, investigating.",
    createdAt: "2026-04-25T16:25:00Z",
  },
  {
    name: "Anita Magar",
    username: "anita_m",
    avatar:
      "https://mm.acidintegrations.com/api/v4/users/odugodre3781bmerragqzqt86h/image?_=1745848257549",
    body: "Nice work on the dashboard!",
    createdAt: "2026-04-25T17:50:00Z",
  },
  {
    name: "Suman KC",
    username: "suman_kc",
    avatar:
      "https://mm.acidintegrations.com/api/v4/users/pbnn7r66ppdz5k6s8et5zr361e/image?_=1742212344282",
    body: "Let's optimize that query later.",
    createdAt: "2026-04-25T18:35:00Z",
  },
  {
    name: "Deepa Bhandari",
    username: "deepa_b",
    avatar:
      "https://mm.acidintegrations.com/api/v4/users/z7uij9wsgffj5fbyhsafykm8jy/image?_=1770737759644",
    body: "Good night! Catch up tomorrow.",
    createdAt: "2026-04-25T20:00:00Z",
  },
];

const Channel = () => {
  const [openId, setOpenId] = useState<string | null>(null);

  const handleMouseEnter = (id: string | null) => {
    setOpenId(id);
  };

  const handleMouseLeave = () => {
    setOpenId(null);
  };

  return (
    <main className="w-full h-dvh flex flex-col">
      <header className="sticky top-0 bg-white border-b p-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <HashtagIcon className="size-4" />
          <p className="font-medium">General</p>
        </div>
        <div className="flex flex-1 justify-end items-center gap-2">
          <div className="flex items-center">
            <Button variant={"ghost"} size="icon-sm" icon={PinIcon} />
            <Button
              variant={"ghost"}
              size="icon-sm"
              icon={Notification01Icon}
            />
            <Button variant={"ghost"} size="icon-sm" icon={UserGroupIcon} />
          </div>
          <div className="max-w-[15rem] flex-1">
            <Input
              size="sm"
              placeholder="Search inside General...."
              icon={Search01Icon}
              iconStyle="size-4 text-xs text-foreground placeholder:text-xs"
            />
          </div>
        </div>
      </header>
      <section className="flex flex-col flex-1 min-h-0">
        <div className="w-full overflow-y-auto flex-1">
          {chats.map((chat) => (
            <Popover
              open={openId === chat.createdAt}
              onOpenChange={(e) => setOpenId(e ? "" : null)}
              key={chat.createdAt}
            >
              <PopoverTrigger className="outline-none! w-full">
                <div
                  onMouseEnter={() => handleMouseEnter(chat.createdAt)}
                  onMouseLeave={() => handleMouseLeave()}
                >
                  <Chat data={chat} key={chat.createdAt} />
                </div>
              </PopoverTrigger>
              <PopoverContent
                align="end"
                side="top"
                className="w-full transition-none duration-0"
                onMouseEnter={() => handleMouseEnter(chat.createdAt)}
                onMouseLeave={() => handleMouseLeave()}
              >
                <PopoverHeader>
                  <div className="flex">
                    <Button
                      size="icon-sm"
                      variant={"ghost"}
                      icon={SmilePlusIcon}
                      iconStyle="size-3"
                      className="outline-none!"
                    ></Button>
                    <Button
                      size="icon-sm"
                      variant={"ghost"}
                      icon={Bookmark02Icon}
                      iconStyle="size-3"
                      className="outline-none!"
                    ></Button>
                    <Button
                      size="icon-sm"
                      variant={"ghost"}
                      icon={LinkBackwardIcon}
                      iconStyle="size-3"
                      className="outline-none!"
                    ></Button>
                    <Button
                      size="icon-sm"
                      variant={"ghost"}
                      icon={LinkForwardIcon}
                      iconStyle="size-3"
                      className="outline-none!"
                    ></Button>
                    <Button
                      size="icon-sm"
                      variant={"ghost"}
                      icon={MoreVerticalSquare01Icon}
                      iconStyle="size-3"
                      className="outline-none!"
                    ></Button>
                  </div>
                </PopoverHeader>
              </PopoverContent>
            </Popover>
          ))}
        </div>
        <div className="w-full p-3 border-t bg-white">
          <div className="border border-border rounded-md flex items-center p-2 bg-white gap-2">
            <Button variant={"ghost"} size="icon-sm">
              <PlusSignIcon />
            </Button>
            <Input
              size="sm"
              placeholder="Message # - General"
              className="flex-1"
            />
            <div className="flex items-center gap-2">
              <Button variant={"ghost"} size="icon-sm" icon={SmilePlusIcon} />
              <Button
                variant={"ghost"}
                size="icon-sm"
                icon={Navigation03Icon}
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Channel;

const Chat = ({ data }: { data: Chat }) => {
  return (
    <div className="relative pt-2 pb-4 px-4 flex gap-2">
      <img
        src={data.avatar}
        width={100}
        height={100}
        alt="User profile image"
        className="object-cover size-12 rounded-full"
      />
      <div className="space-y-1">
        <div className="text-sm flex items-center gap-2">
          <p className="">{data.name}</p>
          <span className="text-xs font-medium">
            {format(data.createdAt, "MM/dd/yy, h:mm a")}
          </span>
        </div>
        <div>
          <p className="text-sm text-slate-600">{data.body}</p>
        </div>
      </div>
    </div>
  );
};
