export interface TasksMember {
  id: string;
  name: string;
  profile?: string;
  role?: string;

  email?: string;
  isActive?: boolean;
}

export enum TASK_STATUS {
  BACKLOG,
  IN_PROGRESS,
  NEED_REVIEW,
  COMPLETED,
  BLOCKED,
  ON_HOLD,
  CANCELLED,
}

export enum DIFFICULTY_LEVEL {
  HIGH,
  MEDIUM,
  LOW,
}

export enum TASK_PRIORITY {
  URGENT,
  HIGH,
  MEDIUM,
  LOW,
}

export interface TaskActivity {
  id: string;
  type:
    | "STATUS_CHANGED"
    | "COMMENT_ADDED"
    | "ASSIGNED"
    | "UPDATED"
    | "ATTACHMENT_ADDED";

  message: string;

  createdBy: {
    id: string;
    name: string;
  };

  createdAt: Date;
}

export interface TaskComment {
  id: string;
  message: string;

  author: {
    id: string;
    name: string;
    avatar?: string;
  };

  createdAt: Date;
  updatedAt?: Date;
}

export interface TaskAttachment {
  id: string;
  name: string;
  url: string;
  size: number;
  type: string;

  uploadedBy: string;
  uploadedAt: Date;
}

export interface Tasks {
  id: string;

  title: string;
  description: string;

  tags: string[];
  priority: TASK_PRIORITY;
  difficultyLevel: DIFFICULTY_LEVEL;

  status: TASK_STATUS;
  progress?: number;

  assignedTo: TasksMember[];
  assignedBy: TasksMember;
  reviewers?: TasksMember[];

  notes?: string;
  obstaclesContext?: string;

  parentTaskId?: string;
  dependencies?: string[];

  attachments: TaskAttachment[];
  comments: TaskComment[];
  discussions?: string[];

  activity: TaskActivity[];

  startDate?: Date;
  dueDate?: Date;

  completedAt?: Date;
  createdAt: Date;
  updatedAt: Date;

  isArchived?: boolean;
  isDeleted?: boolean;
}
