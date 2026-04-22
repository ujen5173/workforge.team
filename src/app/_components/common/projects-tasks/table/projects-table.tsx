"use client";

import { DataTable } from "@/components/ui/data-table";
import { projectColumns } from "./columns";
import { ProjectDetailPanel } from "./project-detail-panel";
import { ProjectsToolbar } from "./projects-toolbar";
import type { Project } from "./types";

interface ProjectsTableProps {
  data: Project[];
  onCreateProject?: () => void;
}

export function ProjectsTable({ data, onCreateProject }: ProjectsTableProps) {
  return (
    <DataTable
      columns={projectColumns}
      data={data}
      actionAfterRowClicked={{
        status: true,
        action: "NAVIGATE_ON_CLICK",
      }}
      defaultPageSize={10}
      toolbar={(table) => (
        <ProjectsToolbar table={table} onCreateProject={onCreateProject} />
      )}
      expandedRow={(row) => <ProjectDetailPanel project={row.original} />}
    />
  );
}
