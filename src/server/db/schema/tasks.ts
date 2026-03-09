import {
  boolean,
  integer,
  jsonb,
  pgEnum,
  pgTable,
  real,
  text,
  timestamp,
} from "drizzle-orm/pg-core";
import { v4 as uuidv4 } from "uuid";
import { company } from "./company";
import { user } from "./users";

export const taskStatusEnum = pgEnum("task_status", [
  "pending",
  "in_progress",
  "review_needed",
  "completed",
  "cancelled",
  "blocked",
]);

export const taskUrgencyEnum = pgEnum("task_urgency", [
  "low",
  "medium",
  "high",
  "critical",
]);

export const taskDifficultyEnum = pgEnum("task_difficulty", [
  "easy",
  "medium",
  "hard",
  "expert",
]);

export const reviewStatusEnum = pgEnum("review_status", [
  "pending",
  "approved",
  "rejected",
  "revision_requested",
]);

export const subTaskStatusEnum = pgEnum("subtask_status", [
  "pending",
  "in_progress",
  "completed",
]);

export const obstacleCategoryEnum = pgEnum("obstacle_category", [
  "awaiting_design",
  "awaiting_review",
  "blocked_by_task",
  "external_dependency",
  "other",
]);

export const taskDependencyTypeEnum = pgEnum("task_dependency_type", [
  "blocks",
  "is_blocked_by",
  "relates_to",
  "duplicates",
]);

export const tasks = pgTable("tasks", {
  id: text("id")
    .$defaultFn(() => uuidv4())
    .primaryKey(),

  companyId: text("company_id")
    .notNull()
    .references(() => company.id, { onDelete: "cascade" }),
  projectId: text("project_id"), // soft ref → projects.id
  userId: text("user_id")
    .notNull()
    .references(() => user.id),

  // content
  title: text("title").notNull(),
  description: text("description"),
  tags: jsonb("tags").$type<string[]>(),
  attachments: jsonb("attachments").$type<string[]>(),

  // classification
  status: taskStatusEnum("status").default("pending").notNull(),
  urgency: taskUrgencyEnum("urgency").default("medium").notNull(),
  difficulty: taskDifficultyEnum("difficulty").default("medium").notNull(),

  // assignment
  assignedTo: text("assigned_to").references(() => user.id),
  assignedBy: text("assigned_by").references(() => user.id),
  members: jsonb("members").$type<string[]>(), // additional collaborators

  // review
  reviewedBy: text("reviewed_by").references(() => user.id),
  reviewStatus: reviewStatusEnum("review_status").default("pending"),

  // time & scoring
  dueDate: timestamp("due_date"),
  estimatedHours: real("estimated_hours"),
  actualHours: real("actual_hours"),
  points: integer("points").default(0),
  progress: integer("progress").default(0), // 0–100

  createdAt: timestamp("created_at").defaultNow().notNull(),
  modifiedAt: timestamp("modified_at").defaultNow().notNull(),
});

export const subTasks = pgTable("sub_tasks", {
  id: text("id")
    .$defaultFn(() => uuidv4())
    .primaryKey(),

  taskId: text("task_id")
    .notNull()
    .references(() => tasks.id, { onDelete: "cascade" }),
  title: text("title").notNull(),
  status: subTaskStatusEnum("status").default("pending").notNull(),
  assignedTo: text("assigned_to").references(() => user.id),
  dueDate: timestamp("due_date"),
  completedAt: timestamp("completed_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const taskComments = pgTable("task_comments", {
  id: text("id")
    .$defaultFn(() => uuidv4())
    .primaryKey(),

  taskId: text("task_id")
    .notNull()
    .references(() => tasks.id, { onDelete: "cascade" }),
  userId: text("user_id")
    .notNull()
    .references(() => user.id),
  content: text("content").notNull(),
  attachments: jsonb("attachments").$type<string[]>(),
  mentions: jsonb("mentions").$type<string[]>(), // user IDs mentioned
  isEdited: boolean("is_edited").default(false).notNull(),
  editedAt: timestamp("edited_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const obstacles = pgTable("obstacles", {
  id: text("id")
    .$defaultFn(() => uuidv4())
    .primaryKey(),

  taskId: text("task_id")
    .notNull()
    .references(() => tasks.id, { onDelete: "cascade" }),
  reportedBy: text("reported_by")
    .notNull()
    .references(() => user.id),
  category: obstacleCategoryEnum("category").notNull(),
  reason: text("reason").notNull(),
  isResolved: boolean("is_resolved").default(false).notNull(),
  resolvedAt: timestamp("resolved_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const taskDependencies = pgTable("task_dependencies", {
  id: text("id")
    .$defaultFn(() => uuidv4())
    .primaryKey(),

  taskId: text("task_id")
    .notNull()
    .references(() => tasks.id, { onDelete: "cascade" }),
  dependsOnTaskId: text("depends_on_task_id")
    .notNull()
    .references(() => tasks.id, { onDelete: "cascade" }),
  type: taskDependencyTypeEnum("type").notNull(),
  createdBy: text("created_by")
    .notNull()
    .references(() => user.id),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const userWorkedOnTask = pgTable("user_worked_on_task", {
  id: text("id")
    .$defaultFn(() => uuidv4())
    .primaryKey(),

  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  taskId: text("task_id")
    .notNull()
    .references(() => tasks.id, { onDelete: "cascade" }),
  startedAt: timestamp("started_at").notNull(),
  endedAt: timestamp("ended_at"),
  hoursWorked: real("hours_worked"),
  sessionNotes: text("session_notes"),
});
