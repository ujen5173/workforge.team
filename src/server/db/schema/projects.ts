import {
  date,
  index,
  integer,
  json,
  pgTable,
  primaryKey,
  text,
  timestamp,
  uniqueIndex,
} from "drizzle-orm/pg-core";
import {
  CLIENT_TYPE,
  DIFFICULTY_LEVEL,
  PRIORITY_LEVEL,
  PROJECT_MEMBER_ROLE,
  PROJECT_STATUS,
  TASK_STATUS,
} from "./enum";
import { member, organization } from "./organization";
import { user } from "./users";

export const projects = pgTable(
  "project",
  {
    id: text("id").primaryKey(),

    name: text("name").notNull(),
    logo: text("logo"),
    description: text("description"),
    type: text("type"),
    tags: text("tags").array().default([]),

    status: PROJECT_STATUS().notNull().default("PENDING"),
    priority: PRIORITY_LEVEL(),
    client: CLIENT_TYPE(),

    startDate: date("start_date"),
    dueDate: date("due_date"),

    progress: integer("progress").default(0),

    organizationId: text("organization_id")
      .notNull()
      .references(() => organization.id, { onDelete: "cascade" }),

    createdById: text("created_by_id").references(() => member.id, {
      onDelete: "set null",
    }),

    attachments: json("attachments")
      .$type<Array<{ name: string; url: string; mimeType: string }>>()
      .default([]),
    linksResources: json("links_resources")
      .$type<Array<{ label: string; url: string }>>()
      .default([]),

    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
  },
  (table) => [
    index("project_org_id_idx").on(table.organizationId),
    index("project_org_status_idx").on(table.organizationId, table.status),
  ],
);

export const projectMembers = pgTable(
  "project_member",
  {
    id: text("id").primaryKey(),
    projectId: text("project_id")
      .notNull()
      .references(() => projects.id, { onDelete: "cascade" }),
    memberId: text("member_id")
      .notNull()
      .references(() => member.id, { onDelete: "cascade" }),
    role: PROJECT_MEMBER_ROLE().notNull().default("CONTRIBUTOR"),
    joinedAt: timestamp("joined_at").notNull().defaultNow(),
  },
  (table) => [
    uniqueIndex("project_member_unique_idx").on(
      table.projectId,
      table.memberId,
    ),
    index("project_member_project_idx").on(table.projectId),
    index("project_member_member_idx").on(table.memberId),
  ],
);

export const tasks = pgTable(
  "task",
  {
    id: text("id").primaryKey(),

    title: text("title").notNull(),
    description: text("description"),
    status: TASK_STATUS().notNull().default("TODO"),
    priority: PRIORITY_LEVEL(),
    difficulty: DIFFICULTY_LEVEL(),
    tags: text("tags").array().default([]),
    type: text("type"),

    assignedById: text("assigned_by_id").references(() => member.id, {
      onDelete: "set null",
    }),

    start: date("start"),
    end: date("end"),
    estimatedHours: integer("estimated_hours"),

    parentId: text("parent_id").references((): any => tasks.id, {
      onDelete: "cascade",
    }),

    projectId: text("project_id")
      .notNull()
      .references(() => projects.id, { onDelete: "cascade" }),

    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
  },
  (table) => [
    index("task_project_id_idx").on(table.projectId),
    index("task_project_status_idx").on(table.projectId, table.status),
    index("task_end_idx").on(table.end),
    index("task_parent_id_idx").on(table.parentId),
  ],
);

export const taskAssignees = pgTable(
  "task_assignee",
  {
    taskId: text("task_id")
      .notNull()
      .references(() => tasks.id, { onDelete: "cascade" }),
    memberId: text("member_id")
      .notNull()
      .references(() => member.id, { onDelete: "cascade" }),
    assignedAt: timestamp("assigned_at").notNull().defaultNow(),
  },
  (table) => [
    primaryKey({ columns: [table.taskId, table.memberId] }),
    index("task_assignee_member_idx").on(table.memberId),
  ],
);

export const discussions = pgTable(
  "discussion",
  {
    id: text("id").primaryKey(),
    title: text("title"),
    body: text("body").notNull(),

    authorId: text("author_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),

    parentId: text("parent_id").references((): any => discussions.id, {
      onDelete: "cascade",
    }),

    projectId: text("project_id")
      .notNull()
      .references(() => projects.id, { onDelete: "cascade" }),

    likeCount: integer("like_count").notNull().default(0),

    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
  },
  (table) => [
    index("discussion_project_id_idx").on(table.projectId),
    index("discussion_author_id_idx").on(table.authorId),
    index("discussion_parent_id_idx").on(table.parentId),
  ],
);
