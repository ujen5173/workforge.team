"use client";

import {
  FolderExportIcon,
  KanbanIcon,
  Notification01Icon,
  PlusSignIcon,
  Search01Icon,
} from "hugeicons-react";
import { mockProjects } from "~/app/_components/common/projects-tasks/table/mock-data";
import { ProjectsTable } from "~/app/_components/common/projects-tasks/table/projects-table";
import { Button } from "~/components/ui/button";

const ProjectsTasks = () => {
  return (
    <main className="w-full">
      <div className="mx-auto max-w-7xl">
        <header className="border-border flex items-center justify-between border-b-2 pb-4">
          <div className="flex items-center gap-4">
            <div className="border-primary/40 bg-primary/5 rounded-full border p-3">
              <KanbanIcon className="text-primary size-6" />
            </div>
            <div className="">
              <h5 className="text-slate-700">Projects & Tasks</h5>
              <p className="text-sm">
                Manage your projects and tasks and collaborate with the team.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Button size="icon-sm" variant={"ghost"} icon={Search01Icon} />
              {/* TODO: Add interactive bell icon, like silent or not */}
              <Button
                size="icon-sm"
                variant={"ghost"}
                icon={Notification01Icon}
              />
            </div>
            <div className="flex items-center gap-2">
              <Button size="sm" variant={"ghost"} icon={FolderExportIcon}>
                Export
              </Button>
              <Button size="sm" variant={"outline"} icon={PlusSignIcon}>
                Invite People
              </Button>
            </div>
          </div>
        </header>
        <section className="py-6">
          <ProjectsTable
            data={mockProjects}
            onCreateProject={() => {
              // DO something
            }}
          />
        </section>
      </div>
    </main>
  );
};

export default ProjectsTasks;
