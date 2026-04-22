export type ProjectStatus =
  | "planning"
  | "active"
  | "on_hold"
  | "completed"
  | "cancelled";

export type ProjectPriority = "low" | "medium" | "high" | "urgent";

export type ClientType = "Internal" | "Internal Tool" | "Outsourcing";

export interface ProjectMember {
  id: string;
  name: string;
  avatar?: string;
  role?: string;
}

export interface Project {
  id: string;
  logo: string | null;
  title: string;
  description: string;

  status: ProjectStatus;
  priority: ProjectPriority;

  manager: ProjectMember;

  assignees: ProjectMember[];

  client: ClientType;

  tags: string[];

  startDate: Date;
  dueDate: Date;

  progress: number;

  tasks: {
    total: number;
    completed: number;
  };

  createdAt: Date;
  updatedAt: Date;
}

export const PROJECT_STATUSES: { value: ProjectStatus; label: string }[] = [
  { value: "planning", label: "Planning" },
  { value: "active", label: "Active" },
  { value: "on_hold", label: "On Hold" },
  { value: "completed", label: "Completed" },
  { value: "cancelled", label: "Cancelled" },
];

export const PROJECT_PRIORITIES: { value: ProjectPriority; label: string }[] = [
  { value: "low", label: "Low" },
  { value: "medium", label: "Medium" },
  { value: "high", label: "High" },
  { value: "urgent", label: "Urgent" },
];
