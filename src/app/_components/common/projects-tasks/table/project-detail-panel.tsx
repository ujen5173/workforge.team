"use client";

import { format } from "date-fns";
import { BarChart2, CalendarDays, Tag, Users } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";

import type { Project } from "./types";

interface ProjectDetailPanelProps {
  project: Project;
}

export function ProjectDetailPanel({ project }: ProjectDetailPanelProps) {
  return (
    <div className="grid grid-cols-1 gap-6 py-2 lg:grid-cols-4">
      <div className="flex flex-col gap-1.5 lg:col-span-2">
        <p className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
          Description
        </p>
        <p className="text-foreground text-sm leading-relaxed">
          {project.description || "No description provided."}
        </p>

        {project.tags.length > 0 && (
          <div className="mt-2 flex flex-wrap items-center gap-1.5">
            <Tag className="text-muted-foreground h-3.5 w-3.5 shrink-0" />
            {project.tags.map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="text-xs font-normal"
              >
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </div>

      <Separator orientation="vertical" className="hidden lg:block" />

      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <p className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
            Manager
          </p>
          <div className="flex items-center gap-2">
            <Avatar className="h-6 w-6">
              <AvatarImage src={project.manager.avatar} />
              <AvatarFallback className="text-[10px]">
                {project.manager.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .slice(0, 2)
                  .toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <span className="text-sm">{project.manager.name}</span>
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <p className="text-muted-foreground flex items-center gap-1 text-xs font-medium tracking-wide uppercase">
            <Users className="h-3.5 w-3.5" />
            Assignees ({project.assignees.length})
          </p>
          <div className="flex flex-col gap-1">
            {project.assignees.slice(0, 4).map((member) => (
              <div key={member.id} className="flex items-center gap-2">
                <Avatar className="h-5 w-5">
                  <AvatarImage src={member.avatar} />
                  <AvatarFallback className="text-[9px]">
                    {member.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .slice(0, 2)
                      .toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <span className="text-muted-foreground text-xs">
                  {member.name}
                </span>
                {member.role && (
                  <Badge
                    variant="outline"
                    className="h-4 px-1 text-[10px] font-normal"
                  >
                    {member.role}
                  </Badge>
                )}
              </div>
            ))}
            {project.assignees.length > 4 && (
              <p className="text-muted-foreground text-xs">
                +{project.assignees.length - 4} more
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <p className="text-muted-foreground flex items-center gap-1 text-xs font-medium tracking-wide uppercase">
            <BarChart2 className="h-3.5 w-3.5" />
            Progress
          </p>
          <div className="flex flex-col gap-1.5">
            <div className="flex justify-between text-xs">
              <span className="text-muted-foreground">
                {project.tasks.completed} of {project.tasks.total} tasks
              </span>
              <span className="font-medium">{project.progress}%</span>
            </div>
            <Progress value={project.progress} className="h-2" />
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <p className="text-muted-foreground flex items-center gap-1 text-xs font-medium tracking-wide uppercase">
            <CalendarDays className="h-3.5 w-3.5" />
            Timeline
          </p>
          <div className="text-muted-foreground space-y-0.5 text-xs">
            <div>
              Start:{" "}
              <span className="text-foreground">
                {format(project.startDate, "MMM d, yyyy")}
              </span>
            </div>
            <div>
              Due:{" "}
              <span className="text-foreground">
                {format(project.dueDate, "MMM d, yyyy")}
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <p className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
            Client
          </p>
          <span className="text-sm">{project.client}</span>
        </div>
      </div>
    </div>
  );
}
