import {
  integer,
  jsonb,
  numeric,
  pgEnum,
  pgTable,
  text,
  timestamp,
} from "drizzle-orm/pg-core";
import { v4 as uuidv4 } from "uuid";
import { company } from "./company";
import { user } from "./users";

export const projectStatusEnum = pgEnum("project_status", [
  "planning",
  "active",
  "on_hold",
  "completed",
  "cancelled",
]);

export const projectPriorityEnum = pgEnum("project_priority", [
  "low",
  "medium",
  "high",
]);

export const projectVisibilityEnum = pgEnum("project_visibility", [
  "public",
  "private",
  "team_only",
]);

export const projectMemberRoleEnum = pgEnum("project_member_role", [
  "lead",
  "contributor",
  "reviewer",
  "observer",
]);

export const milestoneStatusEnum = pgEnum("milestone_status", [
  "upcoming",
  "achieved",
  "missed",
]);

export const projects = pgTable("projects", {
  id: text("id")
    .$defaultFn(() => uuidv4())
    .primaryKey(),

  companyId: text("company_id")
    .notNull()
    .references(() => company.id, { onDelete: "cascade" }),
  ownerId: text("owner_id")
    .notNull()
    .references(() => user.id),

  name: text("name").notNull(),
  slug: text("slug").notNull(),
  description: text("description"),
  tags: jsonb("tags").$type<string[]>(),

  status: projectStatusEnum("status").default("planning").notNull(),
  priority: projectPriorityEnum("priority").default("medium").notNull(),
  visibility: projectVisibilityEnum("visibility")
    .default("team_only")
    .notNull(),

  budget: numeric("budget", { precision: 12, scale: 2 }),
  totalPoints: integer("total_points").default(0),
  completionPercentage: integer("completion_percentage").default(0), // 0–100

  startDate: timestamp("start_date"),
  endDate: timestamp("end_date"),

  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const projectMembers = pgTable("project_members", {
  id: text("id")
    .$defaultFn(() => uuidv4())
    .primaryKey(),

  projectId: text("project_id")
    .notNull()
    .references(() => projects.id, { onDelete: "cascade" }),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  role: projectMemberRoleEnum("role").default("contributor").notNull(),
  joinedAt: timestamp("joined_at").defaultNow().notNull(),
});

export const projectMilestones = pgTable("project_milestones", {
  id: text("id")
    .$defaultFn(() => uuidv4())
    .primaryKey(),

  projectId: text("project_id")
    .notNull()
    .references(() => projects.id, { onDelete: "cascade" }),
  companyId: text("company_id")
    .notNull()
    .references(() => company.id, { onDelete: "cascade" }),
  createdBy: text("created_by")
    .notNull()
    .references(() => user.id),

  title: text("title").notNull(),
  description: text("description"),
  status: milestoneStatusEnum("status").default("upcoming").notNull(),
  linkedTasks: jsonb("linked_tasks").$type<string[]>(), // task IDs

  dueDate: timestamp("due_date").notNull(),
  achievedAt: timestamp("achieved_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
