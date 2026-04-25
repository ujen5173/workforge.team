import { EnergyIcon } from "hugeicons-react";
import Image from "next/image";

import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarImage,
} from "~/components/ui/avatar";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Separator } from "~/components/ui/separator";

const avatars = [
  { name: "shadcn", src: "https://github.com/shadcn.png", fallback: "CN" },
  {
    name: "Ethan Niser",
    src: "https://github.com/ethanniser.png",
    fallback: "EN",
  },
  {
    name: "Guillermo Rauch",
    src: "https://github.com/rauchg.png",
    fallback: "GR",
  },
  {
    name: "Lee Robinson",
    src: "https://github.com/leerob.png",
    fallback: "LR",
  },
  {
    name: "Evil Rabbit",
    src: "https://github.com/evilrabbit.png",
    fallback: "ER",
  },
  {
    name: "Tim Neutkens",
    src: "https://github.com/timneutkens.png",
    fallback: "TN",
  },
];

const Field = ({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) => (
  <div className="space-y-1">
    <p className="text-[11px] font-medium tracking-wider text-slate-400 uppercase">
      {label}
    </p>
    <div className="text-sm font-medium text-slate-700">{children}</div>
  </div>
);

const CurrentProject = () => {
  return (
    <div className="border-border h-full w-full max-w-sm rounded-xl border bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="bg-primary/8 text-primary flex h-7 w-7 items-center justify-center rounded-lg">
            <EnergyIcon size={15} />
          </div>
          <p className="text-sm font-semibold text-slate-800">
            Current Project
          </p>
        </div>
        <Button variant="outline" size="xs">
          Show All
        </Button>
      </div>

      <Separator className="my-3" />

      <div className="space-y-3.5">
        <Field label="Project Name">Workforge</Field>

        <div className="grid grid-cols-2 gap-3">
          <Field label="Reviewer">
            <div className="flex items-center gap-1.5">
              <Image
                src="https://github.com/evilrabbit.png"
                width={20}
                height={20}
                alt="Laura P."
                className="size-5 rounded-full"
              />
              <span>Laura P.</span>
            </div>
          </Field>
          <Field label="Deadline">
            <Badge variant="destructive" className="text-[11px]">
              Oct 15, 2023
            </Badge>
          </Field>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Field label="Type">
            <Badge className="text-[11px]">Bug fixes</Badge>
          </Field>
          <Field label="Description">
            <p className="line-clamp-2 text-sm leading-snug font-normal text-slate-500">
              Mobile and desktop app design for the new look of the brand.
            </p>
          </Field>
        </div>

        <Field label="Team">
          <AvatarGroup>
            {avatars.slice(0, 3).map((avatar, index) => (
              <Avatar key={index}>
                <AvatarImage src={avatar.src} />
                <AvatarFallback>{avatar.fallback}</AvatarFallback>
              </Avatar>
            ))}
            <AvatarGroupCount>+3</AvatarGroupCount>
          </AvatarGroup>
        </Field>
      </div>
    </div>
  );
};

export default CurrentProject;
